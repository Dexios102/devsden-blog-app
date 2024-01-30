import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import axios, { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFailure } from "@/redux/user/user-slice";
import { app } from "@/firebase";
/* Assests */
import google from "@/assets/google.svg";
/* UI Components */
import { Button } from "@/components/ui/button";
import { useToast } from "./ui/use-toast";

const Oauth = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const handleAuth = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });
    try {
      const googleResponse = await signInWithPopup(auth, provider);
      const res = await axios.post("/auth/google", {
        name: googleResponse.user.displayName,
        email: googleResponse.user.email,
        googleImg: googleResponse.user.photoURL,
      });
      if (res.data) {
        dispatch(loginSuccess(res.data));
        toast({
          title: "Google Login Successful",
          description: "Welcome back to DevsDen",
        });
        navigate("/");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.data && error.response.data.msg) {
          dispatch(loginFailure(error.response.data.msg));
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
    <Button variant="outline" className="w-full" onClick={handleAuth}>
      <img src={google} alt="google_icon" className="w-5 mr-2" />
      Continue with Google
    </Button>
  );
};

export default Oauth;
