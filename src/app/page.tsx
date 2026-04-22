import SmoothScroll from "@/components/SmoothScroll";
import HeroScroll from "@/components/HeroScroll";
import PlaneMorph from "@/components/PlaneMorph";
import GlobeFooter from "@/components/GlobeFooter";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="bg-black text-white selection:bg-white/20">
        
        <Navbar />

        <HeroScroll />
        
        {/* Spacer section to break up the canvas scrolls */}
        <section className="min-h-screen flex items-center justify-center relative z-20 py-32 overflow-hidden bg-black">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity"
            style={{ backgroundImage: "url('/luxury-lounge.png')" }}
          />
          
          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
            <h2 className="text-3xl md:text-5xl font-light tracking-wide uppercase mb-8 leading-tight">
              A New Era of <br /> Private Aviation
            </h2>
            <p className="text-neutral-300 font-light leading-loose text-sm md:text-base max-w-2xl mx-auto">
              We transcend the ordinary, delivering an experience that exists above the clouds. 
              Our fleet is designed not just for travel, but as a sanctuary in the sky. Every detail 
              is crafted with intention, merging cutting-edge aeronautical engineering with bespoke 
              luxury design.
            </p>
          </div>
        </section>

        <PlaneMorph />

        <GlobeFooter />

      </main>
    </SmoothScroll>
  );
}
