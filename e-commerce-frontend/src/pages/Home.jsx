import React, { useCallback, useEffect, useState } from "react";
import { ENDPOINT } from "../config/endpoint";
import Item from "../components/Item";

export default function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(ENDPOINT + "user")
      .then((res) => res.json())
      .then((result) => {
        setItems(result.items);
      })
      .catch(err => {
      alert(err)
    })
  }, []);

  return (
    <div className="items">
      {items.map((item, index) => {
        return (
          <Item item={item} key={index} />
        );
      })}
    </div>
  );
}
