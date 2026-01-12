import type { FieldType } from "../types/filter";

export interface FieldConfig {
  label: string;
  value: string;
  type: FieldType;
  options?: string[];
}

export const fields: FieldConfig[] = [
  { label: "Name", value: "name", type: "text" },
  {
    label: "Department",
    value: "department",
    type: "singleSelect",
    options: ["Engineering", "HR", "Sales"],
  },
  { label: "Salary", value: "salary", type: "number" },
  { label: "Join Date", value: "joinDate", type: "date" },
  { label: "Active", value: "isActive", type: "boolean" },
  {
    label: "Skills",
    value: "skills",
    type: "multiSelect",
    options: ["React", "TypeScript", "Node"],
  },
  { label: "City", value: "address.city", type: "text" },
];
