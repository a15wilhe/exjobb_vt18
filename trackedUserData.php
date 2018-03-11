<?php
        $fp = fopen("trackedUserData.txt", "a");
        fputs ($fp, $_POST['search']. "\n");
        fclose ($fp);
?>