export const formatPrice = (price: number) => {
  const formattedPrice = price.toLocaleString("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${formattedPrice} TL`;
};

export const formatProductCount = (count: number): string => {
  if (count < 100) return count.toString();
  if (count < 150) return "100+";
  if (count < 500) return "150+";
  if (count < 1000) return "500+";
  if (count < 1500) return "1000+";
  if (count < 2000) return "1500+";

  return `${Math.floor((count - 2000) / 500) * 500 + 2000}+`;
};
