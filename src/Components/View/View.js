import React, { useEffect, useState, useContext, useId } from 'react';
import { PostContext } from '../../Store/Postcontext';
import { getDoc, doc, getDocs, collection ,query, where } from 'firebase/firestore';
import { db } from '../../Store/Firebase';
import { getAuth } from 'firebase/auth';

import './View.css';
function View() {

  const [userDetails, setuserDetails] = useState([]);

  const { post } = useContext(PostContext);

  console.log(post,'4444444444444444');

  useEffect(async () => {

    const { userId } = post;

    const q = query(collection(db, "user"), where("id", "==", userId));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());

      setuserDetails(doc.data())
    });

  },[])

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={post.Url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {post.price}</p>
          <span>{post.name}</span>
          <p>{post.category}</p>
          <span>{}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phone}</p>
        </div>
      </div>
    </div>
  );
}
export default View;
