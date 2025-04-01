// App.tsx (Routing setup)
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import CaseScreen from "./CaseScreen";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/case/:caseId" element={<CaseScreen />} />
    </Routes>
  );
}

export default App;
