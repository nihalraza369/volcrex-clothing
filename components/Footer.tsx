import Link from "next/link";
import StitchDivider from "./StitchDivider";

export default function Footer() {
  return (
    <footer className="bg-ink text-paper mt-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10 pt-16 pb-10">
        <StitchDivider variant="dark" className="opacity-20 mb-14" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2">
            <div className="font-display text-3xl tracking-wide">VOLCREX</div>
            <p className="text-smoke text-sm max-w-xs leading-relaxed">
              Shirts cut for Karachi — from Tariq Road fittings to boardroom mornings.
              Monochrome by choice, tailored by habit.
            </p>
          </div>

          <div>
            <div className="label-tag text-smoke mb-4">Shop</div>
            <ul className="flex flex-col gap-3 text-sm">
              <li><Link href="/shop" className="hover:text-smoke transition-colors">All Shirts</Link></li>
              <li><Link href="/shop?category=Formal" className="hover:text-smoke transition-colors">Formal</Link></li>
              <li><Link href="/shop?category=Linen" className="hover:text-smoke transition-colors">Linen</Link></li>
              <li><Link href="/shop?category=Kurta Collar" className="hover:text-smoke transition-colors">Kurta Collar</Link></li>
            </ul>
          </div>

          <div>
            <div className="label-tag text-smoke mb-4">Support</div>
            <ul className="flex flex-col gap-3 text-sm">
              <li><Link href="/contact" className="hover:text-smoke transition-colors">Contact Us</Link></li>
              <li><Link href="/about" className="hover:text-smoke transition-colors">About the Atelier</Link></li>
              <li className="text-smoke">Karachi, Pakistan</li>
              <li className="text-smoke">Delivery: Karachi only</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-14 pt-6 border-t border-paper/10 gap-2">
          <p className="text-xs text-ash">© {new Date().getFullYear()} Oura Sartoria. All rights reserved.</p>
          <p className="text-xs text-ash">Cash on Delivery</p>
        </div>
      </div>
    </footer>
  );
}
