"use client";
import { useAllPostQuery } from "@/redux/features/post/postApi";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import avatar from "../../../public/images/avatar.png";
import verified from "../../../public/images/verified.png";
import moment from "moment";
import { TPost } from "@/types/types";

import Comment from "./Comment";
import EditPost from "./EditPost";
import Skeleton from "./Skeleton";

type TAllPostsProps = {
  data: TPost[];
};

const AllPosts = ({
  posts,
  isFetching,
  isLoading,
}: {
  posts: TAllPostsProps;
  isFetching: boolean;
  isLoading: boolean;
}) => {
  const [editModes, setEditModes] = useState<{ [postId: string]: boolean }>({});

  // handle "Edit" button click
  const handleEditClick = (postId: string) => {
    setEditModes((prevEditModes) => ({
      ...prevEditModes,
      [postId]: !prevEditModes[postId], // Toggle the edit mode for this post
    }));
  };

  // Loading Skeleton for fetching
  if (isFetching) {
    return <Skeleton />;
  }

  // Loading Skeleton for loading
  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <>
      {posts?.data?.map((post: TPost) => (
        <div key={post._id} className="">
          <div className=" flex items-center justify-between p-4 pb-0 relative">
            <div className="flex items-center">
              <div>
                <Link href={`/user-profile/${post?.userId?._id}`}>
                  <Image
                    width={100}
                    height={100}
                    className="h-10 w-10 rounded-full"
                    src={post?.userId?.profileImg || avatar}
                    alt=""
                  />
                </Link>
              </div>
              <div className="ml-3">
                <div className="flex items-center gap-1">
                  <p className="text-base leading-6 font-medium text-white cursor-pointer">
                    <Link href={`/user-profile/${post?.userId?._id}`}>
                      {post?.userId?.name}
                    </Link>
                  </p>
                  {post?.userId?.isVerified && (
                    <Image
                      width={100}
                      height={100}
                      className="h-3.5 w-3.5 rounded-full"
                      src={verified}
                      alt="verified"
                      title="Hazrat Ali confirmed this profile is authentic"
                    />
                  )}
                </div>
                <span className="text-sm leading-6  font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                  {post?.userId?.username} -{" "}
                  {moment(post?.createdAt).format("Do MMM  YY, h:mm a")}
                </span>
              </div>
            </div>
            <div
              onClick={() => handleEditClick(post._id)}
              className="font-semibold text-xl hover:cursor-pointer hover:text-blue-400"
            >
              ...
            </div>
            <EditPost
              editModes={editModes[post._id] || false}
              setEditModes={(postId) => handleEditClick(postId)}
              post={post}
            />
          </div>
          <div className="pl-16 pr-2">
            <p
              className="text-base width-auto font-medium text-slate-200 flex-shrink"
              style={{ whiteSpace: "pre-line" }}
            >
              {post?.postText}
            </p>
            {post.postPhoto && (
              <div className="md:flex-shrink pr-6 pt-3">
                <Image
                  height={1000}
                  width={1000}
                  className="rounded-lg h-full w-full"
                  src={post?.postPhoto}
                  alt="Photo is brocken"
                />
              </div>
            )}

            <Comment post={post} />
          </div>
          <hr className="border-gray-600" />
        </div>
      ))}
    </>
  );
};

export default AllPosts;
