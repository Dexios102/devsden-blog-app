import { Link } from "react-router-dom";
/* Redux */
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
/* UI Components */
import ModeToggle from "./theme/mode-toggle";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
/* Assets */
import devlogo from "@/assets/dev.svg";
/* Icons */
import { CgLogIn } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const { userNow } = useSelector((state: RootState) => state.user);
  return (
    <nav className="flex justify-between items-center pt-6">
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
            className="md:flex gap-4 font-medium mx-2
       rounded-md px-2 hidden"
          >
            <Link to="/">
              <Button variant="noneLine">Home</Button>
            </Link>
            <Link to="/about">
              <Button variant="noneLine">About</Button>
            </Link>
            <Link to="/projects">
              <Button variant="noneLine">Projects</Button>
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
        <div>
          <ModeToggle />
        </div>
        {userNow ? (
          <div className="hidden md:block">
            <Link to="/profile">
              <Avatar>
                <AvatarImage src={userNow?.profilePic} />
                <AvatarFallback>DD</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        ) : (
          <div className="md:flex gap-4 items-center hidden ">
            <Link to="/login">
              <Button>
                <CgLogIn className="w-5 h-5 mr-2" />
                Login
              </Button>
            </Link>
          </div>
        )}
        <div className="md:hidden">
          <Button variant="ghost">
            <GiHamburgerMenu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
