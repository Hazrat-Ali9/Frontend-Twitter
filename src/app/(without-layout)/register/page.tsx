"use client";
import Lottie from "lottie-react";
import Link from "next/link";
import { FieldValues, useForm } from "react-hook-form";
import registerLottie from "../../../../public/images/animation_llpei2ae.json";
import { toast } from "sonner";
import { useRegisterMutation } from "@/redux/features/register/registerApi";
import { useRouter } from "next/navigation";

const Register = () => {
  const [registerUser] = useRegisterMutation();
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  // user registration form submit
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Please wait...");

    try {
      // username generate randomly by using email
      const email = data?.email;
      const atIndex = email.indexOf("@");
      const usernameSlice = email.slice(0, atIndex);
      const randomDigits = Math.floor(Math.random() * 900) + 100;
      const userName = `${usernameSlice}${randomDigits}`;

      const userData = { ...data, username: userName };

      const res: any = await registerUser(userData);

      if (res?.error) {
        toast.error(`${data.email} Already used`, {
          id: toastId,
          duration: 2000,
        });
      } else {
        toast.success("Registration successful!", {
          id: toastId,
          duration: 2000,
        });
        router.push("/login");
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <div className="lg:flex justify-between items-center lg:h-[calc(100vh-68px)] py-10 lg:py-0">
      <div className="lg:w-1/2">
        <div className="px-8 sm:px-24 md:px-40 lg:px-12 xl:px-24 xl:max-w-2xl">
          <h2
            className="text-center text-2xl font-semibold lg:text-4xl
          xl:text-bold "
          >
            <span className="text-blue-800">Welcome to</span>{" "}
            <Link href="/">Hazrat Ali</Link>
          </h2>
          <div className="mt-12">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <div className=" font-semibold text-gray-300 tracking-wide text-lg">
                  Name
                </div>
                <input
                  {...register("name")}
                  type="text"
                  className="w-full text-lg py-2 border-b bg-transparent border-gray-300 focus:outline-none focus:border-blue-500"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="mt-8">
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
                <div className="font-semibold text-gray-300 tracking-wide text-lg">
                  Password
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
                  Register
                </button>
              </div>
            </form>
            <div className="mt-12 text-sm font-display font-semibold text-gray-500 text-center">
              Already have an account ?{" "}
              <Link
                href="/login"
                className="cursor-pointer text-md text-blue-600 hover:text-blue-800"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className=" lg:w-1/2 items-center justify-center bg-transparent">
        <div className="w-full">
          <Lottie animationData={registerLottie} loop={true} />
        </div>
      </div>
    </div>
  );
};

export default Register;
