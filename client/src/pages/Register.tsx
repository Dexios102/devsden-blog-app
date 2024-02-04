/* Packages */
import { Link } from "react-router-dom";
import Oauth from "@/components/Oauth";
import useFormRegister from "@/hooks/useFormRegister";
/* Icons */
import { FaRegCircleUser } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";
import { MdOutlinePassword } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import { AiOutlineLoading } from "react-icons/ai";
/* Assets */
import developer2 from "@/assets/developer2.svg";
/* UI Components */
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const Register = () => {
  const { form, onSubmit, loading } = useFormRegister();
  return (
    <div
      className="flex flex-col items-center justify-center md:flex-row
     gap-10 h-full pt-32"
    >
      <div className="basis-1/4 hidden md:block">
        <img src={developer2} alt="dev_logo" className="" />
      </div>
      <div className="w-full max-w-md rounded-md px-6 py-10">
        <h1 className="mb-4 border-l-4 border-[var(--red-color)] pl-4">
          Create an account
        </h1>
        <hr className="mb-4" />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 mb-2"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <div className="relative">
                    <FaRegCircleUser className="input-icon" />
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                  </div>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                        type="password"
                        placeholder="*********"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <div className="relative">
                    <RiLockPasswordFill className="input-icon" />
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="*********"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" required />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none
                 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Accept terms and conditions
              </label>
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
                  Sign Up
                  <IoSend className="w-5 h-5 ml-2" />
                </span>
              )}
            </Button>
          </form>
          <Oauth />
          <div className="mt-6 text-sm text-muted-foreground text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-brand hover:underline">
              <span className="text-[var(--blue-color)]">Login</span>
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
