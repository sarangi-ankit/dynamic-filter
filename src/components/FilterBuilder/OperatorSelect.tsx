import { MenuItem, TextField } from "@mui/material";
import { operatorsMap } from "../../config/operators";
import type { FilterCondition } from "../../types/filter";

interface Props {
  filter: FilterCondition;
  onUpdate: (id: string, value: Partial<FilterCondition>) => void;
}

const OperatorSelect = ({ filter, onUpdate }: Props) => {
  if (!filter.type) return null;

  const operators = operatorsMap[filter.type] || [];

  return (
    <TextField
      select
      label="Operator"
      value={filter.operator}
      onChange={e =>
        onUpdate(filter.id, { operator: e.target.value })
      }
      sx={{ width: 180 }}
    >
      {operators.map(op => (
        <MenuItem key={op} value={op}>
          {op}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default OperatorSelect;
