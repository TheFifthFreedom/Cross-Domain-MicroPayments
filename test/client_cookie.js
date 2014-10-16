
window.onload = function() {
    var win = document.getElementsByTagName('iframe')[0].contentWindow;
    var obj = {
       name: "Jack"
    };
    // save obj in subdomain localStorage
    win.postMessage(JSON.stringify({key: 'storage', method: "set", data: obj}), "*");
    // load previously saved data
    win.postMessage(JSON.stringify({key: 'storage', method: "get"}), "*");
    window.onmessage = function(e) {
        //if (e.origin != "http://sub.domain.com") {
        //    return;
        //}
        // this will log "Jack"
        console.log(JSON.parse(e.data).name);
    };
};