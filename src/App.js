import React, { useState, useEffect } from 'react';
import './App.css';
import io from "socket.io-client";
import Chat from './Chat';

const socket = io.connect("https://chatappbackend-yf1s.onrender.com");

function App() {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (userName.trim() !== "" && room.trim() !== "") {
      socket.emit("join_room", { userName, room }, (response) => {
        if (response.success) {
          setShowChat(true);
        } else {
          console.error(response.error);
        }
      });
    }
  }

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setUserName(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} userName={userName} room={room} />
      )}
    </div>
  );
}

export default App;
