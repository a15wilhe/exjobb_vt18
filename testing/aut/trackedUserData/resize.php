<?php
include 'trackedUserData.php';

$href=getpostAJAX("href");
$ww=getpostAJAX("ww");
$wh=getpostAJAX("wh");
$sw=getpostAJAX("sw");
$sh=getpostAJAX("sh");

try{
        $querystring="INSERT INTO resize_table(href,ww,wh,sw,sh) values (:href,:ww,:wh,:sw,:sh);";
        $stmts = $pdo->prepare($querystring);
        $stmts->bindParam(':href',$href);
        $stmts->bindParam(':ww',$ww);
        $stmts->bindParam(':wh',$wh);
        $stmts->bindParam(':sw',$sw);
        $stmts->bindParam(':sh',$sh);
        $stmts->execute();		
} catch (PDOException $e) {
        err("Error!: ".$e->getMessage()."<br/>");
        die();
}
?>