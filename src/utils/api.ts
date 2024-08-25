export const fetchProducts = async () => {
  const response = await fetch("/src/data.json");
  const data = await response.json();
  return data.products;
};

export const fetchCategories = async () => {
  const response = await fetch("/src/data.json");
  const data = await response.json();
  return data.categories;
};
