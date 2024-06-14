import React from "react";
import FormModal from "./FormModal";

const NewItemForm = ({ show, setShow }) => {
  return (
    <div className="">
      <FormModal heading={"New Item"} show={show} setShow={setShow}>
        <form action="" className="text-sm">
          <div className="">
            <span className="flex justify-between">
              <label htmlFor="">Item Name</label>
              <span>Required</span>
            </span>
            <input
              type="text"
              placeholder="Enter item name"
              className="p-2 border rounded-md"
            />
          </div>
        </form>
      </FormModal>
    </div>
  );
};

export default NewItemForm;
