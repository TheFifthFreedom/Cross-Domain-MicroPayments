//var acceptedDomain = "http://googledrive.com";
/* window.onload = function() {
    var win = document.getElementsByTagName('iframe')[0].contentWindow;
    var obj = {
       name: "Apple iMac 5k",
			 subtitle: "Fuck it",
			 description: "5k man!",
			 vendor: "Apple"
    };
    // save obj in subdomain localStorage
    //win.postMessage(JSON.stringify({key: 'product', method: "set", data: obj}), "*");
    // load previously saved data
    //win.postMessage(JSON.stringify({key: 'product', method: "get"}), "*");
    window.onmessage = function(e) {
        //if (e.origin != acceptedDomain) {
        //    return;
        //}
        console.log(JSON.parse(e.data).name);
    };
}; */

var iframe = document.getElementById('iframe_payment');

window.addEventListener('message', receiveMessage, false);


function receiveMessage(evt) {
	console.log("Client: Receiving message...");
	console.log("Domain: " + evt.origin + ", Data: " + evt.data);
	
  //listen to the domain1 messages only
  if (evt.origin === 'http://iframe.letsgeekaround.com' && evt.data !== 'not-loggedin') {
    //boom my domain1 cookie info is here
    var mycookie = evt.data;
		
  }

  if (evt.origin === 'http://iframe.letsgeekaround.com' && evt.data === 'not-loggedin') {
    //im not logged in so do it now send a message to the iframe
    iframe.contentWindow.postMessage("log-me-in", '*');
  }
	
	if (evt.origin === 'http://iframe.letsgeekaround.com' && evt.data === 'message') {
    //im not logged in so do it now send a message to the iframe
    iframe.contentWindow.postMessage("log-me-in", '*');
  }
}