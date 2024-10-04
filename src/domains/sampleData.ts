export interface TData {
  id: string;
  name: string;
  type: string;
  arr: number[] | null;
  isDropDown: boolean;
  details: Detail[];
}

export interface Detail {
  id: string;
  name: string;
  arr: string[];
}
