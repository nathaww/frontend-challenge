import { useDispatch } from "react-redux";
import { logout } from "./authSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return handleLogout;
}