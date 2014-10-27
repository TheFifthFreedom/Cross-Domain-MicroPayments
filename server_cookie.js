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
    //do something with message
		var payload = JSON.parse(message.data);
		switch(payload.method) {
			case 'set':
				if (payload.key = MESSAGE_KEY_PRODUCT_INFO)
					setProductInfo(payload.value);
				break;
			case 'get':
				break;
		}
  }
});

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
		setStoredData(STORED_DATA_KEY_USER_ID, "StrongCheese", 9999);
	});
}

$(document).ready(function() {
  getBrowserName();
});

/**************************
	STORED DATA METHODS
***************************/

function getStoredData(key) {

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
  localStorage.getItem(key);
}

function setStoredData(key, value, exdays) {

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
	Set product info from client to the server's
	rendered HTML page.
*/
function setProductInfo(productInfo) {
	console.log("product info to be rendered: ");
	console.log(productInfo);
}

/**************************
  USER AGENT METHODS
***************************/

function getBrowserName() {
  var ua = navigator.userAgent;
  var msie = false;
  var ff = false;
  var chrome = false;

  //Javascript Browser Detection - Internet Explorer
  if (/MSIE (\d+\.\d+);/.test(ua)) //test for MSIE x.x; True or False
  {
      var msie = (/MSIE (\d+\.\d+);/.test(ua)); //True or False
      var ieversion = new Number(RegExp.$1); //gets browser version
      alert("ie: " + msie + ' version:' + ieversion);
  }

  //Javascript Browser Detection - FireFox
  if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.ua))//test for Firefox/x.x or Firefox x.x
  {
      var ff = (/Firefox[\/\s](\d+\.\d+)/.test(navigator.ua)); //True or False
      var ffversion = new Number(RegExp.$1) //gets browser version
      alert("FF: " + ff + ' version:' + ieversion);
  }

  //Javascript Browser Detection - Chrome
  if (ua.lastIndexOf('Chrome/') > 0) {
      var version = ua.substr(ua.lastIndexOf('Chrome/') + 7, 2);
      alert("chrome " + version);
  }

  //Javascript Browser Detection - Safari
  if (ua.lastIndexOf('Safari/') > 0) {
      var version = ua.substr(ua.lastIndexOf('Safari/') + 7, 2);
      alert("Safari " + version);
  }

  //Javascript Browser Detection - Android
  if (ua.indexOf("Android") >= 0) {
      var androidversion = parseFloat(ua.slice(ua.indexOf("Android") + 8));
      if (androidversion < 2.3) {
          // do whatever
          alert("This older version of Android has some issues with CSS");
      }
  }

  //Javascript Browser Detection - Mobile
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(ua)) {

      // Check if the orientation has changed 90 degrees or -90 degrees... or 0
      window.addEventListener("orientationchange", function () {
          alert(window.orientation);
      });
  }
}
