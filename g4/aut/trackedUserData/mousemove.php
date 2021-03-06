<?php
include 'trackedUserData.php';

$href=getpostAJAX("href");
$mouseX=getpostAJAX("mouseX");
$mouseY=getpostAJAX("mouseY");
$ww=getpostAJAX("ww");
$wh=getpostAJAX("wh");

try{
        $querystring="INSERT INTO mousemove_table(href,mouseX,mouseY,ww,wh) values (:href,:mouseX,:mouseY,:ww,:wh);";
        $stmts = $pdo->prepare($querystring);
        $stmts->bindParam(':href',$href);
        $stmts->bindParam(':mouseX',$mouseX);
        $stmts->bindParam(':mouseY',$mouseY);
        $stmts->bindParam(':ww',$ww);
        $stmts->bindParam(':wh',$wh);
        $stmts->execute();		
} catch (PDOException $e) {
        err("Error!: ".$e->getMessage()."<br/>");
        die();
}
?>