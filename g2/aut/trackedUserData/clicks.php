<?php
include 'trackedUserData.php';

$href=getpostAJAX("href");
$pageX=getpostAJAX("pageX");
$pageY=getpostAJAX("pageY");
$id=getpostAJAX("id");
$target=getpostAJAX("target");
$ww=getpostAJAX("ww");
$wh=getpostAJAX("wh");

try{
        $querystring="INSERT INTO click_table(href,pageX,pageY,id,target,ww,wh) values (:href,:pageX,:pageY,:id,:target,:ww,:wh);";
        $stmts = $pdo->prepare($querystring);
        $stmts->bindParam(':href',$href);
        $stmts->bindParam(':pageX',$pageX);
        $stmts->bindParam(':pageY',$pageY);
        $stmts->bindParam(':id',$id);
        $stmts->bindParam(':target',$target);
        $stmts->bindParam(':ww',$ww);
        $stmts->bindParam(':wh',$wh);
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