var acceptedDomains = [ "http://thefifthfreedom.github.io", "http://www.columbia.edu" ];

$(document).ready(function(){

	safariRedirectHandler();
	
	//var userKey = "username";
	//var username = localStorage.getItem(userKey);
	//if (!username) {
		$("#button").removeClass("btn-primary");
		$("#button").addClass("btn-warning");
		
		$("#button").click(function() {
			//localStorage.setItem(userKey, "Bob Saget");
			safariButtonHandler();
		});
	//} else {
	//	$("#button").removeClass("btn-primary");
	//	$("#button").addClass("btn-success");
	//}
	
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
            localStorage.setItem(payload.key, JSON.stringify(payload.data));
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
