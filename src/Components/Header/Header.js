import React ,{useContext} from 'react';
import {useHistory} from "react-router-dom"
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { Authcontext } from '../../Store/Context';
import {signOut} from 'firebase/auth';
import {auth} from '../../Store/Firebase';

function Header() {

  const {user} = useContext(Authcontext)

  const navigate=useHistory();

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div   className="loginPage">
        <span onClick={()=>{
             user ? navigate.push('/userprofile') :  navigate.push('/login')
        }}>{user ? `Welcome ${user.displayName}` : 'Login'}</span>
          <hr />
        </div>

        {user && <span className='logoutButton' onClick={()=>{
            signOut(auth).then(()=>{
              navigate.push('/login');
            })
        }}>Logout</span>}

        <div onClick={()=>{
            navigate.push('/create')
        }}  className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
