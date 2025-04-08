import React, { createContext, useState, useEffect } from 'react';
export const NavbarContext = createContext();

export const CityProvider = ({ children }) => {
    // const [filterString, setFilterString] = useState(() => {
    // })
    const [energyUsagePercent, setEnergyUsagePercent] = useState(() => {
        const storedEnergyUsagePercent = localStorage.getItem('energyUsagePercent');
        return storedEnergyUsagePercent ? JSON.parse(storedEnergyUsagePercent) : null;
    })
    const [annualEnergyData, setAnnualEnergyData] = useState(() => {
        const storedAnnualEnergyData = localStorage.getItem('annualEnergyData');
        return storedAnnualEnergyData ? JSON.parse(storedAnnualEnergyData) : null;
    })
    const [account, setAccount] = useState(() => {
        const storedAccount = localStorage.getItem('account');
        return storedAccount ? JSON.parse(storedAccount) : null;
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
        if (energyUsagePercent) {
            localStorage.setItem('energyUsagePercent', JSON.stringify(energyUsagePercent));
        }
    }, [energyUsagePercent])
    useEffect(() => {
        if (annualEnergyData) {
            localStorage.setItem('annualEnergyData', JSON.stringify(annualEnergyData));
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
            energyUsagePercent,
            setEnergyUsagePercent,
            annualEnergyData,
            setAnnualEnergyData,
            account,
            setAccount,
            city,
            setCity,
            network, 
            setNetwork
     }}>
            {children}
        </NavbarContext.Provider>
    );
};