import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Admin from "./pages/Admin";
import Roles from "./pages/Roles";
import Beyond from "./pages/Beyond";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/roles" element={<Roles />} />
        <Route path="/beyond" element={<Beyond />} />
        <Route path="/admin" element={<Admin />} />
	<Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/reset-password" element={<ResetPassword />} />
<Route path="/verify-email/:token" element={<VerifyEmail />} />
      </Routes>
    </>
  );
}