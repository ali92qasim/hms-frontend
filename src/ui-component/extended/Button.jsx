import MuiButton from '@mui/material/Button';


export default function Button({ children, color, variant, size, startIcon }) {
    return (
        <MuiButton disableElevation startIcon={startIcon} variant={variant} color={color} size={size}>
        {children}
        </MuiButton>
    );
}

