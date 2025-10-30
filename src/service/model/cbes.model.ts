import type { processRes } from "./process.model";


export type CBEs = {
  id?: number;
  name?: string;
  thainame?: string;
  abbreviation?: string;
  status?: string;
  istrash?: boolean;
  isdelete?: boolean;
};

export type CBEsRes = {
  id?: number;
  name?: string;
  thainame?: string;
  abbreviation?: string;
  status?: string;
  istrash?: boolean;
  isdelete?: boolean;

  roundedit?: number;
  notes?: { round: number; text: string }[];
  processes?: processRes[];
};
