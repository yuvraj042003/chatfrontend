import socketIO from "socket.io-client"
import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom' 
import Chat from "./Componant/Chat/chat"
import Join from "./Componant/Join/Join" 
const ENDPOINT='http://localhost:4500/'
const socket = socketIO(ENDPOINT, {transports:['websocket']}) 

function App() {
 socket.on("connect",()=>{
 })
return (
    <>
    <BrowserRouter>
      <Routes>
      <Route extact path="/" element={<Join/>} />
      <Route path="/chat" element={<Chat/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
