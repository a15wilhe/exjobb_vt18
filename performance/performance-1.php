<?php
        $fp = fopen("performance-1.txt", "a");
        fputs ($fp, $_POST['performance']. "\n");
        fclose ($fp);
?>