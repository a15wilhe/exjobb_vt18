var HREF = window.location.href;
var resizeBool = true;
var winInnerWStart;
var winInnerHStart;
var tabs = 0;
var resizes = 0;
var enters = 0;
var winInnerWNew;
var winInnerHNew;

$( document ).ready(function() {

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
                id: escape(e.target.id.slice(0,40)),
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

});//End of document.ready