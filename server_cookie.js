
//document.domain = "domain.com";
window.onmessage = function(e) {
    //if (e.origin !== "http://domain.com") {
    //    return;
    //}
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
$(document).ready(function(){
	var userKey = "username";
	var username = localStorage.getItem(userKey);
	if (!username) {
		$("#button").removeClass("btn-primary");
		$("#button").addClass("btn-warning");
		
		$("#button").click(function() {
			localStorage.setItem(userKey, "Bob Saget");
		});
	} else {
		$("#button").removeClass("btn-primary");
		$("#button").addClass("btn-success");
	}
});