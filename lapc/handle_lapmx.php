<?php #Script Index.php
$page = "home";
$page_title = "Late Arrival Pay Calculator";
include ('header.html');
?>




<?php 
                $date = $_POST['date'];
                $time = $_POST['time'];
                $originalTime = "$date ". $time;
                $originalTime = date_create($originalTime);
                $originalTime = date_format($originalTime,"Y/m/d H:i:s");
                $originalTime = strtotime($originalTime) + 14400;
                $originalTime = date('D m/d H:i', $originalTime);
                // Back to stri
                ?>


<div class="container">
<div class="row">
    <div class="col-md-6 col-md-offset-3 col-xs-10 col-xs-offset-1">
       
        <a href="index.php"><button class="btn btn-success btn-md btn-block" >Delay due to MX/WX</button></a>
               
        <h3 class="bg-success"> Your new arrival time for LAP computations is: <br/><?php print"$originalTime"?> </h3>

 <form class="form-horizontal" action="handle_lapmx2.php" method="post" id="formone">
    <button class="btn btn-info btn-xs btn-block" >Enter data using whole numbers or decimiles</button>
              <br/>

                      <div class="form-group">
                        <label  for="tripRig" class="col-sm-6 control-label">Hours late past new arrival time of <?php print"$originalTime"?>:</label>
                        <div class="col-sm-4">
                          <input type="number" step="any" class="form-control" name="hourslate" id="tripRig" name="hourslate" placeholder="00.00" required>
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="inputPassword3" class="col-sm-6 control-label">Block time past new arrival time of <?php print"$originalTime"?> :</label>
                        <div class="col-sm-4">
                          <input type="number" step="any" class="form-control" name="legtime" placeholder="00.00" required>
                        </div>
                        <div class="col-sm-6">
                          <h5><small>Include DH and CML/DH time.</small></h5>
                        </div>
                      </div>
                     

                      <div class="form-group">
                        <label for="inputPassword3" class="col-sm-6 control-label">Cumulative duty time past new arrival time of <?php print"$originalTime"?>:</label>
                        <div class="col-sm-4">
                          <input type="number" step="any" class="form-control" name="dutytime" placeholder="00.00" required>
                        </div>
                      </div>

                      <div class="form-group">
                        <label for="inputPassword3" class="col-sm-6 control-label">Hourly rate:</label>
                        <div class="col-sm-4">
                          <input type="number" step="any" class="form-control" name="rate" placeholder="00.00" required>
                        </div>
                      </div>



                      <div class="form-group">
                        <label class="col-sm-6 control-label">Domestic or International?</label>
                        <div class="col-sm-4">
                          <select class="form-control" name="domint" form="formone" type="text">
                            <option value="25">Domestic</option>
                            <option value="50">International</option>
                          </select>
                        </div>
                      </div>
        <button type="submit" name="submit" class="btn btn-primary btn-lg btn-block" >Calculate</button>

        
    </form>


<br/>

<a href="lapmx.php"><button class="btn btn-info btn-lg btn-block" >Back</button></a>
                   
        </div>   
    </div>    
</div>

<?php #Script for footer.php
include ('footer.php');
?>

 