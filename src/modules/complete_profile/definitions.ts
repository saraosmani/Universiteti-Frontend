export interface StepOneValues {
  dep_id: string;
}

export interface StepTwoValues {
  ped_tit: string;
  ped_gjin: "M" | "F";
  ped_dl: string;
}

export const TITLES = [
  { value: "Prof.", label: "Prof." },
  { value: "Prof. Dr.", label: "Prof. Dr." },
  { value: "Dr.", label: "Dr." },
  { value: "Msc.", label: "Msc." },
  { value: "Ing.", label: "Ing." },
];

export const GENDERS = [
  { value: "M", label: "Mashkull" },
  { value: "F", label: "Femër" },
];