import Link from "next/link";
import StitchDivider from "./StitchDivider";

export default function Footer() {
  return (
    <footer className="bg-ink text-white mt-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10 pt-16 pb-10">
        <StitchDivider variant="dark" className="opacity-20 mb-14" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2">
            <span className="font-display text-3xl tracking-[0.15em] uppercase">
              Expert Bridal Dress
            </span>
            <p className="text-white/70 text-sm max-w-xs leading-relaxed mt-2">
              Bridal shop in Karachi — Sharara, Gharara, Lehnga, Sarhee, and
              Party Wear. Located at Paradise Garment Center, Saddar.
            </p>
          </div>

          <div>
            <div className="label-tag text-white/70 mb-4">Shop</div>
            <ul className="flex flex-col gap-3 text-sm">
              <li><Link href="/shop" className="hover:text-white transition-colors">All Dresses</Link></li>
              <li><Link href="/shop?category=Sharara" className="hover:text-white transition-colors">Sharara</Link></li>
              <li><Link href="/shop?category=Gharara" className="hover:text-white transition-colors">Gharara</Link></li>
              <li><Link href="/shop?category=Lehnga" className="hover:text-white transition-colors">Lehnga</Link></li>
              <li><Link href="/shop?category=Sarhee" className="hover:text-white transition-colors">Sarhee</Link></li>
              <li><Link href="/shop?category=Party%20Wear" className="hover:text-white transition-colors">Party Wear</Link></li>
            </ul>
          </div>

          <div>
            <div className="label-tag text-white/70 mb-4">Visit Us</div>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="text-white/70">Paradise Garment Center</li>
              <li className="text-white/70">Shop 4, Abdullah Haroon Rd</li>
              <li className="text-white/70">Saddar Artillery Maidan, Karachi</li>
              <li className="text-white/70">0345 2424248</li>
              <li className="text-white/70">Tue–Sat: 11am–9pm</li>
              <li className="text-white/70">Sunday: Closed</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-14 pt-6 border-t border-white/10 gap-2">
          <p className="text-xs text-white/50">© {new Date().getFullYear()} Expert Bridal Dress. All rights reserved.</p>
          <p className="text-xs text-white/50">Cash on Delivery</p>
        </div>
      </div>
    </footer>
  );
}
