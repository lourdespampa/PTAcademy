const studentSocket = (io) => {
    const Teacher = io.of('/teacher')
    const Student = io.of('/student')

    Student.on('connection', (socket) => {
        console.log('id student:'+socket.id)

        ///¿trivia
        socket.on('enviando elegida',function(data){
            console.log('recibida pregunta elegida')
            console.log(data)
            Teacher.emit('pregunta escogida',{
                data:data
            })
        })
    })
}

module.exports = studentSocket;