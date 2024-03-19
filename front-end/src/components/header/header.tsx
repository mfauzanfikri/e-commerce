"use client";

import Link from "next/link";
import { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import Cart from "./cart";
import ScrollIntoView from "react-scroll-into-view";

const Header = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <header className="fixed z-10 w-full bg-white py-4 lg:py-5">
      <div className="container mx-auto">
        <div className="flex justify-between px-4">
          <div className="hidden items-center text-xl lg:flex">
            <p className="flex items-center justify-center gap-1">
              <span>
                <FaLocationDot />
              </span>
              ID
            </p>
          </div>
          <div>
            <Link href={"/"}>
              <p className="text-xl font-bold lg:text-3xl">E-Commerce</p>
            </Link>
          </div>
          <div className="flex items-center gap-2.5">
            <Cart />
            <button
              className="text-xl hover:text-gray-700 lg:hidden"
              onClick={handleToggle}
            >
              <RxHamburgerMenu />
            </button>
          </div>
        </div>
        {/* nav-items */}
        <nav
          className={`${!open && "hidden"} px-4 pt-5 transition-all duration-75 md:pt-8 lg:block`}
        >
          <ul className="flex flex-col gap-2.5 font-light lg:flex-row lg:justify-center lg:gap-8">
            <li className="hover:text-gray-700" onClick={handleClose}>
              <ScrollIntoView
                selector="#home"
                scrollOptions={{
                  block: "start",
                }}
              >
                <button>Home</button>
              </ScrollIntoView>
            </li>
            <li className="hover:text-gray-700" onClick={handleClose}>
              <ScrollIntoView
                selector="#highlights"
                scrollOptions={{ block: "center" }}
              >
                <button>Highlights</button>
              </ScrollIntoView>
            </li>
            <li className="hover:text-gray-700" onClick={handleClose}>
              <ScrollIntoView
                selector="#products"
                scrollOptions={{ block: "start" }}
              >
                <button>Products</button>
              </ScrollIntoView>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
