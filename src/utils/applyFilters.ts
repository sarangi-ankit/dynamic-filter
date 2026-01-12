import type { FilterCondition } from "../types/filter";

/**
 * Applies dynamic filter conditions to a dataset.
 *
 * - Supports text, number, boolean, array, and nested object filtering
 * - Uses dot-notation paths (e.g. "address.city") to access nested values
 * - Designed for client-side filtering with real-time updates
 */

export function applyFilters<T extends Record<string, any>>(
  data: T[],
  filters: FilterCondition[]
): T[] {
  if (filters.length === 0) return data;

  return data.filter(item =>
    filters.every(filter => {
      const { field, operator, value } = filter;
      if (!field || !operator || value == null) return true;

      const fieldValue = field
        .split(".")
        .reduce<any>((obj, key) => obj?.[key], item);

      
     
if (typeof fieldValue === "string" && typeof value === "string") {
  const text = fieldValue.trim().toLowerCase();
  const input = value.trim().toLowerCase();

  if (!input) return true;

  switch (operator) {
    case "contains":
      return text.includes(input);

    case "equals":
    case "is":
      return text === input;

    case "isNot":
      return text !== input;

    case "startsWith":
      return text.startsWith(input);

    case "endsWith":
      return text.endsWith(input);

    default:
      return true;
  }
}


      
      if (typeof fieldValue === "number") {
        if (typeof value === "number") {
          if (operator === "equals") return fieldValue === value;
          if (operator === "gt") return fieldValue > value;
          if (operator === "lt") return fieldValue < value;
        }

        if (
          operator === "between" &&
          Array.isArray(value)
        ) {
          const [min, max] = value as number[];

          if (min !== undefined && fieldValue < min) return false;
          if (max !== undefined && fieldValue > max) return false;
          return true;
        }
      }

     
      if (typeof fieldValue === "boolean" && typeof value === "boolean") {
        return fieldValue === value;
      }

      
      if (Array.isArray(fieldValue) && Array.isArray(value)) {
        if (operator === "in") {
          return value.some(v => fieldValue.includes(v));
        }
        if (operator === "notIn") {
          return value.every(v => !fieldValue.includes(v));
        }
      }

      return true;
    })
  );
}
