import React, { useContext } from 'react'
import './ProductDisplay.css'
import star_icon from '../Asset/star_icon.png'
import star_doll_icon from '../Asset/star_dull_icon.png'
import { ShopContext } from '../../context/ShopContext'

const ProductDisplay = (props) => {
    const {product} = props;
    const {addToCart} = useContext(ShopContext);
  return (
    <div className='productdisplay'>
        <div className="productdisplay_left">
           <img src= {product.image} alt="" className="product_image" />
        </div>

        <div className="productdisplay_right">

          <h2>{product.name}</h2>
          <div className="product_stars">
            <p>Rate</p>
            <img src= {star_icon} alt="" />
            <img src= {star_icon} alt="" />
            <img src=  {star_icon} alt="" />
            <img src=  {star_icon} alt="" />
            <img src=  {star_doll_icon} alt="" />
          </div>
          <div className="product_prices">

          <div className="procuct_oldprice">{product.old_price}Birr</div>
            <div className="product_newprice">{product.new_price}Birr</div>
            
          </div>

          <div className="product_description">
            This proct is very nutritioned food for health and wealth life
            The acces of this indigenous product is affordable dipending on 
            our people income.
          </div>

          <button className='cart_btn'onClick={()=>{addToCart(product.id)}} >Add To Cart</button>
        </div>
    </div>
  )
}

export default ProductDisplay