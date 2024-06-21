import React, { useEffect, useState } from "react";

const ChipInput = ({ placeholder, setParameter }) => {
  const [chips, setChips] = useState([]);
  const [inputCategory, setInputCategory] = useState("");
  const [error, setError] = useState("");

  const handleKeyUp = (e) => {
    const category = inputCategory.trim();
    if (e.key == "Enter") {
      if (category) {
        if (!chips.includes(category)) {
          setChips([...chips, category]);
          setParameter([...chips, category]);
          setInputCategory("");
          setError("");
        } else {
          setError("Category already in list");
        }
      }
    }
  };

  const handleChange = (event) => {
    const _input = event.target.value;
    setInputCategory(_input);
    setError("");
  };

  const handleRemoveChip = (event, chipName) => {
    const newChips = chips.filter((chip) => chip !== chipName);
    setChips(newChips);
  };

  const handleRemoveAll = () => {
    setChips([]);
    setError("");
  };

  return (
    <div>
      <div className="border border-gray-300 rounded-lg p-2 flex gap-2">
        <ul className="flex gap-2 flex-wrap flex-1">
          {chips
            ? chips.map((chip, index) => (
                <li
                  key={index}
                  className="bg-[var(--primary-color-light)] text-black p-1 px-3 rounded-full flex text-nowrap gap-2 items-center "
                >
                  {chip}
                  <button
                    type="button"
                    onClick={(e) => handleRemoveChip(e, chip)}
                    className="material-symbols-outlined p-0.5 bg-[var(--neutral-offwhite)] text-black rounded-full text-[0.7rem]"
                  >
                    close
                  </button>
                </li>
              ))
            : {}}
          <input
            type="search"
            name="category-chip"
            id="category-chip"
            list="category-list"
            // placeholder={placeholder}
            value={inputCategory}
            onChange={handleChange}
            onKeyUp={handleKeyUp}
            className="p-1 flex-1 border-none outline-none"
          />
        </ul>
      </div>
      <div className="flex justify-between">
        <span className="text-red-400 text-[0.8rem]">{error}</span>
        <button
          onClick={handleRemoveAll}
          type="button"
          className="font-bold text-[var(--primary-color)]"
        >
          Remove all
        </button>
      </div>
    </div>
  );
};

export default ChipInput;
