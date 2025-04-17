import React, { useContext } from 'react';
import './CSS/ProductCategory.css';
import { ShopContext } from "../context/ShopContext";
import Item from '../components/items/Item';
import dropdown_icon from '../components/Asset/dropdown_icon.png';

const ProductCategory = (props) => {
  const { allProducts } = useContext(ShopContext); // Correct variable name

  return (
    <div className='product_category'>
      <img className='product_banner' src={props.banner} alt="" />

      <div className="productCategory_sort_index">
        <p>
          <span>Showing 1-8 </span> out of {allProducts.length} products
        </p>
        <div className="product_category_sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>

      <div className="shopProduct_category">
        {allProducts.map((item, i) => {
          if (props.category === item.category) {
            return (
              <Item
                key={i}
                id={item.id}
                name={item.name}
                image={item.image}
                weight={item.weight}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            );
          } else {
            return null;
          }
        })}
      </div>

      <div className="product_loadmore">
        Explore More
      </div>
    </div>
  );
};

export default ProductCategory;