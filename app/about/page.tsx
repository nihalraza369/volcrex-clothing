import Image from "next/image";
import StitchDivider from "@/components/StitchDivider";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-5 md:px-10 pt-14 pb-24">
      <span className="label-tag text-ash">Our Story</span>
      <h1 className="font-display text-5xl md:text-6xl mt-2 max-w-2xl leading-tight">
        We make bridal wear. We make it properly.
      </h1>

      <div className="grid md:grid-cols-2 gap-10 items-center mt-14">
        <div className="relative aspect-[4/5]">
          <Image
            src="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80"
            alt="Expert Bridal Dress atelier"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-ash leading-relaxed">
            Expert Bridal Dress started in Karachi with a simple belief: every bride
            deserves clothing that matches the importance of her day. From our shop at
            Paradise Garment Center on Abdullah Haroon Road, we craft Sharara, Gharara,
            Lehnga, Sarhee, and Party Wear.
          </p>
          <p className="text-ash leading-relaxed mt-4">
            Whether you&apos;re looking for a complete bridal trousseau or an elegant
            party wear outfit, our collection is designed with premium fabrics and
            meticulous craftsmanship. We serve brides across Karachi and beyond.
          </p>
        </div>
      </div>

      <StitchDivider className="my-16 opacity-30" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <span className="label-tag text-ash">Fabric First</span>
          <p className="font-display text-2xl mt-2">Premium fabrics sourced for comfort and elegance.</p>
        </div>
        <div>
          <span className="label-tag text-ash">Cut for the Bride</span>
          <p className="font-display text-2xl mt-2">Every piece tailored to make you feel extraordinary.</p>
        </div>
        <div>
          <span className="label-tag text-ash">Delivered Locally</span>
          <p className="font-display text-2xl mt-2">Visit us in Karachi or get it delivered across Pakistan.</p>
        </div>
      </div>
    </main>
  );
}
