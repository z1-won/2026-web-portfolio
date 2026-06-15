export type Certificate = {
  name: string;
  issuer: string;
  date: string;
  category: string;
  link?: string;
};

export const certificates: Certificate[] = [
  {
    name: "SQLD",
    issuer: "한국데이터산업진흥원",
    date: "2025.04.04 – 2027.04.04",
    category: "Data",
  },
  {
    name: "ADsP",
    issuer: "한국데이터산업진흥원",
    date: "2025.08 –",
    category: "Data",
  },
];
