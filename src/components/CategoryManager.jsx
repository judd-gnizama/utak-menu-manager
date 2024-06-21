import React, { useEffect, useState } from "react";
import FormModal from "./FormModal";
import { addCategory, getAllCategories } from "../firebase/CategoryController";

const CategoryManager = ({ show, setShow }) => {
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (categoryName) {
      try {
        const res = await addCategory({ categoryName });
        console.log(res);
        setError("");
        setShow(false);
      } catch (error) {
        setError(error.message);
      }
    } else {
      setError("Name cannot be empty");
    }
  };

  const handleCancel = () => {
    setShow(false);
  };

  useEffect(() => {
    const getCategories = async () => {
      setCategoryOptions(await getAllCategories());
    };
    getCategories();
  }, []);

  return (
    <FormModal heading={"Add Category"} show={show} setShow={setShow}>
      <div className="grid gap-2">
        <label className="font-bold">Category Name</label>
        <input
          name="item-category"
          id="item-category"
          type="text"
          placeholder="Enter Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="p-2 border rounded-md"
        />
        <datalist id="category-list">
          {categoryOptions
            ? categoryOptions.map((opt, index) => (
                <option key={index} value={opt}>
                  {opt}
                </option>
              ))
            : {}}
        </datalist>
      </div>
      {error && (
        <span className=" ml-0.5 text-red-400 text-sm rounded-lg block">{`Error: ${error}`}</span>
      )}
      <form onSubmit={handleSubmit} className="mt-2 flex gap-2 justify-end">
        <button type="submit" className="button-1 py-3">
          Create
        </button>
        <button type="button" onClick={handleCancel} className="button-2 py-3">
          Cancel
        </button>
      </form>
    </FormModal>
  );
};

export default CategoryManager;
