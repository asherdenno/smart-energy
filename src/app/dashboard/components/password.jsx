import { useRef } from "react";

export default function Password() {
  const inputRef = useRef(null);

  const handleClick = () => {
    alert(`You typed: ${inputRef.current.value}`);
  };

  return (
    <div className="p-4">
      <input type="text" ref={inputRef} placeholder="Type here..." className="border p-2 rounded-md w-full" />
      <button onClick={handleClick} className="mt-2 p-2 bg-blue-500 text-white rounded-md">Show Value</button>
    </div>
  );
}
