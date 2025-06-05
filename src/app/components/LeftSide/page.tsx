"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Navbar from "../Navbar";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image";
import { useGetMeQuery } from "@/redux/features/user/userApi";
import avatar from "../../../../public/images/avatar.png";
import { useRouter } from "next/navigation";

const LeftSide = () => {
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const { data: getMe } = useGetMeQuery(undefined);
  const router = useRouter();

  const handleLogout = () => {
    const toastId = toast.loading("loading...");
    dispatch(logout());
    router.push("/login");
    toast.success("Logged out", { id: toastId, duration: 2000 });
  };

  return (
    <div className="lg:col-span-2 lg:flex flex-col justify-between h-screen text-white py-4 sticky top-0 overflow-hidden hidden">
      {/*left menu*/}
      <Navbar />
      <div className="dropdown dropdown-top">
        <div className="flex items-center">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full ">
              <Image
                width={50}
                height={50}
                src={getMe?.data?.profileImg ? getMe?.data?.profileImg : avatar}
                alt="Profile Image"
              />
            </div>
          </label>
          <div className="ml-3">
            <p className="text-base leading-6 font-medium text-white">
              {getMe ? getMe?.data?.name : "Your Name"}
            </p>
            <p className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
              @{getMe ? getMe?.data?.username : "your_username"}
            </p>
          </div>
        </div>
        <ul
          tabIndex={0}
          className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content rounded-box w-52 bg-gray-800 text-white"
        >
          <li className="my-2">
            <Link
              href={
                user && user?.userId
                  ? `/user-profile/${user?.userId}`
                  : "/login"
              }
            >
              Profile
            </Link>
          </li>
          <li className="mb-2">
            {user ? (
              <Link onClick={handleLogout} href="/login">
                Logout
              </Link>
            ) : (
              <Link href="/login">Login</Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LeftSide;
