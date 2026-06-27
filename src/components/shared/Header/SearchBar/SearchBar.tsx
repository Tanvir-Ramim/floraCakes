"use client";
import useOutsideClick from "@/components/hooks/useOutsideClick";
import { motion } from "framer-motion";
import { FaXmark } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { useState, useEffect, useRef } from "react";
import { useDebounce } from "use-debounce";
import Link from "next/link";
import { SearchResult, searchService } from "@/services/search.service";
import Image from "next/image";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const modalVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 120, damping: 14 },
  },
  exit: {
    opacity: 0,
    y: -50,
    transition: { duration: 0.3, ease: "easeInOut" as const },
  },
};

interface SearchBarProps {
  onClose: () => void;
}

const SearchBar = ({ onClose }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [debouncedQuery] = useDebounce(query, 400);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  useOutsideClick(searchRef, onClose);

  // Load search history from localStorage
  useEffect(() => {
    const history = localStorage.getItem("searchHistory");
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
    inputRef.current?.focus();
  }, []);

  // Fetch search results from your backend API
  useEffect(() => {
    if (debouncedQuery.trim()) {
      setLoading(true);
      searchService
        .search(debouncedQuery)
        .then((data) => {
          setResults(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setResults([]);
    }
  }, [debouncedQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Update search history
      const updatedHistory = [
        query,
        ...searchHistory.filter(
          (item) => item.toLowerCase() !== query.toLowerCase()
        ),
      ].slice(0, 5);

      setSearchHistory(updatedHistory);
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));

      // You can navigate to a dedicated search results page if needed
      // router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const getResultLink = (result: SearchResult) => {
    switch (result?.type) {
      case "product":
        return `/cakes/${result?.slug}`;
      case "gift":
        return `/others-product?id=${result?.slug}`;
      case "giftCard":
        return `/gift?id=${result?.id}`;
      case "blog":
        return `/blog/${result?.slug}`;
      case "event":
        return `/events?id=${result?.id}`;
      default:
        return "#";
    }
  };
  return (
    <motion.div
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 bg-[#262626]/20 bg-opacity-50 z-40 h-full w-full flex items-center justify-center"
    >
      <motion.div
        variants={modalVariants}
        ref={searchRef}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="bg-[#fff] w-full   absolute top-0 shadow-lg lg:mb-2 md:pb-20 pb-10"
      >
        <div className="flex items-center justify-center flex-col py-12">
          <FaXmark
            className="text-2xl text-[#BD8448] cursor-pointer"
            onClick={onClose}
          />
          <h2 className="mt-6 md:text-2xl text-xl">Search</h2>
        </div>
        <form onSubmit={handleSearch} className="relative">
          <div className="xl:px-20 lg:px-16 md:px-12 px-8">
            <div className="flex items-center justify-between border-b pb-2">
              <input
                className="outline-none w-full"
                type="text"
                placeholder="Enter keywords to search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <IoSearch className="text-2xl hover:text-[#BD8448] duration-300 cursor-pointer" />
            </div>
          </div>
        </form>
        {query !== "" && (
          <div className="absolute z-10 mt-2 w-full bg-white shadow-lg rounded-md max-h-80 overflow-y-auto">
            {loading ? (
              <div className="p-4 text-center">Searching...</div>
            ) : results?.length > 0 ? (
              results?.map((result) => (
                <Link
                  key={`${result?.type}-${result?.id}`}
                  href={getResultLink(result)}
                  className="flex items-center p-3 hover:bg-gray-100 border-b"
                  onClick={onClose}
                >
                  {result?.image && (
                    <Image
                      src={result?.image}
                      alt={result?.name || result?.title || ""}
                      className="w-10 h-10 object-cover rounded mr-3"
                      width={40}
                      height={40}
                    />
                  )}
                  <div>
                    <p className="font-medium">
                      {result?.name || result?.title}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {result?.type}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="p-4 text-center">
                No results found for "{query}"
              </div>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default SearchBar;
