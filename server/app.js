const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const errorHandler = require(`./middleware/errorHandler`)
const http = require('http').createServer(app)
const io = require('socket.io')(http)

io.on('connection', (socket) => {
// semua event yang mau dilisten disini
    socket.on('attack', (message)=>{
        socket.broadcast.emit('attacked', message)
    })

    socket.on('notify enemy',(name)=>{
      console.log('player read :',name)
      socket.broadcast.emit('announce', name)
    })

})

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

const route = require('./routes');

require('dotenv').config();

app.use('/', route);

app.use(errorHandler)

http.listen(port, ()=>{
    console.log(`Listening on port: ${port}`);
})

module.exports = app;