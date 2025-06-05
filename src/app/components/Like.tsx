"use client";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import {
  useCheckPostLikeQuery,
  useCreateLikeMutation,
  useRemoveLikeMutation,
  useTotalLikesQuery,
} from "@/redux/features/like/likeApi";
import { useAppSelector } from "@/redux/hooks";
import { TPost } from "@/types/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Swal from "sweetalert2";

type PostPops = {
  post: TPost;
};

const Like = ({ post }: PostPops) => {
  const user = useAppSelector(selectCurrentUser);
  const router = useRouter();
  const [createLike] = useCreateLikeMutation();
  const [removeLike] = useRemoveLikeMutation();
  const { data: totalLikes } = useTotalLikesQuery(post?._id);
  const { data: checkPostLiked } = useCheckPostLikeQuery(user?.userId || "");
  const [isLiked, setIsLiked] = useState(false);

  //  check current logged user liked witch posts
  useEffect(() => {
    const likedPosts = checkPostLiked?.data?.map((like: any) => like);
    const checkLike = likedPosts?.includes(post._id);
    setIsLiked(checkLike);
  }, [checkPostLiked, post._id]);

  // handle liked and remove liked
  const handleLikeButton = async (postId: string) => {
    if (!user) {
      Swal.fire({
        title: "Please Login first then like",
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
      const postLike = {
        userId: user?.userId,
        postId: postId,
      };
      if (!isLiked) {
        // Create a like
        await createLike(postLike);
        setIsLiked(true);
      } else {
        // Remove like
        await removeLike(postLike);
        setIsLiked(false);
      }
    }
  };

  return (
    <div className="text-center py-2 m-2">
      <span className="flex items-center justify-evenly rounded-full text-slate-400 hover:text-red-400 hover:cursor-pointer">
        <div
          onClick={() => handleLikeButton(post._id)}
          className="flex items-center"
        >
          {isLiked ? (
            <FaHeart className="text-lg me-2 text-red-400" />
          ) : (
            <FaRegHeart className="text-lg me-2" />
          )}
        </div>
        <span>{totalLikes?.data && totalLikes?.data}</span>
      </span>
    </div>
  );
};

export default Like;
