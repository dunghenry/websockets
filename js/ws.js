const ws = new WebSocket('ws://localhost:4000');
ws.addEventListener('open', function (event) {
    console.log('Connected to WS server');
});
ws.addEventListener('message', function (event) {
    console.log('Message from server', event.data);
});
const sendMsg = () => {
    ws.send('Hello');
};
const send = () => {
    ws.send('Hi');
};
