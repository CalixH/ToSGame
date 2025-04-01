import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [audio, SetAudio] = useState("");

  // tried to make the audio auto played....
  const Playit = () => {
    if (audio !== "") {
      audio.play();
    }
  };
  const Stopit = () => {
    if (audio !== "") {
      audio.pause();
    }
  };
  useEffect(() => {
    setTimeout(() => {
      SetAudio(new Audio("game-intro.mp3"));
      Playit();
    }, 1000);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col gap-1 justify-center items-center">
      <img
        src="/wallpaper.gif"
        className="absolute top-0 left-0 w-full h-full object-cover brightness-75"
        alt="Background Animation"
      />
      <h1
        className="font-bold text-3xl text-white z-10"
        style={{ textShadow: "2px 2px 2px black" }}
      >
        Terms of Service Warrior Simulator 2025
      </h1>
      <button
        className="w-24 z-10 bg-blue-500 py-2 px-6 rounded"
        onClick={() => {
          new Audio("/menu-go-click.mp3").play();
          navigate("/case/default");
        }}
      >
        Start
      </button>
    </div>
  );
}

export default Home;
