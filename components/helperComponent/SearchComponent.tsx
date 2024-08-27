import React, { ChangeEvent, useState, useCallback, useEffect } from "react";

import { debounce } from "@/lib/utils";

interface SearchInputProps {
  handleSearch: (query: string) => void;
  iniSearchValue: string;
}

const SearchComponent: React.FC<SearchInputProps> = ({
  handleSearch,
  iniSearchValue,
}) => {
  const [query, setQuery] = useState<string>("");

  const debouncedSearch = useCallback(
    debounce((nextValue: string) => {
      handleSearch(nextValue);
    }, 1000),
    [handleSearch]
  );

  const handleChange = (searched: string) => {
    setQuery(searched);
    debouncedSearch(searched);
  };

  useEffect(() => {
    if (iniSearchValue !== "") handleChange(iniSearchValue);
  }, [iniSearchValue]);

  return (
    <div className="relative w-full bg-inherit">
      <input
        type="text"
        value={query}
        onChange={(event) => handleChange(event.target.value)}
        placeholder="Search..."
        className="w-full rounded-lg border border-dark-400 p-3 pl-10 shadow-sm focus:border-teal-900 focus:outline-none focus:ring-1 focus:ring-teal-900"
      />
      <svg
        className="absolute left-3 top-3 size-5 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    </div>
  );
};

export default SearchComponent;
