import { ProductType } from "@/types/product-type";
import { faker } from "@faker-js/faker";

type Config = {
  count: number;
  seed?: number;
};

const createRandomProduct = () => {
  return {
    name: faker.commerce.product(),
    categories: faker.commerce.department(),
    price: Number.parseFloat(
      faker.commerce.price({ min: 50000, max: 500000, dec: 3 }),
    ),
    stock: Math.floor(Math.random() * 50),
  };
};

export const generateProduct = (
  config: Config = { count: 1, seed: undefined },
) => {
  const { count, seed } = config;

  if (seed) {
    faker.seed(seed);
  }

  if (count < 1) return;

  const generatedProducts = faker.helpers.multiple(createRandomProduct, {
    count,
  });

  let id = 1;

  const products: ProductType[] = generatedProducts.map((p) => {
    const product = { id, ...p };

    id++;

    return product;
  });

  return products;
};
