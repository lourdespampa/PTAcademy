const teacherSocket = (io) => {
    const Student = io.of('/student')
    const Teacher = io.of('/teacher')

    Teacher.on('connection', (socket) => {
        console.log('id:'+socket.id)
        
        
    })
}

module.exports = teacherSocket;