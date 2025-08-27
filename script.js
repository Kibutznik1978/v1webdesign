// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Animate hamburger bars
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                bar.style.transform = navToggle.classList.contains('active') 
                    ? `rotate(${index === 1 ? 0 : index === 0 ? 45 : -45}deg) translate(${index === 1 ? 0 : index === 0 ? 6 : -6}px, ${index === 1 ? 0 : index === 0 ? 6 : -6}px)`
                    : 'none';
                bar.style.opacity = navToggle.classList.contains('active') && index === 1 ? '0' : '1';
            });
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            
            // Reset hamburger bars
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            
            // Reset hamburger bars
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        }
    });
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form Handling with Basic Validation
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('.contact-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const formData = new FormData(form);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Clear previous error messages
            clearErrorMessages(form);
            
            let isValid = true;
            
            // Validate required fields
            if (!name || name.trim().length < 2) {
                showError(form.querySelector('input[name="name"]'), 'Please enter your full name');
                isValid = false;
            }
            
            if (!email || !isValidEmail(email)) {
                showError(form.querySelector('input[name="email"]'), 'Please enter a valid email address');
                isValid = false;
            }
            
            if (!message || message.trim().length < 10) {
                showError(form.querySelector('textarea[name="message"]'), 'Please provide more details about your project');
                isValid = false;
            }
            
            if (isValid) {
                // Show loading state
                const submitButton = form.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
                
                // Submit form to Formspree
                fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                }).then(response => {
                    if (response.ok) {
                        showSuccessMessage(form);
                        form.reset();
                    } else {
                        throw new Error('Form submission failed');
                    }
                }).catch(error => {
                    showErrorMessage(form, 'There was a problem sending your message. Please try again or contact us directly.');
                }).finally(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                });
            }
        });
    });
});

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show error message
function showError(element, message) {
    element.classList.add('error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#dc2626';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    element.parentNode.insertBefore(errorDiv, element.nextSibling);
}

// Clear error messages
function clearErrorMessages(form) {
    const errorMessages = form.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.remove());
    
    const errorInputs = form.querySelectorAll('.error');
    errorInputs.forEach(input => {
        input.classList.remove('error');
        input.style.borderColor = '';
    });
}

// Show success message
function showSuccessMessage(form) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div style="background: #10b981; color: white; padding: 1rem; border-radius: 8px; margin-top: 1rem; text-align: center;">
            <strong>Thank you!</strong> Your message has been sent. We'll get back to you within 24 hours.
        </div>
    `;
    form.appendChild(successDiv);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// Show error message for form submission
function showErrorMessage(form, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message-form';
    errorDiv.innerHTML = `
        <div style="background: #dc2626; color: white; padding: 1rem; border-radius: 8px; margin-top: 1rem; text-align: center;">
            <strong>Error:</strong> ${message}
        </div>
    `;
    form.appendChild(errorDiv);
    
    // Remove error message after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Add error styles dynamically
const style = document.createElement('style');
style.textContent = `
    .contact-form input.error,
    .contact-form select.error,
    .contact-form textarea.error {
        border-color: #dc2626 !important;
        box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1) !important;
    }
`;
document.head.appendChild(style);

// Modern Intersection Observer for Animations
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.animate-fade-in, .animate-slide-up, .problem-card, .solution-item, .feature-card, .addon-card, .card');
    
    animateElements.forEach((el, index) => {
        // Add staggered animation delays
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    // Initialize floating animations
    const floatingElements = document.querySelectorAll('.floating, .floating-delayed');
    floatingElements.forEach(el => {
        el.style.animationPlayState = 'running';
    });
});

// Header background on scroll
window.addEventListener('scroll', function() {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = 'none';
    }
});

// Performance: Lazy load images when they exist
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
});

// Price calculator (future enhancement)
function calculateProjectCost(basePrice = 500, addons = []) {
    let total = basePrice;
    addons.forEach(addon => {
        total += addon.price;
    });
    return total;
}

// Contact form auto-fill detection and enhancement
document.addEventListener('DOMContentLoaded', function() {
    const businessTypeSelect = document.querySelector('select[name="business_type"]');
    const messageTextarea = document.querySelector('textarea[name="message"]');
    
    if (businessTypeSelect && messageTextarea) {
        businessTypeSelect.addEventListener('change', function() {
            const businessType = this.value;
            const currentMessage = messageTextarea.value;
            
            // Don't overwrite existing content
            if (currentMessage.length > 0) return;
            
            const suggestions = {
                'restaurant': 'I run a restaurant and need a website to show our menu, location, and allow online reservations.',
                'retail': 'I have a retail store and want to showcase our products and store information online.',
                'professional': 'I provide professional services and need a website to attract new clients and show my expertise.',
                'health': 'I run a medical/healthcare practice and need a professional website for patient information and appointments.',
                'home_services': 'I provide home services and need a website to get more local customers and show our service areas.',
                'real_estate': 'I\'m a real estate agent and need a website to showcase properties and attract new clients.',
                'fitness': 'I run a fitness/wellness business and need a website to show our services and allow class bookings.',
                'automotive': 'I have an automotive business and need a website to showcase our services and attract customers.'
            };
            
            if (suggestions[businessType]) {
                messageTextarea.placeholder = suggestions[businessType];
            }
        });
    }
});

// Add subtle animations to CTA buttons
document.addEventListener('DOMContentLoaded', function() {
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('btn-secondary')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
});

// Console message for developers
console.log('%cV1 Web Design - Professional Websites for $500', 'color: #2563eb; font-size: 16px; font-weight: bold;');
console.log('%cInterested in how this site was built? Contact us!', 'color: #64748b; font-size: 12px;');