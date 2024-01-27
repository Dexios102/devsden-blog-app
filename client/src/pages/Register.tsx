import { useState } from "react";
import devlogo from "@/assets/dev.svg";
import google from "@/assets/google.svg";
import axios from "axios";
import { FaRegCircleUser } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";
import { MdOutlinePassword } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { AiOutlineLoading } from "react-icons/ai";
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
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(6).max(50),
  confirmPassword: z.string().min(6).max(50),
});

const Register = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const res = await axios.post("/auth/signup", values);
      if (res.data) {
        console.log(res.data);
        toast({
          title: "Account created",
          description: "Your account has been created successfully.",
          action: <Link to="/login">Login</Link>,
        });
      }
    } catch (error) {
      console.log(error);
      toast({ title: "Error", description: "Something went wrong" });
    } finally {
      setLoading(false);
    }
  }
  return (
    <div
      className="flex flex-col items-center justify-center md:flex-row
     gap-4 h-full pt-32"
    >
      <div className="basis-1/4 hidden md:block">
        <img src={devlogo} alt="dev_logo" className="w-10" />
      </div>
      <div className="w-full max-w-md rounded-md px-6 py-10">
        <h1 className="mb-4 border-l-4 border-[var(--red-color)] pl-4">
          Create an account
        </h1>
        <hr className="mb-4" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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
              <Checkbox id="terms" />
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
            <Button variant="outline" className="w-full">
              <img src={google} alt="google_icon" className="w-5 mr-2" />
              Continue with Google
            </Button>
          </form>
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
