import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [allProducts, setAllProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});

  // Fetch products and cart items
  useEffect(() => {
    const fetchProductsAndCart = async () => {
      try {
        // Fetch products
        const productsResponse = await fetch("http://localhost/poultry/fetchProducts.php");
        const productsData = await productsResponse.json();
        console.log("All Products:", productsData);
        setAllProducts(productsData);

        // Initialize cart items
        const initialCart = {};
        productsData.forEach((product) => {
          initialCart[product.id] = 0;
        });
        setCartItems(initialCart);

        // Fetch cart items
        const cartResponse = await fetch("http://localhost/poultry/getCart.php");
        const cartData = await cartResponse.json();
        console.log("Cart data:", cartData);

        // Update cart items with quantities from the backend
        const updatedCart = { ...initialCart };
        cartData.forEach((item) => {
          updatedCart[item.product_id] = item.quantity;
        });
        setCartItems(updatedCart);

        console.log("Updated Cart Items:", updatedCart);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProductsAndCart();
  }, []);

  const addToCart = async (itemId, sessionId) => {
    try {
      const response = await fetch("http://localhost/poultry/addToCart.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ product_id: itemId, quantity: 1, session_id: sessionId }),
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
        const itemInfo = allProducts.find((product) => product.id === parseInt(item));
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[item];
        }
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