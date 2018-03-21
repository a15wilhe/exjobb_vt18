<?php
include 'trackedUserData.php';

$href=getpostAJAX("href");
$wwStart=getpostAJAX("wwStart");
$whStart=getpostAJAX("whStart");
$wwNew=getpostAJAX("wwNew");
$whNew=getpostAJAX("whNew");
$sw=getpostAJAX("sw");
$sh=getpostAJAX("sh");

try{
        $querystring="INSERT INTO resize_table(href,wwStart,whStart,wwNew,whNew,sw,sh) values (:href,:wwStart,:whStart,:wwNew,:whNew,:sw,:sh);";
        $stmts = $pdo->prepare($querystring);
        $stmts->bindParam(':href',$href);
        $stmts->bindParam(':wwStart',$wwStart);
        $stmts->bindParam(':whStart',$whStart);
        $stmts->bindParam(':wwNew',$wwNew);
        $stmts->bindParam(':whNew',$whNew);
        $stmts->bindParam(':sw',$sw);
        $stmts->bindParam(':sh',$sh);
        $stmts->execute();		
} catch (PDOException $e) {
        err("Error!: ".$e->getMessage()."<br/>");
        die();
}
?>