
export const getRandomWishlistCategory = (wishItems: any[]): string | null => {
  if (!wishItems || wishItems.length === 0) {
    return null;
  }

  // Extract all unique categories from wishlist items
  const categories = Array.from(
    new Set(wishItems.map(item => item.category).filter(Boolean))
  );

  if (categories.length === 0) {
    return null;
  }

  // Select a random category
  const randomIndex = Math.floor(Math.random() * categories.length);
  return categories[randomIndex] as string;
};