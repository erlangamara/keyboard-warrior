const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const errorHandler = require(`./middleware/errorHandler`)
const http = require('http').createServer(app)
const io = require('socket.io')(http)

io.on('connection', (socket) => {
// semua event yang mau dilisten disini


})

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

const route = require('./routes');

require('dotenv').config();

app.use('/', route);

app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`Listening on port: ${port}`);
})

module.exports = app;