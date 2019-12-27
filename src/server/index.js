var app = require('http').createServer()

const PORT = process.env.PORT ||4000

var io = require('socket.io')(app);


app.listen(PORT, ()=>{
    console.log("Conecte to port:"+PORT)
})

const {studentSocket,teacherSocket,teacherXstudent} = require('./sockets');
teacherXstudent(io);
studentSocket(io);
teacherSocket(io);