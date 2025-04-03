import React, { createContext, useState, useEffect } from 'react';

export const NavbarContext = createContext();

export const CityProvider = ({ children }) => {
    const [filterString, setFilterString] = useState(() => {
    })
    const [filteredData, setFilteredData] = useState(() => {
    })
    const [accountType, setAccountType] = useState(() => {
    
    })
    const [city, setCity] = useState(() => {
        const storedCity = localStorage.getItem('city');
        return storedCity ? JSON.parse(storedCity) : null;
    })
    const [network, setNetwork] = useState(() => {
        const storedNetwork = localStorage.getItem('network');
        return storedNetwork ? JSON.parse(storedNetwork) : null;
    })

    useEffect(() => {
        if (city) {
            localStorage.setItem('city', JSON.stringify(city));
        }
    }, [city])

    useEffect(() => {
        if (network) {
            localStorage.setItem('network', JSON.stringify(network));
        }
    }, [network])

    return (
        <NavbarContext.Provider value={{ 
            city,
            setCity,
            network, 
            setNetwork
     }}>
            {children}
        </NavbarContext.Provider>
    );
};