"use client";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { DateRange, Note, NoteMode } from "./types";

interface Props {
  currentMonth: Date;
  range: DateRange;
  notes: Note[];
  onSave: (content: string, key: string, label: string, type: NoteMode) => void;
}

export default function NotesPanel({ currentMonth, range, notes, onSave }: Props) {
  const [mode, setMode] = useState<NoteMode>("month");
  const [text, setText] = useState("");

  const monthKey = format(currentMonth, "yyyy-MM");
  const rangeKey = range.start && range.end
    ? `${format(range.start, "yyyy-MM-dd")}:${format(range.end, "yyyy-MM-dd")}`
    : null;

  const activeKey = mode === "month" ? monthKey : (rangeKey ?? monthKey);
  const activeLabel = mode === "month"
    ? format(currentMonth, "MMMM yyyy")
    : range.start && range.end
      ? `${format(range.start, "MMM d")} – ${format(range.end, "MMM d, yyyy")}`
      : "Select a date range first";

  useEffect(() => {
    const note = notes.find(n => n.id === activeKey);
    setText(note?.content ?? "");
  }, [activeKey, notes]);

  const handleChange = useCallback((val: string) => {
    setText(val);
    onSave(val, activeKey, activeLabel, mode);
  }, [activeKey, activeLabel, mode, onSave]);

  return (
    <div className="border-t border-[#F0ECE3] p-4 lg:p-5 bg-[#FAF8F3]">
      {/* Section header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-3 h-3 rounded-sm bg-[#1A6FD8]/20 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-sm bg-[#1A6FD8]" />
        </div>
        <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#9A9A9A]">Notes</span>
      </div>

      {/* Mode tabs */}
      <div className="flex gap-2 mb-3">
        {(["month", "range"] as NoteMode[]).map(m => (
          <button
            key={m}
            onClick={() => setMode(m)}
            disabled={m === "range" && !rangeKey}
            className={`text-[9px] tracking-widest uppercase font-semibold px-3 py-1.5 rounded-full transition-all duration-200
              ${mode === m
                ? "bg-[#1A6FD8] text-white shadow-sm"
                : "bg-[#F0ECE3] text-[#9A9A9A] hover:text-[#1C1C1E] hover:bg-[#E8E3D9]"}
              disabled:opacity-30 disabled:cursor-not-allowed`}
            aria-pressed={mode === m}
          >
            {m === "month" ? "Month" : "Range"}
          </button>
        ))}
      </div>

      {/* Active label */}
      <p className="text-[9px] text-[#9A9A9A] font-body mb-2 tracking-wide italic">{activeLabel}</p>

      {/* Lined paper textarea */}
      <div className="relative bg-white/50 rounded-lg overflow-hidden border border-[#E8E3D9]">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(transparent, transparent 23px, #e5e0d8 23px, #e5e0d8 24px)`,
            backgroundPositionY: "10px",
            backgroundSize: "100% 24px",
          }}
        />
        {/* Red margin line */}
        <div className="absolute left-7 top-0 bottom-0 w-px bg-[#E53935]/15 pointer-events-none" />

        <motion.textarea
          layout
          value={text}
          onChange={e => handleChange(e.target.value)}
          placeholder={`Jot a note for ${activeLabel}...`}
          rows={5}
          maxLength={500}
          className="relative w-full bg-transparent resize-none text-sm text-[#1C1C1E] pl-9 pr-3 pt-2 pb-2 leading-6 focus:outline-none border-none placeholder:text-[#9A9A9A]/50"
          style={{
            lineHeight: "24px",
            fontFamily: 'var(--font-handwritten, "Caveat", cursive)',
            fontSize: "15px",
          }}
          aria-label={`Notes for ${activeLabel}`}
        />
      </div>

      {/* Character count */}
      <div className="flex justify-end mt-1.5">
        <span className="text-[9px] text-[#9A9A9A]">
          {text.length}<span className="opacity-50">/500</span>
        </span>
      </div>
    </div>
  );
}
