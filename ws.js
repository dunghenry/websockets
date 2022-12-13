const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const port = 4000;
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    return res.send('Hi');
});
wss.on('connection', (ws) => {
    console.log('New client connected');
    ws.send('Welcome to new client');
    // console.log(ws);
    ws.on('message', function message(msg) {
        console.log('Received: %s', msg);

        // send it to myself
        ws.send('Got ur msg its: ' + msg);

        // send all clients
        // wss.clients.forEach(function each(client) {
        //     if (client.readyState === WebSocket.OPEN) {
        //         client.send('Got ur msg its: ' + msg);
        //     }
        // });

        //  send all clients, excluding itself
        // wss.clients.forEach(function each(client) {
        //     if (client !== ws && client.readyState === WebSocket.OPEN) {
        //         client.send('Got ur msg its: ' + msg);
        //     }
        // });
    });

    ws.on('close', () => {
        console.log('Connection closed');
    });
});
server.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
