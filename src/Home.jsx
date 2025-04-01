import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col gap-1 justify-center items-center">
      <img
        src="/wallpaper.gif"
        className="absolute top-0 left-0 w-full h-full object-cover"
        alt="Background Animation"
      />
      <h1 className="font-bold text-3xl text-white z-10">
        Terms of Service Warrior Simulator 2025
      </h1>
      <button
        className="w-24 z-10 bg-blue-500 py-2 px-6 rounded"
        onClick={() => navigate("/case/default")}
      >
        Start
      </button>
    </div>
  );
}

export default Home;
