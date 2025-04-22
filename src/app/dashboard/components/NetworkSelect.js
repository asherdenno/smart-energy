import * as React from 'react';
import { Button, Box, Skeleton } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { border } from '@mui/system';
import { NavbarContext } from '../context/NavbarContext';

export default function NetworkSelect() {
    const { network, setNetwork, account } = React.useContext(NavbarContext);

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
    
    const [searchString, setSearchString] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [results, setResults] = React.useState([]);
    const [query, setQuery] = React.useState("");

    React.useEffect(() => {
        fetchSearchResults("");
        setSearchString(network || "");
    }, []);

    const handleButtonClick = () => {
        setNetwork(searchString);
        console.log("Network selected", searchString)
    }


    if (!account) {
        return null;
            
    } else if (account.account_type_id === 2 || account.account_type_id === 1) {
        return null;
    }
    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: "0px" }}>
            <Autocomplete
                id="network-select"
                value={network}
                onChange={(event, newValue) => {
                    setSearchString(newValue);
                }}
                onInputChange={(event, newQuery) => {
                    fetchSearchResults(newQuery);
                }}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        event.preventDefault();
                        handleButtonClick();
                    }
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
                        sx={{ 
                            border: '2px solid #757575',
                            borderRadius: '5px 0px 0px 5px',
                            padding: '5px',
                            borderColor: (searchString == network) ? "#757575" : "#CCAA00",
                            transition: "border-color 0.3s ease-in-out",
                        }}
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
                    disabled={(searchString == network) ? true : false}
                    onClick={handleButtonClick}
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