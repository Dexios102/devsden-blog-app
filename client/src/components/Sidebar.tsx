import { Link } from "react-router-dom";
import useLogout from "@/hooks/useLogout";
import useTab from "@/hooks/useTab";
/* Icons */
import { FaChartSimple } from "react-icons/fa6";
import { IoNewspaper } from "react-icons/io5";
import { AiFillMessage } from "react-icons/ai";
import { FaPeopleLine } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
/* Ui Components */
import { Button } from "./ui/button";

const Sidebar = () => {
  const tab = useTab();
  const handleLogout = useLogout();
  return (
    <div className="max-h-full flex flex-col px-2 border-r-2 border-muted md:h-[92vh]">
      <div className="mt-6 flex flex-col items-center gap-6">
        <Link to="/dashboard?tab=analytics">
          <Button variant={tab === "analytics" ? "active" : "ghost"}>
            <FaChartSimple className="w-6 h-6" />
          </Button>
        </Link>
        <Link to="/dashboard?tab=profile">
          <Button variant={tab === "profile" ? "active" : "ghost"}>
            <FaUser className="w-6 h-6" />
          </Button>
        </Link>
        <Link to="/dashboard?tab=post">
          <Button variant={tab === "post" ? "active" : "ghost"}>
            <IoNewspaper className="w-6 h-6" />
          </Button>
        </Link>
        <Link to="/dashboard?tab=comments">
          <Button variant={tab === "comments" ? "active" : "ghost"}>
            <AiFillMessage className="w-6 h-6" />
          </Button>
        </Link>
        <Link to="/dashboard?tab=users">
          <Button variant={tab === "users" ? "active" : "ghost"}>
            <FaPeopleLine className="w-6 h-6" />
          </Button>
        </Link>
      </div>
      <div className="mt-[28rem] flex flex-col items-center gap-6 mb-6">
        <Button variant="ghost" onClick={handleLogout}>
          <IoMdLogOut className="w-6 h-6 text-[var(--red-color)]" />
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
