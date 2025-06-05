/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaBookReader,
  FaCalendarAlt,
  FaLink,
  FaMailBulk,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaUserMd,
} from "react-icons/fa";
import avatar from "../../../../../public/images/avatar.png";
import verified from "../../../../../public/images/verified.png";
import { useGetUserInfoQuery } from "@/redux/features/user/userApi";
import { useAllPostByUserIdQuery } from "@/redux/features/post/postApi";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import MobileMenu from "@/app/components/MobileDeviceMenu/page";
import ProfilePosts from "@/app/components/ProfilePosts";
import ProfileUpdateModal from "@/app/components/ProfileUpdateModal";
import {
  useCheckFollowQuery,
  useCreateFollowMutation,
  useGetAllFollowerQuery,
  useGetAllFollowingQuery,
  useRemoveFollowMutation,
} from "@/redux/features/follow/followApi";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const UserProfile = ({ params }: any) => {
  const user = useAppSelector(selectCurrentUser);
  const { data: userInfo } = useGetUserInfoQuery(params?._id);
  const { data: userProfilePost } = useAllPostByUserIdQuery(params?._id);
  const { data: followingData } = useGetAllFollowingQuery(params?._id);
  const { data: followerData } = useGetAllFollowerQuery(params?._id);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { data: checkFollow } = useCheckFollowQuery(user?.userId || "");
  const [addFollow] = useCreateFollowMutation();
  const [removeFollow] = useRemoveFollowMutation();
  const [isFollow, setIsFollow] = useState(false);

  const handleFollow = async (followerUserId: string) => {
    if (!user) {
      Swal.fire({
        title: "Please Login first then follow",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sign In",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/login");
        }
      });
    } else {
      const followData = { followingUserId: user?.userId, followerUserId };

      if (!isFollow) {
        // Create a follow
        await addFollow(followData);
        setIsFollow(true);
      } else {
        // Remove follow
        const res = await removeFollow(followData);
        setIsFollow(false);
      }
    }
  };

  //  check current logged user follow witch users
  useEffect(() => {
    const followedFields = checkFollow?.data?.map((follow: any) => follow);
    const checkFollowed = followedFields?.includes(params?._id);
    setIsFollow(checkFollowed);
  }, [checkFollow, params._id]);

  return (
    <div className="col-span-4 h-auto border border-y-0 border-gray-800">
      {/*Content (Center)*/}
      {/* Nav back*/}
      <div>
        <div className="flex justify-start items-center">
          <div className="px-4 py-2 mx-2">
            <Link
              href="/"
              className=" text-2xl font-medium rounded-full text-blue-400 hover:bg-gray-800 hover:text-blue-300 float-right"
            >
              <FaArrowLeft />
            </Link>
          </div>
          <div className="m-2">
            <h2 className="mb-0 text-xl font-bold text-white">
              {userInfo && userInfo?.data?.name}
            </h2>
            <p className="mb-0 w-48 text-xs text-gray-400">
              {userProfilePost?.data?.length} Posts
            </p>
          </div>
        </div>
        <hr className="border-gray-800" />
      </div>
      {/* User card*/}
      <div>
        <div
          className="w-full bg-cover bg-no-repeat bg-center"
          style={{
            height: "200px",
            backgroundImage:
              "url(https://images.pexels.com/photos/634688/pexels-photo-634688.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
          }}
        >
          <Image
            width={100}
            height={100}
            className="opacity-0 w-full h-full"
            src="https://images.pexels.com/photos/12222247/pexels-photo-12222247.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </div>
        <div className="p-4">
          <div className="relative flex w-full">
            {/* Avatar */}
            <div className="flex flex-1">
              <div style={{ marginTop: "-6rem" }}>
                <div
                  style={{ height: "9rem", width: "9rem" }}
                  className="md rounded-full relative avatar"
                >
                  <Image
                    width={100}
                    height={100}
                    style={{ height: "9rem", width: "9rem" }}
                    className="md rounded-full relative border-4 border-gray-900"
                    src={
                      userInfo && userInfo?.data?.profileImg
                        ? userInfo?.data?.profileImg
                        : avatar
                    }
                    alt=""
                  />
                  <div className="absolute" />
                </div>
              </div>
            </div>
            {/* Follow Button */}
            {user?.userId === userInfo?.data?._id ? (
              <div className="flex flex-col text-right">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex justify-center  max-h-max whitespace-nowrap focus:outline-none  focus:ring  max-w-max border bg-transparent border-blue-500 text-blue-500 hover:border-blue-800  items-center hover:shadow-lg font-bold py-2 px-4 rounded-full mr-0 ml-auto"
                >
                  Edit Profile
                </button>
                <ProfileUpdateModal isOpen={isOpen} setIsOpen={setIsOpen} />
              </div>
            ) : (
              <div className="flex flex-col text-right">
                <button
                  onClick={() => handleFollow(params._id)}
                  className="flex justify-center  max-h-max whitespace-nowrap focus:outline-none  focus:ring  max-w-max border bg-transparent border-blue-500 text-blue-500 hover:border-blue-800  items-center hover:shadow-lg font-bold py-2 px-4 rounded-full mr-0 ml-auto"
                >
                  {isFollow ? "Unfollow" : "Follow"}
                </button>
              </div>
            )}
          </div>
        </div>
        {/* Profile info */}
        <div className="space-y-1 justify-center w-full mt-3 ml-3">
          {/* User basic*/}
          <div>
            <div className="flex items-center gap-x-1">
              <h2 className="text-xl leading-6 font-bold text-white">
                {userInfo && userInfo?.data?.name}
              </h2>
              {userInfo?.data?.isVerified && (
                <Image
                  width={100}
                  height={100}
                  className="h-4 w-4 rounded-full"
                  src={verified}
                  alt="verified"
                  title="Hazrat Ali Social confirmed this profile is authentic"
                />
              )}
            </div>
            <p className="text-sm leading-5 font-medium text-slate-500">
              @{userInfo && userInfo?.data?.username}
            </p>
          </div>
          {/* Description and others */}
          <div className="pt-3">
            <p className="text-white leading-tight mb-2 text-xl">
              {userInfo?.data?.about ? (
                userInfo?.data?.about
              ) : (
                <span>Not Added</span>
              )}
            </p>

            <div className="text-gray-600">
              <span className="flex mr-2 mt-2 ">
                <FaBookReader />
                <span className="leading-5 ml-2 text-slate-300">
                  {userInfo?.data?.university ? (
                    userInfo?.data?.university
                  ) : (
                    <span className="text-gray-500">Not Added</span>
                  )}
                </span>
              </span>
              <span className="flex mr-2 mt-2 ">
                <FaMapMarkerAlt />
                <span className="leading-5 ml-2 text-slate-300">
                  {userInfo?.data?.address ? (
                    userInfo?.data?.address
                  ) : (
                    <span className="text-gray-500">Not Added</span>
                  )}
                </span>
              </span>
              <span className="flex mr-2 mt-2 ">
                <FaUserMd />
                <span className="leading-5 ml-2 text-slate-300">
                  {userInfo?.data?.gender ? (
                    userInfo?.data?.gender.charAt(0).toUpperCase() +
                    userInfo?.data?.gender.slice(1)
                  ) : (
                    <span className="text-gray-500">Not Added</span>
                  )}
                </span>
              </span>
              <span className="flex mr-2 mt-2 ">
                <FaMailBulk />
                <span className="leading-5 ml-2 text-slate-300">
                  {userInfo && userInfo?.data?.email}
                </span>
              </span>
              <span className="flex mr-2 mt-2 ">
                <FaPhoneAlt />
                <span className="leading-5 ml-2 text-slate-300">
                  {userInfo?.data?.contactNo ? (
                    userInfo?.data?.contactNo
                  ) : (
                    <span className="text-gray-500">Not Added</span>
                  )}
                </span>
              </span>
              <span className="flex mr-2 mt-2">
                <FaLink />
                <span className="leading-5 ml-2 text-blue-400">
                  <a
                    href={
                      userInfo?.data?.website ? userInfo?.data?.website : ""
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {userInfo?.data?.website ? (
                      userInfo?.data?.website
                    ) : (
                      <span className="text-gray-500">Not Added</span>
                    )}
                  </a>
                </span>
              </span>
              <span className="flex mr-2 mt-2 ">
                <FaCalendarAlt />
                <span className="leading-5 ml-2 text-slate-300">
                  Joined{" "}
                  {moment(
                    userInfo?.data?.createdAt && userInfo?.data?.createdAt
                  ).format("MMMM Do, YYYY")}
                </span>
              </span>
            </div>
          </div>
          <div className="pt-3 flex justify-start items-start w-full divide-x divide-gray-800 divide-solid">
            <div className="text-center pr-3">
              <span className="font-bold text-white">
                {followingData?.data?.length}
              </span>
              <span className="text-gray-600"> Following</span>
            </div>
            <div className="text-center px-3">
              <span className="font-bold text-white">
                {followerData?.data?.length}
              </span>
              <span className="text-gray-600"> Followers</span>
            </div>
          </div>
        </div>
      </div>
      <hr className="border-blue-600 border-1" />
      <ProfilePosts params={params} />
      <MobileMenu />
    </div>
  );
};

export default UserProfile;
