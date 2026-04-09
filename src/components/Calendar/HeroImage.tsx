"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { MONTH_IMAGES, MONTH_NAMES } from "./constants";

interface Props {
  monthIndex: number;
  year: number;
}

export default function HeroImage({ monthIndex, year }: Props) {
  return (
    <div className="relative w-full lg:w-[42%] min-h-[240px] lg:min-h-full overflow-hidden flex-shrink-0 rounded-tl-2xl rounded-bl-2xl lg:rounded-tr-none rounded-tr-none rounded-br-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={monthIndex}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
        >
          <Image
            src={MONTH_IMAGES[monthIndex]}
            alt={`${MONTH_NAMES[monthIndex]} ${year}`}
            fill
            className="object-cover"
            priority
            unoptimized
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B35]/85 via-[#0D1B35]/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0D1B35]/20" />
        </motion.div>
      </AnimatePresence>

      {/* Month/Year Label */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`label-${monthIndex}`}
          initial={{ x: 24, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          transition={{ delay: 0.25, duration: 0.4, ease: "easeOut" }}
          className="absolute bottom-6 right-0 z-10"
        >
          <div className="bg-[#1A6FD8] px-5 pt-2 pb-3 clip-diagonal">
            <p className="text-white/70 text-[10px] font-light tracking-[0.25em] uppercase">{year}</p>
            <p className="text-white text-2xl lg:text-3xl font-bold tracking-wider uppercase leading-none"
               style={{ fontFamily: 'var(--font-display, "Playfair Display", serif)' }}>
              {MONTH_NAMES[monthIndex]}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Paper texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
