"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { FaEdit, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import Button from "../ui/button/button";
import Input from "../ui/input/Input";
import { useCustomerInfo } from "../utils/selectedItem";
import { useCustomer } from "@/hooks/useCustomer";


export default function ProfileSettings() {
  const user = useCustomerInfo();
  const { updateCustomer, isUpdating } = useCustomer(user.user?.customerId);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: user.user?.name || "",
    email: user.user?.contactInformation?.email || "",
    phone: user.user?.contactInformation?.phone || "",
    street: user.user?.address?.street || "",
    city: user.user?.address?.city || "",
    area: user.user?.address?.area || "",
    postalCode: user.user?.address?.zipCode || "",
  });

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const fd = new FormData();

      // Append image if selected
      if (selectedFile) {
        fd.append("customerImage", selectedFile);
      }

      // Append contact information
      if (formData.email) {
        fd.append("contactInformation[email]", formData.email);
      }
      if (formData.phone) {
        fd.append("contactInformation[phone]", formData.phone);
      }

      // Append address information
      if (formData.street) {
        fd.append("address[street]", formData.street);
      }
      if (formData.city) {
        fd.append("address[city]", formData.city);
      }
      if (formData.area) {
        fd.append("address[area]", formData.area);
      }
      if (formData.postalCode) {
        fd.append("address[zipCode]", formData.postalCode);
      }

      // Append name
      if (formData.fullName) {
        fd.append("name", formData.fullName);
      }

      await updateCustomer(fd);

      toast.success("Profile updated successfully!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setIsEditing(false);
      setSelectedFile(null);
      setImagePreview(null);
    } catch (error) {
      toast.error("Failed to update profile. Please try again.", {
        position: "top-right",
      });
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl font-semibold">Profile Information</h2>
        <Button
          variant={isEditing ? "default" : "outline"}
          onClick={() => setIsEditing(!isEditing)}
          disabled={isUpdating}
          icon={isEditing ? <FaTimes /> : <FaEdit />}
          label={isEditing ? "Cancel" : "Edit Profile"}
          className="w-52"
        />
      </div>

      <div className="flex justify-center items-center mb-10">
        <div className="relative w-[100px] border border-border-color rounded-full h-[100px]">
          <Image
            src={
              imagePreview || 
              user.user?.customerImage?.url || 
              "/profile.png"
            }
            alt="Profile"
            width={100}
            height={100}
            className="rounded-full object-cover w-full h-full"
          />
          {isEditing && (
            <button
              type="button"
              onClick={handleImageClick}
              className="absolute bottom-0 cursor-pointer right-0 bg-gray-800 text-white p-1 rounded-full hover:bg-gray-700"
            >
              <FaEdit size={14} />
            </button>
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
            disabled={!isEditing}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Input
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              disabled={!isEditing || isUpdating}
            />
          </div>

          <div className="space-y-2">
            <Input
              id="email"
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              disabled={true}
            />
            <p className="text-sm text-gray-500">
              To change your email, please contact support.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            id="phone"
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={!isEditing || isUpdating}
          />

          <Input
            label="Street Address"
            name="street"
            value={formData.street}
            onChange={handleChange}
            disabled={!isEditing || isUpdating}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            disabled={!isEditing || isUpdating}
          />
          <Input
            label="Area"
            name="area"
            value={formData.area}
            onChange={handleChange}
            disabled={!isEditing || isUpdating}
          />
          <Input
            label="Postal Code"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            disabled={!isEditing || isUpdating}
          />
        </div>

        {isEditing && (
          <Button
            type="submit"
            label={isUpdating ? "Saving..." : "Save Changes"}
            className="mt-4 w-full sm:w-auto"
            disabled={isUpdating}
          />
        )}
      </form>
    </div>
  );
}