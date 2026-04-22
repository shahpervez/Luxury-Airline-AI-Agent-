"use client";

import { useEffect, useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { useImagePreloader } from "@/hooks/useImagePreloader";

const FRAME_COUNT = 30;

export default function PlaneMorph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const { images, progress } = useImagePreloader({
    frameCount: FRAME_COUNT,
    sequencePath: "/sequence-2",
    startIndex: 1,
    padLength: 2,
    extension: "png"
  });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  useEffect(() => {
    if (images.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const render = (index: number) => {
      const img = images[Math.round(index)];
      if (!img || !img.complete || img.naturalHeight === 0) return;

      const hRatio = rect.width / img.width;
      const vRatio = rect.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      const centerShift_x = (rect.width - img.width * ratio) / 2;
      const centerShift_y = (rect.height - img.height * ratio) / 2;

      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        centerShift_x,
        centerShift_y,
        img.width * ratio,
        img.height * ratio
      );
    };

    render(0);

    const unsubscribe = frameIndex.on("change", (latest) => {
      render(latest);
    });

    const handleResize = () => {
      const currentRect = canvas.getBoundingClientRect();
      canvas.width = currentRect.width * dpr;
      canvas.height = currentRect.height * dpr;
      ctx.scale(dpr, dpr);
      render(frameIndex.get());
    };
    window.addEventListener("resize", handleResize);

    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResize);
    };
  }, [images, frameIndex, progress]);

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        
        {/* Overlay content */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
          <motion.div 
            style={{ 
              opacity: useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 0]),
              scale: useTransform(scrollYProgress, [0.3, 0.5], [0.9, 1])
            }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-6xl font-light tracking-widest text-white uppercase">
              Precision Engineering
            </h2>
            <div className="w-px h-16 bg-white/50 mx-auto mt-8 mb-8" />
            <p className="max-w-md mx-auto text-sm md:text-base text-neutral-400 font-light leading-relaxed">
              Every curve designed for aerodynamic perfection. The transition from vision to reality, mapped in absolute detail.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
