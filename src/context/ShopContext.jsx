import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [allProducts, setAllProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});

  // Fetch products from the backend
  useEffect(() => {
    fetch("http://localhost/poultry/products.php")
      .then((response) => response.json())
      .then((data) => {
        setAllProducts(data);
        // Initialize cart items
        const cart = {};
        data.forEach((product) => {
          cart[product.id] = 0;
        });
        setCartItems(cart);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);


  // Fetch cart items from the backend

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch("http://localhost/poultry/getCart.php");
        const data = await response.json();
        console.log(data);
        const cart = {};
        data.forEach((item) => {
          cart[item.product_id] = item.quantity;
        });
        setCartItems(cart);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
  
    fetchCartItems();
  }, []);


  const addToCart = async (itemId) => {
    try {
      const response = await fetch("http://localhost/poultry/addToCart.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: itemId, quantity: 1 }),
        
      });
      const result = await response.json();
      console.log(result);
      if (result.result === "Item added to cart") {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };


  const removeFromCart = async (itemId) => {
    try {
      const response = await fetch("http://localhost/poultry/removeFromCart.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: itemId }),
      });
      const result = await response.json();
      console.log(result);
      if (result.result === "Item updated in cart") {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = allProducts.find((product) => product.id === item);
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const getTotalCartItem = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const contextValue = {
    getTotalCartItem,
    getTotalCartAmount,
    allProducts,
    cartItems,
    addToCart,
    removeFromCart,
  };

  return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;