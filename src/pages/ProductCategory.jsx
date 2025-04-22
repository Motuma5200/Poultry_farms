import React, { useContext, useState, useEffect } from 'react';
import './CSS/ProductCategory.css';
import { ShopContext } from "../context/ShopContext";
import Item from '../components/items/Item';
import dropdown_icon from '../components/Asset/dropdown_icon.png';
import right_arrow_icon from '../components/Asset/arrow.png'; // Add your arrow icon here

const ProductCategory = (props) => {
  const { allProducts } = useContext(ShopContext); // Correct variable name
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0); // Track current banner index

  // Automatically swap banners
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % props.banner.length);
    }, 5000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [props.banner]);

  // Manual swap to the next banner
  const handleNextBanner = () => {
    setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % props.banner.length);
  };

  return (
    <div className='product_category'>
      <div className="product_banner_container">
        <img
          className='product_banner'
          src={props.banner[currentBannerIndex]}
          alt={`Banner ${currentBannerIndex + 1}`}
        />
        <button className="next_banner_button" onClick={handleNextBanner}>
          <img src={right_arrow_icon} alt="Next" />
        </button>
      </div>

      <div className="productCategory_sort_index">
        <p>
          <span>Showing 1-8 </span> out of {allProducts.length} products
        </p>
        <div className="product_category_sort">
          Sort by  <select className='selectSort' name="sorting" id="sort">
                    <option value="name">A - Z</option>  
                    <option value="Priceup">Price Up</option> 
                    <option value="pricedown">Price Down</option> 
                    <option value="latest">Latest</option> 
                    <option value="popular">Popular</option>
                  </select>
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