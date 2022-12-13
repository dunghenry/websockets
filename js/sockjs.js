var sock = new SockJS('http://localhost:4000/echo');
sock.onopen = function () {
    console.log('open');
    // sock.send('Hello');
};
sock.onmessage = function (e) {
    console.log('message', e.data);
    // sock.close();
};
const send = () => {
    sock.send('Xin chao');
};
sock.onclose = function () {
    console.log('close');
};
