import type { Employee } from "../types/data";

const BASE_URL = "http://localhost:4000/employees";

export async function fetchEmployees(): Promise<Employee[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch employees");
  return res.json();
}
