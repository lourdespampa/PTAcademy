const teacherSocket = (io) => {
    const Student = io.of('/student')
    const Teacher = io.of('/teacher')

    Teacher.on('connection', (socket) => {
        console.log('id teacher:'+socket.id)
         //Video

        socket.on('VideoEmit',(url)=>{
            Student.emit('Video',url)
        })

        //FIn Video
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
         //FORM

         socket.on('SendForm',()=>{
            Student.emit('SendFormS')
        })

        //END FORN
          //SLIDES
          socket.on('sendSlides',()=>{
            Student.emit('sendSlidesS')
        })

        socket.on('nextPpt',()=>{
            Student.emit('nextPptS')
        })

        socket.on('backtPpt',()=>{
            Student.emit('backtPptS')
        })

        socket.on('closeSlides',()=>{
            Student.emit('closeSlidesS')
        })

        //END SLIDES
    })
}

module.exports = teacherSocket;