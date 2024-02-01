import { Link } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOutSuccess, signOutFailure } from "@/redux/user/user-slice";
import ProfileDrop from "./ProfileDrop";
/* Redux */
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
/* UI Components */
import ModeToggle from "./theme/mode-toggle";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
/* Assets */
import devlogo from "@/assets/dev.svg";
/* Icons */
import { CgLogIn } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";

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
