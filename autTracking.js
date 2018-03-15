$( document ).ready(function() {
console.log( "tracking script");
var HREF = window.location.href;

var tabs = 0;

//RANDOM USER SESSION ID - SESSIONSTORAGE, UUIDV4
function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
}

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
    //fetch sessionStorage uuid
    //var uuid = sessionStorage.getItem("autTestingUUID");
    //console.log("uuid (start) == " + uuid);

    // no sessionID == new user, Generate a new user a SessionID, fetch browser and window info		
    //if (uuid==null) {
        //sessionStorage.setItem("autTestingUUID", uuidv4());
        //console.log("uuid (after gen) == " + sessionStorage.getItem("autTestingUUID"));

        //TRACK USER BROWSER //track specific browser
        console.log(navigator.appCodeName); //Browser name
        console.log(navigator.userAgent); //overhead

        //TRACK USER LOCATION - PATHNAME OR HREF
        HREF = window.location.href;
        console.log("pathname == "+ window.location.pathname);
        console.log("href == "+ HREF);
        

        //TRACK WINDOW PROP/ATTR - 
        //what is visable for user
        var winInnerW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        //console.log(winInnerW);
        var winInnerH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        //console.log(winInnerH);

        var winScreenW = screen.width;
        //console.log(winScreenW);
        var winScreenH = screen.height;
        //console.log(winScreenH);

        $.ajax({
            type: 'POST',
            url: 'trackedUserData/onload.php',
            data: { href: escape(HREF),
                    appCodeName: escape(navigator.appCodeName),
                    userAgent: escape(navigator.userAgent),
                    ww: escape(winInnerW),
                    wh: escape(winInnerH),
                    sw: escape(winScreenW),
                    sh: escape(winScreenH)
            }	
        });
    //}
});

//TRACK RESIZE
window.addEventListener('resize', function(){
    console.log("RESIZED");
    var winInnerW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    console.log("innerWidth == "+ winInnerW);
    var winInnerH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    console.log("innerHeight == "+ winInnerH);
});

//client == window, page == document, screen == screen
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
        url: 'trackedUserData/clicks.php',
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
        console.log("tabing");
        ++tabs;
        $.ajax({
            type: 'POST',
            url: 'trackedUserData/tabs.php',
            data: { href: escape(HREF),
                    tabs: escape(tabs)
            }	
        });
    }
}

//TRACK MOUSE SCROLL
function getDocHeight() {
    var D = document;
    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    )
}
var winheight, docheight, trackLength, throttlescroll;
function getmeasurements(){
    winheight= window.innerHeight || (document.documentElement || document.body).clientHeight
    docheight = getDocHeight()
    trackLength = docheight - winheight
}
function amountscrolled(){
    var scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop
    var pctScrolled = Math.floor(scrollTop/trackLength * 100) // gets percentage scrolled (ie: 80 or NaN if tracklength == 0)
    console.log(pctScrolled + '% scrolled')
}
getmeasurements();

window.addEventListener("scroll", function() { 
    console.log("scrolling");
    clearTimeout(throttlescroll)
    throttlescroll = setTimeout(function(){amountscrolled()}, 50)
}, false)

//TRACK MOUSEMOVEMENT //change logging to not window, body
document.body.addEventListener("mousemove", function(e) { 
    var event = e || window.event;
    window.mouseX = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    window.mouseY = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
}, true);

function mousemoveTracking() {
    console.log("MM X == " + window.mouseX);
    console.log("MM Y == " + window.mouseY);
    $.ajax({
        type: 'POST',
        url: 'trackedUserData/mousemove.php',
        data: { href: escape(HREF),
                mouseX: escape(window.mouseX),
                mouseY: escape(window.mouseY)
        }	
    });
}

window.onload = function() {
    //var interval = setInterval(mousemoveTracking, 100);
    //setTimeout(function( ) { clearInterval( interval ); }, 5000);//just for now 
}
});