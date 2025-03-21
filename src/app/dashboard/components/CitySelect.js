import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function CitySelect() {
    const fetchSearchResults = async (searchString) => {
        try {
          const res = await fetch('/api/fetch-cities', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ searchString }),
          });
          if (!res.ok) throw new Error('Error fetching cities');
          const data = await res.json();
          console.log(data);
          setResults(data);
        }
        catch (error) {
          console.error('Error fetching cities:', error);
          return [];
        }
        
      };
    
    const [loading, setLoading] = React.useState(true);
    const [results, setResults] = React.useState([]);
    const [query, setQuery] = React.useState("");

    React.useEffect(() => {
        setQuery("Ams");
        fetchSearchResults("Ams");
    }, []);

    return (
        <Autocomplete
            id="city-select"
            value={query}
            onChange={(event, newQuery) => {
                setQuery(newQuery);
            }}
            onInputChange={(event, newQuery) => {
                fetchSearchResults(newQuery);
            }}
            disableClearable
            sx={{ width: 200}}
            options={results}
            autoHighlight
            getOptionLabel={(option) => option.city || ""}
            renderOption={(props, option) => {
                const { city_filter_id, ...optionProps } = props;
                return (
                    <Box
                        key = {city_filter_id}
                        component="li"
                        {...optionProps}
                    >
                        {option.city}
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

// cities in the Netherlands
const cities = [
    { label: 'Amsterdam', city_filter_id: 'amsterdam' },
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