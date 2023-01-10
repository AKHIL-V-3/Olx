import React, { useContext } from 'react';
import Header from '../Header/Header';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { auth, db, storage } from '../../Store/Firebase';
import { updateProfile } from 'firebase/auth';
import { doc, Firestore, setDoc, addDoc, collection } from 'firebase/firestore';
import { Authcontext } from '../../Store/Context';
import { getApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { ref, uploadBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage'

import { FirebaseContext } from '../../Store/Context'





function Create() {

  const navigate = useHistory();
  // const {firebase} = useContext(FirebaseContext)

  const {user} = useContext(Authcontext)

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');

  const [price, setPrice] = useState(null);
  const [image, setImage] = useState(null);

  const date = new Date()


  const addProduct = async () => {

    if (image == null) return;

    const imageRef = ref(storage, `images/${image.name}`);

    uploadBytes(imageRef, image);


    const uploadTask = uploadBytesResumable(imageRef, image);
    await uploadTask;
    const Url = await getDownloadURL(uploadTask.snapshot.ref);
    console.log(Url);


    addDoc(collection(db, 'products'), {

        name,
        category,
        price,
        Url,
        userId:user.uid,
        createdAt:date.toString()

    }).then(() => {

      navigate.push("/");

    })



  }

  const editImage = () => {

    navigate.push('/editprofile')

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


        <h1>Add Product</h1>

        <div className="mb-3 adduser_inputdiv ">
          <label for="exampleInputEmail1" class="form-label">Name</label>
          <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
            onChange={(e) => setName(e.target.value)}
          />

        </div>

        <div className="mb-3 adduser_inputdiv ">
          <label for="exampleInputEmail1" class="form-label">Category</label>
          <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
            onChange={(e) => setCategory(e.target.value)}
          />

        </div>

        {/* <div className='image__upload'>

            <label for="file-upload" className="custom-file-upload">
              Choose a file
            </label>
            <input id="file-upload" type="file" />

          </div> */}


        <div className="mb-3 adduser_inputdiv ">
          <label for="exampleInputEmail1" class="form-label">Price</label>
          <input type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
            onChange={(e) => setPrice(e.target.value)}
          />

        </div>

        <div >
          <img src={image ? URL.createObjectURL(image) : 'image'} alt="" width="200px" height="200px" />
        </div>



        <div className='image__uploadd'>

          <label for="file-upload" className="custom_upload">
            Choose a file
          </label>
          <input id="file-upload" name='image' type="file"

            onChange={(e) => setImage(e.target.files[0])}
          />

        </div>


        <div className='mb-3 mt-2' >
          <button onClick={addProduct} className=' btn btn-primary'>Submit</button>
        </div>


      </div>











    </div>
  )
}

export default Create