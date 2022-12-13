const socket = io('http://localhost:4000');
socket.on('msg', function (msg) {
    console.log(msg);
});
const send = () => {
    socket.emit('send', 'Xin chao');
};
