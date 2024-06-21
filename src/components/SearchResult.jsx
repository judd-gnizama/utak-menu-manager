import React, { useContext, useEffect, useState } from "react";
import { getAllItems } from "../firebase/ItemController";
import { getAllCategories } from "../firebase/CategoryController";

const SearchResult = () => {
  const [itemList, setItemList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  const getItemsFromCategory = (categoryName) => {
    return itemList.filter((item) => item.name === categoryName);
  };

  useEffect(() => {
    const getItems = async () => {
      const items = await getAllItems();
      setItemList(items);
    };

    const getCategories = async () => {
      const categories = await getAllCategories();
      setCategoryList(categories);
    };
    getItems();
    getCategories();
  }, []);

  return (
    <div>
      <div>
        {categoryList
          ? categoryList.map((category, index) => (
              <section key={index}>
                <h1 className="text-5rem font-bold">{category}</h1>
                {/* <ol>
                  {itemList ? itemList.map((item) => <li>{item.name}</li>) : {}}
                </ol> */}
              </section>
            ))
          : {}}
      </div>
    </div>
  );
};

export default SearchResult;
