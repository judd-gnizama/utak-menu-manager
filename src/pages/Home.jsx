import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Search from "../components/Search";
import SearchResult from "../components/SearchResult";
import NewItemForm from "../components/NewItemForm";
import CategoryManager from "../components/CategoryManager";

const Home = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [showCategoryManager, setShowCategoryManager] = useState(false);

  return (
    <div className="home">
      <Header />
      <main className="flex flex-col gap-4">
        <section className="section  flex  gap-2">
          <Search />
          <button className="inline-flex items-center gap-1 button-2">
            <span className="material-symbols-outlined">filter_list</span>Filter
          </button>
        </section>
        <section className="section flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <button
                className="inline-flex items-center gap-1 button-1"
                onClick={() => setShowAdd(true)}
              >
                <span className="material-symbols-outlined">add</span>Add Item
              </button>
              <button
                className="inline-flex items-center gap-1 button-1"
                onClick={() => setShowCategoryManager(true)}
              >
                <span className="material-symbols-outlined">add</span>Add
                Category
              </button>
            </div>
            <div className="flex gap-2 self-end items-center">
              <label
                htmlFor="sort"
                className="border rounded-[3px] py-1 px-2 pl-3 text-[0.8rem]"
              >
                Sort by:
                <select name="sort" id="sort" className="ml-2 item">
                  <option value="latest">Latest</option>
                  <option value="latest">Oldest</option>
                  <option value="latest">Name</option>
                </select>
              </label>
              <span className="text-[0.8rem]">View by:</span>
              <span className="material-symbols-outlined">list</span>
              <span className="material-symbols-outlined">grid_view</span>
            </div>
          </div>
          <SearchResult />
        </section>
      </main>
      <Footer />
      {/* Modals */}
      <NewItemForm show={showAdd} setShow={setShowAdd} />
      <CategoryManager
        show={showCategoryManager}
        setShow={setShowCategoryManager}
      />
    </div>
  );
};

export default Home;
