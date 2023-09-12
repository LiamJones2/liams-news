import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('https://socket-server-3xoa.onrender.com');
console.log(socket)
socket.emit('join', 113)

socket.on('connect', () => {
    console.log('Connected to the WebSocket server on port 8080');
    socket.emit('join', 'New user has connected');
});

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    // Function to send a chat message
    function sendMessage() {
        socket.emit('chat message', message);
        setMessage(""); // Clear the input field after sending
    }

    // Use useEffect to listen for incoming chat messages and update the state
    useEffect(() => {
        socket.on('chat message', (msg) => {
            // Update messages state with the new message
            setMessages((prevMessages) => [...prevMessages, msg]);
            console.log(msg)
        });

        return () => {
            // Clean up event listeners if needed
            socket.off('chat message');
        };
    }, []);

    return (
        <div>
            <h1>Chat</h1>
            {messages.map((message, i) => (
                <div key={i}>
                    <h1>{message}</h1>
                </div>
            ))}
            <input
                type="text"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;
