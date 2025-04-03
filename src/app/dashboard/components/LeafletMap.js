import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, useMap, Polygon } from 'react-leaflet';
import { Button } from '@mui/material';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';
import { NavbarContext } from '../context/NavbarContext';

const getZipcodeCoordinates = async (zipcodeQuery) => {
    console.log("Fetching zipcode coordinates for", zipcodeQuery);
    try {
        const res = await fetch("http://localhost:8080/search.php?postalcode=" + zipcodeQuery);
        if (!res.ok) throw new Error('Error fetching zipcode coordinates');
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching zipcode coordinates:', error);
        return [];
    }
}

const HeatmapLayer = ({ data }) => {

    const map = useMap();

    useEffect(() => {
        if (!map) return;

        const heatLayer = L.heatLayer(data, { radius: 80, blur: 40 }).addTo(map);

        return () => {
            map.removeLayer(heatLayer);
        };
    }, [map, data]);

    return null;
};

const PanToPoint = ({ latitude, longitude }) => {
    const map = useMap();

    useEffect(() => {
        if (latitude && longitude) {
            map.panTo([latitude, longitude]); // Pan the map to the new point
            console.log(`Map panned to: Latitude ${latitude}, Longitude ${longitude}`);
        }
    }, [latitude, longitude, map]);

    return null;
};

const LeafletMap = () => {
    const fetchElectricityUsagePerZipcode = async (city) => {
        try {
            setDataLoading(true);
            setMapLoading(true);
            const res = await fetch('/api/fetch-electricity-usage-per-zipcode', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ city }),
          });
          if (!res.ok) throw new Error('Error fetching zipcodes');
          const data = await res.json();
          setZipcodeData(data);
          return data;
        }
        catch (error) {
          console.error('Error fetching zipcodes:', error);
          return [];
        }
    };

    const { city } = React.useContext(NavbarContext);
    const [zipcodeData, setZipcodeData] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);
    const [mapLoading, setMapLoading] = useState(true);
    const [latitude, setLatitude] = useState(52.23354766666667);
    const [longitude, setLongitude] = useState(6.592717727777778);
    const [heatmapData, setHeatmapData] = useState([]);
    const [hasFetched, setHasFetched] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchElectricityUsagePerZipcode(city.city);
                setZipcodeData(data);
                setDataLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setDataLoading(false);
            }

        };
        
        fetchData(); // Call the async function
    }, [city]);

    useEffect(() => {
        if (zipcodeData.length === 0) return; // Avoid running if no data
        setHasFetched(true);
        const processZipcodeData = async () => {
            const intensityMultiplier = 0.2 / (zipcodeData[0].annual_consume || 1);
            console.log("Intensity multiplier:", intensityMultiplier);
            let firstLat = null;
            let firstLon = null;
    
            for (const zipcode of zipcodeData) {
                try {
                    const data = await getZipcodeCoordinates(zipcode.zipcode_from); // Wait for coordinates
                    if (data.length > 0) {
                        const { lat, lon } = data[0]; // Extract latitude and longitude
    
                        // Set the first valid latitude and longitude
                        if (firstLat === null && firstLon === null) {
                            firstLat = lat;
                            firstLon = lon;
                        }
    
                        // Add the new heatmap point
                        setHeatmapData((prevData) => [
                            ...prevData,
                            [lat, lon, (zipcode.annual_consume || 1) * intensityMultiplier], // Add new coordinate with intensity
                        ]);
                    } else {
                        console.log("Zipcode not found:", zipcode.zipcode_from);
                    }
                } catch (error) {
                    console.error("Error fetching coordinates for zipcode:", zipcode.zipcode_from, error);
                }
            }
    
            // Update the map's center to the first valid latitude and longitude
            if (firstLat !== null && firstLon !== null) {
                setLatitude(firstLat);
                setLongitude(firstLon);
            }
    
            setMapLoading(false);
        };
    
        processZipcodeData();
    }, [zipcodeData]);

    if (!hasFetched) {
        return <div
        style={{
            fontSize: '20px',
            fontWeight: 'bold'
        }}
        >Please select a location from the dropdown</div>
    }
    if (dataLoading) {
        return <div
        stlye={{
            fontSize: '20px',
            fontWeight: 'bold'
        }}
        >Data is Loading...</div>
    } 
    else if (mapLoading) {
        return <div 
        style={{
            height: '400px',
            width: '600px',
            backgroundColor: '#f0f0f0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '20px',
            color: '#757575',
            fontWeight: 'bold',
            padding: '10px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        }}
        >Map is Loading...</div>
    } {
        return (
            <MapContainer center={[latitude, longitude]} zoom={13} style={{ height: '400px', width: '600px' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"                    />
                    <HeatmapLayer data={heatmapData} />
                <PanToPoint latitude={latitude} longitude={longitude} />
            </MapContainer>
        );
    }
};

export default LeafletMap;