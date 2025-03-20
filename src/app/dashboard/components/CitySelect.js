import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function CitySelect() {
    return (
        <Autocomplete
            id="city-select"
            disableClearable
            sx={{ width: 200}}
            options={cities}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => {
                const { key, ...optionProps } = props;
                return (
                    <Box
                        key = {key}
                        component="li"
                        {...optionProps}
                    >
                        {option.label}
                    </Box>
                );
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="standard"
                    InputProps={{
                        ...params.InputProps,
                        disableUnderline: true,
                        sx: { fontSize: '1.4rem'},
                    }}
                    slotProps={{
                        htmlInput: {
                        ...params.inputProps,
                        autoComplete: 'new-password',
                    },
                    }}
                />
            )}
            />
    );
}

// cities in the netherlands
// cities in the Netherlands
const cities = [
    { label: 'Amsterdam', key: 'amsterdam' },
    { label: 'Rotterdam', key: 'rotterdam' },
    { label: 'Enter', key: 'enter' },
    { label: 'Utrecht', key: 'utrecht' },
    { label: 'The Hague', key: 'the_hague' },
    { label: 'Eindhoven', key: 'eindhoven' },
    { label: 'Groningen', key: 'groningen' },
    { label: 'Maastricht', key: 'maastricht' },
    { label: 'Tilburg', key: 'tilburg' },
    { label: 'Nijmegen', key: 'nijmegen' },
    { label: 'Leiden', key: 'leiden' },
    { label: 'Delft', key: 'delft' },
    { label: 'Almere', key: 'almere' },
    { label: 'Arnhem', key: 'arnhem' },
    { label: 'Breda', key: 'breda' },
    { label: 'Zwolle', key: 'zwolle' },
    { label: 'Amersfoort', key: 'amersfoort' },
    { label: 'Apeldoorn', key: 'apeldoorn' },
    { label: 'Haarlem', key: 'haarlem' },
    { label: 'Den Bosch', key: 'den_bosch' }
  ];