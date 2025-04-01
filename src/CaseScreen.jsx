import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ToSScreen from "./components/ToSScreen";

function CaseScreen() {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [tosText, setTOSText] = useState("");
  const [win, setWin] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState("");
  const [unlockedCases, setUnlockedCases] = useState(1);

  const caseNames = ["casetutorial", "case6"]; // Populate this with your case names.
  const titles = ["Welcome!", "RE: AT&T Hoax"]; // Corresponding titles for each case.
  const titleLetters = ["W", "HC"]; // First letters of each title

  const [showNextCaseButton, setShowNextCaseButton] = useState(false); // Track when to show the next case button

  useEffect(() => {
    if (!caseId || caseId === "default") {
      setText("");
      setTOSText("");
      return;
    }

    fetch(`/src/assets/${caseId}.txt`)
      .then((response) => response.text())
      .then((data) => setText(data));

    fetch(`/src/assets/${caseId}tos.txt`)
      .then((response) => response.text())
      .then((data) => setTOSText(data));
  }, [caseId]);

  useEffect(() => {
    setDisplayText(""); // Reset text

    let index = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) => {
        if (index < text.length) {
          return prev + text[index++];
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 2);

    return () => clearInterval(interval);
  }, [text]);

  const handleSubmit = () => {
    fetch(`/src/assets/${caseId}end.txt`)
      .then((response) => response.text())
      .then((data) => {
        setModalText(data);
        setModalVisible(true);
      });

    if (win) {
      new Audio("/win.wav").play();
      setUnlockedCases((prev) => Math.min(prev + 1, caseNames.length)); // Unlock next case
    } else {
      new Audio("/BRUH.mp3").play();
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    // Show the next case button with a delay for each unlocked case
    if (unlockedCases <= caseNames.length) {
      setTimeout(() => {
        setShowNextCaseButton(true); // Show the next case button after the delay
        new Audio("/email.mp3").play(); // Play success sound
      }, 2000); // 2-second delay for the subsequent email
    }
  }, [unlockedCases]);

  return (
    <div className="flex h-screen p-4">
      {/* Vertical button bar resembling emails */}
      <div className="min-w-48 flex flex-col bg-gray-800 text-white rounded-tl-lg rounded-bl-lg">
        {caseNames.slice(0, unlockedCases).map((caseName, index) => {
          const firstLetter = titleLetters[index].toUpperCase(); // Use titleLetters instead
          return (
            <button
              key={caseName}
              className={`!rounded-none emailButton flex items-center space-x-2 p-2 bg-gray-500 hover:bg-gray-500 ${
                index > 0 ? "!border-0 !border-t !border-blue-400" : ""
              }`}
              onClick={() => navigate(`/case/${caseName}`)}
              style={{ visibility: showNextCaseButton ? "visible" : "hidden" }} // Hide button until delay is over
            >
              <div className="w-8 h-8 flex items-center justify-center bg-gray-400 rounded-full text-white">
                {firstLetter}
              </div>
              <span className="flex-grow">{titles[index]}</span>
            </button>
          );
        })}
      </div>

      {/* Main content */}
      <div className="flex flex-grow space-x-4">
        {/* Left side with text */}
        <div className="w-1/2 bg-gray-300 p-6 rounded-tr-lg rounded-br-lg shadow-lg border border-gray-500 overflow-auto text-left">
          <p className="whitespace-pre-wrap font-mono text-lg">{displayText}</p>
        </div>
        {/* Right side */}
        <div className="w-1/2 bg-white p-6 rounded-lg shadow-lg border border-gray-500 overflow-auto">
          <ToSScreen tosText={tosText} setWin={setWin} />
          <div className="flex flex-row-reverse">
            {caseId && caseId !== "default" && (
              <button
                onClick={handleSubmit}
                disabled={!caseId || caseId === "default"}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalVisible && (
        <div
          className="fixed inset-0 bg-gray-500/90 transition-opacity flex justify-center items-center"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-1/2"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4">
              {caseId === "tutorial" && win
                ? "Great job! You've selected the potentially harmful agreements! 🎉"
                : win
                ? "Well done! You found the pertinent statements 😁"
                : "Sorry, not quite 🤔"}
            </h2>
            <p className="mb-4 whitespace-pre-wrap">{modalText}</p>
            <div className="flex flex-row-reverse">
              <button
                className="bg-blue-500 px-4 py-2 rounded flex flex-row-reverse"
                onClick={closeModal}
              >
                Back to Case
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CaseScreen;
