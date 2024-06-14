import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Search from "../components/Search";
import SearchResult from "../components/SearchResult";
import FormModal from "../components/FormModal";

const Home = () => {
  return (
    <div className="home">
      <Header />
      <main className="flex flex-col gap-4">
        <section className="section  flex  gap-2">
          <Search />
          <button className="inline-flex items-center gap-1 button-2">
            <span className="material-symbols-outlined">filter_list</span>Filter
          </button>
          <button className="inline-flex items-center gap-1 button-1">
            <span className="material-symbols-outlined">add</span>Add
          </button>
        </section>
        <section className="section flex flex-col gap-2 items-center">
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
          <SearchResult />
        </section>
      </main>
      <Footer />
      <FormModal></FormModal>
    </div>
  );
};

export default Home;
