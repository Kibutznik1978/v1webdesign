// Late Arrival Pay Calculator JavaScript
// Professional aviation calculator for pilot compensation

class LAPCalculator {
    constructor() {
        this.currentType = null;
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Form submission
        document.getElementById('lapCalculatorForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.calculateLAP();
        });

        // Input validation and formatting
        this.setupInputValidation();
    }

    setupInputValidation() {
        const numericInputs = ['hoursLate', 'hourlyRate', 'legTime', 'dutyTime'];
        
        numericInputs.forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                input.addEventListener('input', (e) => {
                    // Remove any non-numeric characters except decimal point
                    let value = e.target.value.replace(/[^0-9.]/g, '');
                    
                    // Ensure only one decimal point
                    const decimalCount = (value.match(/\\./g) || []).length;
                    if (decimalCount > 1) {
                        value = value.substring(0, value.lastIndexOf('.'));
                    }
                    
                    e.target.value = value;
                });

                input.addEventListener('blur', (e) => {
                    // Format to 2 decimal places on blur
                    if (e.target.value && !isNaN(e.target.value)) {
                        e.target.value = parseFloat(e.target.value).toFixed(2);
                    }
                });
            }
        });
    }

    showCalculator(type) {
        this.currentType = type;
        
        // Update UI elements
        const calculatorTypeCard = document.getElementById('calculatorTypeCard');
        const calculatorCard = document.getElementById('calculatorCard');
        const calculatorTitle = document.getElementById('calculatorTitle');
        const calculatorSubtitle = document.getElementById('calculatorSubtitle');
        
        // Hide type selection, show calculator
        calculatorTypeCard.style.display = 'none';
        calculatorCard.style.display = 'block';
        
        // Update titles based on type
        if (type === 'standard') {
            calculatorTitle.textContent = 'Standard Delay Calculator';
            calculatorSubtitle.textContent = 'Delay NOT due to Weather or Maintenance';
        } else if (type === 'weather') {
            calculatorTitle.textContent = 'Weather/MX Delay Calculator';
            calculatorSubtitle.textContent = 'Delay due to Weather or Maintenance';
        }
        
        // Scroll to calculator
        calculatorCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Focus first input
        setTimeout(() => {
            document.getElementById('hoursLate').focus();
        }, 500);
    }

    calculateLAP() {
        try {
            // Get input values
            const hoursLate = parseFloat(document.getElementById('hoursLate').value);
            const hourlyRate = parseFloat(document.getElementById('hourlyRate').value);
            const legTime = parseFloat(document.getElementById('legTime').value);
            const dutyTime = parseFloat(document.getElementById('dutyTime').value);
            const flightTypeThreshold = parseFloat(document.getElementById('flightType').value);

            // Validation
            if (!this.validateInputs(hoursLate, hourlyRate, legTime, dutyTime, flightTypeThreshold)) {
                return;
            }

            // Calculate components
            const calculations = this.performCalculations(
                hoursLate, hourlyRate, legTime, dutyTime, flightTypeThreshold
            );

            // Display results
            this.displayResults(calculations);

            // Show results section
            const resultsCard = document.getElementById('resultsCard');
            resultsCard.style.display = 'block';
            
            // Smooth scroll to results
            resultsCard.scrollIntoView({ behavior: 'smooth', block: 'start' });

        } catch (error) {
            console.error('Calculation error:', error);
            alert('An error occurred during calculation. Please check your inputs and try again.');
        }
    }

    validateInputs(hoursLate, hourlyRate, legTime, dutyTime, flightTypeThreshold) {
        const inputs = [
            { value: hoursLate, name: 'Hours Late' },
            { value: hourlyRate, name: 'Hourly Rate' },
            { value: legTime, name: 'Leg Time' },
            { value: dutyTime, name: 'Duty Time' },
            { value: flightTypeThreshold, name: 'Flight Type' }
        ];

        for (const input of inputs) {
            if (isNaN(input.value) || input.value < 0) {
                alert(`Please enter a valid ${input.name}.`);
                return false;
            }
        }

        if (hourlyRate === 0) {
            alert('Hourly rate must be greater than 0.');
            return false;
        }

        return true;
    }

    performCalculations(hoursLate, hourlyRate, legTime, dutyTime, flightTypeThreshold) {
        // Constants
        const TRIP_RIG_DIVISOR = 3.75;
        const DUTY_RIG_DIVISOR = 2.0;
        const MPDP = 4.0;

        // Calculate components
        const tripRig = hoursLate / TRIP_RIG_DIVISOR;
        const dutyRig = dutyTime / DUTY_RIG_DIVISOR;
        const mpdp = MPDP;

        // Find highest value
        const values = {
            tripRig: tripRig,
            dutyRig: dutyRig,
            legTime: legTime,
            mpdp: mpdp
        };

        let highest = Math.max(tripRig, dutyRig, legTime, mpdp);
        let highestType = '';

        if (highest === tripRig) {
            highestType = 'Trip Rig';
        } else if (highest === legTime) {
            highestType = 'Block Time';
        } else if (highest === dutyRig) {
            highestType = 'Duty Rig';
        } else if (highest === mpdp) {
            highestType = 'Minimum Pay per Duty Period';
        }

        // Determine multiplier
        const multiplier = hoursLate > flightTypeThreshold ? 2.5 : 1.5;

        // Calculate final result
        const finalPay = highest * multiplier * hourlyRate;

        return {
            tripRig: tripRig,
            dutyRig: dutyRig,
            legTime: legTime,
            mpdp: mpdp,
            highest: highest,
            highestType: highestType,
            multiplier: multiplier,
            hourlyRate: hourlyRate,
            finalPay: finalPay,
            threshold: flightTypeThreshold,
            hoursLate: hoursLate
        };
    }

    displayResults(calc) {
        // Final result
        document.getElementById('finalResult').textContent = `$${calc.finalPay.toFixed(2)}`;
        
        // Formula
        const formula = `${calc.highest.toFixed(2)} × ${calc.multiplier} × $${calc.hourlyRate.toFixed(2)} = $${calc.finalPay.toFixed(2)}`;
        document.getElementById('resultFormula').textContent = formula;

        // Breakdown table
        document.getElementById('tripRigResult').textContent = calc.tripRig.toFixed(2);
        document.getElementById('dutyRigResult').textContent = calc.dutyRig.toFixed(2);
        document.getElementById('legTimeResult').textContent = calc.legTime.toFixed(2);
        document.getElementById('highestValue').textContent = calc.highest.toFixed(2);

        // Summary info
        document.getElementById('payBasis').textContent = calc.highestType;
        document.getElementById('multiplierUsed').textContent = `${calc.multiplier}x ${calc.hoursLate > calc.threshold ? '(Above Threshold)' : '(At/Below Threshold)'}`;
        document.getElementById('rateUsed').textContent = `$${calc.hourlyRate.toFixed(2)}/hour`;
    }

    resetForm() {
        document.getElementById('lapCalculatorForm').reset();
        document.getElementById('resultsCard').style.display = 'none';
        
        // Focus first input
        document.getElementById('hoursLate').focus();
    }

    resetCalculator() {
        // Hide calculator and results
        document.getElementById('calculatorCard').style.display = 'none';
        document.getElementById('resultsCard').style.display = 'none';
        
        // Show type selection
        document.getElementById('calculatorTypeCard').style.display = 'block';
        
        // Reset form
        document.getElementById('lapCalculatorForm').reset();
        
        // Reset type
        this.currentType = null;
        
        // Scroll to top of calculator area
        document.getElementById('calculatorTypeCard').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
}

// Global functions for onclick handlers
function showCalculator(type) {
    window.lapCalculator.showCalculator(type);
}

function resetForm() {
    window.lapCalculator.resetForm();
}

function resetCalculator() {
    window.lapCalculator.resetCalculator();
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.lapCalculator = new LAPCalculator();
    
    // Add some visual enhancements
    addVisualEnhancements();
});

function addVisualEnhancements() {
    // Add loading states to buttons
    const buttons = document.querySelectorAll('button[type="submit"]');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const originalText = this.textContent;
            this.textContent = 'Calculating...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
            }, 1000);
        });
    });

    // Add hover effects to calculator type buttons
    const typeButtons = document.querySelectorAll('#calculatorTypeCard button');
    typeButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add input focus effects
    const inputs = document.querySelectorAll('.form-input, .form-select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.2s ease';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
}

// Utility function for number formatting
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

// Export for potential future use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LAPCalculator;
}