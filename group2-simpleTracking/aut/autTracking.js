$( document ).ready(function() {
var HREF = window.location.href;

var tabs = 0;

window.addEventListener("load", function(){      
    HREF = window.location.href;

    var winInnerW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var winInnerH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    var winScreenW = screen.width;
    var winScreenH = screen.height;

    $.ajax({
        type: 'POST',
        url: 'aut/trackedUserData/onload.php',
        data: { href: escape(HREF),
                appCodeName: escape(navigator.appCodeName),
                userAgent: escape(navigator.appVersion),
                ww: escape(winInnerW),
                wh: escape(winInnerH),
                sw: escape(winScreenW),
                sh: escape(winScreenH)
        }	
    });
});

//TRACK RESIZE
window.addEventListener('resize', function(){
    var winInnerW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var winInnerH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    var winScreenW = screen.width;
    var winScreenH = screen.height;
    console.log("RESIZED --- innerWidth == "+ winInnerW + "innerHeight == "+ winInnerH);

    $.ajax({
        type: 'POST',
        url: 'aut/trackedUserData/resize.php',
        data: { href: escape(HREF),
            ww: escape(winInnerW),
            wh: escape(winInnerH),
            sw: escape(winScreenW),
            sh: escape(winScreenH)
        }	
    });
});

//TRACK MOUSECLICK
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
                pageY: escape(pageY)
        }	
    });
}, true);

//TRACK TAB CLICK	
document.onkeydown = TabExample;

function TabExample(e) {
    var e = (e) ? e : ((event) ? event : null);
    var tabKey = 9;
    if(e.keyCode == tabKey) {
        ++tabs;
        $.ajax({
            type: 'POST',
            url: 'aut/trackedUserData/tabs.php',
            data: { href: escape(HREF),
                    tabs: escape(tabs)
            }	
        });
    }
}

});//End of document.ready