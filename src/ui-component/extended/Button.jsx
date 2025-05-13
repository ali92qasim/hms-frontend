import MuiButton from '@mui/material/Button';


export default function Button({ children, color, variant, size, startIcon, onClick }) {
    return (
        <MuiButton disableElevation startIcon={startIcon} variant={variant} color={color} size={size} onClick={onClick}>
        {children}
        </MuiButton>
    );
}

