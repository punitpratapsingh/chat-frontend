import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import Male from '../../icons/man.png'
import FeMale from '../../icons/girl.png'
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Navbar from './Navbar'
import './Chat.css';
import { Button } from "react-bootstrap";

let socket;

const Chat = ({ location }) => {
   const [name, setName] = useState('');
  const [email,setEmail]=useState('');
  const [room,setRoom]=useState('');
  
  const [chatMode,setChatMode]=useState(1);
  const [gender,setGender]=useState('');
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const url = 'localhost:5000';
  const [currentUser,setCurrentUser]=useState({}) 
  const [searchInput,setSearchInput] =useState('')
  useEffect(() => {
    const { name, email ,gender } = queryString.parse(location.search);

    socket = io(url);

    
    setName(name)
    setEmail(email)
    setGender(gender)
    
    socket.emit('UserRegister', { name, email , gender}, (error) => {
      if(error) {
        alert(error);
      }


    });
    

  }, [url, location.search]);
  
  useEffect(() => {
    
    
    
    
    socket.on('message', message => {
  
      setMessages(messages => [ ...messages, message ]);

      
     
    });
    
    socket.on("userData", ({ users }) => {
    
    
      setUsers(users);
      setCurrentUser(users[0])
    
    });


}, []);
   
  const sendMessage = (event) => {
    event.preventDefault();
    if(currentUser===undefined || currentUser==={}) return;

    if(currentUser.type==='room')
    {
     
      if(message) {
        socket.emit('sendMessage', message, () => setMessage(''));
      }
    }
    else
    {
    if(message) {
      socket.emit('sendMessageu2u', {from:email,to:currentUser.email,message}, () => setMessage(''));
    }
  }
  }
  const currUser=(user)=>{

    setCurrentUser(user)

  }
  const listItems=(e)=>{

    setSearchInput(e.target.value)

  }
  const createRoom=()=>{

    if(!room) return;

    const newUser={
      name:room,
      type:'room',

    }
    const uuser=users.find(user=>user.name===room) 
   if(uuser) return;
    setUsers([...users,newUser])

    socket.emit('joinRoom',{room},(error)=>{
      alert(error)
    });
    setCurrentUser(newUser)

  }
 
  var list=users.filter((user)=>user.name.toLowerCase().startsWith(searchInput.toLowerCase())).filter((user)=>user.email!==email )
  
  const mess=currentUser.type==='room'? messages.filter((message)=>message.roomName && (message.roomName===currentUser.name)) :messages.filter((message)=>(message.to===currentUser.email && message.from===email)||(message.to===email && message.from===currentUser.email) )

  return (
    <div>
  
    <div className="outerContainer " >
   
       <div className={ "list-container "} >
         
         <input className="search_box" value={searchInput} onChange={e=>listItems(e)} placeholde='Search User' />
         <div className='userList'>
         {
         
         list.length>0?list.map((user,i)=>{

   return (
<div className='rowUser' key={i} onClick={()=>currUser(user)}>
  <div className='userIconDiv'>
  <img className='userIcon' src={(user.gender==='male' ||user.gender==='Male' ||user.gender==='Male' ||user.gender==='m' || user.gender==='M')? Male:FeMale} alt={'icon'}/>
  </div>
  <div className='userName'>
<h3>{user.name}</h3>
</div>
  </div>  
)
}): <h3 className='noUser'>No One is Online </h3>       }   
           </div>
           <div>
             <h4>Create & Join Room:</h4>
           <div className='rowUser roomRow' >
           <input className='userName' value={room} onChange={e=>setRoom(e.target.value)} placeholde='Search User' />
           <button className='userIconDiv' onClick={()=>createRoom()} >Join</button>
           </div></div>
      </div>
      <div className={"container"}>
          <InfoBar room={currentUser.name} />
          <Messages messages={mess} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
     
    </div>
    </div>
  );
}

export default Chat;
