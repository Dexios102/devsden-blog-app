import { Link } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOutSuccess, signOutFailure } from "@/redux/user/user-slice";
/* Redux */
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
/* UI Components */
import ModeToggle from "./theme/mode-toggle";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
/* Assets */
import devlogo from "@/assets/dev.svg";
/* Icons */
import { CgLogIn } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";
import { CiUser } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { MdSpaceDashboard } from "react-icons/md";
import { RiPagesFill } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { CiCircleInfo } from "react-icons/ci";
import { GoFileSubmodule } from "react-icons/go";

const Navbar = () => {
  const { userNow } = useSelector((state: RootState) => state.user);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post("/auth/signout");
      dispatch(signOutSuccess());
      toast({ title: "Logout Successful", description: "See you soon!" });
      navigate("/login");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.data && error.response.data.msg) {
          dispatch(signOutFailure(error.response.data.msg));
          toast({ title: "Error", description: error.response.data.msg });
        } else {
          toast({
            title: "Error",
            description: "Something went wrong, try again",
          });
        }
      }
    }
  };
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage src={userNow?.profilePic} />
                  <AvatarFallback>DD</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mr-2">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="text-gray-500">
                  @{userNow?.username}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Link to="/profile">
                    <DropdownMenuItem>
                      <CiUser className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <Link to="/dashboard">
                      <DropdownMenuItem>
                        <MdSpaceDashboard className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <RiPagesFill className="mr-2 h-4 w-4" />
                        <span>Pages</span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <Link to="/">
                            <DropdownMenuItem>
                              <GoFileSubmodule className="mr-2 h-4 w-4" />
                              <span>Home</span>
                            </DropdownMenuItem>
                          </Link>
                          <DropdownMenuSeparator />
                          <Link to="/projects">
                            <DropdownMenuItem>
                              <FaHome className="mr-2 h-4 w-4" />
                              <span>Projects</span>
                            </DropdownMenuItem>
                          </Link>
                          <Link to="/about">
                            <DropdownMenuItem>
                              <CiCircleInfo className="mr-2 h-4 w-4" />
                              <span>About</span>
                            </DropdownMenuItem>
                          </Link>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <IoIosLogOut className="mr-2 h-4 w-4 text-[var(--red-color)]" />
                      <span className="text-[var(--red-color)]">Log out</span>
                      <DropdownMenuShortcut>⇧⌘L</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
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
