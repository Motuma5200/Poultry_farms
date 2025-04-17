import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useParams } from 'react-router-dom';
import Breadcrum from '../components/Breadcrum/Breadcrum';
import ProductDisplay from '../components/productDisplay/ProductDisplay';

const Product = () => {
  const {allProducts} = useContext(ShopContext);
  const { productId } = useParams();

  console.log("Product ID:", productId); // Debugging log
  console.log("All Products:", allProducts); // Debugging log

  if (!allProducts || allProducts.length === 0) {
    return <div>Loading...</div>;
  }

  const product = allProducts.find((e) => e.id === productId);

  if (!product) {
    console.log("Product not found for ID:", productId); // Debugging log
    return <div>Product not found</div>;
  }

  return (
    <div className="product">
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
    </div>
  );
};

export default Product;