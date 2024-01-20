import Login from "./Components/Login.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Components/Register.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
