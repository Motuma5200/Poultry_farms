import React, { useContext, useState } from 'react';
import PoultryLogo from '../Asset/new_logo.jpg'
import cart_icon from '../Asset/cart_icon.png'
import './Navbar.css';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';

function Navbar(){

    const[activemenu, setActiveMenu] = useState("shop");
    const {getTotalCartItem} = useContext(ShopContext);
    const [menu_control , setMenuControl] = useState(false);

    return(
        <div className="navbar">
            <div className="navbar_logo">
                <img className='logo' src={PoultryLogo} alt="" />
                <p className="logo_name">POULTRY <br/> FARMS</p>

            </div>
            <div className={ !menu_control? "navbar_menu" : "hide_menu"}>  
                 <li className="catagory_menu" onClick={()=>setActiveMenu("shop")}>
                     <Link to='/' style = {{textDecoration : 'none', color : "inherit"}}>Shop</Link> 
                      {activemenu ==="shop"? <hr/> : <></>} 
                 </li>
                <li className="catagory_menu"  onClick={()=>setActiveMenu("meat")}> 
                    <Link to='/meat'style = {{textDecoration : 'none', color : "inherit"}}>Meat</Link>
                     {activemenu ==="meat"? <hr/> : <></>}
                 </li>
                <li className="catagory_menu"  onClick={()=>setActiveMenu("eggs")}> 
                    <Link to='/eggs'style = {{textDecoration : 'none', color : "inherit"}}>Eggs</Link>
                     {activemenu ==="eggs"? <hr/> : <></>} 
                </li>
                <li className="catagory_menu"  onClick={()=>setActiveMenu("tools")}>
                     <Link to='/tools'style = {{textDecoration : 'none', color : "inherit"}}>Tools</Link> 
                      {activemenu ==="tools"? <hr/> : <></>}
                 </li>
               
            </div>

            <div className="login_cart">
            <Link to ='/signup'><button className={activemenu === 'login'? "loged login" : "login"} onClick={()=>setActiveMenu("login")}>Login</button></Link>
                <div className={ activemenu === 'cart'?  'carting cartContent' : 'cartContent'} onClick={()=>setActiveMenu("cart")}>
                    <Link to ='/cart'><img className='cartIcon' src={cart_icon} alt="Cart"/></Link>
                   <div className="cart_count">{getTotalCartItem()}</div>
             </div>
         </div>

         <div className="menu_control" onClick={() => setMenuControl(!menu_control)}>
                <div className={menu_control? "firstLine" : "firstCross"}></div>
                <div className={menu_control? "secondLine" : "hideCros"}></div>
                <div className={menu_control? "thirdLine" : "secondCross"}></div>

             </div>
        </div>
    );
}
export default Navbar;