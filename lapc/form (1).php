<?php #Script Index.php
$page = "home";
$page_title = "Late Arrival Pay Calculator";
include ('header.html');
?>




<form>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="date" class="form-control" id="exampleInputEmail1" placeholder="">
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="time" class="form-control" id="exampleInputPassword1" placeholder="Password">
  </div>
  <div class="form-group">
    <label for="exampleInputFile">File input</label>
    <input type="file" id="exampleInputFile">
    <p class="help-block">Example block-level help text here.</p>
  </div>
  <div class="checkbox">
    <label>
      <input type="checkbox"> Check me out
    </label>
  </div>
  <button type="submit" class="btn btn-default">Submit</button>
</form>




<?php #Script for footer.php
include ('footer.php');
?>