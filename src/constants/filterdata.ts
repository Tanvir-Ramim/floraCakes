// filterData.ts

export const categories = [
  "birthday",
  "wedding",
  "corporate",
  "kids",
  "special day",
  "new",
  "other",
];


export const occasions = [
  "wedding",
  "anniversary",
  "graduation",
  "mother's day",
  "father's day",
  "women's day",
];

export const dietaryNeeds = [
  "Gluten-Free",
  "Vegan",
  "Sugar-Free",
  "Nut-Free",
  "Dairy-Free",
];

// Blog Post Interface
// interface BlogPost {
//   id: number;
//   title: string;
//   author: string;
//   date: string;
//   excerpt: string;
//   image: string;
//   slug: string;
// }

// Blog Post Data
export const blogPosts = [
  {
    id: 1,
    title: "Anteposuerit litterarum formas.",
    author: "Mr Admin",
    date: "November 16, 2017",
    excerpt:
      "Diga, Koma and Torus are three kitchen utensils designed for Ommo, a new design-oriented brand introduced at the Ambiente show in February 2016. Minimalist approach,...",
    image: "/blog2.webp", // ✅ Corrected path
    slug: "anteposuerit-litterarum-formas-1",
  },
  {
    id: 2,
    title: "Anteposuerit litterarum formas.",
    author: "Mr Admin",
    date: "November 06, 2017",
    excerpt:
      "Diga, Koma and Torus are three kitchen utensils designed for Ommo, a new design-oriented brand introduced at the Ambiente show in February 2016. Minimalist approach,...",
    image: "/blog2.webp", //
    slug: "anteposuerit-litterarum-formas-2",
  },
  {
    id: 3,
    title: "Anteposuerit litterarum formas.",
    author: "Mr Admin",
    date: "November 06, 2017",
    excerpt:
      "Diga, Koma and Torus are three kitchen utensils designed for Ommo, a new design-oriented brand introduced at the Ambiente show in February 2016. Minimalist approach,...",
    image: "/blog2.webp", //
    slug: "anteposuerit-litterarum-formas-3",
  },
  {
    id: 4,
    title: "Anteposuerit litterarum formas.",
    author: "Mr Admin",
    date: "November 06, 2017",
    excerpt:
      "Diga, Koma and Torus are three kitchen utensils designed for Ommo, a new design-oriented brand introduced at the Ambiente show in February 2016. Minimalist approach,...",
    image: "/blog2.webp", //
    slug: "anteposuerit-litterarum-formas-3",
  },
  {
    id: 5,
    title: "Anteposuerit litterarum formas.",
    author: "Mr Admin",
    date: "November 06, 2017",
    excerpt:
      "Diga, Koma and Torus are three kitchen utensils designed for Ommo, a new design-oriented brand introduced at the Ambiente show in February 2016. Minimalist approach,...",
    image: "/blog2.webp", //
    slug: "anteposuerit-litterarum-formas-3",
  },
];

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  flavour?: string;
}

// In a real app, this would come from an API or context
export const initialItems: CartItem[] = [
  {
    id: "1",
    title: "Gift wrapping",
    price: 5.0,
    quantity: 1,
    flavour: "Chocolate",
    image: "/cake.webp",
  },
  {
    id: "2",
    title: "Gift Card",
    price: 500,
    quantity: 1,

    image: "/gift.jpeg",
  },
];

export interface GiftItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

export const giftOptions: GiftItem[] = [
  {
    id: "gift-1",
    name: "Red Roses Bouquet",
    price: 15,
    image: "https://imgcdn.floweraura.com/DSC_1875.jpg",
  },
  {
    id: "gift-2",
    name: "Chocolate Cake",
    price: 20,
    image:
      "https://imgcdn.floweraura.com/hersheys-milk-chocolates-33-gm-99130760ad-A.jpg",
  },
  {
    id: "gift-3",
    name: "Greeting Card",
    price: 5,
    image: "https://imgcdn.floweraura.com/love-greeting-card-9783470ad.jpg",
  },
  {
    id: "gift-4",
    name: "Teddy ",
    price: 5,
    image: "https://imgcdn.floweraura.com/10-inch-dog-teddy-9789140ad-AAAA.jpg",
  },
];
