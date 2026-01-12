export type FieldType =
  | "text"
  | "number"
  | "date"
  | "boolean"
  | "singleSelect"
  | "multiSelect";
  

  export type FilterValue =
  | string
  | number
  | boolean
  | string[]
  | number[]
  | [number?, number?]
  | [string?, string?]
    | null;
export interface FilterCondition {
  id: string;
  field: string;
  type: FieldType;
  operator: string;
  value: FilterValue;
}
