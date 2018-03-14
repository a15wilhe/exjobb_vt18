window.addEventListener("load", function(){//maybe change to jQuery document.ready//calc time to load page
     // end timer
    var endTime = (new Date).getTime();

    // calculate difference in time//add to check that sS is not null
    //var startTime = parseInt(sessionStorage.getItem("aut-start-time"));
    var startTime = sessionStorage.getItem("aut-start-time");
    
    //var startTime = sessionStorage.getItem("aut-start-time");
    
    //if (startTime == undefined || startTime == null){}//do nothing if first time

        var diffTime = endTime - startTime;
        var page = window.location.href;

        console.log(startTime);
        console.log(diffTime);
        //ajax to server
        $.ajax({
            type: 'POST',
            url: "performance.php",
            data: { performance: "time: " + diffTime + ", page: " + page }
        });
});

window.addEventListener("unload", function(){
    //localStorage.setItem("autstarttime", (new Date).getTime().toString());// start timer when leaving
    sessionStorage.setItem("aut-start-time", (new Date).getTime().toString());
});