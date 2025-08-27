<?php #Script Index.php
$page = "home";
$page_title = "Late Arrival Pay Calculator";
include ('header.html');
?>



<div class="row">
    <div class="col-md-6 col-md-offset-3 col-xs-10 col-xs-offset-1" >




 <?php // Script 4.2 - handle_calc.php

                // Get domestic or international:
                $domint = $_POST['domint'];

               

                // Get how many hours late and convert to decimile:
                $hourslate = $_POST['hourslate'];
                $hourslate = number_format($hourslate, 2);

                if($hourslate>$domint){
                    $multiplyer = (2.50);
                } else {
                    $multiplyer = (1.50);
                }

               
               

                // Divide hours late by trip rig of 3.75:
                $rig = (3.75);
                $triprig = $hourslate / $rig;

                // Format triprig number:
                $triprig = number_format($triprig, 2);


                // Capture leg time:
                $legtime = $_POST['legtime'];
                $legtime = number_format($legtime, 2);

                // Capture duty tie and divide by duty rig:
                $dutytime = $_POST['dutytime'];
                $drig = (2.00);
                $dutyrig = $dutytime / $drig;
                $dutyrig = number_format($dutyrig, 2);

               

                // Find the highest of the four options:
                $highest = max($triprig, $legtime, $dutyrig, $mpdp);

                if($highest==$triprig){
                    $highestword="Trip Rig";
                }elseif($highest==$legtime){
                    $highestword="Block Time";
                }elseif($highest==$dutyrig){
                    $highestword="Duty Righ";
                }

            


                //Capture the multiplyer:
                //$multiplyer = $_POST['multiplyer'];

                // Multiply the result by the multiplyer:
                $final= ($multiplyer * $highest);

                // Capture the hourly rate:
                $rate = $_POST['rate'];

                // Multiply result by hourly rate:
                $finalresult = ($final * $rate);
                $finalresult=number_format($finalresult, 2);
                ?>



                <a href="index.php"><button class="btn btn-success btn-md btn-block" >Delay due to MX/WX</button></a>
                

                 <h3 class="bg-success"><strong>Your Late Arrival Pay will be <?php print"\$$finalresult"?></strong></h3>

                        <table class="table table-bordered table-striped">
                          <tr>
                            <td>Trip Rig</td><td><?php print"$triprig"?></td>
                          </tr>
                          <tr>
                            <td>Duty Rig</td><td><?php print"$dutyrig"?></td>
                          </tr>
                          <tr>
                            <td>Leg Time</td><td><?php print"$legtime"?></td>
                          </tr>
                        </table>


                <p class="bg-info">LAP will be based on a <?php print"$highestword"?> of <?php print"$highest"?> hours.</p>
                <p class="bg-info"><?php print"$highest x $multiplyer x $rate = \$$finalresult"?></p>
                <a href="handle_lapmx.php"><button class="btn btn-info btn-lg btn-block" >Back</button></a>
           
    </div>    
</div>
 
<?php #Script for footer.php
include ('footer.php');
?>

