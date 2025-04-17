import React, { useContext, useState } from 'react';
import PoultryLogo from '../Asset/PoultryLogo.jpg'

import cart_icon from '../Asset/cart_icon.png'
import './Navbar.css';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';

function Navbar(){
    const[activemenu, setActiveMenu] = useState("shop");
    const {getTotalCartItem} = useContext(ShopContext);
    return(
        <div className="navbar">
            <div className="navbar_logo">
                <img className='logo' src={PoultryLogo} alt="" />
                <p className="logo_name">Commerce</p>

            </div>
            <div className="navbar_menu">  
                 <li className="catagory_menu" onClick={()=>setActiveMenu("shop")}> <Link to='/' style = {{textDecoration : 'none', color : "inherit"}}>Shop</Link>  {activemenu ==="shop"? <hr/> : <></>} </li>
                <li className="catagory_menu"  onClick={()=>setActiveMenu("meat")}> <Link to='/meat'style = {{textDecoration : 'none', color : "inherit"}}>Meat</Link> {activemenu ==="meat"? <hr/> : <></>} </li>
                <li className="catagory_menu"  onClick={()=>setActiveMenu("eggs")}> <Link to='/eggs'style = {{textDecoration : 'none', color : "inherit"}}>Eggs</Link> {activemenu ==="eggs"? <hr/> : <></>} </li>
                <li className="catagory_menu"  onClick={()=>setActiveMenu("tools")}> <Link to='/tools'style = {{textDecoration : 'none', color : "inherit"}}>Tools</Link>  {activemenu ==="tools"? <hr/> : <></>} </li>
               
            </div>

            <div className="login_cart">
                <Link to ='/signup'><button className="login">Login</button></Link>
                <Link to ='/cart'><img className='cart' src={cart_icon} alt="Cart"/></Link>
                <div className="cart_count">{getTotalCartItem()}</div>
            
            </div>
        </div>
    );
}
export default Navbar;