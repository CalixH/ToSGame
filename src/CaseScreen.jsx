import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ToSScreen from "./components/ToSScreen";

function CaseScreen() {
  const { caseId } = useParams();
  const [text, setText] = useState("");
  const [tosText, setTOSText] = useState("");
  const [win, setWin] = useState(false);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    fetch(`/src/assets/case${caseId}.txt`)
      .then((response) => response.text())
      .then((data) => setText(data));

    fetch(`/src/assets/case${caseId}tos.txt`)
      .then((response) => response.text())
      .then((data) => setTOSText(data));
  }, [caseId]);

  useEffect(() => {
    let index = -1;
    const interval = setInterval(() => {
      if (index < text.length - 1) {
        setDisplayText((prev) => prev + text[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 2);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className="flex h-screen p-4 justify-start">
      {/* Left side with text */}
      <div className="w-1/2 bg-gray-300 p-6 rounded-lg shadow-lg border border-gray-500 overflow-auto text-left">
        <p className="whitespace-pre-wrap font-mono text-lg">{displayText}</p>
      </div>
      {/* Right side (can be used for UI elements later) */}
      <div className="w-1/2 bg-white p-6 rounded-lg shadow-lg border border-gray-500 overflow-auto">
        <ToSScreen tosText={tosText} setWin={setWin} />
        <div className="flex flex-row-reverse">
          <button>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default CaseScreen;
