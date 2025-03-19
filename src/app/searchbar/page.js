"use client"
import SearchBar from "../components/SearchBar";


export default function Home() {
  const items = ["Apple", "Banana", "Cherry", "Date", "Grapes", "Mango"];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <SearchBar data={items} />
    </div>
  );
}
