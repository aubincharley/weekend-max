import Header from "./components/Header";
import { useLocation } from "react-router";
import axios from "axios";
import { useState, useEffect, use } from "react";




export default function Trip() {
    const [trips,setTrips] = useState([]);
    const location = useLocation();
    const { city, date,returnDate,selectedCity } = location.state || { city: "" ,date:"", returnDate: "", selectedCity: ""};
    const [selectedTrips, setSelectedTrips] = useState([]);
    const [returnTrips, setReturnTrips] = useState([]);
    const [loadingSelected, setLoadingSelected] = useState(false);

    useEffect(() => {
        
        const formattedCity = city.replace(/ /g, '%20');
        const formattedDest = selectedCity.replace(/ /g, '%20');
        Promise.all([axios.get(`https://ressources.data.sncf.com/api/explore/v2.1/catalog/datasets/tgvmax/records?select=*&where=date%20%3D%20date%27${date}%27%20AND%20origine%20%3D%20%22${formattedCity}%22%20AND%20destination%3D%22${formattedDest}%22&limit=99&refine=od_happy_card%3A%22OUI%22`),
        axios.get(`https://ressources.data.sncf.com/api/explore/v2.1/catalog/datasets/tgvmax/records?select=*&where=date%20%3D%20date%27${returnDate}%27%20AND%20origine%20%3D%20%22${formattedDest}%22%20AND%20destination%3D%22${formattedCity}%22&limit=99&refine=od_happy_card%3A%22OUI%22`)])
        .then(
            ([outboundResponse, returnResponse])  => {
                setSelectedTrips(outboundResponse.data);
                setReturnTrips(returnResponse.data);
                setLoadingSelected(false);
                console.log(returnTrips)

            }
        ).catch(error => {console.log("Error fetching data :", error)})
    }, []);
    
    console.log(trips);

    const reachedCities = trips.results ? [...new Set(trips.results.map(trip => trip.destination))] : [];
    

    return (
        loading ? <p>Loading trips...</p> : (
        <div>
            <Header/>
                    <h2 className="text-xl font-bold mb-4">Voyages vers {selectedCity}</h2>
                        
                        <ul>
                            { selectedCity ? (selectedTrips.results
                                .filter(trip => trip.destination === selectedCity)
                                .map((train, index) => (
                                    <li key={index} style={{ marginBottom: '1rem' }}>
                                        <strong>Date:</strong> {train.date} <br />
                                        <strong>Train No:</strong> {train.train_no} <br />
                                        <strong>Origine:</strong> {train.origine} <br />
                                        <strong>Destination:</strong> {train.destination} <br />
                                        <strong>Heure départ:</strong> {train.heure_depart} <br />
                                    </li>
                                ))) : <p>Sélectionnez une destination pour voir les voyages disponibles.</p>}

                        </ul>

                    <h2 className="text-xl font-bold mb-4">Retours de {selectedCity}</h2>
                    <ul>
                            { selectedCity ? (returnTrips.results
                                .filter(trip => trip.origine === selectedCity)
                                .map((train, index) => (
                                    <li key={index} style={{ marginBottom: '1rem' }}>
                                        <strong>Date:</strong> {train.date} <br />
                                        <strong>Train No:</strong> {train.train_no} <br />
                                        <strong>Origine:</strong> {train.origine} <br />
                                        <strong>Destination:</strong> {train.destination} <br />
                                        <strong>Heure départ:</strong> {train.heure_depart} <br />
                                    </li>
                                ))) : <p>Sélectionnez une destination pour voir les voyages disponibles.</p>}
                        </ul>
                </div>)
    );
}