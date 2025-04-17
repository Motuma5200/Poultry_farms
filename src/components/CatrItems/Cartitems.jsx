import React, { useContext } from 'react'
import './Cartitems.css'
import { ShopContext } from '../../context/ShopContext'
import remove_icon from '../Asset/cart_cross_icon.png'

const Cartitems = () => {
    const {getTotalCartAmount, allProducts, cartItems, removeFromCart} = useContext(ShopContext)
  return (
    <div className='CartItems'>
         <div className="cartitems_format_main">
            <p>Product</p>
            <p>Tittle</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
         </div>
         <hr />
         {allProducts.map((e)=>{
            if(cartItems[e.id] > 0){
                return <div>
                <div className="cartItem_format cartitems_format_main">
                    <img src= {e.image} alt="" className='carticon_product_icon' />
                    <p>{e.name}</p>
                    <p>{e.new_price}Birr</p>
                    <button className='cartItem_quantity'>{cartItems[e.id]}</button>
                    <p>{e.new_price * cartItems[e.id]} Birr</p>
                    <img className='remove_icon' src= {remove_icon} onClick={()=>{
                        removeFromCart(e.id)
                    }} alt="" />
                </div>
                <hr /> 
             </div>
            }
            return null;
         })}
         <div className="cartItems_down">
            <div className="cartItems_total">
                <h1 className='total_tittle'>Cart Totals</h1>
                <div>
                    <div className="cartitems_total_item">
                        <p>Subtotal</p>
                        <p>{getTotalCartAmount()} Birr</p>
                    </div>
                    <hr />
                    <div className='cartitems_total_item'>
                        <p>Shipping Fee</p>
                        <p>Free</p>
                    </div>
                    <hr />
                    <div className='cartitems_total_item'>
                        <p>Total</p>
                        <h3>{getTotalCartAmount()}Birr</h3>
                    </div>

                </div>
                <button>PROCEED TO CHECKOUT</button>
            </div>
         </div>
    </div>
  )
}

export default Cartitems