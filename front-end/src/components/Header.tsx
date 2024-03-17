"use client";

import Link from "next/link";
import { useState } from "react";
import { FaLocationDot, FaCartShopping, FaBurger } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="container mx-auto py-4 lg:py-5">
      <div className="relative flex justify-between px-4">
        <div className="hidden items-center text-xl lg:flex">
          <p className="flex items-center justify-center gap-1">
            <span>
              <FaLocationDot />
            </span>
            ID
          </p>
        </div>
        <div className="lg:absolute lg:left-1/2 lg:-translate-x-1/2">
          <Link href={"/"}>
            <p className="text-xl font-bold lg:text-3xl">E-Commerce</p>
          </Link>
        </div>
        <div className="flex items-center gap-2.5">
          <button className="hover:text-gray-700 lg:text-xl">
            <FaCartShopping />
          </button>
          <button
            className="text-xl hover:text-gray-700 md:hidden"
            onClick={() => setOpen((prev) => !prev)}
          >
            <RxHamburgerMenu />
          </button>
        </div>
      </div>
      <nav
        className={`${!open && "hidden"} px-4 pt-5 transition-all duration-75 md:block md:pt-8`}
      >
        <ul className="flex flex-col gap-2.5 font-light md:flex-row md:justify-center md:gap-8">
          <li className="hover:text-gray-700" onClick={() => setOpen(false)}>
            <Link className="block" href={"#home"}>
              Home
            </Link>
          </li>
          <li className="hover:text-gray-700" onClick={() => setOpen(false)}>
            <Link className="block" href={"#highlights"}>
              Highlights
            </Link>
          </li>
          <li className="hover:text-gray-700" onClick={() => setOpen(false)}>
            <Link className="block" href={"#products"}>
              Products
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
