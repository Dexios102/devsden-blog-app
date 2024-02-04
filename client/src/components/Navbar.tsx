import { Link } from "react-router-dom";
import ProfileDrop from "./ProfileDrop";
import useLogout from "@/hooks/useLogout";
/* Redux */
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
/* UI Components */
import ModeToggle from "./theme/mode-toggle";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
/* Assets */
import devlogo from "@/assets/dev.svg";
/* Icons */
import { CgLogIn } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";

const Navbar = () => {
  const { userNow } = useSelector((state: RootState) => state.user);
  const handleLogout = useLogout();
  return (
    <nav className="flex justify-between items-center pt-6 bg-background">
      <div className="mr-10">
        <Link to="/">
          <button className="flex items-center gap-2">
            <img src={devlogo} alt="dev_logo" className="w-10" />
            <h1 className="text-2xl font-bold gradient-text">DevsDen</h1>
          </button>
        </Link>
      </div>
      <div className="flex items-center md:gap-4">
        <div className="hidden md:flex flex-row items-center rounded-l-full bg-muted pl-4">
          <div
            className="md:flex gap-2 font-medium mx-2
       rounded-md px-2 hidden"
          >
            <Link to="/">
              <Button variant="noneLine">
                <FaHome className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="noneLine">
                <MdSpaceDashboard className="w-5 h-5" />
              </Button>
            </Link>
          </div>
          <div className="w-full max-w-sm relative">
            <Input placeholder="Search" type="text" />
            <CiSearch
              className="w-5 h-5 absolute right-3 top-1/2
           -translate-y-1/2"
            />
          </div>
        </div>
        <div className="mr-4 md:mr-0">
          <ModeToggle />
        </div>
        {userNow ? (
          <div className="flex gap-4 items-center">
            <ProfileDrop userNow={userNow} handleLogout={handleLogout} />
          </div>
        ) : (
          <div className="flex gap-4 items-center">
            <Link to="/login">
              <Button>
                <CgLogIn className="w-5 h-5 mr-2" />
                Login
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
