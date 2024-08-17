import React, { useState } from "react";
import { ENDPOINT } from "../config/endpoint";

export default function Item({ item }) {
  const user = localStorage.getItem("name");
  function handleCartClick() {
    console.log('hi')
    fetch(ENDPOINT + "user/add-cart", {
      method: "POST",
      body: JSON.stringify({ itemId: item._id }),
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
        alert(result.message);
      });
  }

  return (
    <div className="item">
      <img src={item.image} />
      <div className="item-content">
        <p className="title">{item.title}</p>
        <p>${item.price}</p>
        <button
          style={{ cursor: user ? "pointer" : "not-allowed" }}
          onClick={handleCartClick}
          disabled={!user}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}
