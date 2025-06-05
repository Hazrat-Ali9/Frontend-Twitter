"use client";

import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetAllUserQuery } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hooks";
import { TUser } from "@/types/types";
import Image from "next/image";
import { useState } from "react";
import avatar from "../../../../public/images/avatar.png";
import FollowButton from "../FollowButton";
import Link from "next/link";
import Chat from "../Chat/page";

const RightSide = () => {
  const CustomDate: Date = new Date();
  const user = useAppSelector(selectCurrentUser);
  const { data: allUsers } = useGetAllUserQuery(undefined);

  const [showAllUsers, setShowAllUsers] = useState(false);
  const users = allUsers?.data;

  // Toggle function to show more or show less users
  const toggleShowAllUsers = () => {
    setShowAllUsers(!showAllUsers);
  };

  // filter by current user
  const filteredUsers = users?.filter(
    (getUser: { _id: string }) => getUser._id !== user?.userId
  );
  const shuffledUsers = filteredUsers?.sort(() => Math.random() - 0.5);
  const displayedUsers = showAllUsers
    ? shuffledUsers?.length > 6
      ? shuffledUsers?.slice(0, 6)
      : shuffledUsers
    : shuffledUsers?.slice(0, 3);

  return (
    <div className="lg:col-span-2 h-screen overflow-y-auto sticky top-0 block">
      <div className="fixed z-[999] bottom-0 right-1">
        <Chat />
      </div>
      {/*right menu*/}
      <div className="rounded-lg bg-gray-700 overflow-hidden shadow-lg ms-4 my-4">
        <div className="flex">
          <div className="flex-1 m-2">
            <h2 className="px-4 py-2 text-xl w-48 font-semibold text-white">
              Who to follow
            </h2>
          </div>
        </div>
        <hr className="border-gray-600" />
        <div
          className={`transition-all duration-1000 ease-in-out max-h-${
            showAllUsers ? "full" : "36"
          } overflow-hidden`}
        >
          {displayedUsers?.map((rUser: TUser) => (
            <div key={rUser._id}>
              <div className="flex items-center justify-between py-4">
                <Link href={`/user-profile/${rUser?._id}`}>
                  <div className="flex pe-5">
                    <div className="w-10 h-10 ml-2">
                      <Image
                        height={50}
                        width={50}
                        src={rUser.profileImg ? rUser.profileImg : avatar}
                        alt=""
                        className="w-full h-full rounded-full"
                      />
                    </div>
                    <div className="ms-3">
                      <p className="text-[17px] font-semibold text-white">
                        {rUser?.name}
                      </p>
                      <p className="text-[14px] text-gray-400 whitespace-normal break-all w-[120px]">
                        {rUser?.username}
                      </p>
                    </div>
                  </div>
                </Link>
                <div className="mx-4">
                  <FollowButton rUser={rUser} />
                </div>
              </div>
              <hr className="border-gray-600" />
            </div>
          ))}
        </div>

        <hr className="border-gray-600" />
        {/*show more*/}
        <div className="flex">
          <div className="flex-1 p-4 ">
            <h2
              onClick={toggleShowAllUsers}
              className="px-4 ml-2 w-48 font-bold text-blue-400 cursor-pointer"
            >
              {showAllUsers ? "Show less" : "Show more"}
            </h2>
          </div>
        </div>
      </div>
      {/*second-trending tweet section*/}
      <div className="max-w-sm rounded-lg bg-gray-700 overflow-hidden shadow-lg my-4 ms-4">
        <div className="flex">
          <div className="flex-1 m-2">
            <h2 className="px-4 py-2 text-xl w-48 font-semibold text-white">
              Trends for you
            </h2>
          </div>
          <div className="flex-1 px-4 py-2 m-2">
            <div className=" text-2xl rounded-full text-white hover:bg-blue-800 hover:text-blue-300 float-right">
              <svg
                className="m-2 h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
        </div>
        <hr className="border-gray-600" />
        {/*first trending tweet*/}
        <div className="flex">
          <div className="flex-1">
            <p className="px-4 ml-2 mt-3 w-48 text-xs text-gray-400">
              1 . Trending
            </p>
            <h2 className="px-4 ml-2 w-48 font-bold text-white">
              #Microsoft363
            </h2>
            <p className="px-4 ml-2 mb-3 w-48 text-xs text-gray-400">
              5,466 Tweets
            </p>
          </div>
          <div className="flex-1 px-4 py-2 m-2">
            <div className=" text-2xl rounded-full text-gray-400 hover:bg-blue-800 hover:text-blue-300 float-right">
              <svg
                className="m-2 h-5 w-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
        <hr className="border-gray-600" />
        {/*second trending tweet*/}
        <div className="flex">
          <div className="flex-1">
            <p className="px-4 ml-2 mt-3 w-48 text-xs text-gray-400">
              2 . Politics . Trending
            </p>
            <h2 className="px-4 ml-2 w-48 font-bold text-white">#HI-Fashion</h2>
            <p className="px-4 ml-2 mb-3 w-48 text-xs text-gray-400">
              8,464 Tweets
            </p>
          </div>
          <div className="flex-1 px-4 py-2 m-2">
            <div className=" text-2xl rounded-full text-gray-400 hover:bg-blue-800 hover:text-blue-300 float-right">
              <svg
                className="m-2 h-5 w-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
        <hr className="border-gray-600" />
        {/*third trending tweet*/}
        <div className="flex">
          <div className="flex-1">
            <p className="px-4 ml-2 mt-3 w-48 text-xs text-gray-400">
              3 . Rock . Trending
            </p>
            <h2 className="px-4 ml-2 w-48 font-bold text-white">#Facebook</h2>
            <p className="px-4 ml-2 mb-3 w-48 text-xs text-gray-400">
              5,586 Tweets
            </p>
          </div>
          <div className="flex-1 px-4 py-2 m-2">
            <div className=" text-2xl rounded-full text-gray-400 hover:bg-blue-800 hover:text-blue-300 float-right">
              <svg
                className="m-2 h-5 w-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
        <hr className="border-gray-600" />
        {/*forth trending tweet*/}
        <div className="flex">
          <div className="flex-1">
            <p className="px-4 ml-2 mt-3 w-48 text-xs text-gray-400">
              4 . Auto Racing . Trending
            </p>
            <h2 className="px-4 ml-2 w-48 font-bold text-white">#Google</h2>
            <p className="px-4 ml-2 mb-3 w-48 text-xs text-gray-400">
              9,416 Tweets
            </p>
          </div>
          <div className="flex-1 px-4 py-2 m-2">
            <div className=" text-2xl rounded-full text-gray-400 hover:bg-blue-800 hover:text-blue-300 float-right">
              <svg
                className="m-2 h-5 w-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
        <hr className="border-gray-600" />
        {/*show more*/}
        <div className="flex">
          <div className="flex-1 p-4">
            <h2 className="px-4 ml-2 w-48 font-bold text-blue-400">
              Show more
            </h2>
          </div>
        </div>
      </div>

      <div className="ms-6 my-6">
        <div className="flex-1">
          <span>
            <p className="text-sm leading-6 font-medium text-gray-500">
              Terms Privacy Policy Cookies Imprint Ads info
            </p>
          </span>
        </div>
        <div className="flex-2">
          <p className="text-sm leading-6 font-medium text-gray-600">
            {" "}
            &copy; {CustomDate.getFullYear()} NH Social, Inc.
          </p>
        </div>
      </div>
      <style>{`
        .overflow-y-auto::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default RightSide;
