import React from 'react';
import { io } from 'socket.io-client';
const App = () => {
    const [socket, setSocket] = React.useState(null);
    React.useEffect(() => {
        setSocket(io('http://localhost:4000'));
    }, []);
    React.useEffect(() => {
        socket?.emit('login', 'user login');
        socket?.on('login-success', (data) => {
            console.log(data + '  login success');
        });
    }, [socket]);
    const handleSend = () => {
        socket?.emit('sendmsg', 'Hello everyone');
    };
    socket?.on('sendmsgsuccess', function (data) {
        console.log(data);
    });
    return (
        <div>
            <h1>FE Reactjs</h1>
            <button onClick={handleSend}>Send</button>
        </div>
    );
};

export default App;
