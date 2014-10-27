/*
	Stored data key that is associated with user id.
*/
var STORED_DATA_KEY_USER_ID = 'IFUID';

/*
	Message key used by the client to send product info
	messages to server.
*/
var MESSAGE_KEY_PRODUCT_INFO = 'IFPI';

/*
  Add listener for client messages.
*/
var socket = new easyXDM.Socket({
  onMessage:function(message, origin) {
    console.log("getting message from origin: " + origin);
    //do something with message
		var payload = JSON.parse(message);
		switch(payload.method) {
			case 'set':
				if (payload.key === MESSAGE_KEY_PRODUCT_INFO)
					setProductInfo(payload.value);
				break;
			case 'get':
				break;
		}
  }
});

/*
  Functions that should be run when document is finished loading.
*/
$(document).ready(function() {
  safariRedirectHandler();
  setButtonColor();
});



/**************************
	STORED DATA METHODS
***************************/

function getStoredData(key) {
  if (!isThisSafari()) {
    return getLocalStorageData(key);
  } else {
    return getCookie(key);
  }
}

//basic js cookie reader
function getCookie(key) {
		var i,x,y,ARRcookies = document.cookie.split(";")
    for(i=0;i<ARRcookies.length;i++) {
        x = ARRcookies[i].substr(0,ARRcookies[i].indexOf("="))
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1)
        x = x.replace(/^\s+|\s+$/g,"")
        if (x==key) {
            return unescape(y)
        }
    }
    return null
}

//basic local storage reader
function getLocalStorageData(key) {
  return localStorage.getItem(key);
}

function setStoredData(key, value) {
  if (!isThisSafari()) {
    setLocalStorageData(key, value);
  } else {
    setCookie(key, value, 2147483647);
  }
}

//basic js cookie setter
function setCookie(name, value, exdays) {
    var exdate = new Date()
    exdate.setDate(exdate.getDate()+exdays)
    value=escape(value)+((exdays==null)?'':'; expires='+exdate.toUTCString())
    document.cookie=name+'='+value+'; path=/;'
}

//basic local storage setter
function setLocalStorageData(key, value) {
  localStorage.setItem(key, value);
}

/**************************
	MESSAGE METHODS
***************************/

/*
	Send a generic message (string) to the client.
*/
function sendMessageToClient(message) {
	socket.postMessage(message, "*");
}

/**************************
	CONTENT RENDERING METHODS
***************************/

/*
  Set button color based on existing storage data.
*/
function setButtonColor() {
  /*
    Grab user id info. If there is none, display warning button.
    Otherwise, display the success button.
  */
  if(getStoredData(STORED_DATA_KEY_USER_ID) !== null) {
    $("#button").removeClass("btn-primary");
    $("#button").addClass("btn-success");
  } else {
    $("#button").removeClass("btn-primary");
    $("#button").addClass("btn-warning");
    $("#button").click(function() {
      safariButtonHandler();
    });
  }
}


/*
	Set product info from client to the server's
	rendered HTML page.
*/
function setProductInfo(productInfo) {
	console.log("product info to be rendered: ");
	console.log(productInfo);

  $("#product").html("<strong>" + productInfo["title"] + "</strong><br>"
    + "<em>" + productInfo["subtitle"] + "</em><br>"
    + productInfo["vendorName"]);

  $("#button").html("$" + productInfo["price"]);
}

/*********************************
  LOCAL STORAGE SUPPORT METHODS
**********************************/
function safariRedirectHandler() {
  if(isThisSafari() && top.location == document.location){
    setStoredData(STORED_DATA_KEY_USER_ID, "StrongCheese");
    rerefidx = document.location.href.indexOf('reref=');
    if(rerefidx != -1) {
      href=decodeURIComponent(document.location.href.substr(rerefidx+6));
      window.location.replace(href);
    }
  }
}

function safariButtonHandler() {
  var userKey = "username";
	if(isThisSafari()){
		//var username = localStorage.getItem(userKey);
		if(top.location != document.location){
			//if(username == null){
				href=document.location.href;
				href=(href.indexOf('?')==-1)?href+'?':href+'&';
				top.location.href =href+'reref='+encodeURIComponent(document.referrer);
			//}
		}
	} else {
    setStoredData(STORED_DATA_KEY_USER_ID, "StrongCheese");
  }
}

function isThisSafari() {
	return ((navigator.userAgent.indexOf('Safari') != -1) && (navigator.userAgent.indexOf('Chrome') == -1));
}
