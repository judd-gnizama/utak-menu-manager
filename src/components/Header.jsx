import React from "react";

const Header = () => {
  return (
    <div className=" bg-white">
      <div className="flex justify-between items-center p-2 max-width">
        <img className="h-9" src="/header-logo.png" alt="utak-brand" />
        <nav>
          <button className="button-1">View Client</button>
        </nav>
      </div>
    </div>
  );
};

export default Header;
