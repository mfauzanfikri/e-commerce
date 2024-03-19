import { ProductType } from "@/types/product-type";
import Product from "./product";

type Props = {
  products: ProductType[];
};

const ProductList = ({ products }: Props) => {
  return (
    <ul className="mx-2.5 flex flex-wrap items-start justify-center gap-5 lg:mx-0 lg:mt-8 xl:mt-10">
      {products.map((product) => {
        return (
          <li key={product.id} className="max-w-xs">
            <Product product={product} className="overflow-hidden rounded" />
          </li>
        );
      })}

      {products.length === 0 && (
        <li className="mb-64">We&apos;re sorry, product not found.</li>
      )}
    </ul>
  );
};

export default ProductList;
