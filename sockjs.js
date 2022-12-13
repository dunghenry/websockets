const express = require('express');
const http = require('http');
const WebSocket = require('ws');
var sockjs = require('sockjs');
const port = 4000;
const app = express();
const server = http.createServer(app);
const echo = sockjs.createServer();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let clients = [];
function broadcast(message) {
    for (var client in clients) {
        clients[client].write(message);
    }
}
echo.on('connection', function (conn) {
    clients.push(conn);
    // console.log(conn);
    conn.on('data', function (message) {
        // send it to myself
        // conn.write(message);

        //send all clients
        // broadcast(message);

        // send all clients, excluding itself
        clients = clients.filter((client) => client.id !== conn.id);
        broadcast(message);
    });
    conn.on('close', function () {
        clients = clients.filter((client) => client.id !== conn.id);
    });
});
app.get('/', (req, res) => {
    return res.send('Hi');
});
echo.installHandlers(server, { prefix: '/echo' });
server.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
