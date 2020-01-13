const teacherSocket = (io) => {
    const Student = io.of('/student')
    const Teacher = io.of('/teacher')

    Teacher.on('connection', (socket) => {
        console.log('id teacher:'+socket.id)
        
        //Video
        socket.on('VideoEmit',(url)=>{
            Student.emit('Video',{
                url: url,
                pin: socket.handshake.query.pin
            })
        })
        //FIN Video

        //INICIO ROULETTE
        socket.on('azarprofe',(data)=>{
            console.log('escchaa el profe')
            Student.emit('rouletteWinnerS',{
                data: data,
                pin: socket.handshake.query.pin
            })
            console.log('emite el alum')
        })
        //FIN ROULETTE

        //trivia
        socket.on('enviando pregunta',function(data){
            console.log('pregunta enviada')
            Student.emit('pregunta recibida',{
                data:data,
                pin: socket.handshake.query.pin
            })
        })
        socket.on('restaurando datos',function(data){
            console.log('peticion enviada')
            Student.emit('datos restaurados',{
                data:data,
                pin: socket.handshake.query.pin
            })
        })
        //FIN trivia

         //FORM
         socket.on('SendForm',()=>{
            Student.emit('SendFormS',{
                pin: socket.handshake.query.pin
            })
        })
        //END FORN

        //SLIDES
          socket.on('sendSlides',()=>{
            Student.emit('sendSlidesS',{
                pin: socket.handshake.query.pin
            });
            console.log(socket.handshake.query.pin);
        });
        socket.on('nextPpt',()=>{
            Student.emit('nextPptS',{
                pin: socket.handshake.query.pin
            })
        })
        socket.on('backtPpt',()=>{
            Student.emit('backtPptS',{
                pin: socket.handshake.query.pin
            })
        })
        socket.on('closeSlides',()=>{
            Student.emit('closeSlidesS',{
                pin: socket.handshake.query.pin
            })
        })
        //END SLIDES

        // Inicia TEMP
        socket.on('set', function(data) {
            Student.emit('set', {
                data: data,
                pin: socket.handshake.query.pin
            });
            console.log('se le asigna tiempo ' + data.time)
        });
        socket.on('start', function(data) {
            Student.emit('temp', {
                data: data,
                pin: socket.handshake.query.pin
            });
            console.log('se inicia el tiempo ' + data.time)
        });
        socket.on('stop', function(data) {
            Student.emit('stop',{
                data: data,
                pin: socket.handshake.query.pin
            });
            console.log('se esta detenemiendo el time'+ data.message)
        });
        //FIN TEMP

        //Lista
        socket.on('RemoveStud',(data)=>{
            console.log(data.id)
            Student.emit('RemoveStudS',{
                id:data.id,
                pin: socket.handshake.query.pin
            })
            
        })
        //END LISTA

        //grupos
        socket.on('enviando grupos',(data)=>{
            Student.emit('enviando grupos',{
                data: data,
                pin: socket.handshake.query.pin
            })
        })
        //END grupos

    })
}

module.exports = teacherSocket;