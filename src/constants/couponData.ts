export interface Coupon {
  code: string;
  discountPercentage: number;
  expiresAt: string;
}

export const availableCoupons: Coupon[] = [
  {
    code: "H-101",
    discountPercentage: 10,
    expiresAt: "2025-06-30T23:59:59Z",
  },
  {
    code: "NEW2025",
    discountPercentage: 15,
    expiresAt: "2025-07-10T23:59:59Z",
  },
];



export interface GiftCard {
  id: string
  title: string
  description: string
  price: number
  image: string
}

export const giftCardData: GiftCard[] = [
  {
    id: "gc-1",
    title: "Gift Card 1000tk",
    description: "Perfect for a small treat",
    price: 10.0,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/c-1.jpg-CEMueh6RBZ6Fr12Jg5PUmbRm6fjMPZ.jpeg",
  },
  {
    id: "gc-2",
    title: "Gift Card 1000B",
    description: "Strawberry delight gift",
    price: 10.0,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/c-3.jpg-VQcQUE9PysBodnV3aHTkumOcaOOMn2.jpeg",
  },
  {
    id: "gc-3",
    title: "Gift Card 1500B",
    description: "Birthday celebration gift",
    price: 15.0,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/c-4.jpg-OBM2iA7kA8pO7yDoppwcQBwPbIoPk1.jpeg",
  },
  {
    id: "gc-4",
    title: "Gift Card 3000B",
    description: "Premium cake experience",
    price: 30.0,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/c-5.jpg-TPeYjXG6bwjhVWMZIYFMQIAinAboHu.jpeg",
  },
]
