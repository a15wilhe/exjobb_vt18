<?php
function err($errmsg) {
        header("HTTP/1.0 500 Internal server error:".$errmsg,true,500);
        echo $errmsg;
        exit;
}

function dbConnect() {
                        
        $printHeaderFunction=0;
        
        // send header info to err()?
        if ($printHeaderFunction) {
                $hdr = 'Database Connect Error';
        } else {
                $hdr = '';
        }
        global $pdo;
        try {
                $pdo = new PDO("mysql:dbname=".DB_NAME.";host=".DB_HOST, DB_USER, DB_PASSWORD);
                $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);						
        } catch (PDOException $e) {
                err("Error!: ".$e->getMessage()."<br/>");
                die();
        }
                                
}

define("DB_USER","autUser");
define("DB_PASSWORD","maninthemoon");
define("DB_HOST","localhost");
define("DB_NAME","autDB");
dbConnect();

function getpostAJAX($param) {
        if(isset($_POST[$param])){
                        if($_POST[$param]==="0"){
                                        $ret="0";							
                        }else if(empty($_POST[$param])){
                                        $ret="UNK";
                        }else{
                                        $ret=htmlentities(urldecode($_POST[$param]));							
                        }
        }else{
                        $ret="UNK";
        }
        return $ret;
}

$href=getpostAJAX("href");
$clientX=getpostAJAX("clientX");
$clientY=getpostAJAX("clientY");
$pageX=getpostAJAX("pageX");
$pageY=getpostAJAX("pageY");

try{
        $querystring="INSERT INTO click_table(href,clientX,clientY,pageX,pageY) values (:href,:clientX,:clientY,:pageX,:pageY);";
        $stmts = $pdo->prepare($querystring);
        $stmts->bindParam(':href',$href);
        $stmts->bindParam(':clientX',$clientX);
        $stmts->bindParam(':clientY',$clientY);
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


/*      $fp = fopen("trackedUserData.txt", "a");
fputs ($fp, $_POST['search']. "\n");
fclose ($fp);
*/
?>