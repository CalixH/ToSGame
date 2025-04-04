import { useState, useEffect } from "react";

// format of case{}tos.txt
// lines are to be \n separated
// lines should start with "@" to indicate that it should be selected
//

// props:
// setWin is used to signal back to parent CaseScreen that all the correct text has been selected
// and player has "won" solving the case
//
function ToSScreen({ tosText, setWin, caseId }) {
  const lines = tosText
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => ({
      text: line.startsWith("@") ? line.slice(1) : line,
      isCorrect: line.startsWith("@"),
    }));

  const [selected, setSelected] = useState([]);

  useEffect(() => {
    setSelected(Array(lines.length).fill(false));
  }, [tosText]);

  const handleCheckboxChange = (index) => {
    const updatedSelected = [...selected];
    updatedSelected[index] = !updatedSelected[index];
    setSelected(updatedSelected);

    const allCorrect = lines.every(
      (line, i) => line.isCorrect === updatedSelected[i]
    );
    setWin(allCorrect);

    // Play sound on click
    const clickSound = new Audio("/clicksoundeffect.mp3");
    clickSound.play();
  };

  return (
    <div className="font-mono">
      <div className="flex justify-center">
        <h1 className="text-2xl font-bold mb-4">
          {caseId === "case1"
            ? "What Should I Suggest?"
            : "Terms of Service Snippets"}
        </h1>
      </div>
      {lines.map((line, index) => (
        <div
          key={index}
          className={`
            flex flex-row
            text-sm my-1 p-2 ml-18 hover:bg-yellow-100 ${
              selected[index] ? `bg-slate-300` : ""
            }`}
          onClick={() => handleCheckboxChange(index)}
        >
          {/* Line number */}
          <span>→&nbsp;</span>
          <label
          // className="before:content-['•']"
          >
            {/* <input
              type="checkbox"
              checked={selected[index]}
              onChange={}
            /> */}
            {line.text}
          </label>
        </div>
      ))}
    </div>
  );
}

export default ToSScreen;
