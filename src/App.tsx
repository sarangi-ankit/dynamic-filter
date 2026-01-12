import { useEffect, useMemo, useState } from "react";
import { Container, Typography } from "@mui/material";
import FilterBuilder from "./components/FilterBuilder/FilterBuilder";
import DataTable from "./components/DataTable";
import { applyFilters } from "./utils/applyFilters";
import type { FilterCondition } from "./types/filter";
import type { Employee } from "./types/data";
import { fetchEmployees } from "./api/employeesApi";

function App() {
  const [filters, setFilters] = useState<FilterCondition[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees()
      .then(setEmployees)
      .finally(() => setLoading(false));
  }, []);

  const filteredData = useMemo(
    () => applyFilters(employees, filters),
    [employees, filters]
  );

  if (loading) {
    return <Typography sx={{ mt: 4 }}>Loading...</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h5" mb={2}>
        Dynamic Filter Builder
      </Typography>

      <FilterBuilder filters={filters} setFilters={setFilters} />

      <DataTable
        data={filteredData}
        totalCount={employees.length}
      />
    </Container>
  );
}

export default App;
