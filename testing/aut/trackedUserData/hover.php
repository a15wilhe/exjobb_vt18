<?php
include 'trackedUserData.php';

$href=getpostAJAX("href");
$targetID=getpostAJAX("targetID");
$targetText=getpostAJAX("targetText");
$hoverTime=getpostAJAX("hoverTime");

try{
        $querystring="INSERT INTO hover_table(href,targetID,targetText,hoverTime) values (:href,:targetID,:targetText,:hoverTime);";
        $stmts = $pdo->prepare($querystring);
        $stmts->bindParam(':href',$href);
        $stmts->bindParam(':targetID',$targetID);
        $stmts->bindParam(':targetText',$targetText);
        $stmts->bindParam(':hoverTime',$hoverTime);
        $stmts->execute();

        //print console log
        $test1 = 'php running';
        print '
        <script type="text/javascript">
        var console;        
        console = "'.$test1 + $x.'"
        console.log(console);
        </script>';		
} catch (PDOException $e) {
        err("Error!: ".$e->getMessage()."<br/>");
        die();
}
?>