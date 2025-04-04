import * as React from 'react';
import { Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { NavbarContext } from '../context/NavbarContext';

export default function CitySelect() {
    const { searchString, setSearchString } = React.useState(null);
    const { city, setCity } = React.useContext(NavbarContext);

    const fetchSearchResults = async (searchString) => {
        try {
            setLoading(true);
            const res = await fetch('/api/fetch-cities', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ searchString }),
          });
          if (!res.ok) throw new Error('Error fetching cities');
          const data = await res.json();
          setResults(data);
          setLoading(false);
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
        fetchSearchResults("");
    }, []);

    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: "0px" }}>
            <Autocomplete
                id="city-select"
                value={searchString}
                onChange={(event, newValue) => {
                    setSearchString(newValue);
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
                    const { city_filter_id, ...optionProps } = option;
                    return (
                        <li {...props} key={city_filter_id}>
                            {loading ? 'Loading...' : option.city}
                        </li>
                    )
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        sx={{ border: '2px solid #757575', borderRadius: '5px 0px 0px 5px', padding: '5px'}}
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
                        }
                        }}

                    />
                )}
                />
                <Button
                onClick={() => {
                    setCity(searchString);
                }}
                variant="contained"
                sx={{
                    width: 100,
                    height: "55px", 
                    backgroundColor: "#555555",
                    borderRadius: "0px 5px 5px 0px",
                }}
                >Go!</Button>
            </Box>
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