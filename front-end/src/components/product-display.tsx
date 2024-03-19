"use client";

import ProductList from "@/components/product-list";
import { ProductType } from "@/types/product-type";
import { ChangeEvent, useState } from "react";
import { FaSearch } from "react-icons/fa";

type Props = {
  initialProducts?: ProductType[];
};

type SearchState = {
  query: string | null;
  start: boolean;
};

const demoData: ProductType[] = [
  {
    id: 1,
    name: "Sausages",
    price: 151658,
    categories: "Computers",
    stock: 31,
  },
  {
    id: 2,
    name: "Bacon",
    price: 463504,
    categories: "Baby",
    stock: 0,
  },
  {
    id: 3,
    name: "Car",
    price: 381529,
    categories: "Music",
    stock: 2,
  },
  {
    id: 4,
    name: "Computer",
    price: 426893,
    categories: "Baby",
    stock: 10,
  },
  {
    id: 5,
    name: "Sausages",
    price: 131557,
    categories: "Toys",
    stock: 0,
  },
  {
    id: 6,
    name: "Gloves",
    price: 311644,
    categories: "Beauty",
    stock: 30,
  },
  {
    id: 7,
    name: "Fish",
    price: 142786,
    categories: "Movies",
    stock: 20,
  },
  {
    id: 8,
    name: "Tuna",
    price: 292424,
    categories: "Games",
    stock: 25,
  },
  {
    id: 9,
    name: "Ball",
    price: 240682,
    categories: "Electronics",
    stock: 44,
  },
  {
    id: 10,
    name: "Salad",
    price: 106872,
    categories: "Sports",
    stock: 30,
  },
  {
    id: 11,
    name: "Computer",
    price: 337108,
    categories: "Automotive",
    stock: 1,
  },
  {
    id: 12,
    name: "Bike",
    price: 223806,
    categories: "Electronics",
    stock: 25,
  },
  {
    id: 13,
    name: "Keyboard",
    price: 296435,
    categories: "Shoes",
    stock: 32,
  },
  {
    id: 14,
    name: "Keyboard",
    price: 109348,
    categories: "Shoes",
    stock: 46,
  },
  {
    id: 15,
    name: "Mouse",
    price: 437725,
    categories: "Beauty",
    stock: 18,
  },
  {
    id: 16,
    name: "Ball",
    price: 453838,
    categories: "Clothing",
    stock: 2,
  },
  {
    id: 17,
    name: "Gloves",
    price: 304434,
    categories: "Outdoors",
    stock: 10,
  },
  {
    id: 18,
    name: "Mouse",
    price: 335388,
    categories: "Music",
    stock: 47,
  },
  {
    id: 19,
    name: "Keyboard",
    price: 455656,
    categories: "Kids",
    stock: 5,
  },
  {
    id: 20,
    name: "Sausages",
    price: 218689,
    categories: "Jewelery",
    stock: 23,
  },
];

const initialSearchState: SearchState = {
  query: null,
  start: false,
};

// TODO: migrate data fetching to react-query
// !: data stock management is not implemented effectively yet
// TODO: implement data stock management

const ProductDisplay = ({ initialProducts = demoData }: Props) => {
  const [searchState, setSearcState] = useState(initialSearchState);
  const isFocus = searchState.start;
  const isSearching = searchState.query && searchState.query !== "";

  const products = isSearching
    ? initialProducts.filter((product) => {
        return product.name
          .toLowerCase()
          .includes(searchState.query!.toLowerCase());
      })
    : initialProducts;

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const value = target.value.trim();

    if (value === "")
      return setSearcState((prev) => {
        return { ...prev, query: null };
      });

    setSearcState((prev) => {
      return { ...prev, query: value };
    });
  };

  return (
    <div className="mt-5 pt-5 lg:mt-12">
      <div className="mx-2.5 mb-6 md:mx-0">
        <h2 className="text-center text-2xl font-bold">Products</h2>
        <div className="mt-5 flex items-center justify-center gap-1.5">
          <div
            className={`flex items-center gap-1.5 rounded border ${isFocus ? "border-blue-400" : "border-gray-400"} bg-white p-1.5`}
          >
            <span className="bg-white">
              <FaSearch className="text-gray-600" />
            </span>
            <input
              type="text"
              placeholder="search product"
              className="bg-inherit focus:outline-none"
              onChange={handleChange}
              onFocus={() => {
                setSearcState((prev) => {
                  return { ...prev, start: true };
                });
              }}
              onBlur={() => {
                setSearcState((prev) => {
                  return { ...prev, start: false };
                });
              }}
            />
          </div>
        </div>
      </div>
      <ProductList products={products} />
    </div>
  );
};

export default ProductDisplay;
