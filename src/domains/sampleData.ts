export interface TData {
  bid: unknown;
  id: string;
  name: string;
  type: string;
  arr: number[] | null;
  isDropDown: boolean;
  amount: number;
  details: Detail[];
}

export interface Detail {
  id: string;
  name: string;
  arr: string[];
}
