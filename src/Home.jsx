import { useNavigate } from "react-router-dom";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function Home() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center">
        <h1 className="font-bold text-3xl">ToS Game</h1>
        <button className="w-24" onClick={() => navigate("/nav-screen")}>
          Start
        </button>
      </div>
    </>
  );
}

export default Home;
