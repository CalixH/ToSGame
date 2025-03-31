import { useNavigate } from "react-router-dom";

function NavScreen() {
  const navigate = useNavigate();

  const cases = Array.from({ length: 9 }, (_, i) => `Case ${i + 1}`);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="font-bold text-3xl">Cases</h1>
      <div>
        {cases.map((caseName, index) => (
          <button key={index} onClick={() => navigate(`/case/${index + 1}`)}>
            {caseName}
          </button>
        ))}
      </div>
    </div>
  );
}

export default NavScreen;
