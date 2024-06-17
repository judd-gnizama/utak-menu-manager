import React, { useEffect, useState } from "react";
import FormModal from "./FormModal";
import { addItem, getAllItems } from "../firebase/ItemController";
import { addCategory, getAllCategories } from "../firebase/CategoryController";
import { getRandomString } from "../firebase/AuxFunctions";
import ChipInput from "./ChipInput";

const NewItemForm = ({ show, setShow }) => {
  const [itemFormData, setItemFormData] = useState({
    name: "",
    price: "",
    cost: "",
    stock: "",
    available: true,
    description: "",
    categories: [],
    var_options: [
      {
        _id: getRandomString(),
        var_group: "Size",
        variants: [
          {
            _id: getRandomString(),
            var_name: "Small",
            priceDelta: 0,
            costDelta: 0,
            available: true,
          },
          {
            _id: getRandomString(),
            var_name: "Medium",
            priceDelta: 500,
            costDelta: -200,
            available: true,
          },
          {
            _id: getRandomString(),
            _id: getRandomString(),
            var_name: "Large",
            priceDelta: -800,
            costDelta: 300,
            available: true,
          },
        ],
      },
      {
        _id: getRandomString(),
        var_group: "Toppings",
        variants: [
          {
            _id: getRandomString(),
            var_name: "Pepperoni",
            priceDelta: 120,
            costDelta: 20,
            available: true,
          },
          {
            _id: getRandomString(),
            var_name: "Ham",
            priceDelta: 300,
            costDelta: 100,
            available: true,
          },
          {
            _id: getRandomString(),
            var_name: "Cheese",
            priceDelta: 400,
            costDelta: 200,
            available: true,
          },
        ],
      },
    ],
  });

  const [categoryOptions, setCategoryOptions] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(itemFormData);
  };

  const handleAddVariation = () => {
    const newVariation = {
      _id: getRandomString(),
      var_group: "",
      variants: [
        {
          _id: getRandomString(),
          var_name: "",
          priceDelta: "",
          costDelta: "",
          available: true,
        },
      ],
    };
    setItemFormData({
      ...itemFormData,
      var_options: [...itemFormData.var_options, newVariation],
    });
  };

  const handleDeleteVariation = (variationId) => {
    const existingVariations = itemFormData.var_options;
    const filtered = existingVariations.filter(
      (item) => item._id !== variationId
    );
    setItemFormData({ ...itemFormData, var_options: filtered });
  };

  const handleChangeVariationName = (variationId, newVariationName) => {
    const newVariations = itemFormData.var_options.map((variation) => {
      if (variation._id === variationId) {
        variation.var_group = newVariationName;
      }
      return variation;
    });
    setItemFormData({ ...itemFormData, var_options: newVariations });
  };

  const handleAddVariant = (variationId) => {
    const newVariations = itemFormData.var_options.map((variation) => {
      if (variation._id === variationId) {
        variation.variants = [
          ...variation.variants,
          {
            _id: getRandomString(),
            var_name: "",
            priceDelta: "",
            costDelta: "",
            available: true,
          },
        ];
      }
      return variation;
    });

    setItemFormData({
      ...itemFormData,
      var_options: newVariations,
    });
  };

  const handleDeleteVariant = ({ variantId, variationId }) => {
    const newVariations = itemFormData.var_options.map((variation) => {
      if (variation._id === variationId) {
        const newVariants = variation.variants.filter(
          (variant) => variant._id !== variantId
        );
        variation.variants = newVariants;
      }
      return variation;
    });

    setItemFormData({
      ...itemFormData,
      var_options: newVariations,
    });
  };

  const handleChangeVariantName = (variationId, variantId, newVariantName) => {
    const newVariations = itemFormData.var_options.map((variation) => {
      if (variation._id === variationId) {
        const newVariant = variation.variants.map((variant) => {
          if (variant._id === variantId) {
            variant.var_name = newVariantName;
          }
          return variant;
        });
      }
      return variation;
    });
    setItemFormData({ ...itemFormData, var_options: newVariations });
  };
  const handleChangeVariantPriceDelta = (
    variationId,
    variantId,
    newVariantPriceDelta
  ) => {
    const newVariations = itemFormData.var_options.map((variation) => {
      if (variation._id === variationId) {
        const newVariants = variation.variants.map((variant) => {
          if (variant._id === variantId) {
            variant.priceDelta = newVariantPriceDelta;
          }
          return variant;
        });
        variation.variants = newVariants;
      }
      return variation;
    });
    setItemFormData({ ...itemFormData, var_options: newVariations });
  };
  const handleChangeVariantCostDelta = (
    variationId,
    variantId,
    newVariantCostDelta
  ) => {
    const newVariations = itemFormData.var_options.map((variation) => {
      if (variation._id === variationId) {
        const newVariants = variation.variants.map((variant) => {
          if (variant._id === variantId) {
            variant.costDelta = newVariantCostDelta;
          }
          return variant;
        });
        variation.variants = newVariants;
      }
      return variation;
    });
    setItemFormData({ ...itemFormData, var_options: newVariations });
  };
  const handleChangeVariantAvailable = (
    variationId,
    variantId,
    newVariantAvailable
  ) => {
    const newVariations = itemFormData.var_options.map((variation) => {
      if (variation._id === variationId) {
        const newVariants = variation.variants.map((variant) => {
          if (variant._id === variantId) {
            variant.available = newVariantAvailable;
          }
          return variant;
        });
        variation.variants = newVariants;
      }
      return variation;
    });
    setItemFormData({ ...itemFormData, var_options: newVariations });
  };

  const handleChangeCategory = (categories) => {
    console.log(categories);
    setItemFormData({ ...itemFormData, categories });
  };

  useEffect(() => {
    const getCategories = async () => {
      setCategoryOptions(await getAllCategories());
      await addCategory({ categoryName: "Unassigned" });
    };
    getCategories();
  }, []);

  // useEffect(() => {
  //   console.log(itemFormData);
  // }, [itemFormData]);

  return (
    <FormModal heading={"New Item"} show={show} setShow={setShow}>
      <form className="grid text-sm gap-6 mt-4 pr-2 pb-4">
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
              <label htmlFor="item-price" className="text-nowrap">
                Base Price
              </label>
              <input
                name="item-price"
                id="item-price"
                type="number"
                min="0"
                step="0.01"
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
              <label htmlFor="item-cost" className="text-nowrap">
                Base Cost
              </label>
              <input
                name="item-cost"
                id="item-cost"
                type="number"
                min="0"
                step="0.01"
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
                step="0.01"
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
          <ChipInput
            placeholder={"Press Enter to Add Category"}
            setParameter={handleChangeCategory}
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

        <div className="grid gap-2">
          <span className="flex justify-between">
            <label htmlFor="item-name" className="font-bold">
              Variations Options
            </label>
            <span>Optional</span>
          </span>

          <div className="grid gap-4">
            {itemFormData.var_options
              ? itemFormData.var_options.map((_variation, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-4 gap-2 border rounded-md p-3 relative"
                  >
                    <button
                      type="button"
                      onClick={() => handleDeleteVariation(_variation._id)}
                      className="material-symbols-outlined filled text-gray-300 p-2 absolute right-0"
                    >
                      close
                    </button>
                    <div className="flex items-center gap-2 col-span-2">
                      <label
                        htmlFor={"var-group-name" + _variation._id}
                        className="text-nowrap"
                      >
                        Variation Name
                      </label>
                      <input
                        name={"var-group-name" + _variation._id}
                        id={"var-group-name" + _variation._id}
                        type="text"
                        placeholder="E.g. Size"
                        value={_variation.var_group}
                        onChange={(e) =>
                          handleChangeVariationName(
                            _variation._id,
                            e.target.value
                          )
                        }
                        className="p-2 border rounded-md w-full"
                      />
                    </div>
                    {_variation.variants.map((_variant, index) => (
                      <div
                        key={index}
                        className="flex gap-3 col-start-1 ml-8 col-span-full "
                      >
                        <div className="flex items-center gap-1">
                          <input
                            name={"variant-name" + _variant._id}
                            id={"variant-name" + _variant._id}
                            placeholder={"Variant " + (index + 1)}
                            value={_variant.var_name}
                            onChange={(e) =>
                              handleChangeVariantName(
                                _variation._id,
                                _variant._id,
                                e.target.value
                              )
                            }
                            className="p-2 border rounded-md w-full"
                          />
                        </div>
                        <div className="flex items-center gap-1">
                          <label
                            htmlFor={"variant-priceAdj" + _variant._id}
                            className="text-nowrap"
                          >
                            Price Adj
                          </label>
                          <input
                            name={"variant-priceAdj" + _variant._id}
                            id={"variant-priceAdj" + _variant._id}
                            type="number"
                            value={_variant.priceDelta}
                            onChange={(e) =>
                              handleChangeVariantPriceDelta(
                                _variation._id,
                                _variant._id,
                                e.target.value
                              )
                            }
                            className="p-2 border rounded-md w-full"
                          />
                        </div>
                        <div className="flex items-center gap-1">
                          <label
                            htmlFor={"variant-costAdj" + _variant._id}
                            className="text-nowrap"
                          >
                            Cost Adj
                          </label>
                          <input
                            name={"variant-costAdj" + _variant._id}
                            id={"variant-costAdj" + _variant._id}
                            type="number"
                            value={_variant.costDelta}
                            onChange={(e) =>
                              handleChangeVariantCostDelta(
                                _variation._id,
                                _variant._id,
                                e.target.value
                              )
                            }
                            className="p-2 border rounded-md w-full"
                          />
                        </div>

                        <label
                          htmlFor={"variant-availability" + _variant._id}
                          className="inline-flex items-center gap-1 font-bold"
                        >
                          <input
                            type="checkbox"
                            name={"variant-availability" + _variant._id}
                            id={"variant-availability" + _variant._id}
                            checked={_variant.available}
                            onChange={(e) =>
                              handleChangeVariantAvailable(
                                _variation._id,
                                _variant._id,
                                e.target.checked
                              )
                            }
                          />
                          Available
                        </label>
                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteVariant({
                              variantId: _variant._id,
                              variationId: _variation._id,
                            })
                          }
                          className="material-symbols-outlined filled text-gray-300 p-2"
                        >
                          close
                        </button>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => handleAddVariant(_variation._id)}
                      className="inline-flex items-center justify-center border rounded-md ml-8 col-span-full p-0.5"
                    >
                      <span className="material-symbols-outlined">
                        keyboard_return
                      </span>
                      Add New Variant
                    </button>
                  </div>
                ))
              : {}}

            <button
              type="button"
              className="inline-flex items-center justify-center border rounded-md p-0.5"
              onClick={handleAddVariation}
            >
              <span className="material-symbols-outlined ">add</span>
              Add New Variation
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
            <button
              type="button"
              onClick={() => setShow(false)}
              className="button-2 py-3"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </FormModal>
  );
};

export default NewItemForm;
