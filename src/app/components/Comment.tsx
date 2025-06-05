"use client";
import Image from "next/image";
import React, { useState } from "react";
import { BsEmojiLaughing } from "react-icons/bs";
import { FaRegCommentDots, FaShareAlt, FaTelegram } from "react-icons/fa";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useGetMeQuery } from "@/redux/features/user/userApi";
import avatar from "../../../public/images/avatar.png";
import Like from "./Like";
import { TComment, TPost } from "@/types/types";
import {
  useCreateCommentMutation,
  useGetAllCommentQuery,
  useTotalCommentsQuery,
} from "@/redux/features/comment/commentApi";
import verified from "../../../public/images/verified.png";
import { useForm } from "react-hook-form";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Link from "next/link";

type PostPops = {
  post: TPost;
};

const Comment = ({ post }: PostPops) => {
  const user = useAppSelector(selectCurrentUser);
  const { data: getMe } = useGetMeQuery(undefined);
  const { data: allComment } = useGetAllCommentQuery(post?._id);
  const { data: totalComment } = useTotalCommentsQuery(post?._id);
  const router = useRouter();
  const [createComment] = useCreateCommentMutation();
  const [showComment, setShowComment] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const { handleSubmit } = useForm();

  // add emoji in comment box
  const addEmoji = (e: { native: string }) => {
    const emoji = e.native;
    setInputValue(inputValue + emoji);
  };

  //   create comment
  const onSubmit = async () => {
    if (!user) {
      Swal.fire({
        title: "Please Login first then comment in this post",
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
      const commentData = {
        commentText: inputValue,
        postId: post._id,
        userId: user?.userId,
      };
      await createComment(commentData);
      setInputValue("");
      setShowEmoji(false);
    }
  };

  //   handle enter key press to submit
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <>
      <div className="flex">
        <div className="w-full ">
          <div className="flex items-center justify-between py-5">
            <Like post={post} />
            <div className=" text-center py-2 m-2">
              <span
                onClick={() => setShowComment(!showComment)}
                className=" flex items-center justify-evenly rounded-full  text-slate-400 hover:text-blue-300 hover:cursor-pointer"
              >
                <FaRegCommentDots className="text-xl me-2" />
                <span>{totalComment?.data && totalComment?.data}</span>
              </span>
            </div>
            <div className=" text-center py-2 m-2">
              <span className=" flex items-center justify-evenly rounded-full  text-slate-400 hover:text-blue-300 hover:cursor-pointer">
                <FaShareAlt className="text-xl me-2" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {showComment && (
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="py-2 my-3 bg-gray-800 w-full rounded-lg">
              <div className="flex">
                <div className="m-2 w-10 py-1">
                  <Image
                    height={100}
                    width={100}
                    className="inline-block h-9 w-9 rounded-full"
                    src={getMe?.data?.profileImg || avatar}
                    alt=""
                  />
                </div>
                <div className="flex-1 pt-2 mb-2">
                  <textarea
                    onFocus={() => setShowEmoji(false)}
                    rows={2}
                    cols={20}
                    className="bg-transparent text-gray-400 font-medium text-lg w-full outline-none"
                    placeholder="Write a comment..."
                    value={inputValue}
                    onKeyPress={handleKeyPress}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <span
                    className="hover:cursor-pointer"
                    onClick={() => setShowEmoji(!showEmoji)}
                  >
                    <BsEmojiLaughing className="text-xl" />
                  </span>
                </div>
                {showEmoji && (
                  <div className="absolute mt-24 ms-10 z-30">
                    <Picker
                      data={data}
                      emojiSize={20}
                      emojiButtonSize={28}
                      onEmojiSelect={addEmoji}
                      maxFrequentRows={0}
                    />
                  </div>
                )}
                {inputValue.trim() === "" ? (
                  <button
                    disabled
                    className=" font-bold mr-2 text-2xl hover:cursor-not-allowed"
                  >
                    <FaTelegram className="text-gray-500" />
                  </button>
                ) : (
                  <button className="font-bold mr-2 text-2xl hover:cursor-pointer ">
                    <FaTelegram className="text-gray-100 hover:text-blue-500" />
                  </button>
                )}
              </div>
            </div>
          </form>
          {allComment?.data?.map((comment: TComment) => (
            <div className="w-full" key={comment._id}>
              <div className="bg-slate-800 inline-block ps-2 py-2 mx-2 mb-3 rounded-lg pr-5">
                <div className="flex">
                  <div>
                    <Link href={`/user-profile/${comment?.userId?._id}`}>
                      <Image
                        height={100}
                        width={100}
                        className="inline-block h-8 w-8 rounded-full"
                        src={
                          comment?.userId?.profileImg
                            ? comment?.userId?.profileImg
                            : avatar
                        }
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="ms-3">
                    <div className="flex items-center gap-x-1">
                      <Link href={`/user-profile/${comment?.userId?._id}`}>
                        <h1 className="text-lg font-semibold">
                          {comment?.userId?.name}
                        </h1>
                      </Link>
                      {comment?.userId?.isVerified && (
                        <Image
                          width={100}
                          height={100}
                          className="h-3.5 w-3.5 rounded-full"
                          src={verified}
                          alt="verified"
                          title="NH Social confirmed this profile is authentic"
                        />
                      )}
                    </div>
                    <p
                      className="text-slate-200"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {comment?.commentText}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Comment;
