import React, { useCallback, useEffect, useState } from "react";
import { ENDPOINT } from "../config/endpoint";
import CartItem from "../components/CartItem";

export default function Cart() {
  const [items, setItems] = useState([]);
  const [itemPrice, setItemPrice] = useState(0);

  useEffect(() => {
    fetch(ENDPOINT + "user/cart", {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
        setItems(result.items);
      })
      .catch(err => {
        alert(result)
    })
  }, []);

  if (items.length > 0) {
    return (
      <div className="cart">
        <div className="cart-items">
          {items.map((item, index) => {
            return (
              <CartItem item={item} setItemPrice={setItemPrice} key={index} />
            );
          })}
        </div>
        <div className="cart-checkout">
        <p>Subtotal [{items.length} items] : ${itemPrice.toFixed(2)}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="empty">
        <span className="material-symbols-outlined">hourglass</span>
      </div>
    );
  }
}
