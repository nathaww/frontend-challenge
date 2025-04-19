import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./authSlice";
import { toast } from "sonner";
import { api } from "../api";

export function useLogin() {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await api.post("/login", data);
      return { token: res.data.token, email: data.email };
    },
    onSuccess: (user) => {
      dispatch(loginSuccess(user));
      toast.success("Logged in!");
      window.location.href = "/dashboard";
    },
    onError: () => {
      toast.error("Login failed");
    },
  });
}
