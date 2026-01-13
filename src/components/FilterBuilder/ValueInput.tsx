import { Checkbox, MenuItem, Stack, TextField } from "@mui/material";
import type { FilterCondition } from "../../types/filter";
import { fields } from "../../config/fields";

interface Props {
  filter: FilterCondition;
  onUpdate: (id: string, value: Partial<FilterCondition>) => void;
}

const ValueInput = ({ filter, onUpdate }: Props) => {
  const fieldConfig = fields.find(f => f.value === filter.field);
  if (!fieldConfig || !filter.operator) return null;

  
  if (filter.type === "text") {
    return (
      <TextField
        label="Value"
        value={filter.value ?? ""}
        onChange={e =>
          onUpdate(filter.id, { value: e.target.value })
        }
      />
    );
  }

 
  if (filter.type === "number") {
    if (filter.operator === "between") {
      const [min, max] = Array.isArray(filter.value)
  ? (filter.value as [number | undefined, number | undefined])
  : [undefined, undefined];

      return (
        <Stack direction="row" spacing={1}>
          <TextField
            type="number"
            label="Min"
            value={min ?? ""}
            onChange={e =>
              onUpdate(filter.id, {
                value: [Number(e.target.value), max],
              })
            }
          />
          <TextField
            type="number"
            label="Max"
            value={max ?? ""}
            onChange={e =>
              onUpdate(filter.id, {
                value: [min, Number(e.target.value)],
              })
            }
          />
        </Stack>
      );
    }

    return (
      <TextField
        type="number"
        label="Value"
        value={filter.value ?? ""}
        onChange={e =>
          onUpdate(filter.id, { value: Number(e.target.value) })
        }
      />
    );
  }

  
  if (filter.type === "boolean") {
    return (
      <Checkbox
        checked={Boolean(filter.value)}
        onChange={e =>
          onUpdate(filter.id, { value: e.target.checked })
        }
      />
    );
  }

  
  if (filter.type === "singleSelect") {
    return (
      <TextField
        select
        label="Value"
        value={filter.value ?? ""}
        onChange={e =>
          onUpdate(filter.id, { value: e.target.value })
        }
        sx={{ minWidth: 150 }}
      >
        {fieldConfig.options?.map(opt => (
          <MenuItem key={opt} value={opt}>
            {opt}
          </MenuItem>
        ))}
      </TextField>
    );
  }

  
  if (filter.type === "multiSelect") {
  const selectedValues: string[] = Array.isArray(filter.value)
    ? filter.value.filter((v): v is string => typeof v === "string")
    : [];

  return (
    <TextField
      select
      label="Value"
      SelectProps={{ multiple: true }}
      value={selectedValues}
      onChange={e =>
        onUpdate(filter.id, {
          value:
            typeof e.target.value === "string"
              ? e.target.value.split(",")
              : e.target.value,
        })
      }
      sx={{ minWidth: 180 }}
    >
      {fieldConfig.options?.map((opt: string) => (
        <MenuItem key={opt} value={opt}>
          <Checkbox checked={selectedValues.includes(opt)} />
          {opt}
        </MenuItem>
      ))}
    </TextField>
  );
}


  
  if (filter.type === "date") {
    const [start, end] = Array.isArray(filter.value)
  ? (filter.value as [string | undefined, string | undefined])
  : [undefined, undefined];


    return (
      <Stack direction="row" spacing={1}>
        <TextField
          type="date"
          label="From"
          InputLabelProps={{ shrink: true }}
          value={start ?? ""}
          onChange={e =>
            onUpdate(filter.id, { value: [e.target.value, end] })
          }
        />
        <TextField
          type="date"
          label="To"
          InputLabelProps={{ shrink: true }}
          value={end ?? ""}
          onChange={e =>
            onUpdate(filter.id, { value: [start, e.target.value] })
          }
        />
      </Stack>
    );
  }

  return null;
};

export default ValueInput;
