const studentSocket = (io) => {
    const Teacher = io.of('/teacher')
    const Student = io.of('/student')

    Student.on('connection', (socket) => {
        socket.on('close tab', (data) => {
            Teacher.emit('load alert', {
                pin: socket.handshake.query.pin,
                message: data.message

            })
        });
        socket.on('close class', (data) => {
            Teacher.emit('close alert', {
                pin: socket.handshake.query.pin,
                message: data.message

            })
        });
    })
}

module.exports = studentSocket;