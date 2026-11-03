import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type { ServiceRequestFilters } from '../../types/serviceRequest.types';
import { ALL_STATUSES } from '../../utils/statusTransitions';
import { toISODateOnly } from '../../utils/dateUtils';

const PRIORITIES = ['Low', 'Medium', 'High', 'Critical'] as const;
const SERVICE_TYPES = ['Installation', 'Repair', 'Maintenance', 'Inspection', 'Other'] as const;

interface RequestFiltersProps {
  filters: ServiceRequestFilters;
  onChange: (filters: ServiceRequestFilters) => void;
  onReset: () => void;
}

export default function RequestFilters({ filters, onChange, onReset }: RequestFiltersProps) {
  const update = (patch: Partial<ServiceRequestFilters>) => onChange({ ...filters, ...patch });

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' },
        gap: 1.5,
        alignItems: 'start',
      }}
    >
      <TextField
        label="Search ID or Customer"
        size="small"
        fullWidth
        value={filters.search}
        onChange={(e) => update({ search: e.target.value })}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" sx={{ color: 'primary.main' }} />
              </InputAdornment>
            ),
          },
        }}
      />
      <TextField
        select
        label="Status"
        size="small"
        fullWidth
        value={filters.status}
        onChange={(e) => update({ status: e.target.value as ServiceRequestFilters['status'] })}
      >
        <MenuItem value="All">All Statuses</MenuItem>
        {ALL_STATUSES.map((status) => (
          <MenuItem key={status} value={status}>
            {status}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="Priority"
        size="small"
        fullWidth
        value={filters.priority}
        onChange={(e) => update({ priority: e.target.value as ServiceRequestFilters['priority'] })}
      >
        <MenuItem value="All">All Priorities</MenuItem>
        {PRIORITIES.map((p) => (
          <MenuItem key={p} value={p}>
            {p}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="Service Type"
        size="small"
        fullWidth
        value={filters.serviceType}
        onChange={(e) => update({ serviceType: e.target.value as ServiceRequestFilters['serviceType'] })}
      >
        <MenuItem value="All">All Service Types</MenuItem>
        {SERVICE_TYPES.map((s) => (
          <MenuItem key={s} value={s}>
            {s}
          </MenuItem>
        ))}
      </TextField>
      <DatePicker
        label="From Date"
        value={filters.dateFrom ? new Date(filters.dateFrom) : null}
        onChange={(date) => update({ dateFrom: date ? toISODateOnly(date) : null })}
        slotProps={{ textField: { size: 'small', fullWidth: true } }}
      />
      <DatePicker
        label="To Date"
        value={filters.dateTo ? new Date(filters.dateTo) : null}
        onChange={(date) => update({ dateTo: date ? toISODateOnly(date) : null })}
        slotProps={{ textField: { size: 'small', fullWidth: true } }}
      />
      <Button
        variant="outlined"
        color="inherit"
        onClick={onReset}
        startIcon={<ClearIcon />}
        fullWidth
        sx={{
          height: 40,
          alignSelf: { xs: 'stretch', sm: 'start' },
          color: 'text.secondary',
          '&:hover': { color: 'error.main', borderColor: 'error.light', bgcolor: 'rgba(220,38,38,0.04)' },
        }}
      >
        Clear Filters
      </Button>
    </Box>
  );
}
