"use client";

import type React from "react";

import { Eye, EyeOff, Loader2, Phone } from "lucide-react";
import { useState } from "react";
import Button from "../ui/button/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card/card";
import Input from "../ui/input/Input";
import { useCustomerInfo } from "../utils/selectedItem";
import { toast } from "react-toastify";
import apiClient from "@/services/api-client";

export default function SecuritySettings() {
  const { user } = useCustomerInfo();
  const [passwordData, setPasswordData] = useState({
    identifier:
      user?.contactInformation?.email || user?.contactInformation?.phone,
    newPassword: "",
    confirmPassword: "",
  });

  const [phoneData, setPhoneData] = useState({
    currentPhone: "+880 1712345678",
    newPhone: "",
    verificationCode: "",
  });

  const [showNewPassword, setShowNewPassword] = useState(false);

  const [isVerifying, setIsVerifying] = useState(false);
  const [isLoadingPassword, setIsLoadingPassword] = useState(false);
  const [isLoadingPhone, setIsLoadingPhone] = useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPhoneData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoadingPassword(true);

    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      //   error("Passwords don't match");
      toast.error("Passwords don't match");
      setIsLoadingPassword(false);
      return;
    }

    try {
      // Simulate API call
      const response = await apiClient.patch(
        `/customers/auth/new/pass`,
        passwordData
      );

      if (!response.success) {
        //   error("Failed to update password. Please try again.");
        toast.error("Failed to update password. Please try again.");
        return;
      }

      toast.success("Password updated successfully!");

      // Reset form
      setPasswordData({
        identifier:
          user?.contactInformation?.email || user?.contactInformation?.phone,
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err: any) {
      console.error(err.error);
      toast.error("Please try again."+ " " + JSON.stringify(err?.error));
    } finally {
      setIsLoadingPassword(false);
    }
  };

  const handleSendVerification = async () => {
    if (!phoneData.newPhone) {
      //   error("Please enter a new phone number");
      return;
    }

    setIsLoadingPhone(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      //   info(`Verification code sent to ${phoneData.newPhone}`);
      setIsVerifying(true);
    } catch (err) {
      console.log(err);
      //   error("Failed to send verification code. Please try again.");
    } finally {
      setIsLoadingPhone(false);
    }
  };

  const handleVerifyPhone = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phoneData.verificationCode) {
      //   error("Please enter the verification code");
      return;
    }

    setIsLoadingPhone(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      //   success("Phone number updated successfully!");

      // Reset form and update current phone
      setPhoneData({
        currentPhone: phoneData.newPhone,
        newPhone: "",
        verificationCode: "",
      });

      setIsVerifying(false);
    } catch (err) {
      console.log(err);
      //   error("Invalid verification code. Please try again.");
    } finally {
      setIsLoadingPhone(false);
    }
  };
  console.log({ passwordData });
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Update your password to keep your account secure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Input
                  label="Identifier"
                  name="identifier"
                  type="text"
                  value={
                    user?.contactInformation?.email ||
                    user?.contactInformation?.phone
                  }
                  className="pr-10"
                  disabled={true}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Input
                  label="New Password"
                  name="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="pr-10"
                  disabled={isLoadingPassword}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  tabIndex={-1}
                >
                  {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Input
                  label="Confirm Password"
                  name="confirmPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="pr-10"
                  disabled={isLoadingPassword}
                />
              </div>
            </div>

            <Button
              label={
                isLoadingPassword ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Password"
                )
              }
              type="submit"
              className="w-full sm:w-auto secondary"
              disabled={isLoadingPassword}
            ></Button>
          </form>
        </CardContent>
      </Card>

      {/* Hidden */}
      <Card className="hidden">
        <CardHeader>
          <CardTitle>Update Phone Number</CardTitle>
          <CardDescription>
            Change your phone number with verification
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Input
                label="currentPhone"
                name="currentPhone"
                value={phoneData.currentPhone}
                disabled
              />
            </div>

            {!isVerifying ? (
              <>
                <div className="space-y-2">
                  <Input
                    label="newPhone"
                    name="newPhone"
                    value={phoneData.newPhone}
                    onChange={handlePhoneChange}
                    placeholder="+880 1XXXXXXXXX"
                    disabled={isLoadingPhone}
                  />
                </div>

                <button
                  onClick={handleSendVerification}
                  className="flex items-center gap-2 w-full sm:w-auto"
                  disabled={isLoadingPhone}
                  type="button"
                >
                  {isLoadingPhone ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Phone size={16} />
                      Send Verification Code
                    </>
                  )}
                </button>
              </>
            ) : (
              <form onSubmit={handleVerifyPhone} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    id="verificationCode"
                    name="verificationCode"
                    value={phoneData.verificationCode}
                    onChange={handlePhoneChange}
                    placeholder="Enter 6-digit code"
                    disabled={isLoadingPhone}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    type="submit"
                    className="flex-1"
                    disabled={isLoadingPhone}
                  >
                    {isLoadingPhone ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      "Verify and Update"
                    )}
                  </button>
                  <Button
                    label="Cancel"
                    type="button"
                    variant="outline"
                    onClick={() => setIsVerifying(false)}
                    disabled={isLoadingPhone}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
