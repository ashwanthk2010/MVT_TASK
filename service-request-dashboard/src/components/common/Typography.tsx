import MuiTypography, { type TypographyProps as MuiTypographyProps } from '@mui/material/Typography';

export interface TypographyProps extends MuiTypographyProps {
  fontWeight?: number | string;
  display?: string;
}

export default function Typography({ fontWeight, display, sx, ...rest }: TypographyProps) {
  const extraSx = {
    ...(fontWeight !== undefined ? { fontWeight } : {}),
    ...(display !== undefined ? { display } : {}),
  };
  return <MuiTypography sx={[extraSx, ...(Array.isArray(sx) ? sx : sx ? [sx] : [])]} {...rest} />;
}
