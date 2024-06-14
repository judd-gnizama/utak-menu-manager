import React from "react";
import FormModal from "./FormModal";
import { addItem, getAllItems, initializeDB } from "../firebase/ItemController";

const NewItemForm = ({ show, setShow }) => {
  const handleSubmit = async () => {
    await getAllItems();
  };

  return (
    <FormModal heading={"New Item"} show={show} setShow={setShow}>
      <form action="" className="grid text-sm gap-6 mt-4">
        <div className="grid gap-2">
          <span className="flex justify-between">
            <label htmlFor="item-name" className="font-bold">
              Item Name
            </label>
            <span>Required</span>
          </span>
          <input
            name="item-name"
            id="item-name"
            type="text"
            placeholder="Enter item name"
            className="p-2 border rounded-md"
          />
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="item-price">Price</label>
              <input
                name="item-price"
                id="item-price"
                type="number"
                className="p-2 border rounded-md w-full"
              />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="item-cost">Cost</label>
              <input
                name="item-cost"
                id="item-cost"
                type="number"
                className="p-2 border rounded-md w-full"
              />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="item-stock">Stock</label>
              <input
                name="item-stock"
                id="item-stock"
                type="number"
                className="p-2 border rounded-md w-full"
              />
            </div>
          </div>
          <span className="flex justify-between">
            <label htmlFor="item-description" className="">
              Description
            </label>
            <span>Optional</span>
          </span>
          <textarea
            name="item-description"
            id="item-description"
            type="text"
            rows="7"
            placeholder="Enter a description..."
            className="p-2 border rounded-md w-full"
          />
        </div>
        <div className="grid gap-2">
          <span className="flex justify-between">
            <label htmlFor="item-name" className="font-bold">
              Set Category
            </label>
            <span>Required</span>
          </span>
          <select
            name="item-category"
            id="item-category"
            className="p-2 border rounded-md w-full"
            placeholder="Create or Search Category Name"
            defaultValue={"unassigned"}
          >
            <option value="">Create a category</option>
            <option value="appetizer">Appetizer</option>
            <option value="unassigned">Unassigned</option>
          </select>
        </div>
        <div className="grid gap-2">
          <span className="flex justify-between">
            <label htmlFor="item-name" className="font-bold">
              Set Variations
            </label>
            <span>Optional</span>
          </span>
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="item-price">Variation Name</label>
              <input
                name="item-price"
                id="item-price"
                type="number"
                className="p-2 border rounded-md w-full"
              />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="item-price">Price</label>
              <input
                name="item-price"
                id="item-price"
                type="number"
                className="p-2 border rounded-md w-full"
              />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="item-cost">Cost</label>
              <input
                name="item-cost"
                id="item-cost"
                type="number"
                className="p-2 border rounded-md w-full"
              />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="item-stock">Stock</label>
              <input
                name="item-stock"
                id="item-stock"
                type="number"
                className="p-2 border rounded-md w-full"
              />
            </div>
            <button
              type="button"
              className="col-span-full inline-flex items-center justify-center border rounded-md"
            >
              <span className="material-symbols-outlined">add</span>Add New
              Variant
            </button>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={handleSubmit}
            type="button"
            className="button-1 py-3"
          >
            Create Item
          </button>
          <button type="button" className="button-2 py-3">
            Cancel
          </button>
        </div>
      </form>
    </FormModal>
  );
};

export default NewItemForm;
