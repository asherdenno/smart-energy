import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { border } from '@mui/system';
import { NavbarContext } from '../context/NavbarContext';

export default function NetworkSelect() {
    const { network, setNetwork } = React.useContext(NavbarContext);

    const fetchSearchResults = async (searchString) => {
        try {
            setLoading(true);
            const res = await fetch('/api/fetch-networks', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (!res.ok) throw new Error('Error fetching networks');
          const data = await res.json();
          setResults(data);
          setLoading(false);
        }
        catch (error) {
          console.error('Error fetching networks:', error);
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
        <Autocomplete
            id="network-select"
            value={network}
            onChange={(event, newValue) => {
                setNetwork(newValue);
            }}
            onInputChange={(event, newQuery) => {
                fetchSearchResults(newQuery);
            }}
            disableClearable
            sx={{ width: 200}}
            options={results}
            autoHighlight
            getOptionLabel={(option) => option.net_manager || ""}
            renderOption={(props, option) => {
                const { network_filter_id, ...optionProps } = option;
                return (
                    <li {...props} key={network_filter_id}>
                        {loading ? 'Loading...' : option.net_manager}
                    </li>
                )
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    sx={{ border: '2px solid #757575', borderRadius: '5px', padding: '5px'}}
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
    );
}