import React from 'react';
import './Message.css';
import ReactEmoji from 'react-emoji';
const Message = ({ message, name }) => {
  var isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if(message.name === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{trimmedName}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{ReactEmoji.emojify(message.message)}</p>
          </div>
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">{ReactEmoji.emojify(message.message)}</p>
            </div>
            <p className="sentText pl-10 ">{message.name}</p>
          </div>
        )
  );
}

export default Message;