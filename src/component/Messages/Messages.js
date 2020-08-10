import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './Message/Message';
import './Messages.css';
const Messages = ({ messages, name }) => {
 
  console.log(messages)
 
 
 
 return (<ScrollToBottom className="messages">
    {
      
    	messages!==undefined?messages.map((message, i) => <div key={i}><Message message={message} name={name}/></div>):null
    }
  </ScrollToBottom>
 );
}

export default Messages;