import React, { useEffect, useState } from "react";
import socketIo from "socket.io-client";
import { user } from "../Join/Join";
import "./chat.css"
import send5 from "../../Image/send3.png"
import ReactScrollToBottom from "react-scroll-to-bottom";
import closeIcon from "../../Image/closeIcon.png";
import Message from "../Message/message"
import logo from "../../Image/logo.jpeg"
let socket;
const ENDPOINT = "https://chat-server-f8zx.onrender.com/";
const Chat = () => {
  const [id, setid] = useState("");
    const [messages, setMessages] = useState([])

    const send = () => {
        const message = document.getElementById('chatInput').value;
        socket.emit('message', { message, id });
        document.getElementById('chatInput').value = "";
    }

    console.log(messages);
    useEffect(() => {
        socket = socketIo(ENDPOINT, { transports: ['websocket'] });
        socket.on('connect', () => {
            setid(socket.id);

        })
        console.log(socket);
        socket.emit('joined', { user })

        socket.on('welcome', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message);
        })

        socket.on('userJoined', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message);
        })

        socket.on('leave', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message)
        })

        return () => {
            socket.disconnect();
            socket.off();
        }
    }, [])

    useEffect(() => {
      
        socket.on('sendMessage', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message, data.id);
        })
        return () => {
            socket.off();
        }
    }, [messages])
  return (
    <>
     <div className="chatPage">
            <div className="chatContainer">
                <div className="header">
                <img src={logo} alt="na" className="logo"/>
                    <h2>Chatify</h2>
                    
                    <a href="/"> <img src={closeIcon} alt="Close" /></a>
                </div>
                <ReactScrollToBottom className="chatBox">
                    {messages.map((item, i) => <Message user={item.id === id ? '' : item.user} message={item.message} classs={item.id === id ? 'right' : 'left'} />)}
                </ReactScrollToBottom>
                <div className="inputBox">
                    <input onPause={(event) => event.key === 'Enter' ? send() : null} type="text" id="chatInput" />
                    <button onClick={send} className="sendBtn"><img src={send5} alt="Send" /></button>
                </div>
            </div>

        </div>
    </>
  );
};

export default Chat;