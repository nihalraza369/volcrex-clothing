import Image from "next/image";
import StitchDivider from "@/components/StitchDivider";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-5 md:px-10 pt-14 pb-24">
      <span className="label-tag text-ash">The Atelier</span>
      <h1 className="font-display text-5xl md:text-6xl mt-2 max-w-2xl leading-tight">
        We make one thing. We make it properly.
      </h1>

      <div className="grid md:grid-cols-2 gap-10 items-center mt-14">
        <div className="relative aspect-[4/5]">
          <Image
            src="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80"
            alt="Oura Sartoria atelier"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-ash leading-relaxed">
            Oura Sartoria started in Karachi with a simple complaint: too many shirt
            brands were chasing colour and print instead of cut and cloth. So we
            stripped it back — every shirt we make lives in black, white, and the
            greys between, so the only real choice left is fit.
          </p>
          <p className="text-ash leading-relaxed mt-4">
            &quot;Sartoria&quot; is Italian for a tailor&apos;s workshop — and that&apos;s
            the standard we hold ourselves to, whether it&apos;s a formal shirt for
            a Sunday morning at office or a linen one for the drive to Do Darya.
          </p>
        </div>
      </div>

      <StitchDivider className="my-16 opacity-30" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <span className="label-tag text-ash">Fabric First</span>
          <p className="font-display text-2xl mt-2">Cotton, linen, and denim sourced for Karachi&apos;s climate.</p>
        </div>
        <div>
          <span className="label-tag text-ash">Cut for the City</span>
          <p className="font-display text-2xl mt-2">Fits tested on Karachi bodies, not borrowed size charts.</p>
        </div>
        <div>
          <span className="label-tag text-ash">Delivered Locally</span>
          <p className="font-display text-2xl mt-2">Every order ships within Karachi, 2–4 business days.</p>
        </div>
      </div>
    </main>
  );
}
