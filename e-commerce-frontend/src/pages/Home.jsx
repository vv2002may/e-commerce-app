import React, { useCallback, useEffect, useState } from "react";
import { ENDPOINT } from "../config/endpoint";
import Item from "../components/Item";
import Filter from "../components/Filter";
import Select from 'react-select';

export default function Home() {
  const [items, setItems] = useState([]);
  const [categoryList, setCategoryList] = React.useState();
  const [FilterItem,setFilterItem]=useState(new Set())

  useEffect(() => {
    fetch(ENDPOINT + "user")
      .then((res) => res.json())
      .then((result) => {
        setItems(result.items);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  return (
    <div className="filter-item">
      <Filter setCategoryList={setCategoryList} setFilterItem={setFilterItem} />
      
      <div className="items">
        {items.map((item, index) => {
          if(!FilterItem.size || FilterItem.has(item.category))
          return <Item item={item} key={index} />;
        })}
      </div>
    </div>
  );
}
