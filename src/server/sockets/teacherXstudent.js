const studentSocket = (io) => {
    const Teacher = io.of('/teacher')
    const Student = io.of('/student')

    var bufferHeader = null;
    
    Teacher.on('connect', (socket) => {
        //INICIO ROULETTE

        socket.on('azarprofe',(data)=>{
            console.log('escchaa el profe')
            Student.emit('rouletteWinnerS',data)
            console.log('emite el alum')
        })

        //FIN ROULETTE
        ///¿trivia
        socket.on('enviando pregunta',function(data){
            console.log('escchaa el profe')
            Student.emit('pregunta recibida',{
                data:data
            })
        })
        //fintrivia

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