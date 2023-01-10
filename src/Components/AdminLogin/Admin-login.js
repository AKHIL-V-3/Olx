import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../Store/Firebase"
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import Logo from '../../olx-logo.png';
import { SweetAlertIcon, SweetAlertOptions, SweetAlertResult } from 'sweetalert2'
import Swal from 'sweetalert2'


function Login() {

  const navigate = useHistory();

  const [Email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  // const handleLogin =(e)=>{

  //     e.preventDefault();

  //     signInWithEmailAndPassword(auth,Email,password).then(()=>{

  //       navigate.push('/');

  //     }).catch((error)=>{
  //       alert('Invalid email or password')
  //       navigate.push('/login');
  //     })
  // }

  const adminLogin = (e) => {

    e.preventDefault();

    signInWithEmailAndPassword(auth, Email, password).then(() => {

      navigate.push('/admin');

    }).catch((error) => {
    
       
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message == 'Firebase: Error (auth/user-not-found).' ? 'Invalid Email' : 'Wrong Password',

      })
      navigate.push('/adminlogin');
    })
  }

  return (
    <div>


      <div className="loginParentDiv">
        <h1 >Admin Login</h1>

        <img className='logo' src={Logo}></img>
        <form onSubmit={adminLogin}>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />

          <br />
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            placeholder='password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button>Login</button>
        </form>

      </div>
    </div>
  );
}

export default Login;
