<?php
include 'trackedUserData.php';

$href=getpostAJAX("href");
$mouseX=getpostAJAX("mouseX");
$mouseY=getpostAJAX("mouseY");

try{
        $querystring="INSERT INTO mousemove_table(href,mouseX,mouseY) values (:href,:mouseX,:mouseY);";
        $stmts = $pdo->prepare($querystring);
        $stmts->bindParam(':href',$href);
        $stmts->bindParam(':mouseX',$mouseX);
        $stmts->bindParam(':mouseY',$mouseY);
        $stmts->execute();		
} catch (PDOException $e) {
        err("Error!: ".$e->getMessage()."<br/>");
        die();
}
?>