import React, { useState } from "react";

const FormModal = ({ children }) => {
  const [show, setShow] = useState(true);

  return (
    <div
      className={`absolute bg-gray-500 bg-opacity-70 w-full h-full z-40 centered-element flex justify-center items-center ${
        show ? "" : "hidden"
      }`}
      onClick={() => setShow(false)}
    >
      <div
        className="grid bg-white rounded-lg p-4 max-w-2xl h-full max-h-[75%] overflow-hidden"
        onClick={(e) => e.stopPropagation()} // stop from exiting
      >
        <FormModalHeader heading="Heading" setShow={setShow} />
        <div className="overflow-y-scroll">{children}</div>
      </div>
    </div>
  );
};

const FormModalHeader = ({ heading, setShow }) => {
  return (
    <div className="flex flex-col gap-2 mb-2">
      <span className="text-lg font-bold relative">
        {heading}
        <button
          type="button"
          onClick={() => setShow(false)}
          className="material-symbols-outlined absolute right-0 top-[50%] -translate-y-1/2 text-gray-400"
        >
          close
        </button>
      </span>
      <hr className="border-gray-300" />
    </div>
  );
};

export default FormModal;
