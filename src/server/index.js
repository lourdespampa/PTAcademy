var app = require('http').createServer()
var io = module.exports.io=require('socket.io')(app)

const PORT = process.env.PORT ||4000

const SockeManager=require('./SocketManager')

io.on('connection',SockeManager)


app.listen(PORT, ()=>{
    
    console.log("Conecte to port:"+PORT)
})