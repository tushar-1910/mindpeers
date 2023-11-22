import React, { useState, useEffect } from 'react';
import { socket } from './socket';
import 'react-chat-widget/lib/styles.css';
import ChatWidget from './components/ChatWidget';
export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [userName, setUserName] = useState('');
  const [isLogin, setLogin] = useState(false);
  const [sender, setSender] = useState('');



  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  const handleLogin = async () =>{
    setLogin(true);
    console.log(userName)
    
    socket.emit('user joined', userName);
  }
  return (
    <div className="App">
      {
        isLogin ?
        <>
        <ChatWidget name={userName} title ={'app'} sender ={sender}/>
        </>
          :
          <>
            <input type='text' placeholder='enter your username' onChange={(e)=>setUserName(e.target.value)}/> <br />
            <input type='text' placeholder='message to..' onChange={(e)=>setSender(e.target.value)}/>
            <button onClick={handleLogin}>Submit</button>
          </>
      }
    </div>
  );
}