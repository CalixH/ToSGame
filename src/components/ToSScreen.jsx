import { useState } from "react";

// format of case{}tos.txt
// lines are to be \n separated
// lines should start with "@" to indicate that it should be selected
//

// props:
// setWin is used to signal back to parent CaseScreen that all the correct text has been selected
// and player has "won" solving the case
//
function ToSScreen({ tosText, setWin }) {
  const lines = tosText
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => ({
      text: line.startsWith("@") ? line.slice(1) : line,
      isCorrect: line.startsWith("@"),
    }));

  const [selected, setSelected] = useState(Array(lines.length).fill(false));

  const handleCheckboxChange = (index) => {
    const updatedSelected = [...selected];
    updatedSelected[index] = !updatedSelected[index];
    setSelected(updatedSelected);

    const allCorrect = lines.every(
      (line, i) => line.isCorrect === updatedSelected[i]
    );
    setWin(allCorrect);
  };

  return (
    <div>
      {lines.map((line, index) => (
        <div
          key={index}
          className={`
            text-xs
            my-1
            p-2
            hover:bg-yellow-100 ${selected[index] ? `bg-slate-300` : ""}`}
          onClick={() => handleCheckboxChange(index)}
        >
          <label>
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
