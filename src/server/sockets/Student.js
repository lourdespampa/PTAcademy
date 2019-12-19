const studentSocket = (io) => {
    const Teacher = io.of('/teacher')
    const Student = io.of('/student')

    Student.on('connection', (socket) => {
        console.log('id student:'+socket.id)
    })
}

module.exports = studentSocket;