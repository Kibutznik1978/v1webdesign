<?php #Script Index.php
$page = "home";
$page_title = "Late Arrival Pay Calculator";
include ('header.html');
?>


<div class="row">
    <div class="col-md-6 col-md-offset-3 col-xs-10 col-xs-offset-1">
       
        <a href="index.php"><button class="btn btn-primary btn-md btn-block" >Delay NOT due to MX/WX</button></a>
            <br/>
            <button class="btn btn-info btn-xs btn-block" >Enter data using whole numbers or decimals.</button>
              <br/>

                <form class="form-horizontal" action="handle_lap.php" method="post" id="formone">

                      <div class="form-group">
                        <label  for="tripRig" class="col-sm-6 control-label">How many hours were you late ?</label>
                        <div class="col-sm-4">
                          <input type="number" step="any" class="form-control" name="hourslate" id="tripRig" name="hourslate" placeholder="00.00" required>
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="inputPassword3" class="col-sm-6 control-label">What was your cumulative leg time past your original arrival time?</label>
                        <div class="col-sm-4">
                          <input type="number" step="any" class="form-control" name="legtime" placeholder="00.00" required>
                        </div>
                      </div>

                      <div class="form-group">
                        <label for="inputPassword3" class="col-sm-6 control-label">What was your cumulative duty time past your original arrival time?</label>
                        <div class="col-sm-4">
                          <input type="number" step="any" class="form-control" name="dutytime" placeholder="00.00" required>
                        </div>
                      </div>

                      <div class="form-group">
                        <label for="inputPassword3" class="col-sm-6 control-label">What is your hourly rate?</label>
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
    <a href="index.php"><button class="btn btn-info btn-lg btn-block" >Back</button></a>

    </div>
</div>


<?php #Script for footer.php
include ('footer.php');
?>