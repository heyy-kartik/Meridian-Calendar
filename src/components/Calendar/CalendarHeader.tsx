"use client";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  onPrev: () => void;
  onNext: () => void;
}

const RING_COUNT = 16;

export default function CalendarHeader({ onPrev, onNext }: Props) {
  return (
    <div className="relative flex items-center justify-between px-4 py-3 bg-[#FAF8F3] border-b border-[#F0ECE3] z-10">
      {/* Spiral binding */}
      <div className="absolute inset-x-0 top-0 flex justify-around -translate-y-[55%] z-20 px-4">
        {Array.from({ length: RING_COUNT }).map((_, i) => (
          <div
            key={i}
            className="w-3 h-5 border-2 border-[#9A9A9A]/40 bg-[#FAF8F3] shadow-sm"
            style={{
              boxShadow:
                "inset 0 1px 2px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.15)",
            }}
          />
        ))}
      </div>

      {/* Previous button */}
      <motion.button
        whileHover={{ x: -2 }}
        whileTap={{ scale: 0.88 }}
        onClick={onPrev}
        className="p-2 rounded-full hover:bg-[#F0ECE3] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A6FD8] no-print"
        aria-label="Previous month"
      >
        <ChevronLeft className="w-4 h-4 text-[#1C1C1E]" />
      </motion.button>

      {/* Center spacer with brand mark */}
      <div className="flex items-center gap-1">
        <div className="w-2 h-2 rounded-full bg-[#1A6FD8] opacity-60" />
        <div className="w-1 h-1 rounded-full bg-[#1A6FD8] opacity-40" />
      </div>

      {/* Next button */}
      <motion.button
        whileHover={{ x: 2 }}
        whileTap={{ scale: 0.88 }}
        onClick={onNext}
        className="p-2 rounded-full hover:bg-[#F0ECE3] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A6FD8] no-print"
        aria-label="Next month"
      >
        <ChevronRight className="w-4 h-4 text-[#1C1C1E]" />
      </motion.button>
    </div>
  );
}
