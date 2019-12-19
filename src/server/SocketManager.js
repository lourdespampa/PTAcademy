const io = require('./index.js').io;
module.exports=function(socket){
  /*AUDIO*/
//RECEPTOR
var bufferHeader = null;
socket.on('requestBufferHeader', function(packet) {
  //console.log("6");
  socket.broadcast.emit('bufferHeader', {
      audio: bufferHeader,
    //  pin: socket.handshake.query.pin
  });
  //console.log(bufferHeader +"asdasd")
});
//FIN RECEPTOR
  // streamaudio emisor
  socket.on('bufferHeader', function(packet) {
    // Buffer header can be saved on server so it can be passed to new user
    //   console.log("4");
    // console.log(bufferHeader)
    bufferHeader = packet;
    socket.broadcast.emit('bufferHeader', {
        audio: packet
        //pin: socket.handshake.query.pin
    });
    ///console.log(bufferHeader)
});
// Broadcast the received buffer
socket.on('stream', function(packet) {
    //  console.log("5");
    socket.broadcast.emit('stream', {
        audio: packet
       // pin: socket.handshake.query.pin
    });
});
//
socket.on('onPlay', function(data) {
  socket.broadcast.emit('onPlay', {
        txt: data.txt,
        //pin: socket.handshake.query.pin
    })
})
//FIN EMISOR
/*AUDIO FIN*/
  console.log('socket id: '+socket.id)
}