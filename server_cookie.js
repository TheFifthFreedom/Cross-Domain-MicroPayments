/*
	Cookie key that is associated with user id.
*/
var COOKIE_KEY_USER_ID = 'IFUID';

/*
	Message key used by the server to let the client know
	that the server is ready to receive messages.
*/
var MESSAGE_KEY_READY_TO_RECEIVE = 'ready';

/*
	Message key used by the client to send product info
	messages to server.
*/
var MESSAGE_KEY_PRODUCT_INFO = 'IFPI';

/*
	Grab user id cookie. If there is none, display warning button.
	Otherwise, display the success button.
*/
if(getCookie(COOKIE_KEY_USER_ID) !== null) {
	$("#button").removeClass("btn-primary");
	$("#button").addClass("btn-success");
} else {
	$("#button").removeClass("btn-primary");
	$("#button").addClass("btn-warning");
	$("#button").click(function() {
		setCookie(COOKIE_KEY_USER_ID, "StrongCheese", 9999);
		if(getCookie(COOKIE_KEY_USER_ID) !== null) {
			$("#button").removeClass("btn-primary");
			$("#button").addClass("btn-success");
		}
	});
}

/*
	Add listener for client messages.
*/
window.addEventListener('message', function(evt) {
	if (evt.data === 'ready'){
		return;
	}
	else{
		var payload = JSON.parse(evt.data);
		switch(payload.method) {
			case 'set':
				if(payload.key == MESSAGE_KEY_PRODUCT_INFO)
					setProductInfo(payload.value);
				break;
			case 'get':
				break;
		}
	}
});

/*
	Let client know that we are ready
	for messages.
*/
sendMessageToClient(MESSAGE_KEY_READY_TO_RECEIVE);



/**************************
	COOKIE METHODS
***************************/

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

/**************************
	MESSAGE METHODS
***************************/

/*
	Send a generic message (string) to the client.
*/
function sendMessageToClient(message) {
	window.parent.postMessage(message, "*");
}

/**************************
	CONTENT RENDERING METHODS
***************************/

/*
	Set product info from client to the server's
	rendered HTML page.
*/
function setProductInfo(productInfo) {
	console.log("product info to be rendered: ");
	console.log(productInfo);
}
