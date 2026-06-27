// services/auth.service.ts

import apiClient, { API_BASE_URL } from "./api-client";

interface RegisterPayload {
  name: string;
  email?: string;
  contactNumber?: string;
  password: string;
  confirmPassword: string;
}

interface LoginPayload {
  identifier: string;
  password: string;
}

interface OTPRequestPayload {
  identifier: string;
}

interface ResetPasswordPayload {
  identifier: string;
  otp: string;
  newPassword: string;
}

interface GoogleAuthPayload {
  credential: string;
}

interface AuthResponse {
  customerId: string;
  name: string;
  email?: string;
  contactNumber?: string;
  token?: string;
  // Add other user fields as needed
}

export const authService = {
  // Manual Registration
  register: async (data: {
    name: string;
    email: string;
    contactNumber: string;
    password: string;
    confirmPassword: string;
  }) => {
    return apiClient.post("/customers/auth/regi", data);
  },

  // Manual Login
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const response = await apiClient.post("/customers/auth/login", payload);
    return response.data;
  },

  // Google Auth (Login/Register)

  googleAuth: async (ip: string) => {
    try {
      // This will trigger the Passport.js Google strategy
      window.location.href = `${API_BASE_URL}/customers/auth/google?ip=${encodeURIComponent(
        ip
      )}`;
    } catch (error) {
      console.error("Google auth error:", error);
      throw error;
    }
  },
  handleGoogleCallback: async () => {
    // This will be called after the redirect back from Google
    const urlParams = new URLSearchParams(window.location.search);
    const customerId = urlParams.get("customerId");
    const error = urlParams.get("error");

    if (error) {
      throw new Error(error);
    }

    if (!customerId) {
      throw new Error("Authentication failed");
    }

    return { token: customerId };
  },
  // Request OTP for password reset
  requestOtp: async (
    payload: OTPRequestPayload
  ): Promise<{ message: string }> => {
    const response = await apiClient.post("/customers/auth/forgot", payload);
    return response.data;
  },

  // Reset Password with OTP
  resetPassword: async (
    payload: ResetPasswordPayload
  ): Promise<{ message: string }> => {
    const response = await apiClient.post("/customers/auth/reset", payload);
    return response.data;
  },

  // Get current user
  getMe: async (): Promise<AuthResponse> => {
    const response = await apiClient.get("/customers/me");
    return response.data || null;
  },

  // Logout
  logout: async (): Promise<{ message: string }> => {
    const response = await apiClient.post("/customers/auth/logout");
    return response.data;
  },

  // Check if email/phone exists
  checkIdentifier: async (identifier: string): Promise<{ exists: boolean }> => {
    try {
      const response = await apiClient.post(
        "/customers/auth/check-identifier",
        { identifier }
      );
      return response.data;
    } catch {
      return { exists: false };
    }
  },
};
