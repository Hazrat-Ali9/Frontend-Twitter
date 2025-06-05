"use client";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetMeQuery } from "@/redux/features/user/userApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebookMessenger, FaHome, FaRegBell } from "react-icons/fa";
import { toast } from "sonner";
import avatar from "../../../../public/images/avatar.png";
import { useRouter } from "next/navigation";

const MobileMenu = () => {
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const { data: getMe } = useGetMeQuery(undefined);
  const router = useRouter();

  // handle logout
  const handleLogout = () => {
    const toastId = toast.loading("loading...");
    dispatch(logout());
    router.push("/login");
    toast.success("Logged out", { id: toastId, duration: 2000 });
  };

  return (
    <nav className="lg:hidden fixed z-[999] flex justify-between items-center gap-5 bg-blue-400 px-6 py-3 backdrop-blur-md w-full rounded-full text-dark_primary duration-300 bottom-0">
      <Link href="/" className="text-xl p-2.5 rounded-full sm:cursor-pointer">
        <FaHome />
      </Link>
      <Link href="/" className="text-xl p-2.5 rounded-full sm:cursor-pointer">
        <FaRegBell />
      </Link>
      <Link href="/" className="text-xl p-2.5 rounded-full sm:cursor-pointer">
        <FaFacebookMessenger />
      </Link>

      <div className="dropdown dropdown-top">
        <div className="flex items-center">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-8 rounded-full">
              <Image
                width={100}
                height={100}
                src={getMe?.data?.profileImg ? getMe?.data?.profileImg : avatar}
                alt="Profile Image"
              />
            </div>
          </label>
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
    </nav>
  );
};

export default MobileMenu;
