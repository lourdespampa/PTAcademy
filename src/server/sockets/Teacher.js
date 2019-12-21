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
    })
}

module.exports = teacherSocket;