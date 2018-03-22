<?php
include 'trackedUserData.php';

$href=getpostAJAX("href");
$enters=getpostAJAX("enters");

try{
        $querystring="INSERT INTO enter_table(href,enters) values (:href,:enters);";
        $stmts = $pdo->prepare($querystring);
        $stmts->bindParam(':href',$href);
        $stmts->bindParam(':enters',$enters);
        $stmts->execute();		
} catch (PDOException $e) {
        err("Error!: ".$e->getMessage()."<br/>");
        die();
}
?>