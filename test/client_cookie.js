/*
	Trusted domain(s) for messages from external server.
*/
var mTrustedDomain = 'http://iframe.letsgeekaround.com';

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
	Key used by client to send product info messages to server.
*/
var MESSAGE_KEY_PRODUCT_INFO = 'IFPI';

/*
	Add listener for server messages.
*/
var socket = new easyXDM.Socket({
    remote: "http://iframe.letsgeekaround.com", // the path to the provider
		onReady:function(message) {
			sendProductInfo(mProductInfo);
		},
		onMessage:function(message, origin) {
			/*
				Check if domain is trusted.
			*/
			if (origin === mTrustedDomain) {
				/*
					Check what message has been passed.
				*/
				console.log("Client - msg received: " + message)
			}
		},
		container:"iframe_payment",
		props: {width:"550", height:"180", frameborder:"0", vspace:"0", hspace:"0"}
});

/*
	Send product info using "set" method call along with associated key and value (or product info) pair.
*/
function sendProductInfo(productInfo) {
	socket.postMessage(JSON.stringify({method: "set", key: MESSAGE_KEY_PRODUCT_INFO, value: productInfo}));
}
