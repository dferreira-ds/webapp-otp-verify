import { BrowserRouter, Route, Routes } from "react-router-dom";
import SendOtp from './components/SendOtp/SendOtp';
import Verify from "./pages/Verify";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SendOtp />}/>
        <Route path="/verify" element={<Verify />}/>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
