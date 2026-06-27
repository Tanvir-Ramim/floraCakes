import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the user interface based on your JSON data
export interface IUser {
  id: string;

  name: string;
  role: string;
  loyaltyPoints: number;
  contactInformation: {
    phone: string;
    email: string;
  };
  address: {
    street: string;
    city: string;
  };
  authType: string;
 
  orderHistory: any[];
  quotationHistory: any[];
  feedbackComplaints: any[];
  caseReports: any[];
  events: any[];
  purchaseYearly: any[];
  specialEvent: any[];
  activites: any[];
  relatives: any[];

  customerId: string;
 
}

interface IInit {
  user: IUser | null;
  isAuthenticated: boolean;
  loginTime: string | null;
  lastActivity: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: IInit = {
  user: null,
  isAuthenticated: false,
  loginTime: null,
  lastActivity: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Login action
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    loginSuccess: (state, action: PayloadAction<IUser>) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loginTime = new Date().toISOString();
      state.lastActivity = new Date().toISOString();
      state.error = null;
    },

    loginFailure: (state, action: PayloadAction<string>) => {
         state.user = null;
      state.isAuthenticated = false;
      state.loginTime = null;
      state.lastActivity = null;
      state.error = null;
      state.error = action.payload;
    
    },

    // Logout action
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loginTime = null;
      state.lastActivity = null;
      state.error = null;
    },

    // Add user during order placement
    addUserDuringOrder: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loginTime = new Date().toISOString();
      state.lastActivity = new Date().toISOString();
    },

    // Update user information
    updateUser: (state, action: PayloadAction<Partial<IUser>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        state.lastActivity = new Date().toISOString();
      }
    },

    // Update specific user fields
    updateUserField: (
      state,
      action: PayloadAction<{ field: keyof IUser; value: any }>
    ) => {
      if (state.user) {
        (state.user as any)[action.payload.field] = action.payload.value;
        state.lastActivity = new Date().toISOString();
      }
    },

    // Update contact information
    updateContactInfo: (
      state,
      action: PayloadAction<Partial<IUser["contactInformation"]>>
    ) => {
      if (state.user) {
        state.user.contactInformation = {
          ...state.user.contactInformation,
          ...action.payload,
        };
        state.lastActivity = new Date().toISOString();
      }
    },

    // Update address
    updateAddress: (
      state,
      action: PayloadAction<Partial<IUser["address"]>>
    ) => {
      if (state.user) {
        state.user.address = {
          ...state.user.address,
          ...action.payload,
        };
        state.lastActivity = new Date().toISOString();
      }
    },

    // Add order to history
    addOrderToHistory: (state, action: PayloadAction<any>) => {
      if (state.user) {
        state.user.orderHistory.push(action.payload);
        state.lastActivity = new Date().toISOString();
      }
    },

    // Update loyalty points
    updateLoyaltyPoints: (state, action: PayloadAction<number>) => {
      if (state.user) {
        state.user.loyaltyPoints = action.payload;
        state.lastActivity = new Date().toISOString();
      }
    },

    // Reset user state (soft reset - keeps some data)
    resetUser: (state) => {
      if (state.user) {
        state.user = {
          ...state.user,
          orderHistory: [],
          quotationHistory: [],
          feedbackComplaints: [],
          caseReports: [],
          events: [],
          purchaseYearly: [],
          specialEvent: [],
          activites: [],
          relatives: [],
          loyaltyPoints: 0,
        };
        state.lastActivity = new Date().toISOString();
      }
    },

    // Hard reset - completely clear everything
    hardReset: () => {
      return initialState;
    },

    // Update last activity timestamp
    updateLastActivity: (state) => {
      state.lastActivity = new Date().toISOString();
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },

    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  addUserDuringOrder,
  updateUser,
  updateUserField,
  updateContactInfo,
  updateAddress,
  addOrderToHistory,
  updateLoyaltyPoints,
  resetUser,
  hardReset,
  updateLastActivity,
  clearError,
  setLoading,
} = userSlice.actions;

export default userSlice.reducer;

// Selectors for easy access to state
export const selectUser = (state: { user: IInit }) => state.user.user;
export const selectIsAuthenticated = (state: { user: IInit }) =>
  state.user.isAuthenticated;
export const selectLoginTime = (state: { user: IInit }) => state.user.loginTime;
export const selectLastActivity = (state: { user: IInit }) =>
  state.user.lastActivity;
export const selectUserLoading = (state: { user: IInit }) => state.user.loading;
export const selectUserError = (state: { user: IInit }) => state.user.error;
