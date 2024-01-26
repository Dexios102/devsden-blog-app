import Navbar from "@/components/Navbar";
import { Routes, Route } from "react-router-dom";
import {
  Home,
  Dashboard,
  Login,
  Register,
  About,
  Projects,
  NotFound,
} from "../pages";

const Layout = () => {
  return (
    <div className="layout">
      <Navbar />
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
};

export default Layout;
