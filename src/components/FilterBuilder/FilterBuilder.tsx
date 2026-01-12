import {
  Button,
  Stack,
  Card,
  CardContent,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { v4 as uuid } from "uuid";
import FilterRow from "./FilterRow";
import type { FilterCondition } from "../../types/filter";

interface Props {
  filters: FilterCondition[];
  setFilters: React.Dispatch<React.SetStateAction<FilterCondition[]>>;
}

const FilterBuilder = ({ filters, setFilters }: Props) => {
  const addFilter = () => {
    if (filters.length > 0) return;

    setFilters([
      {
        id: uuid(),
        field: "",
        type: "text",
        operator: "",
        value: "",
      },
    ]);
  };

  const updateFilter = (id: string, updated: Partial<FilterCondition>) => {
    setFilters(prev =>
      prev.map(f => (f.id === id ? { ...f, ...updated } : f))
    );
  };

  const removeFilter = (id: string) => {
    setFilters(prev => prev.filter(f => f.id !== id));
  };

  return (
    <Card variant="outlined">
      <CardContent>
       
        <Stack spacing={0.5} mb={2}>
          <Typography variant="h6">Dynamic Filters</Typography>
          
        </Stack>

        <Divider sx={{ mb: 2 }} />

       
        <Stack spacing={2}>
          {filters.map(filter => (
            <Box
              key={filter.id}
              sx={{
                p: 2,
                borderRadius: 1,
                border: "1px solid",
                borderColor: "divider",
                backgroundColor: "background.paper",
              }}
            >
              <FilterRow
                filter={filter}
                onUpdate={updateFilter}
                onRemove={removeFilter}
              />
            </Box>
          ))}
        </Stack>

        
        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={addFilter}
            disabled={filters.length >= 1}
          >
            Add Filter
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FilterBuilder;
