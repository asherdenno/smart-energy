"use client";
import SearchBar from "../components/searchbar";
import { useState } from "react";

export default function SearchPage() {

  const dataOptions = {
    Fruits: ["Apple", "Banana", "Cherry", "Date", "Grapes", "Mango"],
    Vegetables: ["Carrot", "Broccoli", "Spinach", "Potato", "Pepper", "Cucumber"]
  };

  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    alert(`You selected: ${item}`);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Search</h1>
      <SearchBar dataOptions={dataOptions} onItemSelect={handleItemSelect} />
      {selectedItem && <p className="mt-4 text-lg">Selected: {selectedItem}</p>}
    </div>
  );
}

