import { Holiday } from "./types";

export const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

export const DAY_HEADERS = ["MON","TUE","WED","THU","FRI","SAT","SUN"];

// Indian public holidays (MM-DD format)
export const INDIAN_HOLIDAYS: Holiday[] = [
  { date: "01-26", name: "Republic Day" },
  { date: "03-25", name: "Holi" },
  { date: "04-14", name: "Dr. Ambedkar Jayanti" },
  { date: "04-18", name: "Good Friday" },
  { date: "08-15", name: "Independence Day" },
  { date: "10-02", name: "Gandhi Jayanti" },
  { date: "10-20", name: "Dussehra" },
  { date: "11-05", name: "Diwali" },
  { date: "12-25", name: "Christmas" },
];

export const MONTH_IMAGES: Record<number, string> = {
  0:  "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800&q=80",
  1:  "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=800&q=80",
  2:  "https://images.unsplash.com/photo-1519642918688-7e43b19245d8?w=800&q=80",
  3:  "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&q=80",
  4:  "https://images.unsplash.com/photo-1490750967868-88df5691cc17?w=800&q=80",
  5:  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
  6:  "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
  7:  "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=800&q=80",
  8:  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
  9:  "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80",
  10: "https://images.unsplash.com/photo-1543039625-14cbd3802e7d?w=800&q=80",
  11: "https://images.unsplash.com/photo-1511370235399-1802cae1d32f?w=800&q=80",
};
