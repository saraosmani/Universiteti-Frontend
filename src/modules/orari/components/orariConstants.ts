export const DAYS = ["Hënë", "Martë", "Mërkurë", "Enjte", "Premte"];

export const TIME_SLOTS: string[] = [];
for (let h = 8; h <= 20; h++) {
  TIME_SLOTS.push(`${String(h).padStart(2, "0")}:00`);
}

export const SLOT_H = 64; 

export const toMinutes = (t: string): number => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

export type LlojiColor = {
  antColor: string;
  bg: string;
  border: string;
  text: string;
};

export const LLOJI_COLORS: Record<string, LlojiColor> = {
  "Leksion": { antColor: "geekblue", bg: "#EEF2FF", border: "#6366F1", text: "#3730A3" },
  "Laborator": { antColor: "orange",   bg: "#FFF7ED", border: "#F97316", text: "#C2410C" },
  "Seminar":   { antColor: "purple",   bg: "#FDF4FF", border: "#A855F7", text: "#7E22CE" },
  "default":   { antColor: "default",  bg: "#F8FAFC", border: "#94A3B8", text: "#475569" },
};

export const getColor = (lloji: string): LlojiColor =>
  LLOJI_COLORS[lloji] ?? LLOJI_COLORS["default"];