export type Product = {
  id: string;
  slug: string;
  name: string;
  category: "Formal" | "Casual" | "Linen" | "Kurta Collar" | "Denim";
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
  { id: "1", slug: "ivory-oxford-formal", name: "Volcrex", category: "Formal", price: 1199, compareAtPrice: 1500, fabric: "100% Cotton Oxford", fit: "Slim Fit", colors: [], sizes: ["S","M","L","XL","XXL"], image: "/card1/1imageblack.jpg", images: ["/card1/1imageblack.jpg", "/card1/2imageblack.jpg", "/card1/3imageblack.jpg"], description: "A crisp oxford weave built for boardrooms and Friday prayers alike. Cut close through the body, full through the shoulder.", isNew: true },
  { id: "2", slug: "midnight-black-formal", name: "Midnight Black Formal", category: "Formal", price: 5490, fabric: "Cotton Poplin", fit: "Slim Fit", colors: ["Black", "Gray", "Green", "Brown", "Blue", "Red"], sizes: ["S","M","L","XL","XXL"], image: "/card2/1image2black.jpg", images: ["/card2/1image2black.jpg", "/card2/2image2black.jpg", "/card2/3image2gray.jpg", "/card2/4image2gray.jpg", "/card2/5image2green.jpg", "/card2/6image2green.jpg", "/card2/7image2brown.jpg", "/card2/8image2brown.jpg", "/card2/9image2blue.jpg", "/card2/10image2blue.jpg", "/card2/11image2red.jpg", "/card2/12image2red.jpg"], description: "Pure black poplin with a mother-of-pearl button set. The kind of shirt that ends every debate about what to wear." },
  { id: "3", slug: "charcoal-herringbone", name: "Charcoal Herringbone", category: "Formal", price: 5990, fabric: "Herringbone Cotton", fit: "Tailored Fit", colors: ["Black","Gray", "Green", "Blue", "Red"], sizes: ["M","L","XL","XXL"], image: "/card3/1image3black.jpg", images: ["/card3/1image3black.jpg", "/card3/2image3black.jpg", "/card3/3image3gray.jpg", "/card3/4image3gray.jpg", "/card3/5image3red.jpg", "/card3/6image3red.jpg", "/card3/7image3blue.jpg", "/card3/8image3blue.jpg", "/card3/9image3green.jpg", "/card3/10image3green.jpg"], description: "Subtle herringbone texture that reads solid from across the room, detailed up close." },
  { id: "4", slug: "graphite-twill", name: "Graphite Twill", category: "Formal", price: 5290, fabric: "Cotton Twill", fit: "Slim Fit", colors: ["White", "Black", "Blue", "Brown", "Green"], sizes: ["S","M","L","XL"], image: "/card4/1white4.jpg", images: ["/card4/1white4.jpg", "/card4/2black4.jpg", "/card4/3blue4.jpg", "/card4/4brown4.jpg", "/card4/5brown4.jpg", "/card4/6green4.jpg"], description: "Twill weave gives this shirt a soft sheen without ever looking loud." },
  { id: "5", slug: "pearl-white-classic", name: "Pearl White Classic", category: "Formal", price: 4790, fabric: "Egyptian Cotton", fit: "Regular Fit", colors: ["White", "Brown", "Blue", "Red"], sizes: ["S","M","L","XL","XXL","3XL"], image: "/card5/1image5white.jpg", images: ["/card5/1image5white.jpg", "/card5/2image5white.jpg", "/card5/3image5brown.jpg", "/card5/4image5brown.jpg", "/card5/5image5blue.jpg", "/card5/6image5blue.jpg", "/card5/7image5red.jpg", "/card5/8image6red.jpg"], description: "The one white shirt everyone needs — Egyptian cotton, breathable, and built to outlast every wash." },
  { id: "6", slug: "stone-grey-casual", name: "Stone Grey Casual", category: "Casual", price: 3990, fabric: "Cotton Blend", fit: "Relaxed Fit", colors: ["Gray", "Red", "Green", "Blue"], sizes: ["S","M","L","XL"], image: "/card6/1image6gray.jpg", images: ["/card6/1image6gray.jpg", "/card6/2image6gray.jpg", "/card6/3image6red.jpg", "/card6/4image6red.jpg", "/card6/5image6green.jpg", "/card6/6image6green.jpg", "/card6/7image6blue.jpg", "/card6/8image6blue.jpg"], description: "Off-duty grey with a soft hand-feel. Roll the sleeves, skip the tuck." },
  { id: "7", slug: "linen-summer-breeze", name: "Linen Summer Breeze", category: "Linen", price: 4590, fabric: "100% Linen", fit: "Relaxed Fit", colors: ["Brown", "Blue", "Green", "Gray", "Red"], sizes: ["S","M","L","XL"], image: "/card7/1image7brown.jpg", images: ["/card7/1image7brown.jpg", "/card7/2image7blue.jpg", "/card7/3image7green.jpg", "/card7/4image7gray.jpg", "/card7/5image7red.jpeg"], description: "Breezy linen for Karachi summers. Unlined, unstructured, and unapologetically casual." },
  { id: "8", slug: "denim-midnight-blue", name: "Denim Midnight Blue", category: "Denim", price: 4990, fabric: "100% Cotton Denim", fit: "Slim Fit", colors: ["Red", "Black", "Green", "Blue", "Gray", "Brown"], sizes: ["S","M","L","XL"], image: "/card8/1image8red.jpg", images: ["/card8/1image8red.jpg", "/card8/2image8black.jpg", "/card8/3image8green.jpg", "/card8/4image8blue.jpg","/card8/5image8gray.jpg","/card8/6image8brown.jpg"], description: "Dark indigo denim with a hint of stretch. The kind of shirt that pairs with everything." },
  { id: "9", slug: "kurta-collar-heritage", name: "Kurta Collar Heritage", category: "Kurta Collar", price: 4290, fabric: "Cotton Blend", fit: "Regular Fit", colors: ["Green", "Black", "White", "Blue", "Gray"], sizes: ["S","M","L","XL"], image: "/card9/4image9green.jpg", images: ["/card9/4image9green.jpg", "/card9/1image9black.jpg", "/card9/2image9white.jpg","/card9/5image9blue.jpg","/card9/3image9gray.jpg"], description: "A modern take on the traditional kurta collar. Perfect for casual Fridays or Eid gatherings." },
  { id: "10", slug: "linen-summer-breeze-2", name: "Linen Summer Breeze", category: "Linen", price: 4590, fabric: "100% Linen", fit: "Relaxed Fit", colors: ["Black", "Gray", "Red", "Blue", "Green", "Brown"], sizes: ["S","M","L","XL"], image: "/card10/1image10black.jpg", images: ["/card10/1image10black.jpg", "/card10/2image10black.jpg", "/card10/3image10gray.jpg", "/card10/4image10gray.jpg", "/card10/5image10red.jpg","/card10/6image10red.jpg","/card10/7image10blue.jpg","/card10/8image10blue.jpg","/card10/9image10green.jpg","/card10/10image10green.jpg","/card10/11image10brown.jpg","/card10/12image10brown.jpg"], description: "Breezy linen for Karachi summers. Unlined, unstructured, and unapologetically casual." },
];

export const categories = ["All", "Formal", "Casual", "Linen", "Kurta Collar", "Denim"] as const;
