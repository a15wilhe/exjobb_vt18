<?php
include 'trackedUserData.php';

$href=getpostAJAX("href");
$tabs=getpostAJAX("tabs");

try{
        $querystring="INSERT INTO tabing_table(href,tabs) values (:href,:tabs);";
        $stmts = $pdo->prepare($querystring);
        $stmts->bindParam(':href',$href);
        $stmts->bindParam(':tabs',$tabs);
        $stmts->execute();		
} catch (PDOException $e) {
        err("Error!: ".$e->getMessage()."<br/>");
        die();
}
?>