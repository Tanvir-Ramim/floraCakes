export type NavItem = {
  id: string;
  label: string;
  href: string;
  subMenu?: {
    [key: string]: {
      id: string;
      label: string;
      href: string;
    }[];
  };
};

export type TBanner = {
  id: string;
  image: string;
  title: string;
  description: string;
  type: string; // Add more types if needed
  isActive: boolean;
};

export type Subitem = {
  id: string;
  href: string;
  name: string;
  tag?: string;
};

// blog type

interface IImage {
  title: string;
  url: string;
  public_id: string;
}

interface IContentBlock {
  description: string;
  image?: IImage;
}

export interface BlogPost extends Document {
  blogId: string;
  title: string;
  author: string;
  publishDate?: Date;
  category: string;
  shortDescription: string;
  thumbImage: IImage;
  bannerImage?: IImage;
  bodyContent?: IContentBlock[];
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface BlogCardProps {
  item: BlogPost;
  key: string;
  isLoading: boolean;
}

export interface Product {
  id: string;
  title: string;
  image: string;
  thumbImage: { public_id: string };
  hoverImage: { public_id: string };
  description?: string;
  servingSize: [{ price: number }];
  category: string;
  slug?: string;
  discount?: number;
  tag?: string;
  name: string;
  short_description?: string;
}

export interface ProductCardProps {
  item: Product;
  key: string;
  isLoading: boolean;
}

export interface BlogItem {
  image?: string;
  title: string;
  slug: string;
  author: string;
  date: string;
  excerpt?: string;
  items?: BlogItem[];
}

export interface Tab {
  key: string;
  label: string;
}

export interface AddonItemsProps {
  selectedflavors?: { name: string; price: number };
  setSelectedflavors: React.Dispatch<
    React.SetStateAction<{ name: string; price: number }>
  >;
  selectedItems?: IAddon[];
  setSelectedItems: React.Dispatch<React.SetStateAction<IAddon[]>>;
  flavors?: { name: string; price: number }[];
  showGiftBox?: boolean;
}

export interface OrderItemTypeA {
  name: string;
  quantity: number;
  price: number;
}

export interface OrderTypeA {
  id: string;
  date: string;
  total: number;
  status: string;
  items: OrderItemTypeA[];
}

export interface GiftCard {
  giftId: string;
  title: string;
  amount: number;
  currency: string;
  image: {
    url: string;
    public_id: string;
  };
  isActive: boolean;
}
// addon items type
export type AddonType = "flavour" | "add-on" | "other";
export interface IAddon {
  type?: AddonType;
  name: string;
  price: number;
  image?: IImage;
}
// types/order.ts
export interface CustomerOrderForm {
  // Customer Information
  customer: {
    name: string;
    email: string;
    phone: string;
    street?: string;
    city: string;
    zip: string;
    address: string;
  };

  // Delivery Information
  isDelivery: boolean;
  isGift: boolean;
  delivery?: {
    street?: string;
    city: string;
    zip: string;
    address: string;
  };

  // Gift Information
  nameGift?: string;
  phoneGift?: string;

  // Cake Information
  customized: boolean;
  cakeId?: string;
  title?: string;
  weight?: string;
  category?: string;
  flavor: string;
  flavorPrice: number;
  cakePrice: number;
  sizePrice: number;
  discountAmount: number;
  message?: string;
  note?: string;

  // Custom Cake Details
  customizedCakeDetails?: {
    cakeName: string;
    cakeWeight: string;
    flavor: string;
    flavorPrice: number;
    description: string;
    shape: string;
    layers: string;
    price: number;
  };

  // Add-ons
  addOn: Array<{
    name: string;
    price: number;
  }>;

  // Files
  customFiles?: File;
  regularFiles?: File;

  // Delivery Details
  deliveryDate: Date;
  deliveryTime: string;
  deliveryNote?: string;
  shipping: {
    area: string;
    cost: number;
  };
  coupon?: { code: string; discount: number };
  couponAmount?: number;
  addonPrice?: number;
  deliveryCharge: number;
  // Payment
  paymentType: "full" | "partial" | "Unpaid";
  partialPaymentAmount?: number;
  finalPrice: number;
  paymentMethod: string;
}

// Event
// types/event.ts
export interface IEvent {
  _id: string;
  eventId: string;
  eventType: string;
  eventName: string;
  eventDate: string;
  estimateGuest: number;
  eventImage: {
    url: string;
    alt: string;
  };
  status: string;
  eventAddress: {
    street: string;
    city: string;
    area: string;
    location: string;
  };
  cakeInfo?: {
    id: string;
    name: string;
    servingSize: string;
    category: string;
    flavor: {
      name: string;
      price: number;
    };
    images: Array<{
      url: string;
      alt: string;
    }>;
    sizePrice: number;
    discountAmount: number;
    cakePrice: number;
    message: string;
    note: string;
    quantity: number;
  };
  customerInfo?: {
    customerRef: string;
    customerId: string;
    name: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    area: string;
    location: string;
  };
  createdAt: string;
  updatedAt: string;
}
// types/addon.ts
export interface IAddonProduct {
  _id: string;
  type: string;
  name: string;
  category?: string;
  price: number;
  image: {
    url: string;
    public_id: string;
  };
  quantity?: number;
}

export interface IAddonParams {
  type?: string;
  category?: string;
  page?: number;
  limit?: number;
}

export interface IRelative {
  name: string;
  relation: string;
  email?: string;
  phone?: string;
}

export interface ISpecialEvent {
  eventName: string;
  institute: string;
  date?: string;
}

export interface IActivites {
  actName: string;
  institute: string;
}

export interface ICustomer {
  customerId: string;
  name: string;
  contactInformation: {
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
  customerImage?: {
    public_id: string;
    url: string;
  };
}
