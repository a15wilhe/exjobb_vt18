<?php
include 'trackedUserData.php';

$href=getpostAJAX("href");
$target=getpostAJAX("target");
$hoverTime=getpostAJAX("hoverTime");

try{
        $querystring="INSERT INTO hover_table(href,target,hoverTime) values (:href,:target,:hoverTime);";
        $stmts = $pdo->prepare($querystring);
        $stmts->bindParam(':href',$href);
        $stmts->bindParam(':target',$target);
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