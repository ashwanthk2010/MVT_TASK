import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
import { ALL_STATUSES } from '../../utils/statusTransitions';
import { toISODateOnly } from '../../utils/dateUtils';
import { useAppDispatch } from '../../app/hooks';
import { fetchSearchSuggestions } from '../../features/serviceRequest/serviceRequestSlice';
import Typography from '../common/Typography';
const PRIORITIES = ['Low', 'Medium', 'High', 'Critical'];
const SERVICE_TYPES = ['Installation', 'Repair', 'Maintenance', 'Inspection', 'Other'];
const FIELD_LABEL = {
    id: 'Request ID',
    customerName: 'Customer',
    title: 'Title',
};
export default function RequestFilters({ filters, onChange, onReset }) {
    const dispatch = useAppDispatch();
    const update = (patch) => onChange({ ...filters, ...patch });
    const [inputValue, setInputValue] = useState(filters.search);
    const [selected, setSelected] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [open, setOpen] = useState(false);
    const [loadingSuggestions, setLoadingSuggestions] = useState(false);
    const selectedRef = useRef(null);
    const commitSearch = (option) => {
        selectedRef.current = option;
        setSelected(option);
        setInputValue(option?.label ?? '');
        setOpen(false);
        const next = option?.value ?? '';
        if (next !== filters.search)
            update({ search: next });
    };
    useEffect(() => {
        if (!filters.search) {
            if (!selectedRef.current)
                return;
            selectedRef.current = null;
            setSelected(null);
            setInputValue('');
            setOpen(false);
            return;
        }
        if (selectedRef.current?.value === filters.search)
            return;
        const applied = {
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
            void dispatch(fetchSearchSuggestions({
                query: term,
                status: filters.status,
                priority: filters.priority,
                serviceType: filters.serviceType,
                dateFrom: filters.dateFrom,
                dateTo: filters.dateTo,
            }))
                .unwrap()
                .then((result) => {
                if (active)
                    setSuggestions(result);
            })
                .catch(() => {
                if (active)
                    setSuggestions([]);
            })
                .finally(() => {
                if (active)
                    setLoadingSuggestions(false);
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
        if (!selected)
            return suggestions;
        if (suggestions.some((item) => item.value.toLowerCase() === selected.value.toLowerCase())) {
            return suggestions;
        }
        return [selected, ...suggestions];
    }, [selected, suggestions]);
    return (_jsxs(Box, { sx: {
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' },
            gap: 1.5,
            alignItems: 'start',
        }, children: [_jsx(Autocomplete, { fullWidth: true, size: "small", options: options, value: selected, inputValue: inputValue, open: open, loading: loadingSuggestions, autoHighlight: true, selectOnFocus: true, clearOnBlur: false, clearOnEscape: false, clearText: "Remove selected suggestion", handleHomeEndKeys: true, forcePopupIcon: false, getOptionLabel: (option) => option.label, getOptionKey: (option) => option.key, isOptionEqualToValue: (option, current) => option.value.toLowerCase() === current.value.toLowerCase(), filterOptions: (opts, state) => {
                    const term = state.inputValue.trim().toLowerCase();
                    const committed = (selectedRef.current?.value ?? '').toLowerCase();
                    if (!term || term === committed)
                        return [];
                    return opts.filter((option) => !option.key.startsWith('applied:') && option.label.toLowerCase().includes(term));
                }, onOpen: () => {
                    const committed = (selectedRef.current?.value ?? '').toLowerCase();
                    const term = inputValue.trim().toLowerCase();
                    if (term && term !== committed)
                        setOpen(true);
                }, onClose: (_event, reason) => {
                    setOpen(false);
                    if (reason !== 'selectOption') {
                        setInputValue(selectedRef.current?.label ?? '');
                    }
                }, onChange: (_event, newValue) => {
                    commitSearch(newValue);
                }, onInputChange: (_event, newInput, reason) => {
                    if (reason === 'input') {
                        setInputValue(newInput);
                        if (!newInput.trim()) {
                            setOpen(false);
                            setLoadingSuggestions(false);
                            if (selectedRef.current)
                                commitSearch(null);
                            return;
                        }
                        const committed = (selectedRef.current?.value ?? '').toLowerCase();
                        const showSuggestions = newInput.trim().toLowerCase() !== committed;
                        setOpen(showSuggestions);
                        if (showSuggestions)
                            setLoadingSuggestions(true);
                        return;
                    }
                    if (reason === 'clear') {
                        commitSearch(null);
                        return;
                    }
                    if (reason === 'reset' || reason === 'blur' || reason === 'selectOption') {
                        setInputValue(selectedRef.current?.label ?? newInput);
                    }
                }, noOptionsText: "No matching suggestions", loadingText: "Finding suggestions\u2026", slotProps: {
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
                }, sx: { '& .MuiAutocomplete-popupIndicator': { display: 'none' } }, renderOption: (props, option) => {
                    const { key, ...optionProps } = props;
                    return (_jsxs(Box, { component: "li", ...optionProps, sx: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1.5 }, children: [_jsx(Typography, { variant: "body2", noWrap: true, sx: { minWidth: 0 }, children: option.label }), _jsx(Typography, { variant: "caption", color: "text.secondary", sx: { flexShrink: 0 }, children: FIELD_LABEL[option.field] })] }, key));
                }, renderInput: (params) => (_jsx(TextField, { ...params, label: "Search ID, customer, or title", placeholder: "Type to see suggestions", size: "small", slotProps: {
                        ...params.slotProps,
                        input: {
                            ...params.slotProps.input,
                            startAdornment: (_jsxs(_Fragment, { children: [_jsx(InputAdornment, { position: "start", children: _jsx(SearchIcon, { fontSize: "small", sx: { color: 'primary.main' } }) }), params.slotProps.input.startAdornment] })),
                        },
                    } })) }), _jsxs(TextField, { select: true, label: "Status", size: "small", fullWidth: true, value: filters.status, onChange: (e) => update({ status: e.target.value }), children: [_jsx(MenuItem, { value: "All", children: "All Statuses" }), ALL_STATUSES.map((status) => (_jsx(MenuItem, { value: status, children: status }, status)))] }), _jsxs(TextField, { select: true, label: "Priority", size: "small", fullWidth: true, value: filters.priority, onChange: (e) => update({ priority: e.target.value }), children: [_jsx(MenuItem, { value: "All", children: "All Priorities" }), PRIORITIES.map((p) => (_jsx(MenuItem, { value: p, children: p }, p)))] }), _jsxs(TextField, { select: true, label: "Service Type", size: "small", fullWidth: true, value: filters.serviceType, onChange: (e) => update({ serviceType: e.target.value }), children: [_jsx(MenuItem, { value: "All", children: "All Service Types" }), SERVICE_TYPES.map((s) => (_jsx(MenuItem, { value: s, children: s }, s)))] }), _jsx(DatePicker, { label: "From Date", value: filters.dateFrom ? new Date(filters.dateFrom) : null, onChange: (date) => update({ dateFrom: date ? toISODateOnly(date) : null }), slotProps: { textField: { size: 'small', fullWidth: true } } }), _jsx(DatePicker, { label: "To Date", value: filters.dateTo ? new Date(filters.dateTo) : null, onChange: (date) => update({ dateTo: date ? toISODateOnly(date) : null }), slotProps: { textField: { size: 'small', fullWidth: true } } }), _jsx(Button, { variant: "outlined", color: "inherit", onClick: onReset, startIcon: _jsx(ClearIcon, {}), fullWidth: true, sx: {
                    height: 40,
                    alignSelf: { xs: 'stretch', sm: 'start' },
                    color: 'text.secondary',
                    '&:hover': { color: 'error.main', borderColor: 'error.light', bgcolor: 'rgba(220,38,38,0.04)' },
                }, children: "Clear Filters" })] }));
}
