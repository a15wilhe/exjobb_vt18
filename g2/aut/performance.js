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
            url: "http://192.168.10.2/exjobb_vt18/performance/performance-2.php",
            data: { performance: diffTime + ", " + page }
        });
    }
}); 
//Start timer on unload - user leaves a page
window.addEventListener("unload", function(){
    sessionStorage.setItem("aut-start-time", (new Date).getTime().toString());
});