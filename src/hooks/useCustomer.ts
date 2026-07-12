import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { customerService } from "@/services/customer-service";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { IActivites, IRelative, ISpecialEvent } from "@/@types";
import { useDispatch } from "react-redux";
import { updateUser } from "@/store/features/userSlice";

interface UpdateCustomerParams {
  contactInformation?: {
    email?: string;
    phone?: string;
  };
  occupation?: string;
  specialPreferences?: string[];
  address?: {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  relatives?: IRelative[];
  specialEvent?: ISpecialEvent[];
  activites?: IActivites[];
}

export const useCustomer = (customerId?: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  // Get customer data
  const {
    data: customer,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["customer", customerId],
    queryFn: () => customerService.getCustomer(customerId!),
    enabled: !!customerId,
  });

  // Update customer mutation
  const updateMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      if (!customerId) throw new Error("Customer ID is required");
      return customerService.updateCustomer(customerId, formData);
    },
    onSuccess: (response) => {
      toast.success("Profile updated successfully");
      console.log(response.data);
      // Dispatch updated user
      dispatch(updateUser(response.data));

      queryClient.invalidateQueries({
        queryKey: ["customer", customerId],
      });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update profile");
    },
  });
  // console.log(updateMutation.data?.data);
  // dispatch(updateUser(updateMutation.data?.data));

  // Helper function to handle form data preparation
  const prepareUpdateData = (formData: any): UpdateCustomerParams => {
    return {
      contactInformation: {
        email: formData.email,
        phone: formData.phone,
      },

      occupation: formData.occupation,
      specialPreferences: formData.specialPreferences,
      address: formData.address,
      socialMedia: formData.socialMedia,
      relatives: formData.relatives,
      specialEvent: formData.specialEvent,
      activites: formData.activites,
    };
  };

  return {
    customer,
    isLoading,
    error,
    updateCustomer: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    prepareUpdateData,
  };
};
