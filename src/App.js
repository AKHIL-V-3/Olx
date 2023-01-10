import React, {useEffect,useContext} from 'react';
import './App.css';
import {BrowserRouter as Router ,Route} from 'react-router-dom'
import {Authcontext } from './Store/Context'
import {auth } from './Store/Firebase'
import Post from './Store/Postcontext';
import Id from './Store/Idcontext';


/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import Signup from  './Pages/Signup'
import Login from './Components/Login/Login';
import UserProfile from './Components/Userprofile/UserProfile';
import Adminlogin from './Components/AdminLogin/Admin-login';
import Create from './Pages/Create'
import AdminHome from './Components/AdminHome/AdminHome';
import { onAuthStateChanged } from 'firebase/auth';
import Adduser from './Components/Adduser/Adduser';
import Edituser from './Components/EditUser/Edituser';
import View from './Components/View/View'


function App() {

  const {user,setUser}=useContext(Authcontext);
  
  
  useEffect(()=>{
      onAuthStateChanged(auth,(user)=>{
         setUser(user)
      }) 
  })



  return (
    <div>

      <Post>

        <Id>

      <Router>

        <Route exact path='/'>
        <Home />
        </Route>

        <Route path='/signup'>
        <Signup />
        </Route>

        <Route path='/login'>
         <Login/>
        </Route>

        <Route path='/userprofile'>
         <UserProfile/>
        </Route>

        <Route path='/admin'>
         <AdminHome/>
        </Route>

        <Route path='/adminlogin'>
         <Adminlogin/>
        </Route>

        
        <Route path='/create'>
         <Create/>
        </Route>

        <Route path='/createuser'>
         <Adduser/>
        </Route>

       

        <Route path='/viewpost'>    
         <View/>
        </Route>

      </Router>


      </Id>

      </Post>

    </div>
  );
}

export default App;
