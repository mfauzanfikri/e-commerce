import { ProductType } from "@/components/product";
import { faker } from "@faker-js/faker";

export const generateProductsData = (n: number = 10) => {
  const products: ProductType[] = [];

  for (let i = 0; i < n; i++) {
    const product: ProductType = {
      id: i + 1,
      name: faker.commerce.product(),
      price: Number.parseInt(
        faker.commerce.price({ min: 80000, max: 500000, dec: 0 }),
      ),
      categories: faker.commerce.department(),
      stock: Math.floor(Math.random() * 50),
    };

    products.push(product);
  }

  return products;
};
