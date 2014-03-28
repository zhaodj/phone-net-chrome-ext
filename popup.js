$(function(){
    $('#sendCall').click(function(e){
        var host=$('#boxHost').val();
        var phone=$('#phoneNum').val();
        chrome.sockets.udp.create({}, function(socketInfo) {
            // The socket is created, now we can send some data
            var socketId = socketInfo.socketId;
            var arrayBuffer = new ArrayBuffer(64);
            var dataView = new Uint8Array(arrayBuffer);
            dataView[0]=0x88;
            dataView[1]=0x77;
            dataView[2]=0x66;
            dataView[3]=0x55;
            dataView[4]=0x01;
            dataView[5]=0x01;
            var idx=6;
            var end=idx+10;
            for(;idx<end;idx++){
                dataView[idx]=0x00;
            }
            for(var i=0;i<phone.length;i++){
                dataView[idx]=phone.charCodeAt(i);
                idx++;
            }
            chrome.sockets.udp.bind(socketId,"0.0.0.0", 6060, function(result) {
                if (result < 0) {
                    console.log("Error binding socket.");
                    return;
                }
                chrome.sockets.udp.send(socketId, arrayBuffer, host, 7000, function(sendInfo) {
                    console.log("sent " + sendInfo.bytesSent);
                });
            });
        });
    });
});
