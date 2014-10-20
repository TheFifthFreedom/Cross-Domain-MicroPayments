/* var acceptedDomains = [ "http://thefifthfreedom.github.io", "http://www.columbia.edu" ];

$(document).ready(function(){

	safariRedirectHandler();
	

	$("#button").removeClass("btn-primary");
	$("#button").addClass("btn-warning");
	$("#button").click(function() {
		safariButtonHandler();
	});
	
});
window.onmessage = function(e) {
		console.log("origin: " + e.origin);
		var isDomainAccepted = false;
		for(var count = 0; count < acceptedDomains.length; count++) {
			if (e.origin == acceptedDomains[count]) {
				isDomainAccepted = true;
			}
		}
		if(!isDomainAccepted)
			return;
    
    var payload = JSON.parse(e.data);
    switch(payload.method) {
        case 'set':
            //localStorage.setItem(payload.key, JSON.stringify(payload.data));
						if (payload.key == "username") {
							console.log("Username is: " + JSON.stringify(payload.data));
							$("#button").removeClass("btn-primary");
							$("#button").addClass("btn-success");
						}
            break;
        case 'get':
            var parent = window.parent;
            var data = localStorage.getItem(payload.key);
            parent.postMessage(data, "*");
            break;
        case 'remove':
            localStorage.removeItem(payload.key);
            break;
    }
};
function safariButtonHandler() {
  var userKey = "username";
	//Took out ""&& (navigator.userAgent.indexOf('Chrome')==-1)""
	if(isThisSafari()){
		//var username = localStorage.getItem(userKey);
		if(top.location != document.location){
			//if(username == null){
				href=document.location.href;
				href=(href.indexOf('?')==-1)?href+'?':href+'&';
				top.location.href =href+'reref='+encodeURIComponent(document.referrer);
			//}
		}
	}
}
function safariRedirectHandler() {
	var userKey = "username";
	if(isThisSafari() && top.location == document.location){
		localStorage.setItem(userKey, "Bob Saget");
		rerefidx = document.location.href.indexOf('reref=');
		if(rerefidx != -1) {
			href=decodeURIComponent(document.location.href.substr(rerefidx+6));
			window.location.replace(href);
		}
	}
}

function isThisSafari() {
	return (navigator.userAgent.indexOf('Safari') != -1);
}
*/

//basic js cookie reader
function getCookie(name) {
    var i,x,y,ARRcookies = document.cookie.split(";")
    for(i=0;i<ARRcookies.length;i++) {
        x = ARRcookies[i].substr(0,ARRcookies[i].indexOf("="))
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1)
        x = x.replace(/^\s+|\s+$/g,"")
        if (x==name) {
            return unescape(y)
        }
    }
    return null
}

//basic js cookie setter
function setCookie(name, value, exdays) {
    var exdate = new Date()
    exdate.setDate(exdate.getDate()+exdays)
    value=escape(value)+((exdays==null)?'':'; expires='+exdate.toUTCString())
    document.cookie=name+'='+value+'; path=/;'
}

//we read the page cookies with javascript (best to avoid tight server caching)

if(getCookie('logged-in')) {
  //cookie present do your thing
  mycookie = getCookie('logged-in');
}

if(!getCookie('logged-in')) {
  //cookie NOT present do your thing
  mycookie = 'not-loggedin';
}

//post cookie info to the parent window on any domain
window.parent.postMessage('message', '*');

//receive messages from the outside domain
window.addEventListener('message', receiveMessage, false);

function receiveMessage(evt)
{
    var msg = evt.data;
    if(msg === 'log-me-in') {
      setCookie('logged-in','true',7);
    }
}