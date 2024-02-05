import axios, { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { useToast } from "../components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { signOutSuccess, signOutFailure } from "@/redux/user/user-slice";

const useLogout = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
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

  return handleLogout;
};

export default useLogout;
