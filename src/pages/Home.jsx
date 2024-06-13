import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Search from "../components/Search";

const Home = () => {
  return (
    <div className="home">
      <Header />
      <main className="bg-white max-width w-full p-4 rounded-lg">
        <Search />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
