/* eslint-disable react/no-unescaped-entities */
"use client";
import Lottie from "lottie-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import loginLottie from "../../../../public/images/animation_llpcwk02.json";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import { TUser, setUser } from "@/redux/features/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";
import { useAppDispatch } from "@/redux/hooks";

const LoginPage = () => {
  const [login] = useLoginMutation();
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in...");

    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      if (res?.error) {
        toast.error(`Something went wrong`, {
          id: toastId,
          duration: 2000,
        });
      } else {
        const user = verifyToken(res.data.accessToken) as TUser;
        dispatch(setUser({ user, token: res.data.accessToken }));
        toast.success("Login successful!", {
          id: toastId,
          duration: 2000,
        });
        router.push("/");
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <div className="lg:flex justify-between items-center lg:h-[calc(100vh-68px)] py-10 lg:py-0">
      <div className="lg:w-1/2">
        <div className="px-8 sm:px-24 md:px-40 lg:px-12 xl:px-24 xl:max-w-2xl">
          <div
            className="text-center text-2xl font-semibold lg:text-4xl
              xl:text-bold mb-20"
          >
            <span className="text-blue-800 ">Welcome to</span>{" "}
            <Link href="/">Hazrat Ali</Link>
          </div>
          <div className="mt-12">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <div className=" font-semibold text-gray-300 tracking-wide text-lg">
                  Email
                </div>
                <input
                  {...register("email")}
                  type="email"
                  className="w-full text-lg py-2 border-b bg-transparent border-gray-300 focus:outline-none focus:border-blue-500"
                  placeholder="hazrat@gmail.com"
                  required
                />
              </div>
              <div className="mt-8">
                <div className="flex justify-between items-center">
                  <div className="font-semibold text-gray-300 tracking-wide text-lg">
                    Password
                  </div>
                  <div>
                    <a className="text-xs font-display font-semibold text-blue-600 hover:text-blue-80 cursor-pointer">
                      Forgot Password?
                    </a>
                  </div>
                </div>
                <input
                  {...register("password")}
                  type="password"
                  className="w-full text-lg py-2 border-b bg-transparent border-gray-300 focus:outline-none focus:border-blue-500"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="mt-10">
                <button
                  className="bg-blue-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                          font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-blue-600
                          shadow-lg"
                >
                  Log In
                </button>
              </div>
            </form>
            <div className="mt-12 text-sm font-display font-semibold text-gray-500 text-center">
              Don't have an account ?{" "}
              <Link
                href="/register"
                className="cursor-pointer text-md text-blue-600 hover:text-blue-800"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className=" lg:w-1/2 items-center justify-center bg-transparent">
        <div className="w-full">
          <Lottie animationData={loginLottie} loop={true} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
