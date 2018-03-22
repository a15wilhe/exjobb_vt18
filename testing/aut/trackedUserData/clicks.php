<?php
include 'trackedUserData.php';

$href=getpostAJAX("href");
$pageX=getpostAJAX("pageX");
$pageY=getpostAJAX("pageY");
$id=getpostAJAX("id");
$target=getpostAJAX("target");

try{
        $querystring="INSERT INTO click_table(href,pageX,pageY,id,target) values (:href,:pageX,:pageY,:id,:target);";
        $stmts = $pdo->prepare($querystring);
        $stmts->bindParam(':href',$href);
        $stmts->bindParam(':pageX',$pageX);
        $stmts->bindParam(':pageY',$pageY);
        $stmts->bindParam(':id',$id);
        $stmts->bindParam(':target',$target);
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