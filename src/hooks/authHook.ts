import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { useRouter } from "next/navigation";
import { authService } from "@/services/auth-services";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { IUser, loginFailure, loginSuccess } from "@/store/features/userSlice";
import apiClient from "@/services/api-client";

export const useAuth = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  // Register Mutation
  const registerMutation = useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      contactNumber: string;
      password: string;
      confirmPassword: string;
    }) => {
      const response = await authService.register(data);
      return response?.data;
    },
    onSuccess: (data) => {
      toast.success("Registration successful!");
      router.push("/login");
    },
    onError: (error: any) => {
      setError(error.response?.data?.message || "Registration failed");
      toast.error(error.response?.data?.message || "Registration failed");
    },
  });

  // Login Mutation
  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data: IUser) => {
      dispatch(loginSuccess(data));
      toast.success("Login successful!");
      console.log("Login successful:", data);
      router.push("/account");
    },
    onError: (error: any) => {
      dispatch(loginFailure("jj"));
      setError(error.response?.data?.message || "Login failed");
      toast.error(error.response?.data?.message || "Login failed");
    },
  });

  // Google Auth Mutation
  //   const googleAuthMutation = useMutation({
  //     mutationFn: authService.googleAuth,
  //     onSuccess: (data) => {
  //       // This will only be called if the backend returns data without redirecting
  //       if (data?.token) {
  //         dispatch(loginSuccess(data));
  //         toast.success("Authentication successful!");
  //         router.push("/account");
  //       }
  //       // Otherwise, the redirect will happen in the service
  //     },
  //     onError: (error: any) => {
  //       console.log("Google Auth Error:", error);
  //       setError(error.message || "Google authentication failed");
  //       toast.error(error.message || "Google authentication failed");
  //     },
  //   });
  const googleAuthMutation = useMutation({
    mutationFn: authService.googleAuth,
    onError: (error: any) => {
      console.log("Google Auth Error:", error);
      setError(error.message || "Google authentication failed");
      toast.error(error.message || "Google authentication failed");
    },
  });

  // OTP Request Mutation
  const otpRequestMutation = useMutation({
    mutationFn: authService.requestOtp,
    onSuccess: () => {
      toast.success("OTP sent successfully!");
    },
    onError: (error: any) => {
      setError(error.response?.data?.message || "Failed to send OTP");
      toast.error(error.response?.data?.message || "Failed to send OTP");
    },
  });

  // Password Reset Mutation
  const resetPasswordMutation = useMutation({
    mutationFn: authService.resetPassword,
    onSuccess: () => {
      toast.success("Password reset successful!");
      router.push("/login");
    },
    onError: (error: any) => {
      setError(error.response?.data?.message || "Password reset failed");
      toast.error(error.response?.data?.message || "Password reset failed");
    },
  });

  // Get Current User Query
  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: authService.getMe,
    retry: false,
  });

  // Logout Mutation
  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      toast.success("Logged out successfully!");
      router.push("/login");
    },
  });
  // Add this to your auth hook

  return {
    // Mutations

    register: registerMutation.mutate,
    isRegistering: registerMutation.isPending,
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    googleAuth: googleAuthMutation.mutate,
    handleGoogleCallback: authService.handleGoogleCallback,
    isGoogleAuthLoading: googleAuthMutation.isPending,
    requestOtp: otpRequestMutation.mutate,
    isOtpSending: otpRequestMutation.isPending,
    resetPassword: resetPasswordMutation.mutate,
    isResetting: resetPasswordMutation.isPending,
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,

    // Queries
    user: user || null,
    isUserLoading,

    // Error
    error,
    clearError: () => setError(null),
  };
};

export const loginWithToken = async (
  customerId: string,
  router: ReturnType<typeof useRouter>,
  dispatch: ReturnType<typeof useDispatch>
) => {
  try {
    // Fetch user data from your API
    const response = await apiClient.get(`/customers/basic/${customerId}`);
    const user = response.data;

    // Dispatch to Redux
    dispatch(loginSuccess(user));

    router.push("/account");

    return user;
  } catch {
    throw new Error("Failed to fetch user data");
  }
};
