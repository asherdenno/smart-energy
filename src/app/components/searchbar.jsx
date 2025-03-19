"use client";
import { useState } from "react";

const SearchBar = ({ data, onItemSelect }) => {
  const [query, setQuery] = useState("");

  const filteredData = data.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
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
