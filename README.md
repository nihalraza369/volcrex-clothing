# Oura Sartoria — Website

Karachi-based shirt brand ke liye Next.js + React website. Black & white theme,
Framer Motion animations, product catalog (22 shirts), cart, aur JazzCash /
EasyPaisa / Cash on Delivery checkout.

## Tech Stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS** — strict monochrome palette (black, white, greys only)
- **Framer Motion** — page-load animations, hover reveals, scroll animations
- **lucide-react** — icons

## Chalane ka tareeqa (How to run)

1. [Node.js](https://nodejs.org) install karo (version 18 ya usse upar).
2. Terminal mein is folder ke andar jao:
   ```bash
   cd oura-sartoria
   ```
3. Dependencies install karo:
   ```bash
   npm install
   ```
4. Development server chalao:
   ```bash
   npm run dev
   ```
5. Browser mein kholo: **http://localhost:3000**

Koi bhi file save karoge to browser mein khudi refresh ho jayega.

## Production ke liye build

```bash
npm run build
npm start
```

Deploy karne ke liye [Vercel](https://vercel.com) sab se aasan hai (Next.js
ke creators hain) — bas GitHub repo connect karo aur automatically deploy ho
jata hai. Ya phir koi bhi Node.js hosting (Hostinger, DigitalOcean, etc.) pe
bhi chala sakte ho.

## Website mein kya kya hai

- `/` — Homepage (hero, categories, featured shirts)
- `/shop` — Poori collection, category filter aur price sort ke saath
- `/product/[slug]` — Har shirt ka detail page (size/colour select, add to cart)
- `/cart` — Shopping bag page
- `/checkout` — Delivery details + payment method (COD / JazzCash / EasyPaisa)
- `/order-confirmation` — Order place hone ke baad ka confirmation page
- `/about` — Brand story
- `/contact` — Contact form

## Products edit karna (naye shirts add/remove karna)

Sab products ek hi file mein hain: **`data/products.ts`**

Har product ka structure:

```ts
{
  id: "23",
  slug: "naam-url-mein", // URL mein use hoga: /product/naam-url-mein
  name: "Shirt Ka Naam",
  category: "Formal", // Formal | Casual | Linen | Kurta Collar | Denim
  price: 4990, // Rupees mein
  fabric: "100% Cotton",
  fit: "Slim Fit",
  colors: ["Black", "White"],
  sizes: ["S", "M", "L", "XL"],
  image: "https://...", // product ki real photo ka URL
  description: "Shirt ki tafseel...",
}
```

**Important:** Abhi jo product photos hain woh **placeholder images** hain
(Unsplash se). Apni asli shirt photos lagane ke liye, `image` field mein apni
photo ka URL daal do — ya photos ko `/public/products/` folder mein daal kar
`image: "/products/shirt1.jpg"` likh do.

## Payment Setup — JazzCash & EasyPaisa (Zaroori)

Website abhi **DEMO MODE** mein hai — matlab checkout flow poora kaam karta
hai (order place ho jata hai, confirmation page dikhta hai) lekin asal mein
paisa charge nahi hota, kyunke abhi tak merchant account ke credentials nahi
lage.

Real payment lene ke liye:

1. **JazzCash Merchant Account** banwao: [jazzcash.com.pk](https://www.jazzcash.com.pk)
   pe business/merchant account ke liye apply karo. Approval ke baad tumhe
   milega: `Merchant ID`, `Password`, aur `Integrity Salt`.

2. **EasyPaisa Business Account** banwao: [easypaisa.com.pk](https://easypaisa.com.pk)
   pe merchant/business account apply karo. Milega: `Store ID` aur `Hash Key`.

3. Project ke root folder mein `.env.example` file ko copy karke `.env.local`
   naam se save karo, aur apne asal credentials daal do:

   ```bash
   cp .env.example .env.local
   ```

   Phir `.env.local` mein values fill karo:
   ```
   JAZZCASH_MERCHANT_ID=your_merchant_id
   JAZZCASH_PASSWORD=your_password
   JAZZCASH_INTEGRITY_SALT=your_integrity_salt

   EASYPAISA_STORE_ID=your_store_id
   EASYPAISA_HASH_KEY=your_hash_key
   ```

4. Server restart karo (`npm run dev` phir se chalao). Ab demo mode khudi off
   ho jayega aur customer asal JazzCash/EasyPaisa payment page pe redirect
   hoga.

5. **Zaroori:** Pehle JazzCash/EasyPaisa ke **Sandbox (test) environment**
   mein test karo, production credentials sirf jab sab kuch sahi test ho jaye
   tab lagao. Payment logic `lib/payment.ts` file mein hai agar customize
   karna ho.

Cash on Delivery (COD) bina kisi setup ke abhi se kaam karta hai — koi
credentials nahi chahiye.

## Design Notes

- **Signature element:** Ek "stitch line" (tailor ki basting thread jaisi)
  animation jo scroll karte waqt draw hoti hai — har section ke darmiyan yehi
  motif repeat hota hai, "Sartoria" (tailor's atelier) ke concept ko reflect
  karne ke liye.
- **Fonts:** Cormorant Garamond (headings, editorial feel) + Inter (body text,
  clean aur readable).
- **Colours:** Sirf black, white, aur greys — jaisa aapne kaha tha.

## Customize karna

- **Colours:** `tailwind.config.ts` mein `colors` object edit karo.
- **Fonts:** `app/layout.tsx` mein font imports.
- **Logo/Brand name:** `components/Navbar.tsx` aur `components/Footer.tsx` mein.
- **Delivery areas:** `app/checkout/page.tsx` mein `KARACHI_AREAS` array.
- **Free delivery threshold:** Abhi Rs 5000+ pe free hai — `app/checkout/page.tsx`
  aur `app/cart/page.tsx` mein `subtotal >= 5000` search karo.

Koi bhi sawal ho to code ke comments mein guidance di hui hai. Happy selling! 🖤
