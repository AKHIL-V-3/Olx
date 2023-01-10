import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from "../../Store/Firebase"
import React, { useState } from 'react';
import {useHistory} from 'react-router-dom'
import Logo from '../../olx-logo.png';
import './Login.css';
import  { SweetAlertIcon, SweetAlertOptions, SweetAlertResult } from 'sweetalert2'
import  Swal from 'sweetalert2'

function Login() {

  const navigate=useHistory();

  const [Email,setEmail] = useState('');
  const [password,setPassword] =useState('');


  const handleLogin =(e)=>{

      e.preventDefault();

      signInWithEmailAndPassword(auth,Email,password).then(()=>{
         
        navigate.push('/');
          
      }).catch((error)=>{
       
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message == 'Firebase: Error (auth/user-not-found).'?'User not found' : 'Wrong Password',
          
        }).then((e)=>{
          
          if(e.isConfirmed){

            setEmail('')
            setPassword('')
          }
          
        })

          

      })
  }


  const signupRedirect=()=>{

    navigate.push('/signup');
}
  return (
    <div>
      <div className="loginParentDiv">
        <img className='logo' src={Logo}></img>
        <form onSubmit={handleLogin}>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            placeholder='Email'
            onChange={(e)=>setEmail(e.target.value)}
          />
          <br />
          
          <br />
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            placeholder='password'
            onChange={(e)=>setPassword(e.target.value)}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a onClick={signupRedirect}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
