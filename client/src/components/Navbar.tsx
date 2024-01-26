import devlogo from "@/assets/dev.svg";
import ModeToggle from "./theme/mode-toggle";
import me from "../assets/me.jpg";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { CgLogIn } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const loggedIn = false;
  return (
    <nav className="flex justify-between items-center">
      <div className="">
        <Link to="/">
          <button className="flex items-center gap-2">
            <img src={devlogo} alt="dev_logo" className="w-10" />
            <h1 className="text-2xl font-bold gradient-text">DevsDen</h1>
          </button>
        </Link>
      </div>
      <div
        className="md:flex gap-4 font-medium 
        bg-gray-100 mx-2
       rounded-full px-2 dark:bg-gray-900 hidden"
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
      <div className="flex items-center md:gap-4">
        <div className="w-full max-w-sm relative hidden md:block">
          <Input placeholder="Search" type="text" />
          <CiSearch
            className="w-5 h-5 absolute right-3 top-1/2
           -translate-y-1/2"
          />
        </div>
        <div>
          <ModeToggle />
        </div>
        {loggedIn ? (
          <div className="hidden md:block">
            <Link to="/profile">
              <Avatar>
                <AvatarImage src={me} />
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
