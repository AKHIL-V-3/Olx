import React, { useState } from 'react';
import './Edituser.css'
import Header from '../Header/Header';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { useHistory } from 'react-router-dom';

import { auth, db } from '../../Store/Firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, Firestore, setDoc, addDoc, collection, getDocs, where, query } from 'firebase/firestore';
import { useEffect } from 'react';
import { useContext } from 'react';
import { IdContext } from '../../Store/Idcontext';

async function Edituser() {
    

    const { id } = useContext(IdContext)
    const navigate = useHistory();

    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    


    const [userData, setUserData] = useState('')
     
     
    const handleUpdate = async () => {


        const q = query(collection(db, "user"), where("id", "==", id));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data())

            // Add a new document in collection "cities"
            await setDoc(doc(db, "user", doc.id), {

               username:userName,
               email:email,
               phone:phone
            });



        });
    }


    useEffect(async ()=>{

          console.log(id,'iiiiidddddddddddddddddiidiiii');
        const q = query(collection(db, "user"), where("id", "==", id));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            
            setUserData(doc.data())

        });

          
    },[])

    console.log(userData ,'uuuuuuuuuuuuuuuuuuuuu');

    return (

        <div>
            <div className="headerParentDiv">
                <div className="headerChildDiv">
                    <div className="brandName">
                        <OlxLogo></OlxLogo>
                    </div>

                </div>
            </div>

            <div className='edituser__body'>

                <form  >

                    <div className="mb-3 adduser_inputdiv ">
                        <label htmlFor="exampleInputEmail1" class="form-label">User Name</label>
                        <input type="text" class="form-control" name='username'  id="exampleInputEmail1" aria-describedby="emailHelp"
                            onChange={(e) => setUserName(e.target.value)}
                        />

                    </div>

                    <div className="mb-3 adduser_inputdiv ">
                        <label htmlFor="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="form-control" name='email'    id="exampleInputEmail1" aria-describedby="emailHelp"
                            onChange={(e) => setEmail(e.target.value)}
                        />

                    </div>


                    <div className="mb-3 adduser_inputdiv ">
                        <label htmlFor="exampleInputEmail1" class="form-label">Mobile Number</label>
                        <input type="number" class="form-control" name='phone'     id="exampleInputEmail1" aria-describedby="emailHelp"
                            onChange={(e) => setPhone(e.target.value)}
                        />

                    </div>

                    <div className='mb-3' >
                        <button type='submit' className=' btn btn-primary'>Update</button>
                    </div>

                </form>
            </div>


        </div>
    )
}

export default Edituser