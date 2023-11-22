import React, { useState } from 'react';
import { Widget, addResponseMessage, addUserMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import { socket } from '../socket';

const ChatWidget = ({title, name,sender}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNewUserMessage = (newMessage) => {
    socket.emit(`message from`,{sender,message:newMessage})
    console.log(`New message incoming! ${newMessage}`);
    // Add your logic to handle user messages here
  };

  socket.on(sender, msg =>{
    console.log('external', sender)
    addResponseMessage(msg)
  });

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chat-widget">
      <button onClick={handleToggleChat}>Toggle Chat</button>
      {isOpen && (
        <Widget
          handleNewUserMessage={handleNewUserMessage}
          title={name}
          subtitle={title}
        />
      )}
    </div>
  );
};

export default ChatWidget;
