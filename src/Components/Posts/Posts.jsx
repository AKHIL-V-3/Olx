import React, { useContext, useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../Store/Firebase';
import Heart from '../../assets/Heart';
import './Post.css';
import { useHistory } from 'react-router-dom'
import { PostContext } from '../../Store/Postcontext';

function Posts() {
  const [products, setProducts] = useState([]);
  const { setPost } = useContext(PostContext);


  

  const navigate = useHistory();

  useEffect(async () => {

    const querySnapshot = await getDocs(collection(db, "products"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());


      setProducts((prev) => {
        return [...prev, doc.data()];
      });

    });

  }, [])

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className='cards'>


          {
          
          products.map((product,index) => {

                                
            return (

             
              <div

                onClick={() => {
                  setPost(product)
                  navigate.push('/viewpost')
                }}
               className='card'

              >
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={product.Url} alt="" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {product.price}</p>
                  <span className="kilometer">{product.category}</span>
                  <p className="name"> {product.name}</p>
                </div>
                <div className="date">
                  <span></span>
                </div>
              </div>
              
             
              
            )

           

          })}

           
        </div>

      </div>
      
      
    </div>
  );
}

export default Posts;
