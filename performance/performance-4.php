<?php
        $fp = fopen("performance-4.txt", "a");
        fputs ($fp, $_POST['performance']. "\n");
        fclose ($fp);
?>