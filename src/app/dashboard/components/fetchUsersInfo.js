import * as React from 'react';

const cities = [];
const networks = [];

export const GetUnassignedCities = () => {
    const getUnassignedCities = async () => {
        try {
            const res = await fetch('/api/fetch-cities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) throw new Error('Error fetching cities');

            const data = await res.json();
            return data;
        } catch (error) {
            console.error('Error fetching cities:', error);
            return NULL;
        }
    };

    return getUnassignedCities;
}

export const GetUnassignedNetworks = () => {
    const [loading, setLoading] = React.useState(true);
    const [results, setResults] = React.useState([]);
    const [query, setQuery] = React.useState("");
    const { city, setCity } = React.useContext(CityContext);

    const getUnassignedNetworks = async () => {
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
            return NULL;
        }

    };

    return getUnassignedNetworks();
}
export const GetUserFilters = async () => {
    const fetchUserFilters = async () => {
        const response = await fetch('/api/fetch-users-filter-id', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    
        if (!response.ok) {
            throw new Error('Failed to fetch user filters');
        }
    
        const data = await response.json();
        console.log(data);
    };

    return await fetchUserFilters();
}