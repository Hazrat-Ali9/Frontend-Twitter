"use client";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import {
  useCheckFollowQuery,
  useCreateFollowMutation,
  useRemoveFollowMutation,
} from "@/redux/features/follow/followApi";
import { useAppSelector } from "@/redux/hooks";
import { TUser } from "@/types/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const FollowButton = ({ rUser }: { rUser: TUser }) => {
  const user = useAppSelector(selectCurrentUser);
  const { data: checkFollow } = useCheckFollowQuery(user?.userId || "");
  const [addFollow] = useCreateFollowMutation();
  const [removeFollow] = useRemoveFollowMutation();
  const [isFollow, setIsFollow] = useState(false);
  const router = useRouter();

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
    const checkFollowed = followedFields?.includes(rUser._id);
    setIsFollow(checkFollowed);
  }, [checkFollow, rUser._id]);

  return (
    <button
      onClick={() => handleFollow(rUser._id)}
      className="bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-3 border border-white hover:border-transparent rounded-full"
    >
      {isFollow ? "Unfollow" : "Follow"}
    </button>
  );
};

export default FollowButton;
