import { useEffect, useState } from "react";
import { db } from "../helpers/Db";
import type { CartItem, Guitar, GuitarID } from "../types";

export const useCart = () => {
  const initialCart = (): CartItem[] => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);

  function addToCart(iteam: Guitar) {
    const iteamExist = cart.findIndex((guitar) => guitar.id === iteam.id);
    if (iteamExist >= 0) {
      const updatedCart = [...cart];
      updatedCart[iteamExist].quantity++;
      setCart(updatedCart);
    } else {
      const newItem: CartItem = { ...iteam, quantity: 1 };
      setCart([...cart, newItem]);
    }
  }

  function removeToCart(id: GuitarID) {
    setCart((prevState) => prevState.filter((iteam) => iteam.id !== id));
  }

  function increaseQuantity(id: GuitarID) {
    const updatedCart = cart.map((iteam) => {
      if (iteam.id == id) {
        return {
          ...iteam,
          quantity: iteam.quantity + 1,
        };
      }
      return iteam;
    });
    setCart(updatedCart);
  }

  function decreseQuantity(id: GuitarID) {
    const updatedCart = cart.map((iteam) => {
      if (iteam.id == id && iteam.quantity > 1) {
        return {
          ...iteam,
          quantity: iteam.quantity - 1,
        };
      }
      return iteam;
    });
    setCart(updatedCart);
  }

  function cleanCart() {
    setCart([]);
  }

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const cartTotal = cart.reduce(
    (total, iteam) => total + iteam.quantity * iteam.price,
    0
  );

  return {
    data,
    cart,
    addToCart,
    removeToCart,
    increaseQuantity,
    decreseQuantity,
    cleanCart,
    cartTotal,
  };
};
