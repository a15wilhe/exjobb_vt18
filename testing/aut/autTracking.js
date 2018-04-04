var HREF = window.location.href;
var resizeBool = true;
var scrollBool = true;
var winInnerWStart;
var winInnerHStart;
var tabs = 0;
var resizes = 0;
var scrolls = 0;
var enters = 0;
var winInnerWNew;
var winInnerHNew;
var locationX;
var locationY;
var hoverlastTarget;
var hoverStartTime;
var hoverTargetID;
var hoverTargetText;

$( document ).ready(function() {
console.log( "tracking script");

/* var startTimeAUT = (new Date).getTime();

$(document).unload(function() {
    var endTimeAUT = (new Date).getTime();

    $.ajax({
        type: 'POST',
        url: 'aut/trackedUserData/unload.php',
        data: { href: escape(HREF),
            time: escape(endTimeAUT - startTimeAUT)
        }	
    });
}); 

//RANDOM USER SESSION ID - SESSIONSTORAGE, UUIDV4
function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
}  
  //fetch sessionStorage uuid
    //var uuid = sessionStorage.getItem("autTestingUUID");
    //console.log("uuid (start) == " + uuid);

    // no sessionID == new user, Generate a new user a SessionID, fetch browser and window info		
    //if (uuid==null) {
        //sessionStorage.setItem("autTestingUUID", uuidv4());
        //console.log("uuid (after gen) == " + sessionStorage.getItem("autTestingUUID"));
    //}*/

//---- AJAX call -----
var POSTURL = 'trackedUserData.php';
function ajaxRequest(data) {
    try {
        new XMLHttpRequest({
        method: 'POST',
        url: POSTURL,
        data: 'search=' + encodeURIComponent(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        });
    } catch (ex1) {
        console.log(ex1);
    }
}

window.addEventListener("load", function(){

    var startTime = (new Date).getTime();    
    HREF = window.location.href;

    winInnerWStart = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    winInnerHStart = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    winInnerWNew = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    winInnerHNew = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    var winScreenW = screen.width;
    var winScreenH = screen.height;

    $.ajax({
        type: 'POST',
        url: 'aut/trackedUserData/onload.php',
        data: { href: escape(HREF),
                appCodeName: escape(navigator.appCodeName),
                userAgent: escape(navigator.appVersion),
                ww: escape(winInnerWStart),
                wh: escape(winInnerHStart),
                sw: escape(winScreenW),
                sh: escape(winScreenH)
        }	
    });
});

//TRACK RESIZE
window.addEventListener('resize', function(){
    winInnerWNew = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    winInnerHNew = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    var winScreenW = screen.width;
    var winScreenH = screen.height;
    ++resizes;
    

    setTimeout(function() {
        if (resizeBool) {
            resizeBool = false;
            console.log("RESIZED " + resizes + "--- innerWidth == "+ winInnerWNew + "innerHeight == "+ winInnerHNew);
            $.ajax({
                type: 'POST',
                url: 'aut/trackedUserData/resize.php',
                data: { href: escape(HREF),
                    wwStart: escape(winInnerWStart),
                    whStart: escape(winInnerHStart),
                    wwNew: escape(winInnerWNew),
                    whNew: escape(winInnerHNew),
                    sw: escape(winScreenW),
                    sh: escape(winScreenH)
                }	
            });
        }
        setTimeout(function() {resizeBool = true;}, 4000);
    }, 10000);
    
    
});

//TRACK MOUSE CLICK
document.body.addEventListener("click", function(e) { 
    e = e || window.event;
    var pageX = e.pageX;
    var pageY = e.pageY;
    if (pageX === undefined) {
        pageX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        pageY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
    }

    $.ajax({
        type: 'POST',
        url: 'aut/trackedUserData/clicks.php',
        data: { href: escape(HREF),
                pageX: escape(pageX),
                pageY: escape(pageY),
                id: escape(e.target.id),
                target: escape($(event.target).text().slice(0,40)),
                ww: escape(winInnerWNew),
                wh: escape(winInnerHNew)
        }	
    });
}, true);

//TRACK TAB & enter CLICK	
document.onkeydown = keypress;

function keypress(e) {
    var e = (e) ? e : ((event) ? event : null);
    if(e.keyCode == 9) {
        ++tabs;
        $.ajax({
            type: 'POST',
            url: 'aut/trackedUserData/tabs.php',
            data: { href: escape(HREF),
                    tabs: escape(tabs)
            }	
        });
    }else if(e.keyCode == 13) {
        ++enters;
        $.ajax({
            type: 'POST',
            url: 'aut/trackedUserData/enter.php',
            data: { href: escape(HREF),
                    enters: escape(enters)
            }	
        });
    }
}

//TRACK MOUSE SCROLL
window.addEventListener("scroll", function() {
    console.log("current = " + window.pageYOffset);
    ++scrolls;
    $.ajax({
        type: 'POST',
        url: 'aut/trackedUserData/scroll.php',
        data: { href: escape(HREF),
                scrollY: escape(window.pageYOffset),
                scrolls: escape(scrolls)
        }	
    });
}, false) 

//TRACK MOUSEMOVEMENT 
/*document.body.addEventListener("mousemove", function(e) { 
    var event = e || window.event;
    window.mouseX = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    window.mouseY = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
}, true);

function mousemoveTracking() {
    //console.log("MM --- X == " + window.mouseX + " Y == " + window.mouseY);
    $.ajax({
        type: 'POST',
        url: 'aut/trackedUserData/mousemove.php',
        data: { href: escape(HREF),
                mouseX: escape(window.mouseX),
                mouseY: escape(window.mouseY),
                ww: escape(winInnerWNew),
                wh: escape(winInnerHNew)
        }	
    });
}

window.onload = function() {
    var interval = setInterval(mousemoveTracking, 100);
    setTimeout(function( ) { clearInterval( interval ); }, 5000);//just for now 
}*/

//TRACK HOVER OVER 100MS
document.body.addEventListener("mouseenter", function(e) { 
    if (e.target !== hoverlastTarget) {
        var timenow = (new Date).getTime();
        var difftime = timenow - hoverStartTime;
        if (difftime > 99) {
            //console.log(difftime); 
            $.ajax({
                type: 'POST',
                url: 'aut/trackedUserData/hover.php',
                data: { href: escape(HREF), targetID: escape(hoverTargetID), targetText: escape(hoverTargetText),hoverTime: escape(difftime) }
            });  
        }
    }
    hoverStartTime = (new Date).getTime();
    hoverlastTarget = e.target;
    hoverTargetID = e.target.id;
    hoverTargetText = $(event.target).text().slice(0,40);
}, true);

//TRACK COMPRESSION/SELECTION OF MOUSEMOVE
/*document.body.addEventListener("mousemove", function(e) { 
    var event = e || window.event;
    window.mouseX = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    window.mouseY = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    
    //Get pos
    var locationX = window.mouseX;
    var locationY = window.mouseY;

    //wait 40ms
    setTimeout(function(){ 
        //compare same pos, then ajax
        if (window.mouseX == locationX && window.mouseY == locationY) {
            console.log(window.mouseX + " - " + locationX + " - " + window.mouseY + " - " + locationY);
             $.ajax({
                type: 'POST',
                url: 'aut/trackedUserData/mousemove.php',
                data: { href: escape(HREF),
                        mouseX: escape(window.mouseX),
                        mouseY: escape(window.mouseY),
                        ww: escape(winInnerWNew),
                        wh: escape(winInnerHNew)
                }
            });	 
        }
    }, 40);
    
}, true); */

});//End of document.ready