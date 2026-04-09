"use client";
import { motion } from "framer-motion";
import { format } from "date-fns";

interface Props {
  date: Date;
  state: string;
  isCurrentMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
  holiday?: string;
  onClick: () => void;
  onHover: (date: Date | null) => void;
}

const stateStyles: Record<string, string> = {
  start: "bg-[#1A6FD8] text-white rounded-full shadow-md",
  end: "bg-[#0D1B35] text-white rounded-full shadow-md",
  "in-range": "bg-blue-100 text-[#0D1B35]",
  preview: "bg-blue-50 text-[#0D1B35] opacity-70",
  default: "",
};

export default function DateCell({
  date, state, isCurrentMonth, isToday, isWeekend, holiday, onClick, onHover
}: Props) {
  const isStart = state === "start";
  const isEnd = state === "end";
  const isInRange = state === "in-range" || state === "preview";
  const isSelected = isStart || isEnd;

  return (
    <div
      className={`
        relative flex flex-col items-center justify-center py-0.5
        ${isInRange ? "bg-blue-50" : ""}
        ${isStart ? "rounded-l-full" : ""}
        ${isEnd ? "rounded-r-full" : ""}
      `}
    >
      <motion.button
        whileHover={{ scale: isInRange ? 1.0 : 1.1 }}
        whileTap={{ scale: 0.92 }}
        onClick={onClick}
        onMouseEnter={() => onHover(date)}
        onMouseLeave={() => onHover(null)}
        aria-label={format(date, "MMMM d, yyyy")}
        aria-pressed={isSelected}
        className={`
          relative w-8 h-8 lg:w-9 lg:h-9 flex items-center justify-center
          text-xs lg:text-sm font-medium transition-all duration-150 cursor-pointer
          focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A6FD8] focus-visible:ring-offset-1
          ${stateStyles[state] || "hover:bg-[#F0ECE3] rounded-full text-[#1C1C1E]"}
          ${!isCurrentMonth ? "opacity-25" : ""}
          ${isWeekend && state === "default" ? "text-[#E53935]" : ""}
          ${isToday && state === "default" ? "font-bold ring-1 ring-[#1A6FD8] ring-offset-1 rounded-full" : ""}
        `}
      >
        {format(date, "d")}
      </motion.button>

      {/* Holiday dot */}
      {holiday && isCurrentMonth && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute bottom-0 w-1 h-1 rounded-full"
          style={{ backgroundColor: "#F5A623" }}
          title={holiday}
          aria-label={`Holiday: ${holiday}`}
        />
      )}

      {/* Today indicator dot (when not selected) */}
      {isToday && state === "default" && (
        <div className="absolute -bottom-0.5 w-1 h-1 bg-[#1A6FD8] rounded-full" />
      )}
    </div>
  );
}
