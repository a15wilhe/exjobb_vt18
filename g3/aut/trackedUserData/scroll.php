<?php
include 'trackedUserData.php';

$href=getpostAJAX("href");
$scrollY=getpostAJAX("scrollY");
$scrolls=getpostAJAX("scrolls");

try{
        $querystring="INSERT INTO scroll_table(href,scrollY,scrolls) values (:href,:scrollY,:scrolls);";
        $stmts = $pdo->prepare($querystring);
        $stmts->bindParam(':href',$href);
        $stmts->bindParam(':scrollY',$scrollY);
        $stmts->bindParam(':scrolls',$scrolls);
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