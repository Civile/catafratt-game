<?php

include_once('class.xml.php');

define('_RANK_DATA_', '../data/rank.xml');


if( isset($_POST['write']) ) 
    writeNode($_POST['name'], $_POST['time'], $_POST['errors'], $_POST['points']);


function writeNode($n, $t, $e, $p) {
    
   if( !file_exists(_RANK_DATA_) ) {
        print -1;
		exit();
   }
   
   $dat = xml::getInstance(_RANK_DATA_);
   
   $data = array('name' => $n, 'time' => $t, 'errors' => $e, 'points' => $p);
   $dat->write_config($data, false);
   
   print 1;
   exit();
}





?>