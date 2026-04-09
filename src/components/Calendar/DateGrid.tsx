"use client";
import { useMemo } from "react";
import {
  startOfMonth, endOfMonth, startOfWeek, endOfWeek,
  eachDayOfInterval, isSameMonth, isToday, getDay, format
} from "date-fns";
import { motion } from "framer-motion";
import { DAY_HEADERS, INDIAN_HOLIDAYS } from "./constants";
import DateCell from "./DateCell";

interface Props {
  currentMonth: Date;
  getDateState: (date: Date) => string;
  onDateClick: (date: Date) => void;
  onDateHover: (date: Date | null) => void;
}

export default function DateGrid({ currentMonth, getDateState, onDateClick, onDateHover }: Props) {
  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const holidayMap = useMemo(() => {
    const map: Record<string, string> = {};
    INDIAN_HOLIDAYS.forEach(h => { map[h.date] = h.name; });
    return map;
  }, []);

  return (
    <div className="flex-1 px-4 py-3 lg:px-6 lg:py-4">
      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2">
        {DAY_HEADERS.map((day, i) => (
          <div
            key={day}
            className={`text-center text-[9px] lg:text-[10px] font-semibold tracking-widest py-1
              ${i >= 5 ? "text-[#E53935]" : "text-[#9A9A9A]"}`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Date cells */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {days.map((day, index) => {
          const state = getDateState(day);
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const dayOfWeek = getDay(day);
          const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
          const mmdd = format(day, "MM-dd");
          const holiday = holidayMap[mmdd];

          return (
            <motion.div
              key={day.toISOString()}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.006, duration: 0.2 }}
            >
              <DateCell
                date={day}
                state={state}
                isCurrentMonth={isCurrentMonth}
                isToday={isToday(day)}
                isWeekend={isWeekend}
                holiday={holiday}
                onClick={() => onDateClick(day)}
                onHover={onDateHover}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
