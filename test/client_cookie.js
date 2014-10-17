var acceptedDomain = "http://googledrive.com";
window.onload = function() {
    var win = document.getElementsByTagName('iframe')[0].contentWindow;
    var obj = {
       name: "Apple iMac 5k",
			 subtitle: "Fuck it",
			 description: "5k man!",
			 vendor: "Apple"
    };
    // save obj in subdomain localStorage
    win.postMessage(JSON.stringify({key: 'product', method: "set", data: obj}), "*");
    // load previously saved data
    win.postMessage(JSON.stringify({key: 'product', method: "get"}), "*");
    window.onmessage = function(e) {
        if (e.origin != acceptedDomain) {
            return;
        }
        console.log(JSON.parse(e.data).name);
    };
};