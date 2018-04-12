<?php
        $fp = fopen("performance-3.txt", "a");
        fputs ($fp, $_POST['performance']. "\n");
        fclose ($fp);
?>