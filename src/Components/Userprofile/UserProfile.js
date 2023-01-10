import React, {useContext} from 'react';
import './userProfile.css';
import Header from '../Header/Header';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { useHistory } from 'react-router-dom';
import {Authcontext} from '../../Store/Context'
import { useState , useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { doc, Firestore, setDoc, addDoc, collection ,query, where, getDocs } from 'firebase/firestore';
import { db , storage } from '../../Store/Firebase';


function UserProfile() {

    const navigate = useHistory();
    const {user} = useContext(Authcontext)
    const [profile,setProfile] = useState(null)
    const [image,setImage] = useState(null)


    const updateImage = async ()=>{
        const date = new Date()
        if (profile == null) return;
    const imageRef = ref(storage, `Profile/${profile.name}`);
    uploadBytes(imageRef, profile);
    const uploadTask = uploadBytesResumable(imageRef, profile);
    await uploadTask;
    const Url = await getDownloadURL(uploadTask.snapshot.ref); 

    await setDoc(doc(db, "profiles", user.uid), {
        Url,
        userId:user.uid,
        createdAt:date.toString()

    }).then(() => {

     window.location.reload(true)

    })
    }


    useEffect(async () => {

        const q = query(collection(db, "profiles"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            
            setImage(doc.data())

        });

    }, [user])

  
    return (
        <div>
            <div className="headerParentDiv">
                <div className="headerChildDiv">
                    <div className="brandName">
                        <OlxLogo></OlxLogo>
                    </div>
                    


                    <div className='ChildDiv'>

                       
                        <div className="sellMenu">
                            <SellButton></SellButton>
                            <div className="sellMenuContent">
                                <SellButtonPlus></SellButtonPlus>
                                <span>SELL</span>
                            </div>
                        </div>

                        
                    </div>



                </div>
            </div>

            <div className='userprofile__body'>

                <div className='userprofile__heading'>
                    <div className='userIcon'>
                        <i class="fa fa-user" aria-hidden="true"></i>
                    </div>
                    <h1>User Profile</h1>
                </div>


                <div className='userprofile__card'>

                    <div className='userprofile_leftcard'>

                        <div className='user__image'>

                            <div className='parent_profileImage'>

                                <div className='profile_image'>

                                <div  style={{backgroundImage: `url("${ image ? image.Url : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'}")`, width: "200px",height:"200px",borderRadius:"100%",marginTop:"5px",backgroundSize:"cover",alignItems:"baseline",position:"relative"}}>

                                        <label for="file-upload" className="custom-file-upload">
                                            <i class="fa-solid fa-camera"></i>
                                        </label>

                                        <img className='image__onChange' src={profile ? URL.createObjectURL(profile) : 'image'} alt="" />
                                        <input id="file-upload" type="file" 

                                        onChange={(e)=> {setProfile(e.target.files[0])}}
                                        
                                        />

                                    </div>
                                   

                                </div>

                            </div>

                            <div className='userprofile_name'>
                                <h4>{user.displayName}</h4>
                            </div>

                            <div className='userprofile__Description'>
                                <h5>{user.email}</h5>
                            </div>

                            <div>
                                <button  onClick={updateImage} className='signout'>
                                    update     
                                </button>
                            </div>

                           

                        </div>

                    </div>

                    <div className='userprofile__rightcard'>


                        <div className='userName'>
                            <h4>{user.displayName}</h4>
                            

                        </div>
                        <div className='userName'>

                            <h4>{user.email}</h4>
                            

                        </div>
                        {/* <div className='userName'>

                            <h4>{user.mobile}</h4>
                            

                        </div> */}

                    </div>

                </div>






            </div>

        </div>
    )
}

export default UserProfile