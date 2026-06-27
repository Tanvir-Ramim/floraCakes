// "use client";

// import { motion } from "framer-motion";
// import { Eye, EyeOff } from "lucide-react";
// import Link from "next/link";
// import { useState } from "react";
// import { useForm } from "react-hook-form";

// interface LoginFormInputs {
// 	name: string;
// 	email: string;
// 	password: string;
// 	mobile: string;
// }

// const RegisterPage = () => {
// 	const [showPassword, setShowPassword] = useState(false);

// 	const {
// 		register,
// 		// handleSubmit,
// 		formState: { errors },
// 		// reset,
// 	} = useForm<LoginFormInputs>();

// 	return (
// 		<div className="min-h-screen w-full flex items-center justify-center p-4">
// 			<div className="fixed inset-0 -z-10">
// 				<video
// 					autoPlay
// 					loop
// 					muted
// 					className="w-full h-full object-cover"
// 					poster="/placeholder.svg?height=1080&width=1920"
// 				>
// 					<source src="/BackgroundFile/borsalle.mp4" type="video/mp4" />
// 				</video>
// 				<div className="absolute inset-0 bg-black/20" />
// 			</div>
// 			<motion.div
// 				initial={{ opacity: 0, y: 20 }}
// 				animate={{ opacity: 1, y: 0 }}
// 				className="w-full max-w-4xl grid md:grid-cols-2 rounded-2xl
//          overflow-hidden backdrop-blur-xl bg-black/20"
// 			>
// 				{/* Welcome Section */}
// 				<div
// 					className="hidden md:block bg-gradient-to-br from-blue-900/40 to-amber-500/40 backdrop-blur-md
//         p-8"
// 				>
// 					<div className="h-full flex flex-col items-center justify-center text-white text-center">
// 						<h2 className="text-xl font-bold mb-4">
// 							Access your account to explore more amazing features.
// 						</h2>
// 						<p className="mb-8 text-white">Already have an account ?</p>
// 						<Link
// 							href="/login"
// 							className="px-6 py-2 border-2 border-white rounded-full
//                        hover:bg-white hover:text-rose-500 transition-colors"
// 						>
// 							Sign In
// 						</Link>
// 					</div>
// 				</div>
// 				{/* Login Form */}
// 				<div className=" p-8 bg-white/20 backdrop-blur-xl ">
// 					<div className="w-full max-w-sm mx-auto space-y-6">
// 						<form className="space-y-4">
// 							<div className="space-y-2">
// 								<label className="uppercase text-sm font-medium text-white">
// 									Name *
// 								</label>
// 								<input
// 									{...register("name", {
// 										required: "Name is required",
// 									})}
// 									className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md
//                            text-white placeholder:text-white/50
//                            focus:outline-none focus:border-white/40"
// 									placeholder="Name"
// 								/>
// 								{errors.name && (
// 									<p className="text-red-400 text-sm">{errors.name.message}</p>
// 								)}
// 							</div>
// 							<div className="space-y-2">
// 								<label className="uppercase text-sm font-medium text-white">
// 									Email *
// 								</label>
// 								<input
// 									{...register("email", {
// 										required: "Email is required",
// 									})}
// 									className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md
//                            text-white placeholder:text-white /50
//                            focus:outline-none focus:border-white /40"
// 									placeholder="Email"
// 								/>
// 								{errors.email && (
// 									<p className="text-red-400 text-sm">{errors.email.message}</p>
// 								)}
// 							</div>
// 							<div className="space-y-2">
// 								<label className="uppercase text-sm font-medium text-white">
// 									Mobile *
// 								</label>
// 								<input
// 									{...register("mobile", {
// 										required: "Mobile is required",
// 									})}
// 									className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md
//                            text-white placeholder:text-white /50
//                            focus:outline-none focus:border-white /40"
// 									placeholder="Mobile"
// 								/>
// 								{errors.mobile && (
// 									<p className="text-red-400 text-sm">
// 										{errors.mobile.message}
// 									</p>
// 								)}
// 							</div>

// 							<div className="space-y-2">
// 								<label className="uppercase text-sm font-medium text-white">
// 									Password *
// 								</label>
// 								<div className="relative">
// 									<input
// 										{...register("password", {
// 											required: "Password is required",
// 											minLength: {
// 												value: 8,
// 												message: "Password must be at least 8 characters long",
// 											},
// 										})}
// 										type={showPassword ? "text" : "password"}
// 										className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md
//                      text-white placeholder:text-white/50
//                      focus:outline-none focus:border-white/40"
// 										placeholder="Password"
// 									/>
// 									<button
// 										type="button"
// 										className="absolute cursor-pointer inset-y-0 right-3 flex items-center text-white/50 hover:text-white"
// 										onClick={() => setShowPassword((prev) => !prev)}
// 									>
// 										{showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
// 									</button>
// 								</div>
// 								{errors.password && (
// 									<p className="text-red-400 text-sm">
// 										{errors.password.message}
// 									</p>
// 								)}
// 							</div>

// 							{/* Submit buttons */}
// 							<div className="flex justify-between md:gap-5 gap-4 my-3 items-center flex-wrap">
// 								<div className="flex justify-start sm:gap-5 gap-4">
// 									<button
// 										type="submit"
// 										className="hover:bg-primary cursor-pointer
//                      text-white duration-500 font-medium capitalize
//                       text-sm lg:text-base px-5 md:px-8 lg:py-1 py-1 rounded-sm border border-gray text-primary lg:h-[40px] h-[33px]"
// 									>
// 										Sign Up
// 									</button>
// 									<div className="w-[80px] lg:h-[40px] h-[33px] cursor-pointer border-gray rounded-sm hover:shadow-xl duration-500 border p-1">
// 										<picture>
// 											<img
// 												src="https://cdn-icons-png.flaticon.com/128/300/300221.png"
// 												alt="google"
// 												className="w-full h-full object-contain rounded-sm"
// 											/>
// 										</picture>
// 									</div>
// 								</div>

// 								<button className="hover:bg-white cursor-pointer text-white hover:text-primary duration-500 font-medium capitalize text-sm lg:text-base px-5 md:px-10 lg:py-1 py-1 rounded-sm border border-gray text-primary lg:h-[40px] h-[33px]">
// 									Reset
// 								</button>
// 							</div>
// 						</form>
// 					</div>
// 				</div>
// 			</motion.div>
// 		</div>
// 	);
// };

// export default RegisterPage;

"use client";

import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import { useAuth } from "@/hooks/authHook";

interface RegisterFormInputs {
  name: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register: registerUser, isRegistering, googleAuth } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<RegisterFormInputs>();

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      await registerUser({
        name: data.name,
        email: data.email,
        contactNumber: data.mobile,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
      reset();
     
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const handleReset = () => {
    reset();
  };

  // Google registration handler
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

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      {/* Background video and overlay */}
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
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl grid md:grid-cols-2 rounded-2xl overflow-hidden backdrop-blur-xl bg-black/20"
      >
        {/* Welcome Section */}
        <div className="hidden md:block bg-gradient-to-br from-blue-900/40 to-amber-500/40 backdrop-blur-md p-8">
          <div className="h-full flex flex-col items-center justify-center text-white text-center">
            <h2 className="text-xl font-bold mb-4">
              Access your account to explore more amazing features.
            </h2>
            <p className="mb-8 text-white">Already have an account?</p>
            <Link
              href="/login"
              className="px-6 py-2 border-2 border-white rounded-full hover:bg-white hover:text-rose-500 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Registration Form */}
        <div className="p-8 bg-white/20 backdrop-blur-xl">
          <div className="w-full max-w-sm mx-auto space-y-6">
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              {/* Name Field */}
              <div className="space-y-2">
                <label className="uppercase text-sm font-medium text-white">
                  Name *
                </label>
                <input
                  {...register("name", {
                    required: "Name is required",
                  })}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-white/50 focus:outline-none focus:border-white/40"
                  placeholder="Name"
                />
                {errors.name && (
                  <p className="text-red-400 text-sm">{errors.name.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="uppercase text-sm font-medium text-white">
                  Email *
                </label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Enter a valid email address",
                    },
                  })}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-white/50 focus:outline-none focus:border-white/40"
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Mobile Field */}
              <div className="space-y-2">
                <label className="uppercase text-sm font-medium text-white">
                  Mobile *
                </label>
                <input
                  {...register("mobile", {
                    required: "Mobile number is required",
                    pattern: {
                      value: /^[0-9]{10,15}$/,
                      message: "Enter a valid mobile number",
                    },
                  })}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-white/50 focus:outline-none focus:border-white/40"
                  placeholder="Mobile"
                />
                {errors.mobile && (
                  <p className="text-red-400 text-sm">
                    {errors.mobile.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="uppercase text-sm font-medium text-white">
                  Password *
                </label>
                <div className="relative">
                  <input
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
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

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label className="uppercase text-sm font-medium text-white">
                  Confirm Password *
                </label>
                <input
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === watch("password") || "Passwords don't match",
                  })}
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-white/50 focus:outline-none focus:border-white/40"
                  placeholder="Confirm Password"
                />
                {errors.confirmPassword && (
                  <p className="text-red-400 text-sm">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Submit buttons */}
              <div className="flex justify-between md:gap-5 gap-4 my-3 items-center flex-wrap">
                <div className="flex justify-start sm:gap-5 gap-4">
                  <button
                    type="submit"
                    disabled={isRegistering}
                    className={`hover:bg-primary cursor-pointer text-white duration-500 font-medium capitalize text-sm lg:text-base px-5 md:px-8 lg:py-1 py-1 rounded-sm border border-gray text-primary lg:h-[40px] h-[33px] ${
                      isRegistering ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isRegistering ? "Registering..." : "Sign Up"}
                  </button>
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={isRegistering}
                    className="w-[80px] lg:h-[40px] h-[33px] cursor-pointer border-gray rounded-sm hover:shadow-xl duration-500 border p-1 flex items-center justify-center"
                  >
                    <Image
                      src="https://cdn-icons-png.flaticon.com/128/300/300221.png"
                      alt="google"
                      className="w-full h-full object-contain rounded-sm"
                      width={24}
                      height={24}
                    />
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
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
