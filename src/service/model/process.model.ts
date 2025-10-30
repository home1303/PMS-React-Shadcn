export type process = {
  id?: number;
  headerid?: number;
  name?: string;
  weight?: number;
  isdelete?: boolean; 
};

export type processRes = {
  process?: string;
  issue?: string;
  subissue?: string;
  weight?: number;
  children?: processRes[];
  level:number
};
