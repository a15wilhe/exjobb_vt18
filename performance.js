window.addEventListener("load", function(){//maybe change to jQuery document.ready//calc time to load page
     // end timer
    var endTime = (new Date).getTime();

    // calculate difference in time//add to check that sS is not null
    var diffTime = endTime - sessionStorage.getItem('aut-start-time');
    var page = window.location.href;
    //ajax to server
    $.ajax({
				type: 'POST',
				url: "performance.php",
				data: { performance: "time: " + diffTime + ", page: " + page }
	});
});

window.addEventListener("onunload", function(){
    sessionStorage.setItem("aut-start-time", (new Date).getTime());// start timer when leaving
});