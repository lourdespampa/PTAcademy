const studentSocket = (io) => {
    const Teacher = io.of('/teacher')
    const Student = io.of('/student')

    var bufferHeader = null;
    
    Teacher.on('connect', (socket) => {
        

        socket.on('bufferHeader', function(packet) {
            bufferHeader = packet;
            Student.emit('bufferHeader', {
                audio: packet
            });
        });
        socket.on('stream', function(packet) {
            Student.emit('stream', {
                audio: packet
            });
        });
        socket.on('onPlay', function(data) {
          Student.emit('onPlay', {
                txt: data.txt,
            })
        })
        

    })
    Student.on('connect', (socket) => {
        socket.on('requestBufferHeader', function(packet) {
            Student.emit('bufferHeader', {
                audio: bufferHeader,
            });
        });   
    })
}

module.exports = studentSocket;