// src/api/employeesApi.ts
import type { Employee } from "../types/data";

const BASE_URL = "/db.json";

export async function fetchEmployees(): Promise<Employee[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch employees");

  const data = await res.json();
  return data.employees; // 👈 extract array
}
