"use client";
import { useCallback, useEffect } from "react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useCalendar } from "./useCalendar";
import { usePageFlip } from "./usePageFlip";
import CalendarHeader from "./CalendarHeader";
import HeroImage from "./HeroImage";
import DateGrid from "./DateGrid";
import NotesPanel from "./NotesPanel";

export default function Calendar() {
  const {
    currentMonth,
    range,
    setHoverDate,
    handleDateClick,
    clearRange,
    getDateState,
    goToMonth,
    isFlipping,
    notes,
    upsertNote,
  } = useCalendar();

  const { cardRef, flip } = usePageFlip();

  const monthIndex = currentMonth.getMonth();
  const year = currentMonth.getFullYear();

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLInputElement) return;
      if (e.key === "ArrowLeft") goToMonth("prev");
      if (e.key === "ArrowRight") goToMonth("next");
      if (e.key === "Escape") clearRange();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToMonth, clearRange]);

  const handlePrev = useCallback(() => {
    flip("prev", () => goToMonth("prev"));
  }, [flip, goToMonth]);

  const handleNext = useCallback(() => {
    flip("next", () => goToMonth("next"));
  }, [flip, goToMonth]);

  const hasRange = range.start && range.end;

  return (
    <div className="flex items-center justify-center min-h-screen p-4 lg:p-8 bg-[#F0ECE3]">
      {/* Floating calendar card */}
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="calendar-card relative w-full max-w-4xl bg-[#FAF8F3] rounded-2xl overflow-hidden animate-float"
        style={{
          boxShadow: "0 24px 48px rgba(0,0,0,0.18), 0 8px 16px rgba(0,0,0,0.10)",
        }}
        role="application"
        aria-label="Meridian Calendar"
      >
        {/* Spiral binding top bar */}
        <div className="h-7 bg-[#FAF8F3] border-b border-[#F0ECE3] flex items-center justify-center relative overflow-visible z-30">
          <div className="absolute inset-x-0 flex justify-around px-6">
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                className="w-3 h-5 rounded-full border-2 border-[#9A9A9A]/35 bg-[#FAF8F3]"
                style={{
                  boxShadow: "inset 0 1px 2px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.12)",
                  transform: "translateY(-25%)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Navigation header */}
        <CalendarHeader onPrev={handlePrev} onNext={handleNext} />

        {/* Main content: hero + grid */}
        <div className="flex flex-col lg:flex-row">
          {/* Hero image panel */}
          <HeroImage monthIndex={monthIndex} year={year} />

          {/* Right panel: date grid + notes */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Clear selection bar */}
            <AnimatePresence>
              {hasRange && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="flex items-center justify-between px-4 lg:px-6 py-2 bg-[#1A6FD8]/8 border-b border-[#1A6FD8]/15 overflow-hidden"
                >
                  <span className="text-[10px] text-[#1A6FD8] font-semibold tracking-wide">
                    {format(range.start!, "MMM d")} → {format(range.end!, "MMM d, yyyy")}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={clearRange}
                    className="flex items-center gap-1 text-[9px] text-[#1A6FD8]/70 hover:text-[#1A6FD8] transition-colors"
                    aria-label="Clear date selection"
                  >
                    <X className="w-3 h-3" />
                    Clear
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Date grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${year}-${monthIndex}`}
                initial={{ opacity: 0, x: isFlipping === "next" ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isFlipping === "next" ? -20 : 20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="flex-1"
              >
                <DateGrid
                  currentMonth={currentMonth}
                  getDateState={getDateState}
                  onDateClick={handleDateClick}
                  onDateHover={setHoverDate}
                />
              </motion.div>
            </AnimatePresence>

            {/* Notes panel */}
            <NotesPanel
              currentMonth={currentMonth}
              range={range}
              notes={notes}
              onSave={upsertNote}
            />
          </div>
        </div>

        {/* Paper texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E")`,
            mixBlendMode: "multiply",
          }}
        />
      </motion.div>

      {/* Brand watermark */}
      <div className="fixed bottom-4 right-4 text-[10px] text-[#9A9A9A]/40 tracking-widest uppercase no-print">
        Meridian
      </div>
    </div>
  );
}
