import { IconButton, MenuItem, Stack, TextField } from "@mui/material";
import { Trash2 } from "lucide-react";
import { fields } from "../../config/fields";
import type { FilterCondition } from "../../types/filter";
import OperatorSelect from "./OperatorSelect";
import ValueInput from "./ValueInput";

interface Props {
  filter: FilterCondition;
  onUpdate: (id: string, value: Partial<FilterCondition>) => void;
  onRemove: (id: string) => void;
}

const FilterRow = ({ filter, onUpdate, onRemove }: Props) => {
  const handleFieldChange = (fieldValue: string) => {
    const fieldConfig = fields.find(f => f.value === fieldValue);

    onUpdate(filter.id, {
      field: fieldValue,
      type: fieldConfig?.type,
      operator: "",
      value: "",
    });
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <TextField
        select
        label="Field"
        value={filter.field}
        onChange={e => handleFieldChange(e.target.value)}
        sx={{ width: 200 }}
      >
        {fields.map(field => (
          <MenuItem key={field.value} value={field.value}>
            {field.label}
          </MenuItem>
        ))}
      </TextField>

      <OperatorSelect filter={filter} onUpdate={onUpdate} />
      <ValueInput filter={filter} onUpdate={onUpdate} />

      <IconButton onClick={() => onRemove(filter.id)}>
        <Trash2 size={18} />
      </IconButton>
    </Stack>
  );
};

export default FilterRow;
