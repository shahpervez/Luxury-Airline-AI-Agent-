"use client";

import { motion } from "framer-motion";

export default function GlobeFooter() {
  return (
    <div className="relative h-screen w-full bg-black overflow-hidden flex flex-col items-center justify-center">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 opacity-40">
        <video
          src="/globe-loop.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl md:text-7xl font-light tracking-tighter text-white uppercase mb-6">
            Global Reach
          </h2>
          <p className="max-w-xl mx-auto text-neutral-400 text-sm md:text-base font-light leading-relaxed mb-12">
            No destination is out of reach. Experience the ultimate in private aviation luxury, anywhere in the world.
          </p>
          
          <button className="px-8 py-4 bg-white text-black font-medium tracking-widest uppercase text-sm hover:bg-neutral-200 transition-colors duration-300">
            Book Your Flight
          </button>
        </motion.div>
      </div>
      
      {/* Footer Links */}
      <div className="absolute bottom-8 w-full px-8 flex justify-between items-center z-10 text-xs text-neutral-500 uppercase tracking-widest">
        <span>&copy; {new Date().getFullYear()} SHAH Airline</span>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
        </div>
      </div>
    </div>
  );
}
