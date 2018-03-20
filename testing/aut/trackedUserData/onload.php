<?php
include 'trackedUserData.php';

$href=getpostAJAX("href");
$appCodeName=getpostAJAX("appCodeName");
$userAgent=getpostAJAX("userAgent");
$ww=getpostAJAX("ww");
$wh=getpostAJAX("wh");
$sw=getpostAJAX("sw");
$sh=getpostAJAX("sh");

try{
        $querystring="INSERT INTO browser_table(href,appCodeName,userAgent,ww,wh,sw,sh) values (:href,:appCodeName,:userAgent,:ww,:wh,:sw,:sh);";
        $stmts = $pdo->prepare($querystring);
        $stmts->bindParam(':href',$href);
        $stmts->bindParam(':appCodeName',$appCodeName);
        $stmts->bindParam(':userAgent',$userAgent);
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