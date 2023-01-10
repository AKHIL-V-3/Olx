import React,{useState ,Component } from 'react';
import './Adduser.css'
import Header from '../Header/Header';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { useHistory } from 'react-router-dom';
import  { SweetAlertIcon, SweetAlertOptions, SweetAlertResult } from 'sweetalert2'
import  Swal from 'sweetalert2'

import {auth, db} from '../../Store/Firebase';
import { createUserWithEmailAndPassword, updateProfile  } from 'firebase/auth';
import { doc, Firestore, setDoc,addDoc, collection } from 'firebase/firestore';

function Adduser() {

   const navigate = useHistory();
    const [userName,setUserName] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState('')
    const [password,setPassword] = useState('')



    const handleSubmit=(e)=>{

        e.preventDefault();
          
              createUserWithEmailAndPassword(auth,email,password).then( (result)=>{
    
                console.log(result,'rrrrrrrrrrrrrrrrrrrrrrrrrr');
    
                const user = auth.currentUser;
                
                updateProfile(user, {displayName: userName}).then(()=>{
    
                    addDoc(collection(db,'user'),{
                      
                      id:user.uid,  
                      username:userName,
                      email:email,
                      phone:phone
                  }).then(()=>{
                   
                    navigate.push("/admin");
                    
                  })
    
                })
    
              }).catch((error)=>{
                  
                

                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.message == 'Firebase: Password should be at least 6 characters (auth/weak-password).'?'Password should be at least 6 characters' : 'Email already  used'
                   
                  })
              })       
      }



    return (


        <div>


            <div className="headerParentDiv">
                <div className="headerChildDiv">
                    <div className="brandName">
                        <OlxLogo></OlxLogo>
                    </div>

                </div>
            </div>


            <div className='adduser__body'>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3 adduser_inputdiv ">
                        <label for="exampleInputEmail1" class="form-label">User Name</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                         onChange={(e)=> setUserName(e.target.value)}
                         />
                         
                    </div>

                    <div className="mb-3 adduser_inputdiv ">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                        onChange={(e)=> setEmail(e.target.value)}
                         />
                        
                    </div>


                    <div className="mb-3 adduser_inputdiv ">
                        <label for="exampleInputEmail1" class="form-label">Mobile Number</label>
                        <input type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                        onChange={(e)=> setPhone(e.target.value)} 
                        />
                        
                    </div>


                    <div className="mb-3 adduser_inputdiv ">
                        <label for="exampleInputEmail1" class="form-label">Password</label>
                        <input type="password" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                        onChange={(e)=> setPassword(e.target.value)}
                         />
                        
                    </div>


                    <div className='mb-3' >
                        <button className=' btn btn-primary'>Submit</button>
                    </div>

                </form>
            </div>


        </div>
    )
}

export default Adduser