import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./authSlice";
import { toast } from "sonner";
import { register } from "../api";

export function useRegister() {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await register(data);
      return { token: res.token, email: data.email };
    },
    onSuccess: (user) => {
      dispatch(loginSuccess(user));
      toast.success("Registration successful!");
      window.location.href = "/dashboard";
    },
    onError: () => {
      toast.error("Registration failed");
    },
  });
}