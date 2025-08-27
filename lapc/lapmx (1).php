<?php #Script Index.php
$page = "home";
$page_title = "Late Arrival Pay Calculator";
include ('header.html');
?>



<div class="row">
    <div class="col-md-6 col-md-offset-3 col-xs-10 col-xs-offset-1">
      <a href="index.php"><button class="btn btn-success btn-md btn-block" >Delay due to MX/WX</button></a>
            <br/>
      <form action="handle_lapmx.php" method="post">
       
            <button class="btn btn-info btn-xs btn-block" >Enter data using whole numbers or decimals.</button>
              <br/>



  <div class="form-group">

    <label>Originaly scheduled arrival date:</label>
    <input type="date" class="form-control" name="date" required>
  </div>

  <div class="form-group">
    <label>Originaly scheduled arrival time:</label>
    <input type="time" class="form-control" name="time" required>
  </div>

  <button type="submit" class="btn btn-primary btn-lg btn-block">Calculate</button>

</form>

<br/>
    <a href="index.php"><button class="btn btn-info btn-lg btn-block" >Back</button></a>

    </div>
</div>











 


<?php #Script for footer.php
include ('footer.php');
?>