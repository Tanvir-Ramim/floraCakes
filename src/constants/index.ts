import type { Tab } from "@/@types";

// type SubMenuItem = {
//   id: string;
//   name: string;
//   href: string;
//   tag?: string;
// };

// type NavItem = {
//   id: string;
//   label: string;
//   href: string;
//   subMenu: {
//     [category: string]: SubMenuItem[];
//   };
// };
// SubMenuItem: basic link item
type SubMenuItem = {
  id: string;
  name: string;
  href: string;
  tag?: string;
};

// SubMenuGroupedItems: group with header
type SubMenuGroupedItems = {
  header: string;
  items: SubMenuItem[];
};

// NavItem: subMenu can be either
type NavItem = {
  id: string;
  label: string;
  href: string;
  subMenu: {
    [category: string]: SubMenuItem[] | SubMenuGroupedItems[];
  };
};

export const navItems: NavItem[] = [
  {
    id: "1",
    label: "Cakes",
    href: "#",
    subMenu: {
      By_Types: [
        { id: "1", name: "All Cakes", href: "/product" },
        { id: "2", name: "Regular Cakes", href: "/product" },
        {
          id: "3",
          name: "Bestseller Cakes",
          href: "/product",
          tag: "HOT!",
        },
        { id: "4", name: "Photo Cakes", href: "/product" },
        { id: "5", name: "Premium Cakes", href: "/product" },
        {
          id: "6",
          name: "Designer Cakes",
          href: "/product",
          tag: "NEW!",
        },
      ],
      By_Flavours: [
        { id: "1", name: "Chocolate Cakes", href: "/product" },
        { id: "2", name: "Vanilla Cakes", href: "/product" },
        { id: "3", name: "Strawberry Cakes", href: "/product" },
        { id: "4", name: "Red Velvet Cakes", href: "/product" },
        { id: "5", name: "Black Forest Cakes", href: "/product" },
        {
          id: "6",
          name: "Butterscotch Cakes",
          href: "/product",
          tag: "NEW!",
        },
      ],

      Kids_Cakes: [
        {
          header: "Character-Themed",
          items: [
            {
              id: "1",
              name: "Elsa Cakes (Frozen)",
              href: "/product?kids=elsa_cakes",
            },
            {
              id: "2",
              name: "Frozen Theme Cakes",
              href: "/product?kids=frozen_theme_cakes",
            },
            {
              id: "3",
              name: "Barbie Cakes",
              href: "/product?kids=barbie_cakes",
            },
            {
              id: "4",
              name: "Rapunzel Theme Cake",
              href: "/product?kids=rapunzel_theme_cake",
            },
            {
              id: "5",
              name: "Princess Theme Cakes",
              href: "/product?kids=princess_theme_cakes",
            },
            {
              id: "6",
              name: "Minnie Mouse Cakes",
              href: "/product?kids=minnie_mouse_cakes",
            },
            {
              id: "7",
              name: "Mickey Mouse Cakes",
              href: "/product?kids=mickey_mouse_cakes",
            },
            {
              id: "8",
              name: "Peppa Pig Cakes",
              href: "/product?kids=peppa_pig_cakes",
            },
            {
              id: "9",
              name: "Doraemon Cakes",
              href: "/product?kids=doraemon_cakes",
            },
            {
              id: "10",
              name: "Shin Chan Cakes",
              href: "/product?kids=shin_chan_cakes",
            },
            {
              id: "11",
              name: "Boss Baby Cakes",
              href: "/product?kids=boss_baby_cakes",
            },
            {
              id: "12",
              name: "Masha and the Bear Cake",
              href: "/product?kids=masha_and_the_bear_cake",
            },
            {
              id: "13",
              name: "Hello Kitty Cake",
              href: "/product?kids=hello_kitty_cake",
            },
            {
              id: "14",
              name: "Coco Melon Cakes",
              href: "/product?kids=coco_melon_cakes",
            },
            {
              id: "15",
              name: "Pikachu Cakes",
              href: "/product?kids=pikachu_cakes",
            },
            {
              id: "16",
              name: "Angry Bird Cakes",
              href: "/product?kids=angry_bird_cakes",
            },
            {
              id: "17",
              name: "Minion Theme Cakes",
              href: "/product?kids=minion_theme_cakes",
            },
            {
              id: "18",
              name: "Train Theme Cake",
              href: "/product?kids=train_theme_cake",
            },
            {
              id: "19",
              name: "Space Theme Cakes",
              href: "/product?kids=space_theme_cakes",
            },
          ],
        },
        {
          header: "Superhero",
          items: [
            {
              id: "20",
              name: "Superhero Cakes",
              href: "/product?kids=superhero_cakes",
            },
            {
              id: "21",
              name: "Avengers Theme Cakes",
              href: "/product?kids=avengers_theme_cakes",
            },
            {
              id: "22",
              name: "Spiderman Cakes",
              href: "/product?kids=spiderman_cakes",
            },
            {
              id: "23",
              name: "Superman Cakes",
              href: "/product?kids=superman_cakes",
            },
            {
              id: "24",
              name: "Batman Superhero Cakes",
              href: "/product?kids=batman_superhero_cakes",
            },
            {
              id: "25",
              name: "Wonder Woman Cakes",
              href: "/product?kids=wonder_woman_cakes",
            },
            {
              id: "26",
              name: "Marvel Theme Cakes",
              href: "/product?kids=marvel_theme_cakes",
            },
          ],
        },
        {
          header: "Animal & Nature-Themed",
          items: [
            {
              id: "27",
              name: "Animal & Nature-Themed Cakes",
              href: "/product?kids=animal_nature_themed_cakes",
            },
            {
              id: "28",
              name: "Panda Theme Cakes",
              href: "/product?kids=panda_theme_cakes",
            },
            {
              id: "29",
              name: "Jungle Theme Cakes",
              href: "/product?kids=jungle_theme_cakes",
            },
            {
              id: "30",
              name: "Animal Lover Cakes",
              href: "/product?kids=animal_lover_cakes",
            },
            {
              id: "31",
              name: "Butterfly Cake",
              href: "/product?kids=butterfly_cake",
            },
            {
              id: "32",
              name: "Honey Bee Cakes",
              href: "/product?kids=honey_bee_cakes",
            },
            {
              id: "33",
              name: "Dinosaur Cakes",
              href: "/product?kids=dinosaur_cakes",
            },
          ],
        },
      ],

      By_Occasion: [
        {
          id: "1",
          name: "Women's Day Cakes",
          href: "/product",
          tag: "FESTIVE",
        },
        { id: "2", name: "Anniversary Cakes", href: "/product" },
        { id: "3", name: "Birthday Cakes", href: "/product" },
        { id: "4", name: "Wedding Cakes", href: "/product" },
        { id: "5", name: "Christmas Cakes", href: "/product" },
        { id: "6", name: "NEW Year Cakes", href: "/product" },
        {
          id: "7",
          name: "Valentine's Day Cakes",
          href: "/product",
          tag: "LOVE",
        },
      ],
    },
  },
  {
    id: "2",
    label: "Birthday",
    href: "#",
    subMenu: {
      By_Profession: [
        { id: "35", name: "Doctor", href: "/cakes" },
        { id: "36", name: "Engineer", href: "/cakes" },
        { id: "37", name: "Computer Engineer 🆕", href: "/cakes" },
        { id: "38", name: "Teacher", href: "/cakes" },
        { id: "39", name: "Army Officer 🆕", href: "/cakes" },
        { id: "40", name: "Navy Officer 🆕", href: "/cakes" },
        { id: "41", name: "Pilot 🆕", href: "/cakes" },
        { id: "42", name: "Traveller", href: "/cakes" },
        { id: "43", name: "Cabin Crew", href: "/cakes" },
        { id: "44", name: "Advocate", href: "/cakes" },
        { id: "45", name: "DJ", href: "/cakes" },
        { id: "46", name: "Musician", href: "/cakes" },
      ],
      By_Age: [
        { id: "47", name: "1st Birthday Cakes", href: "/cakes" },
        { id: "48", name: "18th Birthday Cakes", href: "/cakes" },
        { id: "49", name: "21st Birthday Cakes", href: "/cakes" },
        { id: "50", name: "25th Birthday Cakes", href: "/cakes" },
        { id: "51", name: "30th Birthday Cakes", href: "/cakes" },
        { id: "52", name: "40th Birthday Cakes", href: "/cakes" },
        { id: "53", name: "50th Birthday Cakes", href: "/cakes" },
        { id: "54", name: "60+ Birthday Cakes", href: "/cakes" },
        { id: "55", name: "Kids' Birthday Cakes", href: "/cakes" },
        { id: "56", name: "Teen Birthday Cakes", href: "/cakes" },
        { id: "57", name: "Adult Birthday Cakes", href: "/cakes" },
      ],
      By_Traits_Hobbies: [
        { id: "58", name: "Biker", href: "/cakes" },
        { id: "59", name: "Gym Lover", href: "/cakes" },
        { id: "60", name: "Car Lover", href: "/cakes" },
        { id: "61", name: "Gamers", href: "/cakes" },
        { id: "62", name: "Foodie", href: "/cakes" },
        { id: "63", name: "TV Lovers", href: "/cakes" },
        { id: "64", name: "Blogger", href: "/cakes" },
        { id: "65", name: "Workaholic", href: "/cakes" },
        { id: "66", name: "Lazy Dude", href: "/cakes" },
      ],
      Evergreen_Trending_Themes: [
        { id: "67", name: "All Theme Cakes", href: "/cakes" },
        { id: "68", name: "BTS Theme Cakes", href: "/cakes" },
        { id: "69", name: "Cricket Theme Cakes", href: "/cakes" },
        { id: "70", name: "Sports Theme Cakes", href: "/cakes" },
        { id: "71", name: "Footballer Cakes", href: "/cakes" },
        { id: "72", name: "Golfer Cakes", href: "/cakes" },
        { id: "73", name: "Carnival Theme Cakes", href: "/cakes" },
        { id: "74", name: "PUBG Lovers Cakes", href: "/cakes" },
        { id: "75", name: "Photographer Cakes", href: "/cakes" },
        { id: "76", name: "Fashion Designer Cakes", href: "/cakes" },
        { id: "77", name: "Makeup Theme Cakes", href: "/cakes" },
        { id: "78", name: "Unicorn Cakes", href: "/cakes" },
        { id: "79", name: "Quirky Cakes", href: "/cakes" },
        { id: "80", name: "Bag theme cake", href: "/cakes" },
        { id: "81", name: "Shopping Theme Cakes", href: "/cakes" },
      ],
    },
  },
  {
    id: "3",
    label: "Wedding",
    href: "#",
    subMenu: {
      Wedding_Cakes: [
        { id: "82", name: "All Wedding Cakes", href: "/cakes" },
        { id: "83", name: "Traditional Tiered Wedding Cakes", href: "/cakes" },
        { id: "84", name: "Floral Wedding Cakes", href: "/cakes" },
        { id: "85", name: "Minimalist Wedding Cakes", href: "/cakes" },
        { id: "86", name: "Royal Wedding Cakes", href: "/cakes" },
        { id: "87", name: "White & Gold Wedding Cakes", href: "/cakes" },
        { id: "88", name: "Rustic Wedding Cakes", href: "/cakes" },
        { id: "89", name: "Luxury Wedding Cakes", href: "/cakes" },
        { id: "90", name: "Engagement Cakes", href: "/cakes" },
        { id: "91", name: "Mehendi Cakes", href: "/cakes" },
        { id: "92", name: "Nikah Cakes", href: "/cakes" },
        { id: "93", name: "Walima Cakes", href: "/cakes" },
        { id: "94", name: "Hindu Wedding Cakes", href: "/cakes" },
        { id: "95", name: "Custom Theme Wedding Cakes", href: "/cakes" },
      ],
      Anniversary_Cakes: [
        { id: "96", name: "All Anniversary Cakes", href: "/cakes" },
        { id: "97", name: "1st Anniversary Cakes", href: "/cakes" },
        { id: "98", name: "5th Anniversary Cakes", href: "/cakes" },
        { id: "99", name: "10th Anniversary Cakes", href: "/cakes" },
        {
          id: "100",
          name: "25th Anniversary Cakes (Silver Jubilee)",
          href: "/cakes",
        },
        {
          id: "101",
          name: "50th Anniversary Cakes (Golden Jubilee)",
          href: "/cakes",
        },
      ],
      Romantic_Cakes: [
        { id: "102", name: "Heart-Shaped Cakes", href: "/cakes" },
        { id: "103", name: "Couple Figurine Cakes", href: "/cakes" },
        { id: "104", name: "Forever Love Cakes", href: "/cakes" },
        { id: "105", name: "Romantic Theme Cakes", href: "/cakes" },
        { id: "106", name: "Photo Anniversary Cakes", href: "/cakes" },
        { id: "107", name: "Floral Anniversary Cakes", href: "/cakes" },
      ],
      Custom_cake: [
        { id: "108", name: "Custom Anniversary Cakes", href: "/cakes" },
      ],
    },
  },
  {
    id: "4",
    label: "Corporate",
    href: "#",
    subMenu: {
      Bulk_Corporate_Cakes: [
        { id: "109", name: "All Corporate Cakes", href: "/cakes" },
        { id: "110", name: "Logo Cakes", href: "/cakes" },
        { id: "111", name: "Company Anniversary Cakes", href: "/cakes" },
        { id: "112", name: "Employee Birthday Cakes", href: "/cakes" },
        { id: "113", name: "Team Celebration Cakes", href: "/cakes" },
        { id: "114", name: "Farewell Cakes", href: "/cakes" },
        { id: "115", name: "Promotion Cakes", href: "/cakes" },
        { id: "116", name: "Welcome Cakes", href: "/cakes" },
        { id: "117", name: "Retirement Cakes", href: "/cakes" },
        { id: "118", name: "Achievement & Award Cakes", href: "/cakes" },
        { id: "119", name: "Year-End Celebration Cakes", href: "/cakes" },
        { id: "120", name: "Product Launch Cakes", href: "/cakes" },
        { id: "121", name: "Custom Message Cakes", href: "/cakes" },
        { id: "122", name: "Client Appreciation Cakes", href: "/cakes" },
        { id: "123", name: "Bulk Order Cakes for Events", href: "/cakes" },
      ],
      Corporate_Gifting: [
        { id: "124", name: "Corporate Gifting", href: "/cakes" },

        { id: "136", name: "Year-End Appreciation Gifts", href: "/cakes" },
        { id: "137", name: "Product Launch Gifting", href: "/cakes" },
        { id: "138", name: "Corporate Hampers (Mixed Treats)", href: "/cakes" },
        { id: "139", name: "Luxury Gifting Solutions", href: "/cakes" },
      ],
      "Corporate Gift Boxes": [
        { id: "125", name: "Corporate Cupcakes & Treat Boxes", href: "/cakes" },

        { id: "127", name: "Cake & Treat Gift Boxes", href: "/cakes" },
        { id: "128", name: "Chocolate Gift Boxes", href: "/cakes" },
        { id: "129", name: "Macaron Gift Sets", href: "/cakes" },
        { id: "130", name: "Brownie & Bar Boxes", href: "/cakes" },
        { id: "131", name: "Custom Logo Treat Boxes", href: "/cakes" },
        { id: "132", name: "Personalized Message Gift Boxes", href: "/cakes" },
        { id: "133", name: "Employee Appreciation Gifts", href: "/cakes" },
        { id: "134", name: "Client Onboarding Gift Sets", href: "/cakes" },
        { id: "135", name: "Festival & Holiday Gift Boxes", href: "/cakes" },
      ],
      Corporate_Events: [
        { id: "140", name: "Bulk Orders for Corporate Events", href: "/cakes" },
      ],
    },
  },

  ,
];

export const tabs: Tab[] = [
  { key: "description", label: "Description" },
  { key: "additional", label: "Additional" },
  { key: "shipping", label: "Shipping & Return" },
  { key: "reviews", label: "Reviews" },
];
//

export const weights = ["0.5kg", "1kg", "2kg", "3kg", "4kg", "5kg"];
export const flavours = [
  { name: "Vanilla", price: "120" },
  { name: "Chocolate", price: "150" },
  { name: "Strawberry", price: "200" },
  { name: "Butterscotch", price: "250" },
];

export const addonItems = [
  { name: "Red Rose Bucket", price: "110" },
  { name: "Chocolate Box", price: "200" },
  { name: "Birthday Candle", price: "100" },
  { name: "Greeting Card", price: "50" },
];

export const popularCakes = [
  {
    id: 1,
    name: "Chocolate Delight",
    price: "$20.00",
    oldPrice: "$30.00",
    image: "https://imgcdn.floweraura.com/birthday_cake_1.jpg",
  },
  {
    id: 2,
    name: "Vanilla Heaven",
    price: "$25.00",
    oldPrice: "$35.00",
    image: "https://imgcdn.floweraura.com/birthday_cake_1.jpg",
  },
  {
    id: 3,
    name: "Strawberry Bliss",
    price: "$22.00",
    oldPrice: "$28.00",
    image: "https://imgcdn.floweraura.com/designer_cake_8.jpg",
  },
  {
    id: 4,
    name: "Strawberry Bliss",
    price: "$22.00",
    oldPrice: "$28.00",
    image: "https://imgcdn.floweraura.com/designer_cake_8.jpg",
  },
  {
    id: 5,
    name: "Strawberry Bliss",
    price: "$22.00",
    oldPrice: "$28.00",
    image: "https://imgcdn.floweraura.com/designer_cake_8.jpg",
  },
];

export const cakeCategories = [
  {
    id: 4,
    name: "Chocolate",
    image: "https://imgcdn.floweraura.com/chocolate_cake_7.jpg",
  },
  {
    id: 5,
    name: "Fruit Cakes",
    image: "https://imgcdn.floweraura.com/fruit_cake_0.jpg",
  },
  {
    id: 6,
    name: "Cupcakes",
    image: "https://imgcdn.floweraura.com/butterscotch_cake_0.jpg",
  },
  {
    id: 7,
    name: "Custom Cakes",
    image: "https://imgcdn.floweraura.com/red_velvet_cake_5.jpg",
  },
];

export const Banner = [
  {
    id: "1",
    image:
      "https://i.ibb.co.com/GQV9t50m/484331654-623346073801632-6466134607866325071-n.jpg",
    title: "Think different & Do otherwise ",
    description:
      "Claritas est etiam processus dynamicus, qui sequitur mutationem etiam processus dynamicus consuetudium lectorum.",
    type: "MAIN",
    isActive: true,
  },
  {
    id: "2",
    image:
      "https://i.ibb.co.com/GQV9t50m/484331654-623346073801632-6466134607866325071-n.jpg",
    title: "Handmade Hand Carved Coffee",
    description:
      "As rich and unique as the coffee beans it is intended for, this little scoop will make your morning ritual a special occasion every day.",
    type: "MAIN",
    isActive: false,
  },
];

export const cakes = [
  {
    id: 1,
    image: "https://vela-kazan.myshopify.com/cdn/shop/products/16_700x892.jpg",
    hoverImg:
      "https://vela-kazan.myshopify.com/cdn/shop/products/1_c14253f1-8cb5-4a88-921b-d3dbaffaaafa_788x1000.jpg",
    title: "Swiss Delight Chocolate Cake",
    price: 35,
    discount_Price: 30,
    tag: "10%",
  },
  {
    id: 2,
    image:
      "https://vela-kazan.myshopify.com/cdn/shop/products/16_700x892.jpg?v=1509980861",
    hoverImg:
      "https://vela-kazan.myshopify.com/cdn/shop/products/1_c14253f1-8cb5-4a88-921b-d3dbaffaaafa_788x1000.jpg",
    title: "Heart Shaped Choco Vanilla Cake",
    price: 28,
    discount_Price: 25,
    tag: "10%",
  },
  {
    id: 3,
    image:
      "https://vela-kazan.myshopify.com/cdn/shop/products/1_c14253f1-8cb5-4a88-921b-d3dbaffaaafa_788x1000.jpg",
    // image:"https://vela-kazan.myshopify.com/cdn/shop/products/16_700x892.jpg?v=1509980861",
    hoverImg:
      "https://vela-kazan.myshopify.com/cdn/shop/products/1_c14253f1-8cb5-4a88-921b-d3dbaffaaafa_788x1000.jpg",
    title: "Hidden Message Chocolate Cake",
    price: 32,

    tag: "NEW",
  },
  {
    id: 4,
    image:
      "https://vela-kazan.myshopify.com/cdn/shop/products/16_700x892.jpg?v=1509980861",
    hoverImg:
      "https://vela-kazan.myshopify.com/cdn/shop/products/1_c14253f1-8cb5-4a88-921b-d3dbaffaaafa_788x1000.jpg",
    title: "Classic Chocolate Cake",
    price: 30,
    tag: "Hot!",
  },
  {
    id: 5,
    image:
      "https://vela-kazan.myshopify.com/cdn/shop/products/16_700x892.jpg?v=1509980861",
    hoverImg:
      "https://vela-kazan.myshopify.com/cdn/shop/products/1_c14253f1-8cb5-4a88-921b-d3dbaffaaafa_788x1000.jpg",
    title: "Rich Chocolate Fudge Cake",
    price: 40,
    discount_Price: 35,
  },
  {
    id: 6,
    image:
      "https://vela-kazan.myshopify.com/cdn/shop/products/16_700x892.jpg?v=1509980861",
    hoverImg:
      "https://vela-kazan.myshopify.com/cdn/shop/products/1_c14253f1-8cb5-4a88-921b-d3dbaffaaafa_788x1000.jpg",
    title: "Rich Chocolate Fudge Cake",
    price: 40,
    discount_Price: 35,
  },
  {
    id: 7,
    image:
      "https://vela-kazan.myshopify.com/cdn/shop/products/16_700x892.jpg?v=1509980861",
    hoverImg:
      "https://vela-kazan.myshopify.com/cdn/shop/products/1_c14253f1-8cb5-4a88-921b-d3dbaffaaafa_788x1000.jpg",
    title: "Rich Chocolate Fudge Cake",
    price: 40,
    discount_Price: 35,
  },
];
