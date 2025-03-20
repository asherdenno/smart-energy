"use client";
import { useState } from "react";

const SearchBar = ({ dataOptions, onItemSelect }) => {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(Object.keys(dataOptions)[0]); // Default to first category

  const filteredData = dataOptions[selectedCategory].filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="w-full max-w-md mx-auto p-4">
      {/* Category Selection Buttons */}
      <div className="flex gap-2 mb-2">
        {Object.keys(dataOptions).map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg ${
              selectedCategory === category
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <input
        type="text"
        placeholder={`Search ${selectedCategory.toLowerCase()}...`}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Search Results */}
      {query && filteredData.length > 0 && (
        <ul className="mt-2 bg-white border rounded-lg shadow-sm">
          {filteredData.map((item, index) => (
            <li
              key={index}
              onClick={() => onItemSelect(item)}
              className="p-2 hover:bg-blue-100 cursor-pointer"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
