import React, { useState, useContext } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { useHistory } from "react-router-dom";

import {auth, db} from '../../Store/Firebase';
import { createUserWithEmailAndPassword, updateProfile  } from 'firebase/auth';
import { doc, Firestore, setDoc,addDoc, collection } from 'firebase/firestore';


export default function Signup() {

  const [userName,setUserName] = useState('')
  const [email,setEmail] = useState('')
  const [phone,setPhone] = useState('')
  const [password,setPassword] = useState('')

  const navigate=useHistory();
  const loginRedirect=()=>{

       navigate.push("/login");
  }

  

  const handleSubmit=(e)=>{

    e.preventDefault();
      
          createUserWithEmailAndPassword(auth,email,password).then( (result)=>{

            const user = auth.currentUser;

            console.log(result ,'oooooooooooooo');

            updateProfile(user, {displayName: userName}).then(()=>{

                addDoc(collection(db,'user'),{
                  
                  id:user.uid,
                  username:userName,
                  email:email,
                  phone:phone

              })

              .then(()=>{
               
                navigate.push("/login");
                
              })

            })

          }).catch((error)=>{

             console.log(error);
          })       
  }


  return (
    <div>
      <div className="signupParentDiv">
        <img className='logo' src={Logo}></img>
        <form  onSubmit={handleSubmit}>
          {/* <label htmlFor="fname">Username</label> */}
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            // defaultValue="John"
            placeholder='Username'
            onChange={(e)=>setUserName(e.target.value)}
          />
          <br />
          {/* <label htmlFor="fname">Email</label> */}
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            // defaultValue="John"
            placeholder='Email'
            onChange={(e)=>setEmail(e.target.value)}
          />
          <br />
          {/* <label htmlFor="lname">Phone</label> */}
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            // defaultValue="Doe"
            placeholder='Phone'
            onChange={(e)=>setPhone(e.target.value)}
          />
          <br />
          {/* <label htmlFor="lname">Password</label> */}
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            // defaultValue="Doe"
            placeholder='Password'
            onChange={(e)=>setPassword(e.target.value)}
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a onClick={loginRedirect}>Login</a>
      </div>
    </div>
  );
}
