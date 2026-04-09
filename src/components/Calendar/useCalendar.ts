"use client";
import { useState, useCallback, useEffect } from "react";
import { startOfMonth, addMonths, subMonths, isSameDay, isWithinInterval, isAfter } from "date-fns";
import { DateRange, Note, NoteMode } from "./types";

const LS_NOTES_KEY = "meridian_notes_v1";

export function useCalendar() {
  const [currentMonth, setCurrentMonth] = useState<Date>(() => startOfMonth(new Date()));
  const [range, setRange] = useState<DateRange>({ start: null, end: null });
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteMode, setNoteMode] = useState<NoteMode>("month");
  const [isFlipping, setIsFlipping] = useState<"next" | "prev" | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LS_NOTES_KEY);
      if (stored) setNotes(JSON.parse(stored));
      const lastMonth = localStorage.getItem("meridian_last_month");
      if (lastMonth) setCurrentMonth(startOfMonth(new Date(lastMonth)));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("meridian_last_month", currentMonth.toISOString());
    } catch {}
  }, [currentMonth]);

  const goToMonth = useCallback((direction: "next" | "prev") => {
    setIsFlipping(direction);
    setTimeout(() => {
      setCurrentMonth(prev =>
        direction === "next" ? addMonths(prev, 1) : subMonths(prev, 1)
      );
      setIsFlipping(null);
    }, 400);
  }, []);

  const handleDateClick = useCallback((date: Date) => {
    setRange(prev => {
      if (!prev.start || (prev.start && prev.end)) {
        return { start: date, end: null };
      }
      if (prev.start && !prev.end) {
        if (isSameDay(date, prev.start)) return { start: null, end: null };
        if (isAfter(prev.start, date)) return { start: date, end: prev.start };
        return { start: prev.start, end: date };
      }
      return prev;
    });
  }, []);

  const clearRange = useCallback(() => {
    setRange({ start: null, end: null });
    setHoverDate(null);
  }, []);

  const getDateState = useCallback((date: Date): string => {
    const { start, end } = range;

    if (start && isSameDay(date, start)) return "start";
    if (end && isSameDay(date, end)) return "end";

    if (start && end && isWithinInterval(date, { start, end })) return "in-range";

    if (start && !end && hoverDate) {
      const previewEnd = isAfter(hoverDate, start) ? hoverDate : start;
      const previewStart = isAfter(hoverDate, start) ? start : hoverDate;
      if (isWithinInterval(date, { start: previewStart, end: previewEnd })) return "preview";
    }

    return "default";
  }, [range, hoverDate]);

  const upsertNote = useCallback((content: string, key: string, label: string, type: NoteMode) => {
    setNotes(prev => {
      const existing = prev.find(n => n.id === key);
      let updated: Note[];
      if (existing) {
        updated = prev.map(n => n.id === key ? { ...n, content } : n);
      } else {
        updated = [...prev, { id: key, content, createdAt: new Date().toISOString(), type, label }];
      }
      try {
        localStorage.setItem(LS_NOTES_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  }, []);

  return {
    currentMonth,
    range,
    hoverDate,
    setHoverDate,
    handleDateClick,
    clearRange,
    getDateState,
    goToMonth,
    isFlipping,
    notes,
    noteMode,
    setNoteMode,
    upsertNote,
  };
}
