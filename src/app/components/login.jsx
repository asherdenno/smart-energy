import { useRef } from "react";

export default function Login() {
  const usernameInput = useRef(null);
  const passwordInput = useRef(null);

  const handleClick = () => {
    alert(`Username: ${usernameInput.current.value}`
        `Password: ${passwordInput.current.value}`
    );
  };

  return (
    <div className="p-4">
        Username
        <br></br>
      <input type="text" ref={usernameInput} placeholder="Type here..." className="border p-2 rounded-md w-full" />
      <br></br>
        Password
        <br></br>
        <input type="text" ref={passwordInput} placeholder="Type here..." className="border p-2 rounded-md w-full" />
        <br></br>
        <button onClick={handleClick} className="mt-2 p-2 bg-blue-500 text-white rounded-md">Show Value</button>
    </div>
  );
}