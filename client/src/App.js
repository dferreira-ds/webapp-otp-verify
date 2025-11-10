import { BrowserRouter, Route, Routes } from "react-router-dom";
import Otp from './components/Otp/Otp';
import Verify from "./pages/Verify";
import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Otp />} />
        <Route path="/verify" element={<Verify />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;