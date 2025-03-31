import { useNavigate } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Terms of Service Lawyer Simulator 5000</h1>
      <div className="card flex flex-col items-center gap-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => navigate("/nav-screen")}
        >
          Start
        </button>
        <button onClick={() => navigate(`/case/tutorial`)}>Tutorial</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default Home;
