// App.tsx (Routing setup)
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Home";
import NewScreen from "./NewScreen";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new-screen" element={<NewScreen />} />
    </Routes>
  );
}

export default App;
