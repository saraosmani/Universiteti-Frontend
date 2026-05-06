import { getAuthenticated } from "./api";

export interface Seksion {
  sek_id: number;
  dita: string;
  ore_fillimi: string;
  ore_mbarimi: string;
  orari: string;
  lloji: string;
  grupi: string;
  lenda: {
    id: number;
    emer: string;
    kod: string;
  };
  salla: {
    nr: number;
    godin: string;
  };
  program_studim: {
    id: string;
    emer: string;
    nive: string;
  };
  semestri: {
    nr: number;
    vit: string;
  };
  nr_studenteve: number;
}

export interface SeksionHistorik {
  sek_id: number;
  dita: string;
  orari: string;
  lloji: string;
  grupi: string;
  lenda: {
    emer: string;
    kod: string;
  };
  program: string;
  semestri: string;
}

export const getSeksionetAktive = async (token: string): Promise<Seksion[]> => {
  const response = await getAuthenticated("/api/pedagog/seksionet-aktive", token) as { data: Seksion[] };
  return response.data;
};

export const getSeksionetHistorik = async (token: string): Promise<SeksionHistorik[]> => {
  const response = await getAuthenticated("/api/pedagog/seksionet-historik", token) as { data: SeksionHistorik[] };
  return response.data;
};