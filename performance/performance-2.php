<?php
        $fp = fopen("performance-2.txt", "a");
        fputs ($fp, $_POST['performance']. "\n");
        fclose ($fp);
?>