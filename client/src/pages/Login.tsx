import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios, { AxiosError } from "axios";
/* Redux */
import type { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "@/redux/user/user-slice";
/* Assets */
import devlogo from "@/assets/dev.svg";
import google from "@/assets/google.svg";
/* Icons */
import { CiMail } from "react-icons/ci";
import { MdOutlinePassword } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { AiOutlineLoading } from "react-icons/ai";
/* UI Components */
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const Login = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.user.loading);
  const { toast } = useToast();
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
  return (
    <div
      className="flex flex-col items-center justify-center md:flex-row
     gap-4 h-full pt-44"
    >
      <div className="basis-1/4 hidden md:block">
        <img src={devlogo} alt="dev_logo" className="w-10" />
      </div>
      <div className="w-full max-w-md rounded-md px-6 py-10">
        <h1 className="mb-4 border-l-4 border-[var(--red-color)] pl-4">
          Welcome back!
        </h1>
        <hr className="mb-4" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <div className="relative">
                    <CiMail className="input-icon" />
                    <FormControl>
                      <Input placeholder="user@example.com" {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <div className="relative">
                    <MdOutlinePassword className="input-icon" />
                    <FormControl>
                      <Input
                        placeholder="*********"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none
                 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </label>
              </div>
              <div>
                <Link
                  to="/forgot-password"
                  className="text-sm text-brand hover:underline
                  text-[var(--blue-color)]"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full gradient-bg-button"
              disabled={loading}
            >
              {loading ? (
                <AiOutlineLoading className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                <span className="flex items-center">
                  Sign In
                  <IoSend className="w-5 h-5 ml-2" />
                </span>
              )}
            </Button>
            <Button variant="outline" className="w-full">
              <img src={google} alt="google_icon" className="w-5 mr-2" />
              Continue with Google
            </Button>
          </form>
          <div className="mt-6 text-sm text-muted-foreground text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-brand hover:underline">
              <span className="text-[var(--blue-color)]">Register</span>
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
