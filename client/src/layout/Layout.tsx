import Navbar from "@/components/Navbar";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import {
  Home,
  Dashboard,
  Login,
  Register,
  About,
  Projects,
  NotFound,
} from "../pages";
import PrivateRoute from "@/components/PrivateRoute";

const Layout = () => {
  return (
    <div className="layout">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Toaster />
    </div>
  );
};

export default Layout;
