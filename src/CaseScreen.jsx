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

  const handleSubmit = () => {
    fetch(`/src/assets/case${caseId}end.txt`)
      .then((response) => response.text())
      .then((data) => {
        setModalText(data);
        setModalVisible(true);
      });
  };

  const closeModal = () => {
    setModalVisible(false);
  };

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
          <button onClick={handleSubmit}>Submit</button>
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
              {win
                ? "Congrats! You found the discrepancy! 😁"
                : "Sorry, not quite 🤔"}
            </h2>
            <p className="mb-4 whitespace-pre-wrap">{modalText}</p>
            <div className="flex flex-row-reverse">
              <button
                className="bg-blue-500 px-4 py-2 rounded flex flex-row-reverse"
                onClick={() => navigate("/cases")}
              >
                Go to Cases
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CaseScreen;
