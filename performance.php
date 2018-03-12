<?php
        $fp = fopen("performance.txt", "a");
        fputs ($fp, $_POST['performance']. "\n");
        fclose ($fp);
?>