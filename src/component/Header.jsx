import React from "react";
import { FaReact } from "react-icons/fa6";

function Header() {
  return (
    <header className="header bg-gray-900 p-10 container mx-auto border-b border-dashed border-teal-900 rounded-tl-xl rounded-tr-xl">
      <h2 className="uppercase font-semibold text-teal-500 tracking-wider flex gap-2 items-center">
        <span><FaReact /></span>
        <span>Todo App</span>
      </h2>
    </header>
  );
}

export default Header;
