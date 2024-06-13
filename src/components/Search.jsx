import React, { useState } from "react";

const Search = () => {
  const [search, setSearch] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(search);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="inline-flex w-full bg-[var(--neutral-offwhite)] rounded-full p-2 pl-10"
      />
      <span className="material-symbols-outlined absolute top-1/2 -translate-x-[50%] -translate-y-[50%] left-6 text-gray-400">
        search
      </span>
      {search && (
        <button
          type="button"
          onClick={() => setSearch("")}
          className="material-symbols-outlined absolute top-[50%] -translate-x-[50%] -translate-y-[50%] right-0 text-gray-400"
        >
          close
        </button>
      )}
    </form>
  );
};

export default Search;
