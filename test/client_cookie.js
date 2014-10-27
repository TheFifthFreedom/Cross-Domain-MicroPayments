/*
	Trusted domain(s) for messages from external server.
*/
var mTrustedDomain = 'http://iframe.letsgeekaround.com';


/*
	Grab server (iframe) reference from HTML.
*/
var mServer = document.getElementById('iframe_payment');

/*
	Product information set by the client.
*/
var mProductInfo = {
	 title: "Apple iMac 5k",
	 subtitle: "Fuck it",
	 vendorName: "Apple",
	 price: "2500"
};

/*
	Message key used by the server to let the client know
	that the server is ready to receive messages.
*/
var MESSAGE_KEY_READY_TO_RECEIVE = 'ready';

/*
	Key used by client to send product info messages to server.
*/
var MESSAGE_KEY_PRODUCT_INFO = 'IFPI';

/*
	Add listener for server messages.
*/
window.addEventListener('message', function(evt) {
	console.log("Client: Receiving message...");
	console.log("Domain: " + evt.origin + ", Data: " + evt.data);

  /*
		Check if domain is trusted.
	*/
  if (evt.origin === mTrustedDomain) {
		/*
			Check what message has been passed.
		*/
		if (evt.data === 'ready'){
			sendProductInfo(mProductInfo);
		}
		else{
			var payload = JSON.parse(evt.data);
			switch(payload.method) {
				case 'ready':
					sendProductInfo(mProductInfo);
					break;
			}
		}
  }
});

/*
	Send product info using "set" method call along with associated key and value (or product info) pair.
*/
function sendProductInfo(productInfo) {
	sendMessageToServer(JSON.stringify({method: "set", key: MESSAGE_KEY_PRODUCT_INFO, value: productInfo}));
}

/*
	Send a generic message (string) to the server.
*/
function sendMessageToServer(message) {
	mServer.contentWindow.postMessage(message, '*');
}
