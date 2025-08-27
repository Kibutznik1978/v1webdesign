<?php #Script Index.php
$page = "home";
$page_title = "Home - Late Arrival Pay Calculator";
include ('header.html');
?>

 

    <div class="container">

      <div>
        <a href="lap2.php"><button type="button" class="btn btn-primary btn-lg btn-block">Delay NOT due to WX or MX</button></a>
        <br/>
        <a href="lapmx.php"><button type="button" class="btn btn-success btn-lg btn-block">Delay due to WX or MX</button></a>
      </div>
     </div>

<?php #Script for footer.php
include ('footer.php');
?>