import { format, parseISO, isValid } from 'date-fns';
export function formatDate(isoString, pattern = 'dd MMM yyyy') {
    if (!isoString)
        return '-';
    const date = typeof isoString === 'string' ? parseISO(isoString) : isoString;
    if (!isValid(date))
        return '-';
    return format(date, pattern);
}
export function formatDateTime(isoString) {
    return formatDate(isoString, 'dd MMM yyyy, hh:mm a');
}
export function toISODateOnly(date) {
    if (!date || !isValid(date))
        return '';
    return format(date, 'yyyy-MM-dd');
}
export function monthKey(isoString) {
    return format(parseISO(isoString), 'MMM yyyy');
}
