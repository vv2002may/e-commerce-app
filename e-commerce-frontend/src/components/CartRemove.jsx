import React from "react";
import { ENDPOINT } from "../config/endpoint";
export default function CartRemove({ itemId }){
   
   function handleRemoveButton() {

      fetch(ENDPOINT + "user/cart-remove", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({itemId}),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.success) {
            alert(result.message);
             window.location.href='/cart'
          } else {
            alert(result.message);
          }
        });
   }
   
   return (
      <button onClick={handleRemoveButton}>Remove From Cart</button>
   )
}
