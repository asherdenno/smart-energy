import { Margin } from "@mui/icons-material";
import { Button, TableCell, TextField, Autocomplete } from "@mui/material";
import { styled } from "@mui/material/styles";

export const TbHeadCell = styled(TableCell)({
    fontSize: "20px",
    fontWeight: 600,
    padding: "10px 0 20px 0",
    textAlign: "left",
    boxSizing: "border-box",
    "&:last-child": {
        textAlign: "right",
    },
});

export const TbBodyCell = styled(TableCell)({
    padding: "10px 0",
    fontSize: "15px",
    textAlign: "left",
    boxSizing: "border-box",
    "&:last-child": {
        textAlign: "right",
    },
});

export const ClassicBtn = styled(Button)({
    size: "large",
    color: "black",
    backgroundColor: "white",
    border: "black 1px solid",
    borderRadius: "10px",
    padding: "2px 30px",
    textTransform: "none",
    minWidth: "fit-content",
    "&:hover": {
        backgroundColor: "#f0f0f0",
        border: "black 1px solid",
        color: "black",
    },
});

export const LargeBtn = styled(Button)({
    size: "medium",
    color: "black",
    backgroundColor: "white",
    border: "black 1px solid",
    borderRadius: "10px",
    padding: "6px 30px",
    fontSize: "14px",
    textTransform: "none",
    minWidth: "fit-content",
    "&:hover": {
        backgroundColor: "#f0f0f0",
        border: "black 1px solid",
        color: "black",
    },
});

export const InputBox = styled(TextField)({
    width: "100%",
    "& .MuiInputBase-input": {
        padding: "0 10px",
        fontSize: "15px",
        borderRadius: "10px",
        backgroundColor: "white",
        color: "#000000",
        outline: "none",
        transition: "background-color 0.1s, box-shadow 0.1s",
        height: "30px",
        boxShadow: "inset 0 0 0 1px #000000",
    },
    "& .MuiInputBase-input:focus, & .MuiInputBase-input:active, .MuiInputBase-input:hover": {
        outline: "none",
        backgroundColor: "#f0f0f0",
    },
    "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
    },
});

export const LargeInputBox = styled(InputBox)({
    "& .MuiInputBase-input": {
        padding: "0 12px",
        borderRadius: "12px",
        height: "40px",
    },
});
export const AutocompleteField = styled(Autocomplete)({
    width: "100%",
    '& .MuiAutocomplete-root': {
        padding: 0,
        margin: 0,
    },
    '& .MuiInputBase-root': {
        padding: "0px",
        margin: 0,
    },
    '& .MuiInputBase-input': {
        padding: "0px",
        height: '40px',
        fontSize: '15px',
        borderRadius: '10px',
        backgroundColor: 'white',
        color: "#000000",
        outline: "none",
        transition: "background-color 0.1s, box-shadow 0.1s",
        boxShadow: 'inset 0 0 0 1px #000000',
    },
    '& .MuiInputBase-input.MuiAutocomplete-input': {
        padding: "0px 12px"
    },
    '& .MuiInputBase-input:focus, & .MuiInputBase-input:active, & .MuiInputBase-input:hover': {
        outline: 'none',
        backgroundColor: '#f0f0f0',
    },
    '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
    },
    '& .MuiAutocomplete-endAdornment': {
        right: '8px',
    },
});