import { useMemo, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
  Chip,
  Stack,
} from "@mui/material";
import type { Employee } from "../types/data";

interface Props {
  data: Employee[];
  totalCount: number;
}

type Order = "asc" | "desc";
type SortKey = keyof Employee | "city" | "skills";

const DataTable = ({ data, totalCount }: Props) => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<SortKey>("name");

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      let aValue: any;
      let bValue: any;

      if (orderBy === "city") {
        aValue = a.address?.city ?? "";
        bValue = b.address?.city ?? "";
      } else if (orderBy === "skills") {
        aValue = a.skills?.length ?? 0;
        bValue = b.skills?.length ?? 0;
      } else {
        aValue = a[orderBy];
        bValue = b[orderBy];
      }

      if (typeof aValue === "number") {
        return order === "asc" ? aValue - bValue : bValue - aValue;
      }

      return order === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  }, [data, order, orderBy]);

  const handleSort = (property: SortKey) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <Paper elevation={2} sx={{ mt: 3 }}>
      {/* Header */}
      <Box px={2} py={1.5} borderBottom="1px solid #eee">
        <Typography variant="subtitle2" color="text.secondary">
          Showing <b>{sortedData.length}</b> of <b>{totalCount}</b> records
        </Typography>
      </Box>

      {sortedData.length === 0 ? (
        <Box p={4} textAlign="center">
          <Typography variant="h6">No results found</Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your filters
          </Typography>
        </Box>
      ) : (
        <TableContainer sx={{ maxHeight: 420 }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                {[
                  ["name", "Name"],
                  ["department", "Department"],
                  ["salary", "Salary"],
                  ["role", "Role"],
                  ["skills", "Skills"],
                  ["city", "City"],
                ].map(([key, label]) => (
                  <TableCell key={key}>
                    <TableSortLabel
                      active={orderBy === key}
                      direction={order}
                      onClick={() => handleSort(key as SortKey)}
                    >
                      {label}
                    </TableSortLabel>
                  </TableCell>
                ))}
                <TableCell>Active</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {sortedData.map((row, index) => (
                <TableRow
                  key={row.id}
                  hover
                  sx={{
                    backgroundColor:
                      index % 2 === 0 ? "background.default" : "#fafafa",
                  }}
                >
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.department}</TableCell>
                  <TableCell>
                    ₹ {row.salary.toLocaleString()}
                  </TableCell>
                  <TableCell>{row.role}</TableCell>

                  {/* Skills */}
                  <TableCell>
                    <Stack direction="row" spacing={0.5} flexWrap="wrap">
                      {row.skills?.length ? (
                        row.skills.map(skill => (
                          <Chip
                            key={skill}
                            label={skill}
                            size="small"
                            variant="outlined"
                          />
                        ))
                      ) : (
                        "-"
                      )}
                    </Stack>
                  </TableCell>

                  <TableCell>{row.address?.city ?? "-"}</TableCell>

                  <TableCell>
                    <Chip
                      label={row.isActive ? "Active" : "Inactive"}
                      size="small"
                      color={row.isActive ? "success" : "default"}
                      variant="outlined"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};

export default DataTable;
