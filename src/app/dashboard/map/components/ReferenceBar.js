import { Box, Typography } from "@mui/material";

export default function ReferenceBar({sx}) {
    return (
        <Box sx={{ 
        height: '100%', 
        display: 'flex',
        ...sx
        }}>
            <Box sx={{
                background: "linear-gradient(to top, #458cff, #5bde09, #ffc32b, #ed3300)", 
                width: "80px",
                borderRadius: "10px",
                border: "2px solid rgba(0, 0, 0, 0.3)",
            }}>
            </Box>
            <Box sx={{display: "flex", flexDirection: "column", gap: "10px", padding: "10px", justifyContent: "space-between"}}>
                <Typography variant="body1">High</Typography>
                <Typography variant="body1">Moderate</Typography>
                <Typography variant="body1">Low</Typography>
                <Typography variant="body1">Min</Typography>
            </Box>
        </Box> 
    )
}