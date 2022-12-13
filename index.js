const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const port = 4000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('views'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('js'));
//use template engine
app.get('/', (req, res) => {
    res.render('index');
});

//use html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});
io.on('connection', (socket) => {
    socket.on('login', (msg) => {
        console.log(msg);
        //? emit  my self
        // socket.emit('login-success', socket.id);

        // ! emit all users
        // io.sockets.emit('login-success', socket.id);

        //! emit single user
        // io.to('socketid').emit('login-success', socket.id);

        // ! emit all user apart from my self
        socket.broadcast.emit('login-success', socket.id);
    });
    socket.on('sendmsg', function (msg) {
        console.log(msg);
        socket.broadcast.emit('sendmsgsuccess', socket.id + ' ' + msg);
    });
});

server.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
