import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';

const getCityCoordinates = async (cityQuery) => {
    console.log("Fetching city coordinates for", cityQuery);
    try {
        const res = await fetch("https://nominatim.openstreetmap.org/search?city=" + cityQuery + "&format=json");
        if (!res.ok) throw new Error('Error fetching city coordinates');
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching city coordinates:', error);
        return [];
    }
}

const getZipcodeCoordinates = async (zipcodeQuery) => {
    console.log("Fetching zipcode coordinates for", zipcodeQuery);
    try {
        const res = await fetch("https://nominatim.openstreetmap.org/search?postalcode=" + zipcodeQuery + "&format=json");
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

        const heatLayer = L.heatLayer(data, { radius: 50 }).addTo(map);

        return () => {
            map.removeLayer(heatLayer);
        };
    }, [map, data]);

    return null;
};


const LeafletMap = () => {
    const [latitude, setLatitude] = useState(51.505);
    const [longitude, setLongitude] = useState(-0.09);
    const [heatmapData, setHeatmapData] = useState([
        [51.505, -0.09, 5.0], // [latitude, longitude, intensity]
        [51.51, -0.1, 0.4],
        [51.51, -0.12, 0.3],
    ]);

    useEffect(() => {
        getCityCoordinates("Birmingham").then((data) => {
            if (data.length > 0) {
                console.log("City coordinates:", data[0].lat, data[0].lon);
                setHeatmapData((prevData) => [
                    ...prevData,
                    [data[0].lat, data[0].lon, 1000.00], // Add new coordinate with intensity
                ]);
            } else {
                console.log("City not found");
            }
        });
    }, []);

    useEffect(() => {
        zipcodesList.forEach((zipcode) => {
            getZipcodeCoordinates(zipcode).then((data)=> {
                if (data.length > 0) {
                    console.log("Zipcode coordinates:", data[0].lat, data[0].lon);
                    setHeatmapData((prevData) => [
                        ...prevData,
                        [data[0].lat, data[0].lon, 10.00], // Add new coordinate with intensity
                    ]);
                } else {
                    console.log("Zipcode not found");
                }
            });
        });
    }, []);

    return (
        <MapContainer center={[latitude, longitude]} zoom={13} style={{ height: '400px', width: '600px' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <HeatmapLayer data={heatmapData} />
        </MapContainer>
    );
};

const zipcodesList = [
    { zipcode: "7468CP" }];

export default LeafletMap;