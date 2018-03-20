<?php
include 'trackedUserData.php';

$href=getpostAJAX("href");
$pageX=getpostAJAX("pageX");
$pageY=getpostAJAX("pageY");

try{
        $querystring="INSERT INTO click_table(href,pageX,pageY) values (:href,:pageX,:pageY);";
        $stmts = $pdo->prepare($querystring);
        $stmts->bindParam(':href',$href);
        $stmts->bindParam(':pageX',$pageX);
        $stmts->bindParam(':pageY',$pageY);
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