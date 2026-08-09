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
  { id: "1", slug: "ivory-oxford-formal", name: "Volcrex", category: "Formal", price: 1199, compareAtPrice: 1500, fabric: "100% Cotton Oxford", fit: "Slim Fit", colors: [], sizes: ["S","M","L","XL","XXL"], image: "/card1/1imageblack.jfif", images: ["/card1/1imageblack.jfif", "/card1/2imageblack.jfif", "/card1/3imageblack.jfif"], description: "A crisp oxford weave built for boardrooms and Friday prayers alike. Cut close through the body, full through the shoulder.", isNew: true },
  { id: "2", slug: "midnight-black-formal", name: "Midnight Black Formal", category: "Formal", price: 5490, fabric: "Cotton Poplin", fit: "Slim Fit", colors: ["Black", "Gray", "Green", "Brown", "Blue", "Red"], sizes: ["S","M","L","XL","XXL"], image: "/card2/1image2black.jfif", images: ["/card2/1image2black.jfif", "/card2/2image2black.jfif", "/card2/3image2gray.jfif", "/card2/4image2gray.jfif", "/card2/5image2green.jfif", "/card2/6image2green.jfif", "/card2/7image2brown.jfif", "/card2/8image2brown.jfif", "/card2/9image2blue.jfif", "/card2/10image2blue.jfif", "/card2/11image2red.jfif", "/card2/12image2red.jfif"], description: "Pure black poplin with a mother-of-pearl button set. The kind of shirt that ends every debate about what to wear." },
  { id: "3", slug: "charcoal-herringbone", name: "Charcoal Herringbone", category: "Formal", price: 5990, fabric: "Herringbone Cotton", fit: "Tailored Fit", colors: ["Black","Gray", "Green", "Blue", "Red"], sizes: ["M","L","XL","XXL"], image: "/card3/1image3black.jfif", images: ["/card3/1image3black.jfif", "/card3/2image3black.jfif", "/card3/3image3gray.jfif", "/card3/4image3gray.jfif", "/card3/5image3red.jfif", "/card3/6image3red.jfif", "/card3/7image3blue.jfif", "/card3/8image3blue.jfif", "/card3/9image3green.jfif", "/card3/10image3green.jfif"], description: "Subtle herringbone texture that reads solid from across the room, detailed up close." },
  { id: "4", slug: "graphite-twill", name: "Graphite Twill", category: "Formal", price: 5290, fabric: "Cotton Twill", fit: "Slim Fit", colors: ["White", "Black", "Blue", "Brown", "Green"], sizes: ["S","M","L","XL"], image: "/card4/1white4.jfif", images: ["/card4/1white4.jfif", "/card4/2black4.jfif", "/card4/3blue4.jfif", "/card4/4brown4.jfif", "/card4/5brown4.jfif", "/card4/6green4.jfif"], description: "Twill weave gives this shirt a soft sheen without ever looking loud." },
  { id: "5", slug: "pearl-white-classic", name: "Pearl White Classic", category: "Formal", price: 4790, fabric: "Egyptian Cotton", fit: "Regular Fit", colors: ["White", "Brown", "Blue", "Red"], sizes: ["S","M","L","XL","XXL","3XL"], image: "/card5/1image5white.jfif", images: ["/card5/1image5white.jfif", "/card5/2image5white.jfif", "/card5/3image5brown.jfif", "/card5/4image5brown.jfif", "/card5/5image5blue.jfif", "/card5/6image5blue.jfif", "/card5/7image5red.jfif", "/card5/8image6red.jfif"], description: "The one white shirt everyone needs — Egyptian cotton, breathable, and built to outlast every wash." },
  { id: "6", slug: "stone-grey-casual", name: "Stone Grey Casual", category: "Casual", price: 3990, fabric: "Cotton Blend", fit: "Relaxed Fit", colors: ["Gray", "Red", "Green", "Blue"], sizes: ["S","M","L","XL"], image: "/card6/1image6gray.jfif", images: ["/card6/1image6gray.jfif", "/card6/2image6gray.jfif", "/card6/3image6red.jfif", "/card6/4image6red.jfif", "/card6/5image6green.jfif", "/card6/6image6green.jfif", "/card6/7image6blue.jfif", "/card6/8image6blue.jfif"], description: "Off-duty grey with a soft hand-feel. Roll the sleeves, skip the tuck." },
  { id: "7", slug: "linen-summer-breeze", name: "Linen Summer Breeze", category: "Linen", price: 4590, fabric: "100% Linen", fit: "Relaxed Fit", colors: ["Brown", "Blue", "Green", "Gray", "Red"], sizes: ["S","M","L","XL"], image: "/card7/1image7brown.jfif", images: ["/card7/1image7brown.jfif", "/card7/2image7blue.jfif", "/card7/3image7green.jfif", "/card7/4image7gray.jfif", "/card7/5image7red.jpeg"], description: "Breezy linen for Karachi summers. Unlined, unstructured, and unapologetically casual." },
  { id: "8", slug: "denim-midnight-blue", name: "Denim Midnight Blue", category: "Denim", price: 4990, fabric: "100% Cotton Denim", fit: "Slim Fit", colors: ["Red", "Black", "Green", "Blue", "Gray", "Brown"], sizes: ["S","M","L","XL"], image: "/card8/1image8red.jfif", images: ["/card8/1image8red.jfif", "/card8/2image8black.jfif", "/card8/3image8green.jfif", "/card8/4image8blue.jfif","/card8/5image8gray.jfif","/card8/6image8brown.jfif"], description: "Dark indigo denim with a hint of stretch. The kind of shirt that pairs with everything." },
  { id: "9", slug: "kurta-collar-heritage", name: "Kurta Collar Heritage", category: "Kurta Collar", price: 4290, fabric: "Cotton Blend", fit: "Regular Fit", colors: ["Green", "Black", "White", "Blue", "Gray"], sizes: ["S","M","L","XL"], image: "/card9/4image9green.jfif", images: ["/card9/4image9green.jfif", "/card9/1image9black.jfif", "/card9/2image9white.jfif","/card9/5image9blue.jfif","/card9/3image9gray.jfif"], description: "A modern take on the traditional kurta collar. Perfect for casual Fridays or Eid gatherings." },
  { id: "10", slug: "linen-summer-breeze-2", name: "Linen Summer Breeze", category: "Linen", price: 4590, fabric: "100% Linen", fit: "Relaxed Fit", colors: ["Black", "Gray", "Red", "Blue", "Green", "Brown"], sizes: ["S","M","L","XL"], image: "/card10/1image10black.jfif", images: ["/card10/1image10black.jfif", "/card10/2image10black.jfif", "/card10/3image10gray.jfif", "/card10/4image10gray.jfif", "/card10/5image10red.jfif","/card10/6image10red.jfif","/card10/7image10blue.jfif","/card10/8image10blue.jfif","/card10/9image10green.jfif","/card10/10image10green.jfif","/card10/11image10brown.jfif","/card10/12image10brown.jfif"], description: "Breezy linen for Karachi summers. Unlined, unstructured, and unapologetically casual." },
];

export const categories = ["All", "Formal", "Casual", "Linen", "Kurta Collar", "Denim"] as const;
