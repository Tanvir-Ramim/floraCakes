"use client";
import SocialDetails from "@/components/shared/Social/SocialDetails";
import { loginWithToken, useAuth } from "@/hooks/authHook";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

interface LoginFormInputs {
  emailOrPhone: string;
  password: string;
  rememberMe: boolean;
}

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const {
    login,
    isLoggingIn,
    error,
    clearError,
    googleAuth,
    isGoogleAuthLoading,
  } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<LoginFormInputs>({
    defaultValues: {
      rememberMe: false,
    },
  });
  // Load saved credentials when component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCredentials = localStorage.getItem("rememberedCredentials");
      if (savedCredentials) {
        try {
          const { emailOrPhone, password } = JSON.parse(savedCredentials);
          setValue("emailOrPhone", emailOrPhone);
          setValue("password", password);
          setValue("rememberMe", true);
        } catch (e) {
          console.error("Failed to parse saved credentials", e);
          localStorage.removeItem("rememberedCredentials");
        }
      }
    }
  }, [setValue]);
  const onSubmit = (data: LoginFormInputs) => {
    clearError();

    // Save credentials if "Remember Me" is checked
    if (data.rememberMe) {
      localStorage.setItem(
        "rememberedCredentials",
        JSON.stringify({
          emailOrPhone: data.emailOrPhone,
          password: data.password,
        })
      );
    } else {
      localStorage.removeItem("rememberedCredentials");
    }

    login({
      identifier: data.emailOrPhone,
      password: data.password,
    });
  };
  // google login handler
  const handleGoogleLogin = async () => {
    try {
      const ipResponse = await fetch("https://api.ipify.org?format=json");
      const ipData = await ipResponse.json();
      const ip = ipData.ip;

      if (!ip) {
        toast.error("Could not determine your IP address");
        return;
      }

      await googleAuth(ip);
    } catch {
      toast.error("Failed to initiate Google login");
    }
  };
  const handleReset = () => {
    reset();
    clearError();
  };
  // google login
  useEffect(() => {
    const customerId = searchParams.get("customerId");
    const authType = searchParams.get("auth");

    if (customerId && authType === "google") {
      const handleGoogleLogin = async () => {
        try {
          await loginWithToken(customerId,router,dispatch);
        } catch {
          toast.error("Failed to complete Google login");
        }
      };
      handleGoogleLogin();
    }
  }, [searchParams, loginWithToken, router]);
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="fixed inset-0 -z-10">
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
          poster="/placeholder.svg?height=1080&width=1920"
        >
          <source src="/BackgroundFile/borsalle.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 backdrop-blur-xl bg-black/20" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl grid md:grid-cols-2 rounded-2xl overflow-hidden backdrop-blur shadow-2xl border border-white/20"
      >
        {/* Welcome Section */}
        <div className="hidden md:block bg-gradient-to-br from-blue-900/40 to-amber-500/40 backdrop-blur-md p-10">
          <div className="h-full flex flex-col items-center justify-center text-white text-center">
            <h2 className="text-xl font-bold mb-4">
              Access your account to explore more amazing features.
            </h2>
            <p className="mb-8 text-white/90">Don&apos;t have an account?</p>
            <Link
              href="/register"
              className="px-6 py-2 border-2 border-white rounded-full hover:bg-white hover:text-[#c48200] transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-black/20 backdrop-blur-xl p-8">
          <div className="w-full max-w-sm mx-auto space-y-6">
            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-500 p-3 rounded-md">
                {error}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              {/* Email or Phone */}
              <div className="space-y-2">
                <label className="uppercase text-sm font-medium text-white">
                  Email or Phone *
                </label>
                <input
                  {...register("emailOrPhone", {
                    required: "Email or phone number is required",
                    validate: (value) =>
                      /^\S+@\S+\.\S+$/.test(value) ||
                      /^\+?[0-9]{10,15}$/.test(value)
                        ? true
                        : "Enter a valid email or phone number",
                  })}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-white/50 focus:outline-none focus:border-white/40"
                  placeholder="Email or Phone"
                />
                {errors.emailOrPhone && (
                  <p className="text-red-400 text-sm">
                    {errors.emailOrPhone.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="uppercase text-sm font-medium text-white">
                  Password *
                </label>
                <div className="relative">
                  <input
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters long",
                      },
                    })}
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-white/50 focus:outline-none focus:border-white/40"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    className="absolute cursor-pointer inset-y-0 right-3 flex items-center text-white/50 hover:text-white"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    {...register("rememberMe")}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label
                    htmlFor="rememberMe"
                    className="ml-2 block text-sm text-white"
                  >
                    Remember me
                  </label>
                </div>

                {/* <button
                  type="button"
                  className="text-sm cursor-pointer text-white hover:text-white"
                >
                  Forgot Password?
                </button> */}
              </div>

              {/* Submit buttons */}
              <div className="flex justify-between md:gap-5 gap-4 my-3 items-center flex-wrap">
                <div className="flex justify-start sm:gap-5 gap-4">
                  <button
                    type="submit"
                    disabled={isLoggingIn}
                    className={`hover:bg-primary cursor-pointer text-white duration-500 font-medium capitalize text-sm lg:text-base px-5 md:px-10 lg:py-1 py-1 rounded-sm border border-gray text-primary lg:h-[40px] h-[33px] ${
                      isLoggingIn ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isLoggingIn ? "Logging in..." : "Login"}
                  </button>

                  {/* Google login button */}
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={isGoogleAuthLoading}
                    className={`w-[80px] lg:h-[40px] h-[33px] flex items-center justify-center border-gray rounded-sm hover:shadow-xl duration-500 border p-1 ${
                      isGoogleAuthLoading
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  >
                    {isGoogleAuthLoading ? (
                      <span className="loading loading-spinner loading-xs"></span>
                    ) : (
                      <Image
                        src="https://cdn-icons-png.flaticon.com/128/300/300221.png"
                        alt="google"
                        className="w-full h-full object-contain rounded-sm"
                        width={24}
                        height={24}
                      />
                    )}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="hover:bg-white cursor-pointer text-white hover:text-primary duration-500 font-medium capitalize text-sm lg:text-base px-5 md:px-10 lg:py-1 py-1 rounded-sm border border-gray text-primary lg:h-[40px] h-[33px]"
                >
                  Reset
                </button>
              </div>
            </form>

            {/* Social login (if any) */}
            <SocialDetails />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
