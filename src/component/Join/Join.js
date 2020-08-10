import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './Join.css';

export default function SignIn() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
        </div>
        <div>
          <input placeholder="email" className="joinInput mt-20" type="text" onChange={(event) => setEmail(event.target.value)} />
        </div>
        <div>
          <input placeholder="gender" className="joinInput mt-20" type="text" onChange={(event) => setGender(event.target.value)} />
        </div>
        <Link onClick={e => (!name || !email) ? e.preventDefault() : null} to={`/main?name=${name}&email=${email}&gender=${gender}`}>
          <button className={'button mt-20'} type="submit">Sign In</button>
        </Link>
        
      </div>
    </div>
  );
}
