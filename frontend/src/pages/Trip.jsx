import Header from "./components/Header";
import { useLocation } from "react-router";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Trip() {
    const [selectedTrips, setSelectedTrips] = useState([]);
    const [returnTrips, setReturnTrips] = useState([]);
    const [loadingSelected, setLoadingSelected] = useState(true);
    const [error, setError] = useState(null);
    
    const location = useLocation();
    const { city, date, returnDate, destination } = location.state || { 
        city: "", 
        date: "", 
        returnDate: "", 
        destination: "" 
    };

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                setLoadingSelected(true);
                setError(null);
                
                const formattedCity = encodeURIComponent(city);
                const formattedDest = encodeURIComponent(destination);
                
                const [outboundResponse, returnResponse] = await Promise.all([
                    axios.get(`https://ressources.data.sncf.com/api/explore/v2.1/catalog/datasets/tgvmax/records?select=*&where=date%20%3D%20date%27${date}%27%20AND%20origine%20%3D%20%22${formattedCity}%22%20AND%20destination%3D%22${formattedDest}%22&limit=99&refine=od_happy_card%3A%22OUI%22`),
                    axios.get(`https://ressources.data.sncf.com/api/explore/v2.1/catalog/datasets/tgvmax/records?select=*&where=date%20%3D%20date%27${returnDate}%27%20AND%20origine%20%3D%20%22${formattedDest}%22%20AND%20destination%3D%22${formattedCity}%22&limit=99&refine=od_happy_card%3A%22OUI%22`)
                ]);
                
                setSelectedTrips(outboundResponse.data);
                setReturnTrips(returnResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Erreur lors du chargement des trains. Veuillez réessayer.");
            } finally {
                setLoadingSelected(false);
            }
        };

        if (city && destination && date && returnDate) {
            fetchTrips();
        } else {
            setLoadingSelected(false);
            setError("Informations de voyage manquantes.");
        }
    }, [city, destination, date, returnDate]);

    const formatTime = (timeString) => {
        if (!timeString) return "N/A";
        return timeString.substring(0, 5); // Garde seulement HH:MM
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
        });
    };

    const TrainCard = ({ train, isReturn = false }) => (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${isReturn ? 'bg-purple-500' : 'bg-blue-500'}`}></div>
                    <span className="font-semibold text-gray-800">Train {train.train_no}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isReturn ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                }`}>
                    TGV MAX
                </span>
            </div>
            
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <span className="text-2xl">🚆</span>
                        <div>
                            <p className="font-medium text-gray-800">{train.origine}</p>
                            <p className="text-sm text-gray-500">Départ</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-xl font-bold text-gray-800">{formatTime(train.heure_depart)}</p>
                        <p className="text-sm text-gray-500">{formatDate(train.date)}</p>
                    </div>
                </div>
                
                <div className="flex items-center justify-center py-2">
                    <div className={`h-0.5 flex-1 ${isReturn ? 'bg-purple-300' : 'bg-blue-300'}`}></div>
                    <span className="px-3 text-gray-400 text-sm">→</span>
                    <div className={`h-0.5 flex-1 ${isReturn ? 'bg-purple-300' : 'bg-blue-300'}`}></div>
                </div>
                
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <span className="text-2xl">🏁</span>
                        <div>
                            <p className="font-medium text-gray-800">{train.destination}</p>
                            <p className="text-sm text-gray-500">Arrivée</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-xl font-bold text-gray-800">{formatTime(train.heure_arrivee) || "N/A"}</p>
                        <p className="text-sm text-gray-500">Estimée</p>
                    </div>
                </div>
            </div>
        </div>
    );

    if (loadingSelected) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
                <Header />
                <div className="container mx-auto px-4 py-16">
                    <div className="flex items-center justify-center">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                            <p className="text-xl text-gray-600">Recherche des meilleurs trains...</p>
                            <p className="text-sm text-gray-500 mt-2">Cela peut prendre quelques instants</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
                <Header />
                <div className="container mx-auto px-4 py-16">
                    <div className="max-w-md mx-auto text-center">
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                            <p className="font-medium">Oops ! Une erreur s'est produite</p>
                            <p className="text-sm mt-1">{error}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <Header />
            
            <div className="container mx-auto px-4 py-8">
                {/* En-tête du voyage */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                        Votre voyage {city} ↔ {destination}
                    </h1>
                    <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                            <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                            <span>Aller le {formatDate(date)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
                            <span>Retour le {formatDate(returnDate)}</span>
                        </div>
                    </div>
                </div>

                {/* Layout à deux colonnes */}
                <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
                    {/* Colonne de gauche - Trains Aller */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
                                <span className="mr-3">🚀</span>
                                Trains Aller
                            </h2>
                            <p className="text-gray-600 mb-4">
                                {city} → {destination} • {formatDate(date)}
                            </p>
                            <div className="text-sm text-gray-500">
                                {selectedTrips.results?.length || 0} train(s) disponible(s)
                            </div>
                        </div>

                        <div className="space-y-4">
                            {selectedTrips.results && selectedTrips.results.length > 0 ? (
                                selectedTrips.results
                                    .filter(trip => trip.destination === destination)
                                    .map((train, index) => (
                                        <TrainCard key={`outbound-${index}`} train={train} isReturn={false} />
                                    ))
                            ) : (
                                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                                    <div className="text-4xl mb-4">😔</div>
                                    <h3 className="text-lg font-medium text-gray-800 mb-2">Aucun train trouvé</h3>
                                    <p className="text-gray-600">
                                        Aucun train TGV MAX disponible pour cette route et cette date.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Colonne de droite - Trains Retour */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-purple-500">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
                                <span className="mr-3">🔄</span>
                                Trains Retour
                            </h2>
                            <p className="text-gray-600 mb-4">
                                {destination} → {city} • {formatDate(returnDate)}
                            </p>
                            <div className="text-sm text-gray-500">
                                {returnTrips.results?.length || 0} train(s) disponible(s)
                            </div>
                        </div>

                        <div className="space-y-4">
                            {returnTrips.results && returnTrips.results.length > 0 ? (
                                returnTrips.results
                                    .filter(trip => trip.origine === destination)
                                    .map((train, index) => (
                                        <TrainCard key={`return-${index}`} train={train} isReturn={true} />
                                    ))
                            ) : (
                                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                                    <div className="text-4xl mb-4">😔</div>
                                    <h3 className="text-lg font-medium text-gray-800 mb-2">Aucun train trouvé</h3>
                                    <p className="text-gray-600">
                                        Aucun train TGV MAX disponible pour cette route et cette date.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}