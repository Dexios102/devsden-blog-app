import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import axios, { AxiosError } from "axios";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(6).max(50),
  confirmPassword: z.string().min(6).max(50),
});
const useFormRegister = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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
        const loginLink = <Link to="/login">Login</Link>;
        console.log(res.data);
        toast({
          title: "Account created",
          description: `${res.data.username} account has been created successfully.`,
          action: loginLink,
        });
        navigate("/login");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error(error);
        if (error.response && error.response.data && error.response.data.msg) {
          toast({ title: "Error", description: error.response.data.msg });
        } else {
          toast({
            title: "Error",
            description: "Something went wrong, try again",
          });
        }
      }
    } finally {
      setLoading(false);
    }
  }
  return { form, onSubmit, loading };
};
export default useFormRegister;
