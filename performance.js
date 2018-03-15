//calc time to load page
$( document ).ready(function() {
    var endTime = (new Date).getTime();
    var startTime = parseInt(sessionStorage.getItem("aut-start-time"));
    var diffTime = endTime - startTime;
    var page = window.location.href;
    //if nothing in storage then there is nothing to calculate and send 
    if (endTime != diffTime) {
        //ajax to server
        $.ajax({
            type: 'POST',
            url: "performance.php",
            data: { performance: "time: " + diffTime + ", page: " + page }
        });
    }
}); 
//Start timer on unload - user leaves a page
window.addEventListener("unload", function(){
    sessionStorage.setItem("aut-start-time", (new Date).getTime().toString());
});