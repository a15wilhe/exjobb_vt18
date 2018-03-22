<?php
include 'trackedUserData.php';

$href=getpostAJAX("href");
$time=getpostAJAX("time");

try{
        $querystring="INSERT INTO time_table(href,time) values (:href,:time);";
        $stmts = $pdo->prepare($querystring);
        $stmts->bindParam(':href',$href);
        $stmts->bindParam(':time',$time);
        $stmts->execute();		
} catch (PDOException $e) {
        err("Error!: ".$e->getMessage()."<br/>");
        die();
}
?>