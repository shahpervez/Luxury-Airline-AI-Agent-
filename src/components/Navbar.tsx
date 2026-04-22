"use client";

import { useState, useEffect } from "react";
import { User } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full p-8 z-50 flex justify-between items-center transition-all duration-300 pointer-events-none ${
        isScrolled 
          ? "bg-black/40 backdrop-blur-md border-b border-white/10 py-4 shadow-lg" 
          : "mix-blend-difference bg-transparent py-8"
      }`}
    >
      {/* Left: Logo */}
      <div className="text-xl font-light tracking-[0.2em] uppercase pointer-events-auto cursor-pointer text-white">
        SHAH Airline
      </div>
      
      {/* Center: Desktop Navigation */}
      <div className="hidden md:flex gap-8 text-xs tracking-widest uppercase pointer-events-auto absolute left-1/2 -translate-x-1/2 text-white">
        <a href="#" className="hover:text-neutral-400 transition-colors">Booking</a>
        <a href="#" className="hover:text-neutral-400 transition-colors">Experience</a>
        <a href="#" className="hover:text-neutral-400 transition-colors">About us</a>
        <a href="#" className="hover:text-neutral-400 transition-colors">Contact us</a>
      </div>

      {/* Right: Actions */}
      <div className="pointer-events-auto flex items-center gap-6 text-white">
        <div className="flex items-center gap-2 cursor-pointer hover:text-neutral-300 transition-colors">
          <User className="w-5 h-5" strokeWidth={1.5} />
          <div className="text-sm font-semibold tracking-wide">Log in | Sign up</div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden text-xs tracking-widest uppercase cursor-pointer">
          Menu
        </div>
      </div>
    </nav>
  );
}
