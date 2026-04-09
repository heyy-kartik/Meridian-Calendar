export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface Note {
  id: string;
  content: string;
  createdAt: string;
  type: "month" | "range";
  label: string;
}

export interface Holiday {
  date: string; // "MM-DD" format
  name: string;
}

export type NoteMode = "month" | "range";
