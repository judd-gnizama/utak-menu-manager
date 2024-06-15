import React, { useEffect, useState } from "react";
import FormModal from "./FormModal";
import { addItem, getAllItems } from "../firebase/ItemController";
import { addCategory, getAllCategories } from "../firebase/CategoryController";

const NewItemForm = ({ show, setShow }) => {
  const [itemFormData, setItemFormData] = useState({
    name: "",
    price: "",
    cost: "",
    stock: "",
    available: true,
    description: "",
    category: "Unassigned",
    var_options: [],
  });

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [variation, setVariation] = useState("");

  const handleSubmit = async () => {
    console.log(itemFormData);
    console.log(await getAllCategories());
  };

  const handleAddVariation = () => {
    if (variation) {
      const existVariation = itemFormData.var_options?.filter(
        (opt) => opt.name === variation
      );
      console.log(existVariation);
      if (existVariation.length <= 0)
        setItemFormData({
          ...itemFormData,
          var_options: [
            ...itemFormData.var_options,
            {
              name: variation,
              variants: [
                {
                  variantName: "",
                  variantPrice: "",
                  variantCost: "",
                },
              ],
            },
          ],
        });
    }
    console.log(itemFormData);
  };

  const handleCreateCategory = async () => {
    await addCategory({ categoryName: "main cdourse" });
  };

  useEffect(() => {
    const getCategories = async () => {
      setCategoryOptions(await getAllCategories());
      await addCategory({ categoryName: "Unassigned" });
    };
    getCategories();
  }, []);

  return (
    <FormModal heading={"New Item"} show={show} setShow={setShow}>
      <form action="" className="grid text-sm gap-6 mt-4 pr-2">
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
            value={itemFormData.name}
            onChange={(e) =>
              setItemFormData({ ...itemFormData, name: e.target.value })
            }
            placeholder="Enter item name"
            className="p-2 border rounded-md"
          />
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="item-price">Base Price</label>
              <input
                name="item-price"
                id="item-price"
                type="number"
                min="0"
                value={itemFormData.price}
                onChange={(e) =>
                  setItemFormData({
                    ...itemFormData,
                    price: e.target.value,
                  })
                }
                className="p-2 border rounded-md w-full"
              />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="item-cost">Base Cost</label>
              <input
                name="item-cost"
                id="item-cost"
                type="number"
                min="0"
                value={itemFormData.cost}
                onChange={(e) =>
                  setItemFormData({
                    ...itemFormData,
                    cost: e.target.value,
                  })
                }
                className="p-2 border rounded-md w-full"
              />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="item-stock">Stock</label>
              <input
                name="item-stock"
                id="item-stock"
                type="number"
                min="0"
                value={itemFormData.stock}
                onChange={(e) =>
                  setItemFormData({
                    ...itemFormData,
                    stock: e.target.value,
                  })
                }
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
            value={itemFormData.description}
            onChange={(e) =>
              setItemFormData({ ...itemFormData, description: e.target.value })
            }
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
            value={itemFormData.category}
            onChange={(e) =>
              setItemFormData({ ...itemFormData, category: e.target.value })
            }
          >
            {categoryOptions
              ? categoryOptions.map((opt, index) => (
                  <option key={index} value={opt}>
                    {opt}
                  </option>
                ))
              : {}}
          </select>
          <p className="text-[0.75rem] ml-1">
            Missing a category?{" "}
            <a
              onClick={handleCreateCategory}
              className="font-bold text-[var(--primary-color)] cursor-pointer"
            >
              Add category
            </a>
          </p>
        </div>
        <div className="grid gap-2">
          <span className="flex justify-between">
            <label htmlFor="item-name" className="font-bold">
              Variations Options
            </label>
            <span>Optional</span>
          </span>
          <ul className="">
            {itemFormData.var_options
              ? itemFormData.var_options.map((variant, index) => (
                  <li key={index} className="grid grid-cols-[2fr_1fr_1fr_1fr]">
                    <label
                      htmlFor={"var-group-name" + index}
                      className="inline-flex items-center gap-2"
                    >
                      Name
                      <input
                        name={"var-group-name" + index}
                        id={"var-group-name" + index}
                        type="text"
                        placeholder="E.g. Size"
                        value={variant.name}
                        onChange={(e) =>
                          setItemFormData({
                            ...itemFormData,
                            var_options: [...itemFormData.var_options, {}],
                          })
                        }
                        className="p-2 border rounded-md w-full"
                      />
                    </label>
                  </li>
                ))
              : {}}
          </ul>
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4">
            <div className="flex items-center gap-2 col-span-2">
              <label htmlFor="var-group-name">Option Name</label>
              <input
                name="var-group-name"
                id="var-group-name"
                type="text"
                placeholder="E.g. Size"
                value={variation}
                onChange={(e) => setVariation(e.target.value)}
                className="p-2 border rounded-md w-full"
              />
              <button
                type="button"
                onClick={handleAddVariation}
                className="button-2 rounded-[3px]"
              >
                Add
              </button>
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
        <div className="flex justify-between gap-2">
          <label
            htmlFor="availability"
            className="inline-flex items-center gap-2 font-bold"
          >
            <input
              type="checkbox"
              name="availability"
              id="availability"
              checked={itemFormData.available}
              onChange={(e) =>
                setItemFormData({
                  ...itemFormData,
                  available: e.target.checked,
                })
              }
              className="ml-2 scale-110"
            />
            Item Available
          </label>
          <div className="flex gap-2">
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
        </div>
      </form>
    </FormModal>
  );
};

export default NewItemForm;
