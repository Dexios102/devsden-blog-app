import { Link } from "react-router-dom";
import Oauth from "@/components/Oauth";
import useFormLogin from "@/hooks/useFormLogin";
/* Assets */
import developer from "@/assets/developer.svg";
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

const Login = () => {
  const { form, onSubmit, loading } = useFormLogin();
  return (
    <div
      className="flex flex-col items-center justify-center md:flex-row
     gap-10 h-full pt-44"
    >
      <div className="basis-1/4 hidden md:block">
        <img src={developer} alt="dev_logo" className="" />
      </div>
      <div className="w-full max-w-md rounded-md px-6 py-10">
        <h1 className="mb-4 border-l-4 border-[var(--red-color)] pl-4">
          Welcome back!
        </h1>
        <hr className="mb-4" />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 mb-2"
          >
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
          </form>
          <Oauth />
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
