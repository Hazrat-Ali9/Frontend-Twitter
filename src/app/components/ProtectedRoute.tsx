"use client";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const router = useRouter();
  if (!user || (user?.role !== "superAdmin" && user?.role !== "admin")) {
    console.log(user);
    dispatch(logout());
    router.push("/login");
    toast.success("Logged out", { duration: 2000 });
    return null;
  } else {
    return children;
  }
};

export default ProtectedRoute;
