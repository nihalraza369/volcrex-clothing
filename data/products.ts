export type Product = {
  id: string;
  slug: string;
  name: string;
  category: "Sharara" | "Gharara" | "Lehnga" | "Sarhee" | "Party Wear";
  price: number;
  compareAtPrice?: number;
  fabric: string;
  fit: string;
  colors: string[];
  sizes: string[];
  image: string;
  images?: string[];
  description: string;
  isNew?: boolean;
};

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

const PLACEHOLDER_IMAGES = [
  "photo-1596755094514-f87e34085b2c",
  "photo-1603252109303-2751441dd157",
  "photo-1618354691373-d851c5c3a990",
  "photo-1594938298603-c8148c4dae35",
  "photo-1620012253295-c15cc3e65df4",
  "photo-1602810318383-e386cc2a3ccf",
  "photo-1516257984-b1b4d707412e",
  "photo-1490114538077-0a7f8cb49891",
  "photo-1521572163474-6864f9cf17ab",
  "photo-1509631179647-0177331693ae",
];

const p = (i: number) => img(PLACEHOLDER_IMAGES[i % PLACEHOLDER_IMAGES.length]);

export const products: Product[] = [
  { id: "1", slug: "ivory-oxford-formal", name: "Sharara Classic", category: "Sharara", price: 1199, compareAtPrice: 1500, fabric: "100% Cotton Oxford", fit: "Slim Fit", colors: ["Black", "Red", "Brown"], sizes: ["S","M","L","XL","XXL"], image: "/card1/image1.png", images: ["/card1/image1.png", "/card1/image2.png", "/card1/image3.png",], description: "A crisp oxford weave built for boardrooms and Friday prayers alike. Cut close through the body, full through the shoulder.", isNew: true },
  { id: "2", slug: "midnight-black-formal", name: "Gharara Elegance", category: "Gharara", price: 5490, fabric: "Cotton Poplin", fit: "Slim Fit", colors: ["Black", "Gray", "Green", "Brown", "Blue", "Red"], sizes: ["S","M","L","XL","XXL"], image: "/card2/image3.PNG", images: ["/card2/image3.PNG",], description: "Pure black poplin with a mother-of-pearl button set. The kind of outfit that ends every debate about what to wear." },
  { id: "3", slug: "charcoal-herringbone", name: "Lehnga Classic", category: "Lehnga", price: 5990, fabric: "Herringbone Cotton", fit: "Tailored Fit", colors: ["Black","Gray", "Green", "Blue", "Red"], sizes: ["M","L","XL","XXL"], image: "/card3/image4.PNG", images: ["/card3/image4.PNG", ], description: "Subtle herringbone texture that reads solid from across the room, detailed up close." },
  { id: "4", slug: "graphite-twill", name: "Sarhee Grace", category: "Sarhee", price: 5290, fabric: "Cotton Twill", fit: "Slim Fit", colors: ["White", "Black", "Blue", "Brown", "Green"], sizes: ["S","M","L","XL"], image: "/card4/image5.PNG", images: ["/card4/image5.PNG",], description: "The one party wear piece everyone needs — Egyptian cotton, breathable, and built to outlast every wash." },
 
];

export const categories = ["All", "Sharara", "Gharara", "Lehnga", "Sarhee", "Party Wear"] as const;
