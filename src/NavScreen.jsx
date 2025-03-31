import { useNavigate } from "react-router-dom";

function NavScreen() {
  const navigate = useNavigate();

  const cases = Array.from({ length: 9 }, (_, i) => `Case ${i + 1}`);

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <h1 className="text-xl font-bold mb-4">Cases</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl">
        {cases.map((caseName, index) => (
          <button
            key={index}
            onClick={() => navigate(`/case/${index + 1}`)}
            className="w-full h-32 flex items-center justify-center bg-blue-500 text-white text-2xl font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition"
          >
            {caseName}
          </button>
        ))}
      </div>
    </div>
  );
}

export default NavScreen;
