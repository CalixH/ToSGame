import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen flex flex-col gap-1 justify-center items-center">
        <h1 className="font-bold text-3xl">ToS Game</h1>
        <button className="w-24" onClick={() => navigate("/cases")}>
          Start
        </button>
        <button onClick={() => navigate(`/case/tutorial`)}>Tutorial</button>
      </div>
    </>
  );
}

export default Home;
