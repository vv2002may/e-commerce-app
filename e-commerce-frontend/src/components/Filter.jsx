import React from "react";
import Select from "react-select";
import { ENDPOINT } from "../config/endpoint";

export default function Filter({ setFilterItem }) {
   const [categoryList, setCategoryList] = React.useState();
  React.useEffect(() => {
    fetch(ENDPOINT + "user")
      .then((res) => res.json())
      .then((result) => {
        const categorySet = new Set();
        const categoryList = [];

        result.items.forEach((item) => {
          categorySet.add(item.category);
        });


        Array.from(categorySet).forEach((item) => {
          categoryList.push({ value: item, label: item });
        });

        setCategoryList(categoryList); // Update the state with the entire list
      })
      .catch((err) => {
        alert(err);
      });
  }, []);
   
   function handleFilter(filter) {
      const filterSet = new Set();
      filter.map(item => {
         filterSet.add(item.value);
      })
      setFilterItem(filterSet);
   }
   
   return (
      <Select
        isMulti
        onChange={handleFilter}
         name="Filter"
         placeholder='Filter By '
        options={categoryList}
        className="basic-multi-select"
        classNamePrefix="select"
      ></Select>
   )
}
