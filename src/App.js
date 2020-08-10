import React from 'react';
import {BrowserRouter as Router,Route,Switch,Redirect} from 'react-router-dom'

import Join from './component/Join/Join'
import './App.css';
import Main from './component/Main/Main'
const App=()=>
{
  return (

  <Router>
   
     
      
     
      <Route path='/' component={Join} exact/>
      <Route path='/main' component={Main} exact/>
     

    </Router>
  );
}

export default App;
