const express = require('express');
const cors = require('cors')
const app = express();
const server = require('http').Server(app)
let drivers = []

app.use(cors());

const io = require('socket.io')(server,{
    cors:{
        origins:['http://localhost:4200']
    }
})

io.on('connection',(socket)=>{
    socket.on('coords',(msg)=>{
       io.emit('coords',msg)
       drivers.push(msg)
    })
    socket.emit('drivers',drivers)
    socket.on('position',(msg)=>{
        io.emit('position',msg)
     })
     socket.on('position_driver',(msg)=>{
        io.emit('position_driver',msg)
     })
     socket.on('viaje',(msg)=>{
        io.emit('viaje',msg)
     })
})

server.listen(3000, ()=> console.log('todo bien!!'))