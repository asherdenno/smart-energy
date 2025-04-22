import React, { createContext, useState, useEffect } from 'react';
export const NavbarContext = createContext();

export const FilterString = " d.city = 'ENTER'";
export const CityProvider = ({ children }) => {
    // const [filterString, setFilterString] = useState(() => {
    // })
    const resetGraphData = () => {
        console.log("Resetting graph data");
        setAnnualEnergyData(null);
    }

    const resetDetails = () => {
        console.log("Resetting details");
        setAnnualEnergyData(null);
        setAccount(null);
        setCity(null);
        setNetwork(null);
        localStorage.removeItem('annualEnergyData');
        localStorage.removeItem('account');
        localStorage.removeItem('city');
        localStorage.removeItem('network');
    }

    const [reloadFlag, setReloadFlag] = useState(false);
    const [annualEnergyData, setAnnualEnergyData] = useState(null);
    const [account, setAccount] = useState(null);
    const [city, setCity] = useState(null);
    const [network, setNetwork] = useState(null);
    const [isLocalStorageLoaded, setIsLocalStorageLoaded] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedAnnualEnergyData = localStorage.getItem('annualEnergyData');
            const storedAccount = localStorage.getItem('account');
            const storedCity = localStorage.getItem('city');
            const storedNetwork = localStorage.getItem('network');

            setAnnualEnergyData(storedAnnualEnergyData ? JSON.parse(storedAnnualEnergyData) : null);
            setAccount(storedAccount ? JSON.parse(storedAccount) : null);
            setCity(storedCity ? JSON.parse(storedCity) : null);
            setNetwork(storedNetwork ? JSON.parse(storedNetwork) : null);

            setIsLocalStorageLoaded(true);
        }
    }, []);

    useEffect(() => {
        console.log("Update to annualEnergyData: ", annualEnergyData);
        if (annualEnergyData) {
            localStorage.setItem('annualEnergyData', JSON.stringify(annualEnergyData));
        } else {
            localStorage.removeItem('annualEnergyData');
        }
    }, [annualEnergyData])
    useEffect(() => {
        if (account) {
            localStorage.setItem('account', JSON.stringify(account));
        }
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
            reloadFlag,
            setReloadFlag,
            resetGraphData,
            resetDetails,
            annualEnergyData,
            setAnnualEnergyData,
            account,
            setAccount,
            city,
            setCity,
            network, 
            setNetwork,
     }}>
            {children}
        </NavbarContext.Provider>
    );
};