import { useEffect, useMemo, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type { SearchSuggestion, SearchSuggestionField, ServiceRequestFilters } from '../../types/serviceRequest.types';
import { ALL_STATUSES } from '../../utils/statusTransitions';
import { toISODateOnly } from '../../utils/dateUtils';
import { useAppDispatch } from '../../app/hooks';
import { fetchSearchSuggestions } from '../../features/serviceRequest/serviceRequestSlice';
import Typography from '../common/Typography';

const PRIORITIES = ['Low', 'Medium', 'High', 'Critical'] as const;
const SERVICE_TYPES = ['Installation', 'Repair', 'Maintenance', 'Inspection', 'Other'] as const;

const FIELD_LABEL: Record<SearchSuggestionField, string> = {
  id: 'Request ID',
  customerName: 'Customer',
  title: 'Title',
};

interface RequestFiltersProps {
  filters: ServiceRequestFilters;
  onChange: (filters: ServiceRequestFilters) => void;
  onReset: () => void;
}

export default function RequestFilters({ filters, onChange, onReset }: RequestFiltersProps) {
  const dispatch = useAppDispatch();
  const update = (patch: Partial<ServiceRequestFilters>) => onChange({ ...filters, ...patch });

  const [inputValue, setInputValue] = useState(filters.search);
  const [selected, setSelected] = useState<SearchSuggestion | null>(null);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const selectedRef = useRef<SearchSuggestion | null>(null);

  const commitSearch = (option: SearchSuggestion | null) => {
    selectedRef.current = option;
    setSelected(option);
    setInputValue(option?.label ?? '');
    setOpen(false);
    const next = option?.value ?? '';
    if (next !== filters.search) update({ search: next });
  };

  useEffect(() => {
    if (!filters.search) {
      if (!selectedRef.current) return;
      selectedRef.current = null;
      setSelected(null);
      setInputValue('');
      setOpen(false);
      return;
    }

    if (selectedRef.current?.value === filters.search) return;

    const applied: SearchSuggestion = {
      key: `applied:${filters.search.toLowerCase()}`,
      label: filters.search,
      value: filters.search,
      field: 'customerName',
    };
    selectedRef.current = applied;
    setSelected(applied);
    setInputValue(filters.search);
  }, [filters.search]);

  useEffect(() => {
    const term = inputValue.trim();
    const committed = (selected?.value ?? '').toLowerCase();
    if (!term || term.toLowerCase() === committed) {
      setSuggestions((current) => (current.length === 0 ? current : []));
      setLoadingSuggestions(false);
      return;
    }

    let active = true;
    setLoadingSuggestions(true);
    const timer = window.setTimeout(() => {
      void dispatch(
        fetchSearchSuggestions({
          query: term,
          status: filters.status,
          priority: filters.priority,
          serviceType: filters.serviceType,
          dateFrom: filters.dateFrom,
          dateTo: filters.dateTo,
        }),
      )
        .unwrap()
        .then((result) => {
          if (active) setSuggestions(result);
        })
        .catch(() => {
          if (active) setSuggestions([]);
        })
        .finally(() => {
          if (active) setLoadingSuggestions(false);
        });
    }, 200);

    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, [
    dispatch,
    inputValue,
    selected,
    filters.status,
    filters.priority,
    filters.serviceType,
    filters.dateFrom,
    filters.dateTo,
  ]);

  const options = useMemo(() => {
    if (!selected) return suggestions;
    if (suggestions.some((item) => item.value.toLowerCase() === selected.value.toLowerCase())) {
      return suggestions;
    }
    return [selected, ...suggestions];
  }, [selected, suggestions]);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' },
        gap: 1.5,
        alignItems: 'start',
      }}
    >
      <Autocomplete
        fullWidth
        size="small"
        options={options}
        value={selected}
        inputValue={inputValue}
        open={open}
        loading={loadingSuggestions}
        autoHighlight
        selectOnFocus
        clearOnBlur={false}
        clearOnEscape={false}
        clearText="Remove selected suggestion"
        handleHomeEndKeys
        forcePopupIcon={false}
        getOptionLabel={(option) => option.label}
        getOptionKey={(option) => option.key}
        isOptionEqualToValue={(option, current) => option.value.toLowerCase() === current.value.toLowerCase()}
        filterOptions={(opts, state) => {
          const term = state.inputValue.trim().toLowerCase();
          const committed = (selectedRef.current?.value ?? '').toLowerCase();
          if (!term || term === committed) return [];
          return opts.filter(
            (option) => !option.key.startsWith('applied:') && option.label.toLowerCase().includes(term),
          );
        }}
        onOpen={() => {
          const committed = (selectedRef.current?.value ?? '').toLowerCase();
          const term = inputValue.trim().toLowerCase();
          if (term && term !== committed) setOpen(true);
        }}
        onClose={(_event, reason) => {
          setOpen(false);
          if (reason !== 'selectOption') {
            setInputValue(selectedRef.current?.label ?? '');
          }
        }}
        onChange={(_event, newValue) => {
          commitSearch(newValue);
        }}
        onInputChange={(_event, newInput, reason) => {
          if (reason === 'input') {
            setInputValue(newInput);
            if (!newInput.trim()) {
              setOpen(false);
              setLoadingSuggestions(false);
              if (selectedRef.current) commitSearch(null);
              return;
            }
            const committed = (selectedRef.current?.value ?? '').toLowerCase();
            const showSuggestions = newInput.trim().toLowerCase() !== committed;
            setOpen(showSuggestions);
            if (showSuggestions) setLoadingSuggestions(true);
            return;
          }
          if (reason === 'clear') {
            commitSearch(null);
            return;
          }
          if (reason === 'reset' || reason === 'blur' || reason === 'selectOption') {
            setInputValue(selectedRef.current?.label ?? newInput);
          }
        }}
        noOptionsText="No matching suggestions"
        loadingText="Finding suggestions…"
        slotProps={{
          clearIndicator: {
            sx: { visibility: 'visible' },
          },
          paper: {
            elevation: 0,
            sx: {
              mt: 0.5,
              borderRadius: 1.5,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: '0 12px 32px rgba(15, 23, 42, 0.12)',
            },
          },
          listbox: {
            sx: { py: 0.5, maxHeight: 280 },
          },
        }}
        sx={{
          '& .MuiAutocomplete-popupIndicator': { display: 'none' },
          '& .MuiAutocomplete-clearIndicator': { visibility: 'visible' },
        }}
        renderOption={(props, option) => {
          const { key, ...optionProps } = props;
          return (
            <Box
              component="li"
              key={key}
              {...optionProps}
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1.5 }}
            >
              <Typography variant="body2" noWrap sx={{ minWidth: 0 }}>
                {option.label}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ flexShrink: 0 }}>
                {FIELD_LABEL[option.field]}
              </Typography>
            </Box>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search ID, customer, or title"
            placeholder="Type to see suggestions"
            size="small"
            slotProps={{
              ...params.slotProps,
              input: {
                ...params.slotProps.input,
                startAdornment: (
                  <>
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" sx={{ color: 'primary.main' }} />
                    </InputAdornment>
                    {params.slotProps.input.startAdornment}
                  </>
                ),
              },
            }}
          />
        )}
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
