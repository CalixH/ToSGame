import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CaseScreen() {
  const { caseId } = useParams();
  const [text, setText] = useState("");
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    fetch(`/assets/case${caseId}.txt`)
      .then((response) => response.text())
      .then((data) => setText(data));
  }, [caseId]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayText((prev) => prev + text[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className="flex h-screen p-4">
      <div className="w-1/2 bg-gray-100 p-6 rounded-lg shadow-lg border border-gray-300 overflow-hidden">
        <p className="whitespace-pre-wrap font-mono text-lg">{displayText}</p>
      </div>
    </div>
  );
}

export default CaseScreen;
