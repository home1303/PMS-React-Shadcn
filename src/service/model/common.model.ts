export type Option = {
  process?: string;
  issue?: string;
  subissue?: string;
  weight?: number;
  isMain?: boolean;
  hasIssue?: boolean;
  hasSubIssue?: boolean;
  parentIndex?: number;
  children?: Option[];
};
