"use client";

import GlobalBanner from "@/components/shared/globalBanner";
import { getRandomWishlistCategory } from "@/components/ui/recommendations";
import { useWishItems } from "@/components/utils/wishItems";
import { useFilteredCakes } from "@/hooks/useFilteredCakes";
import cakeService from "@/services/product.service";
import { RootState } from "@/store";
import { ICartItem } from "@/store/features/cartSlice";
import { addToCart } from "@/store/features/cartSlice";
import {
  addTowish,
  clearWish,
  removeFromWish,
} from "@/store/features/wishList";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Heart,
  Plus,
  Share2,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
export const dataFormat = async (item): Promise => {
  try {
    const dataResponse = await cakeService.getCakeById(item.id);
    const detailedCakeData = dataResponse?.data || item;

    console.log({ detailedCakeData });

    // Calculate discount
    const discountAmount =
      item.discount && item.discount > 0
        ? (item.servingSize[0].price * item.discount) / 100
        : 0;

    const discountedPrice = item.servingSize[0].price - discountAmount;

    // Format the cart item
    const cakeData = {
      cake: detailedCakeData,
      id: item.id,
      title: item.name,
      weight: item.servingSize[0].weight,
      priceRegular: item.servingSize[0].price,
      priceWithDiscount: discountedPrice,
      flavor: {},
      addons: [],
      quantity: 1,
      totalPrice: discountedPrice,
      img: item.thumbImage.url,
      discount: item.discount || 0,
    };

    return cakeData;
  } catch (error) {
    console.error("Error formatting cake data:", error);

    // Fallback to basic data if API call fails
    const discountAmount =
      item.discount && item.discount > 0
        ? (item.servingSize[0].price * item.discount) / 100
        : 0;

    const discountedPrice = item.servingSize[0].price - discountAmount;

    return {
      cake: item,
      id: item.id,
      title: item.name,
      weight: item.servingSize[0].weight,
      priceRegular: item.servingSize[0].price,
      priceWithDiscount: discountedPrice,
      flavor: {},
      addons: [],
      quantity: 1,
      totalPrice: discountedPrice,
      img: item.thumbImage.url,
      discount: item.discount || 0,
    };
  }
};
export default function WishlistPage() {
  const dispatch = useDispatch();
  const wishItems = useWishItems();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // State management
  const [selectedItems, setSelectedItems] = useState<ICartItem[]>([]);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Check if item exists in cart
  const isInCart = (id: string) => {
    return cartItems.some((item) => item.id === id);
  };

  // Handle select all toggle
  useEffect(() => {
    if (isSelectAll) {
      setSelectedItems([...wishItems]);
    } else {
      setSelectedItems([]);
    }
  }, [isSelectAll, wishItems]);

  // Update select all state when items change
  useEffect(() => {
    if (selectedItems.length === wishItems.length && wishItems.length > 0) {
      setIsSelectAll(true);
    } else {
      setIsSelectAll(false);
    }
  }, [selectedItems, wishItems]);

  // Toggle individual item selection
  const toggleSelectItem = (item: ICartItem) => {
    setSelectedItems((prev) =>
      prev.some((i) => i.id === item.id)
        ? prev.filter((i) => i.id !== item.id)
        : [...prev, item]
    );
  };

  // Remove item from wishlist
  const handleRemoveFromWishlist = (id: string) => {
    dispatch(removeFromWish(id));
    toast.success("Item removed from wishlist");
  };

  // Remove selected items
  const handleRemoveSelected = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    selectedItems.forEach((item) => {
      dispatch(removeFromWish(item.id));
    });
    setSelectedItems([]);
    toast.success(`${selectedItems.length} items removed from wishlist`);
  };

  const handleAddToCart = async (item: ICartItem) => {
    try {
      // Check if item already exists in cart
      if (isInCart(item.id)) {
        toast.info(`${item.title} is already in your cart`, {
          toastId: `duplicate-${item.id}`, // Prevent duplicate toasts
        });
        return;
      }

      // Show loading indicator
      const toastId = toast.loading(`Adding ${item.title} to cart...`);

      // Format the item data
      const formattedItem = await dataFormat(item);

      // Dispatch to Redux store
      dispatch(addToCart(formattedItem));

      // Update toast to success
      toast.update(toastId, {
        render: `${item.title} added to cart`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
      });
    } catch (error) {
      console.error("Error adding item to cart:", error);
      toast.error(`Failed to add ${item.title} to cart`, {
        autoClose: 3000,
      });
    }
  };

  // Add selected items to cart
  const handleAddSelectedToCart = async () => {
    if (selectedItems.length === 0) {
      toast.info("No items selected");
      return;
    }

    setIsAddingToCart(true);
    const toastId = toast.loading(
      `Adding ${selectedItems.length} item${
        selectedItems.length > 1 ? "s" : ""
      } to cart...`
    );

    try {
      // Process items in parallel for better performance
      const results = await Promise.allSettled(
        selectedItems.map(async (item) => {
          if (!isInCart(item.id)) {
            const formattedItem = await dataFormat(item);
            dispatch(addToCart(formattedItem));
            return { success: true, id: item.id };
          }
          return { success: false, id: item.id, reason: "already_in_cart" };
        })
      );

      // Analyze results
      const addedItems = results.filter(
        (r) => r.status === "fulfilled" && r.value.success
      ).length;
      const skippedItems = results.length - addedItems;

      // Show appropriate success message
      if (addedItems > 0) {
        toast.update(toastId, {
          render: `Successfully added ${addedItems} item${
            addedItems > 1 ? "s" : ""
          } to cart${skippedItems > 0 ? ` (${skippedItems} skipped)` : ""}`,
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } else {
        toast.update(toastId, {
          render: "All selected items were already in your cart",
          type: "info",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error adding items to cart:", error);
      toast.update(toastId, {
        render: "Failed to add items to cart",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setIsAddingToCart(false);
    }
  };
  return (
    <>
      <GlobalBanner title="My Cake Wishlist" />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/gallery"
            className="text-gray-800 hover:text-black inline-flex items-center group"
          >
            <ArrowLeft className="h-4 w-4 mr-1 transition-transform group-hover:-translate-x-1" />
            <span className="border-b border-transparent group-hover:border-gray-800">
              Back to Cake Gallery
            </span>
          </Link>
        </div>

        {/* Wishlist Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">
              My Cake Wishlist
            </h1>
            <p className="text-gray-600">
              {wishItems.length} {wishItems.length === 1 ? "item" : "items"}
            </p>
          </div>
        </div>

        {/* Wishlist Content */}
        {wishItems.length > 0 ? (
          <div className="mb-16">
            {/* Modern Card Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {wishItems.map((item) => (
                <WishlistItemCard
                  key={item.id}
                  item={item}
                  isSelected={selectedItems.some((i) => i.id === item.id)}
                  isInCart={isInCart(item.id)}
                  onToggleSelect={() => toggleSelectItem(item)}
                  onRemove={() => handleRemoveFromWishlist(item.id)}
                  onAddToCart={() => handleAddToCart(item)}
                />
              ))}
            </div>

            {/* Bulk Actions Footer */}
            <BulkActionsFooter
              isSelectAll={isSelectAll}
              selectedCount={selectedItems.length}
              isAddingToCart={isAddingToCart}
              onToggleSelectAll={() => setIsSelectAll(!isSelectAll)}
              onRemoveSelected={handleRemoveSelected}
              onAddSelectedToCart={handleAddSelectedToCart}
            />
          </div>
        ) : (
          <EmptyWishlistState />
        )}
      </div>
    </>
  );
}

// Component for individual wishlist item card
const WishlistItemCard = ({
  item,
  isSelected,
  isInCart,
  onToggleSelect,
  onRemove,
  onAddToCart,
}: {
  item: ICartItem;
  isSelected: boolean;
  isInCart: boolean;
  onToggleSelect: () => void;
  onRemove: () => void;
  onAddToCart: () => void;
}) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100">
      <div className="flex flex-col sm:flex-row">
        {/* Checkbox and Image */}
        <div className="relative sm:w-1/3">
          <div className="absolute top-3 left-3 z-10">
            <label className="inline-flex items-center justify-center w-6 h-6 bg-white rounded-full shadow-sm cursor-pointer">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={onToggleSelect}
                className="sr-only peer"
              />
              <div className="w-4 h-4 rounded-full border-2 border-gray-300 peer-checked:border-0 peer-checked:bg-gray-800 peer-checked:text-white flex items-center justify-center">
                {isSelected && <Check className="h-3 w-3 text-white" />}
              </div>
            </label>
          </div>

          <div className="relative h-48 sm:h-full w-full">
            <Image
              src={item?.thumbImage.url || "/placeholder.svg"}
              alt={item.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            />

            {/* Discount Badge */}
            {item.discount && (
              <div className="absolute top-3 right-3 bg-gray-800 text-white text-xs font-medium px-2 py-1 rounded">
                {item.discount}
              </div>
            )}

            {/* Stock Status Badge */}
            <div
              className={`absolute bottom-3 right-3 text-xs font-medium px-2 py-1 rounded ${
                item.id
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {item.id ? "In Stock" : "Out of Stock"}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 sm:w-2/3 flex flex-col">
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-800 hover:text-black text-lg mb-1">
                  <Link
                    href={`/cakes/${item.id}?category=${item.category
                      ?.replace(/\s+/g, "-")
                      .toLowerCase()}&name=${item.title
                      ?.replace(/\s+/g, "-")
                      .toLowerCase()}`}
                  >
                    {item.title}
                  </Link>
                </h3>
                <p className="text-sm text-gray-500 mb-2 capitalize">
                  {item.category}
                </p>
              </div>

              <button
                onClick={onRemove}
                className="p-2 text-gray-400 hover:text-gray-700 transition-colors hover:bg-gray-100 rounded-full"
                aria-label="Remove from wishlist"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {item.short_description}
            </p>

            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(item.rating > 0 ? item.rating : 5)
                        ? "text-gray-800"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-2">
            <div>
              <div className="text-base">
                tk{item.servingSize[0].price} ({item.servingSize[0].weight})
              </div>
            </div>
            <button
              onClick={onAddToCart}
              disabled={isInCart}
              className={`px-3 py-2 rounded-lg text-sm flex items-center ${
                isInCart
                  ? "bg-green-100 text-green-800 cursor-not-allowed"
                  : "bg-gray-800 text-white hover:bg-black"
              }`}
            >
              {isInCart ? (
                <>
                  <Check className="h-4 w-4 mr-1" />
                  In Cart
                </>
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4 mr-1" />
                  Add to Cart
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Component for bulk actions footer
const BulkActionsFooter = ({
  isSelectAll,
  selectedCount,
  isAddingToCart,
  onToggleSelectAll,
  onRemoveSelected,
  onAddSelectedToCart,
}: {
  isSelectAll: boolean;
  selectedCount: number;
  isAddingToCart: boolean;
  onToggleSelectAll: () => void;
  onRemoveSelected: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onAddSelectedToCart: () => void;
}) => {
  return (
    <>
      <div className="mt-6 bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center">
          <label className="inline-flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={isSelectAll}
                onChange={onToggleSelectAll}
                className="sr-only peer"
              />
              <div className="w-5 h-5 rounded border-2 border-gray-300 peer-checked:border-0 peer-checked:bg-gray-800 flex items-center justify-center">
                {isSelectAll && <Check className="h-3 w-3 text-white" />}
              </div>
            </div>
            <span className="ml-2 text-sm text-gray-700">Select All</span>
          </label>

          <span className="mx-4 text-gray-300">|</span>

          <span className="text-sm text-gray-600">
            {selectedCount > 0
              ? `${selectedCount} ${
                  selectedCount === 1 ? "item" : "items"
                } selected`
              : "No items selected"}
          </span>
        </div>

        <div className="flex gap-3 w-full sm:w-auto">
          {selectedCount > 0 && (
            <button
              onClick={onRemoveSelected}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Remove
            </button>
          )}

          <button
            onClick={onAddSelectedToCart}
            disabled={selectedCount === 0 || isAddingToCart}
            className={`flex-1 sm:flex-initial inline-flex items-center justify-center px-4 py-2 rounded-lg transition-all ${
              selectedCount > 0
                ? "bg-gray-800 text-white hover:bg-black hover:shadow-md disabled:opacity-70"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isAddingToCart ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Adding...
              </>
            ) : (
              <>
                <ShoppingBag className="h-4 w-4 mr-2" />
                Add to Cart ({selectedCount})
              </>
            )}
          </button>
        </div>
      </div>

      <RecommendCake />
    </>
  );
};

// Component for empty wishlist state
const EmptyWishlistState = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-12 text-center mb-16 border border-gray-100">
      <div className="w-20 h-20 mx-auto mb-6 bg-gray-50 rounded-full flex items-center justify-center">
        <Heart className="h-10 w-10 text-gray-300" />
      </div>
      <h2 className="text-2xl font-bold mb-3">Your cake wishlist is empty</h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Save your favorite cakes here to revisit them later or share with
        friends and family.
      </p>
      <Link
        href="/gallery"
        className="inline-flex items-center px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-black transition-all hover:shadow-md"
      >
        Explore Our Cakes
        <ChevronRight className="ml-1 h-5 w-5" />
      </Link>
    </div>
  );
};

// Sample recommended cake products

{
  /* Recommended Cakes */
}
const RecommendCake = () => {
  const dispatch = useDispatch();
  // Check if item exists in cart
  const cartItems = useSelector((state: RootState) => state.wish.items);
  const isInCart = (id: string) => {
    return cartItems.some((item) => item.id === id);
  };
  const randomCategory = getRandomWishlistCategory(cartItems);
  const params = {
    category: randomCategory || "",
    limit: 8,
    sortBy: "-createdAt",
    fields:
      "thumbImage,hoverImage,title,price,discount,id,servingSize,category,name,short_description,rating,reviews",
  };

  const { data, isLoading, error } = useFilteredCakes(params);
  const recommendedProducts = data?.data?.products || [];
  const handleAddToCart = async (item: ICartItem) => {
    try {
      // Check if item already exists in cart
      if (isInCart(item.id)) {
        toast.info(`${item.title} is already in your cart`, {
          toastId: `duplicate-${item.id}`, // Prevent duplicate toasts
        });
        return;
      }

      // Show loading indicator
      const toastId = toast.loading(`Adding ${item.title} to cart...`);

      // Format the item data
      const formattedItem = await dataFormat(item);

      // Dispatch to Redux store
      dispatch(addToCart(formattedItem));

      // Update toast to success
      toast.update(toastId, {
        render: `${item.title} added to cart`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
      });
    } catch (error) {
      console.error("Error adding item to cart:", error);
      toast.error(`Failed to add ${item.title} to cart`, {
        autoClose: 3000,
      });
    }
  };

  if (isLoading) {
    return (
      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-10">Cakes You Might Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100"
            >
              <div className="relative h-56 bg-gray-200 animate-pulse"></div>
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
                <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-10">Cakes You Might Also Like</h2>
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-gray-500">
            Failed to load recommendations. Please try again later.
          </p>
        </div>
      </section>
    );
  }

  if (recommendedProducts.length === 0) {
    return (
      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-10">Cakes You Might Also Like</h2>
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-gray-500">
            No recommendations available at the moment.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold mb-10">Cakes You Might Also Like</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {recommendedProducts.map((cake) => (
          <div
            key={cake.id}
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 group"
          >
            {/* Cake Image */}
            <div className="relative h-56">
              <div>
                <Image
                  src={cake.thumbImage.url}
                  alt={cake?.title || "Cake product"}
                  fill
                  sizes="25vw"
                  className="absolute object-cover z-10 group-hover:opacity-0 transition-opacity ease-in-out duration-500"
                />
                <Image
                  src={cake.hoverImage.url}
                  alt={cake?.title || "Cake product"}
                  fill
                  sizes="25vw"
                  className="absolute object-cover"
                />
              </div>

              {/* Discount Badge */}
              {cake.discount && (
                <div className="absolute top-3 right-3 bg-gray-800 text-white text-xs font-medium px-2 py-1 rounded">
                  {cake.discount}
                </div>
              )}

              {/* Wishlist Button */}
              <button
                title={isInCart(cake.id) ? "Added Before" : ""}
                onClick={() => {
                  dispatch(addTowish(cake));

                  toast.success("Added");
                }}
                disabled={isInCart(cake.id)}
                className="absolute top-3 left-3 p-2 bg-white/80 cursor-pointer backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors z-10"
                aria-label="Add to wishlist"
              >
                <Heart className="h-5 w-5 text-gray-400 hover:text-gray-800" />
              </button>
            </div>

            {/* Cake Info */}
            <div className="p-4">
              <h3 className="font-medium text-gray-800 mb-1 line-clamp-1 group-hover:text-black transition-colors">
                <Link
                  href={`/cakes?category=${cake.category
                    ?.replace(/\s+/g, "-")
                    .toLowerCase()}&name=${cake.title
                    ?.replace(/\s+/g, "-")
                    .toLowerCase()}`}
                >
                  {cake.name || cake.title}
                </Link>
              </h3>

              <p className="text-sm text-gray-500 mb-1 capitalize">
                {cake.category}
              </p>

              {/* Rating */}

              <div className="flex items-center mb-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(cake?.rating > 0 ? cake.rating : 5)
                          ? "text-gray-800"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>

              {/* Price and Add to Cart */}
              <div className="flex items-center justify-between">
                <div>
                  <span className=" text-base">
                    tk{cake.servingSize[0].price} ({cake.servingSize[0].weight})
                  </span>
                </div>

                <button
                  onClick={() => {
                    handleAddToCart(cake);
                  }}
                  className="p-2 text-gray-800 cursor-pointer hover:text-black hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Add to cart"
                >
                  <ShoppingBag className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
