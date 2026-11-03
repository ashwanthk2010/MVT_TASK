import { alpha, createTheme, responsiveFontSizes } from '@mui/material/styles';

const PRIMARY = '#4F46E5';
const SLATE_900 = '#1E293B';
const SLATE_500 = '#64748B';
const BORDER = '#E2E8F0';

const baseTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: PRIMARY,
      light: '#818CF8',
      dark: '#4338CA',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#0D9488',
      light: '#5EEAD4',
      dark: '#0F766E',
      contrastText: '#ffffff',
    },
    info: { main: '#0EA5E9', light: '#7DD3FC', dark: '#0284C7', contrastText: '#ffffff' },
    success: { main: '#16A34A', light: '#86EFAC', dark: '#15803D', contrastText: '#ffffff' },
    warning: { main: '#F59E0B', light: '#FCD34D', dark: '#B45309', contrastText: '#ffffff' },
    error: { main: '#DC2626', light: '#FCA5A5', dark: '#B91C1C', contrastText: '#ffffff' },
    background: {
      default: '#F8FAFC',
      paper: '#FFFFFF',
    },
    text: {
      primary: SLATE_900,
      secondary: SLATE_500,
    },
    divider: BORDER,
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700, fontSize: '1.75rem', letterSpacing: '-0.02em' },
    h5: { fontWeight: 700, fontSize: '1.35rem', letterSpacing: '-0.015em' },
    h6: { fontWeight: 600, fontSize: '1.05rem', letterSpacing: '-0.01em' },
    subtitle1: { fontWeight: 600 },
    subtitle2: { fontWeight: 600 },
    body2: { lineHeight: 1.55 },
    caption: { letterSpacing: '0.01em' },
    button: { textTransform: 'none', fontWeight: 600, letterSpacing: '0.01em' },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: '#F8FAFC' },
        '*::-webkit-scrollbar': { width: 8, height: 8 },
        '*::-webkit-scrollbar-thumb': { backgroundColor: '#CBD5E1', borderRadius: 8 },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 10,
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 16,
          paddingRight: 16,
          transition: 'background-color .2s ease, box-shadow .2s ease, transform .15s ease',
          '&.MuiButton-contained.MuiButton-colorPrimary': {
            backgroundImage: `linear-gradient(135deg, ${PRIMARY} 0%, #6366F1 100%)`,
            boxShadow: `0 4px 12px ${alpha(PRIMARY, 0.25)}`,
            '&:hover': {
              backgroundImage: 'linear-gradient(135deg, #4338CA 0%, #4F46E5 100%)',
              boxShadow: `0 6px 16px ${alpha(PRIMARY, 0.32)}`,
            },
            '&.Mui-disabled': { backgroundImage: 'none', boxShadow: 'none' },
          },
        },
        outlined: {
          borderColor: BORDER,
          backgroundColor: '#fff',
          '&:hover': { backgroundColor: '#F8FAFC' },
        },
        sizeLarge: { paddingTop: 11, paddingBottom: 11, fontSize: '0.95rem' },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: { transition: 'background-color .2s ease, color .2s ease' },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
        rounded: { borderRadius: 14 },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          border: `1px solid ${BORDER}`,
          boxShadow: '0 1px 2px rgba(15, 23, 42, 0.04), 0 4px 16px rgba(15, 23, 42, 0.04)',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 20,
          '&:last-child': { paddingBottom: 20 },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          borderRadius: 10,
          transition: 'box-shadow .2s ease',
          '& .MuiOutlinedInput-notchedOutline': { borderColor: BORDER },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#CBD5E1' },
          '&.Mui-focused': { boxShadow: `0 0 0 3px ${alpha(PRIMARY, 0.12)}` },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: PRIMARY, borderWidth: 1 },
          '&.Mui-error.Mui-focused': { boxShadow: `0 0 0 3px ${alpha('#DC2626', 0.12)}` },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: { color: SLATE_500 },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: { marginLeft: 2, fontWeight: 500 },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
          boxShadow: '0 24px 48px rgba(15, 23, 42, 0.18)',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: { fontWeight: 700, fontSize: '1.1rem', paddingTop: 20 },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          '&:not(.MuiBackdrop-invisible)': { backgroundColor: alpha('#0F172A', 0.45), backdropFilter: 'blur(2px)' },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: 12,
          border: `1px solid ${BORDER}`,
          boxShadow: '0 12px 32px rgba(15, 23, 42, 0.12)',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '2px 6px',
          fontSize: '0.9rem',
          '&.Mui-selected': { backgroundColor: alpha(PRIMARY, 0.08) },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: { backgroundColor: SLATE_900, fontSize: '0.75rem', borderRadius: 6, padding: '6px 10px' },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: { borderColor: '#F1F5F9', paddingTop: 12, paddingBottom: 12 },
        head: {
          fontWeight: 600,
          fontSize: '0.72rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: SLATE_500,
          backgroundColor: '#F8FAFC',
          borderBottom: `1px solid ${BORDER}`,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          transition: 'background-color .15s ease',
          '&.MuiTableRow-hover:hover': { backgroundColor: alpha(PRIMARY, 0.035) },
          '&:last-child td': { borderBottom: 0 },
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: { borderTop: `1px solid ${BORDER}`, marginTop: 8 },
        toolbar: { paddingLeft: 8 },
        selectLabel: { color: SLATE_500, fontSize: '0.8rem' },
        displayedRows: { color: SLATE_900, fontSize: '0.8rem', fontWeight: 500 },
        actions: {
          '& .MuiIconButton-root': {
            border: `1px solid ${BORDER}`,
            borderRadius: 8,
            marginLeft: 6,
            padding: 4,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600, borderRadius: 8 },
        sizeSmall: { height: 24, fontSize: '0.72rem' },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: { borderRadius: 12 },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: { borderRight: `1px solid ${BORDER}`, backgroundImage: 'none' },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          transition: 'background-color .2s ease, color .2s ease',
          '&.Mui-selected': {
            backgroundColor: alpha(PRIMARY, 0.1),
            color: PRIMARY,
            '&:hover': { backgroundColor: alpha(PRIMARY, 0.14) },
          },
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: { backgroundColor: '#EEF2F7' },
      },
    },
  },
});

export const theme = responsiveFontSizes(baseTheme);
