import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { RootState } from "@/redux/store";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "@/redux/user/user-slice";
import axios, { AxiosError } from "axios";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
const useFormLogin = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.user.loading);
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    dispatch(loginStart());
    try {
      const res = await axios.post("/auth/signin", values);
      if (res.data) {
        dispatch(loginSuccess(res.data));
        toast({
          title: "Login Successful",
          description: `Welcome back ${res.data.username}`,
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
  }
  return { form, onSubmit, loading };
};

export default useFormLogin;
