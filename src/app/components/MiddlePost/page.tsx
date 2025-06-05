"use client";
import { useGetMeQuery } from "@/redux/features/user/userApi";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";
import { BsCameraVideo, BsEmojiLaughing } from "react-icons/bs";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { FaSearch } from "react-icons/fa";
import { toast } from "sonner";
import avatar from "../../../../public/images/avatar.png";
import { FieldValues, useForm } from "react-hook-form";
import gallery from "../../../../public/images/gallery.png";
import MobileMenu from "../MobileDeviceMenu/page";
import AllPosts from "../AllPosts";
import Swal from "sweetalert2";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import {
  useAllPostQuery,
  useCreatePostMutation,
} from "@/redux/features/post/postApi";
const image_upload_token = process.env.NEXT_PUBLIC_image_upload_token;

const MiddlePost = () => {
  const user = useAppSelector(selectCurrentUser);
  const { data: getMe } = useGetMeQuery(undefined);
  const [createPost] = useCreatePostMutation();
  const { handleSubmit } = useForm();
  const [showEmoji, setShowEmoji] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [inputImage, setInputImage] = useState<File | string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const { data: posts, isFetching, isLoading } = useAllPostQuery(searchTerm);
  const image_upload_url = `https://api.imgbb.com/1/upload?key=${image_upload_token}`;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
   const handle = setTimeout(() => {
      setSearchTerm(e.target.value);
   }, 1000);
    return () => {
      clearTimeout(handle);
    };
  }

  // post a image
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files && event.target.files[0];

    if (selectedImage) {
      setInputImage(selectedImage);
    }
  };

  // click on a image
  const handleImageClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  // add emoji
  const addEmoji = (e: { native: string }) => {
    const emoji = e.native;
    setInputValue(inputValue + emoji);
  };

  // post in social media
  const onSubmit = async () => {
    if (!user) {
      Swal.fire({
        title: "Please Login first then post something",
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
      const toastId = toast.loading("Creating post...");
      try {
        if (inputImage) {
          const formData = new FormData();
          formData.append("image", inputImage);
          fetch(image_upload_url, {
            method: "POST",
            body: formData,
          })
            .then((res) => res.json())
            .then(async (postPhoto) => {
              if (postPhoto.success) {
                const postURL = postPhoto.data.display_url;
                const postData = {
                  postText: inputValue,
                  postPhoto: postURL,
                  userId: user.userId,
                };
                const res: any = await createPost(postData);
                if (res?.error) {
                  toast.error(`Something went wrong`, {
                    id: toastId,
                    duration: 2000,
                  });
                } else {
                  toast.success("Your post has been successful!", {
                    id: toastId,
                    duration: 2000,
                  });
                  setInputValue("");
                  setShowEmoji(false);
                  setInputImage("");
                }
              }
            });
        } else {
          const postData = {
            postText: inputValue,
            userId: user.userId,
          };
          const res: any = await createPost(postData);
          if (res?.error) {
            toast.error(`Something went wrong`, {
              id: toastId,
              duration: 2000,
            });
          } else {
            toast.success("Your post has been successful!", {
              id: toastId,
              duration: 2000,
            });
            setInputValue("");
            setShowEmoji(false);
          }
        }
      } catch (error) {
        toast.error("Something went wrong", {
          id: toastId,
          duration: 2000,
        });
      }
    }
  };

  return (
    <div className="lg:col-span-4 border border-gray-600 h-auto border-t-0">
      {/*middle wall*/}
      <div className="flex sticky top-0 z-50 bg-gray-900 shadow-xl">
        <div className="w-1/3 m-2">
          <h2 className="px-4 py-2 text-2xl font-bold text-white hidden lg:block">
            <Link href="/">Home</Link>
          </h2>
          <h2 className="ps-2 py-2 text-xl font-bold text-orange-500 lg:hidden block">
            <Link href="/">
              {" "}
              Hazrat <span className="text-sky-400">Social</span>
            </Link>
          </h2>
        </div>
        <div className="w-2/3 px-4 py-2 m-2">
          <button type="submit" className="absolute ml-4 mt-3 mr-4">
            <FaSearch />
          </button>
          <input
            onChange={(e) => handleSearch(e)}
            type="search"
            name="search"
            placeholder="Hazrat Twitter"
            className="bg-gray-700 h-10 px-10 pr-5 w-full rounded-full text-sm focus:outline-none bg-purple-white shadow border-0"
          />
        </div>
      </div>
      <hr className="border-gray-600" />
      {/*middle creat tweet*/}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex">
          <div className="m-2 w-10 py-1">
            <Image
              height={100}
              width={100}
              className="inline-block rounded-full h-10 w-10"
              src={getMe?.data?.profileImg ? getMe?.data?.profileImg : avatar}
              alt=""
            />
          </div>
          <div className="flex-1 px-2 pt-2 mt-2">
            <textarea
              onFocus={() => setShowEmoji(false)}
              className=" bg-transparent text-gray-400 font-medium text-lg w-full outline-none"
              rows={4}
              cols={50}
              placeholder="What's happening?"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
        </div>
        {inputImage && (
          <div>
            <Image
              height={1000}
              width={1000}
              className="rounded-md h-24 w-28 ms-10"
              src={inputImage ? URL.createObjectURL(inputImage as File) : ""}
              alt="Photo is brocken"
            />
          </div>
        )}

        {/*middle creat tweet below icons*/}
        <div className="flex">
          <div className="w-10" />
          <div className="w-64 px-2">
            <div className="flex items-center">
              <div className="text-center py-2 m-2">
                <span className="mt-1 text-blue-400 hover:cursor-pointer">
                  <BsCameraVideo className="text-2xl" />
                </span>
              </div>
              <div
                onClick={handleImageClick}
                className="ms-5 text-center py-2 m-2 relative"
              >
                <span className="mt-1 text-blue-400 hover:cursor-pointer">
                  <Image
                    height={100}
                    width={100}
                    className="rounded-md h-6 w-6"
                    src={gallery}
                    alt="Photo is brocken"
                  />
                  <input
                    ref={inputRef}
                    onChange={handleImageChange}
                    type="file"
                    className="h-4 w-4 z-10 border-2 blue-600 border-blue-400 hidden"
                  />
                </span>
              </div>
              <div className="ms-5 text-center py-2 m-2">
                <span
                  onClick={() => setShowEmoji(!showEmoji)}
                  className="mt-1 text-blue-400 hover:cursor-pointer"
                >
                  <BsEmojiLaughing className="text-2xl" />
                </span>
              </div>
            </div>
            {showEmoji && (
              <div className="absolute z-50">
                <Picker
                  data={data}
                  emojiSize={20}
                  emojiButtonSize={28}
                  onEmojiSelect={addEmoji}
                  maxFrequentRows={0}
                />
              </div>
            )}
          </div>
          <div className="flex-1">
            {inputValue.trim() === "" ? (
              <button
                disabled
                className="bg-blue-200 mt-2 hover:cursor-not-allowed text-gray-100 font-bold py-2 px-8 rounded-full mr-8 float-right"
              >
                Post
              </button>
            ) : (
              <button className="bg-blue-400 mt-2 hover:bg-blue-600 text-white font-bold py-2 px-8 rounded-full mr-8 float-right hover:cursor-pointer">
                Post
              </button>
            )}
          </div>
        </div>
      </form>
      <hr className="border-blue-800 border-2" />
      {/* Get All Posts */}
      <AllPosts posts={posts} isFetching={isFetching} isLoading={isLoading} />
      {/* mobile menu */}
      <MobileMenu />
    </div>
  );
};

export default MiddlePost;