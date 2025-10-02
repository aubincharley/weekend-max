import Header from "./components/Header";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import { useState, useEffect } from "react";

export default function DKTrip() {
    const [allTrips, setAllTrips] = useState([]);
    const [loadingSelected, setLoadingSelected] = useState(true);
    const [error, setError] = useState(null);
    const [availableCities, setAvailableCities] = useState([]);
    
    const location = useLocation();
    const navigate = useNavigate();
    const { city, date, returnDate } = location.state || { 
        city: "", 
        date: "", 
        returnDate: "", 
    };

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                setLoadingSelected(true);
                setError(null);
                
                const formattedCity = encodeURIComponent(city);
                
                const [outboundResponse] = await Promise.all([
                    axios.get(`https://ressources.data.sncf.com/api/explore/v2.1/catalog/datasets/tgvmax/records?select=*&where=date%20%3D%20date%27${date}%27%20AND%20origine%20%3D%20%22${formattedCity}%22&limit=99&refine=od_happy_card%3A%22OUI%22`),
                ]);
                
                setAllTrips(outboundResponse.data);

                // Extraire les villes de destination uniques
                const citiesSet = new Set();
                if (outboundResponse.data.results) {
                    outboundResponse.data.results.forEach(trip => {
                        if (trip.destination && trip.destination.trim()) {
                            citiesSet.add(trip.destination.trim());
                        }
                    });
                }
                setAvailableCities(Array.from(citiesSet).sort());

            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Erreur lors du chargement des destinations. Veuillez réessayer.");
            } finally {
                setLoadingSelected(false);
            }
        };

        if (city && date && returnDate) {
            fetchTrips();
        } else {
            setLoadingSelected(false);
            setError("Informations de voyage manquantes.");
        }
    }, [city, date, returnDate]);

    const handleCitySelection = (destination) => {
        // Rediriger vers Trip.jsx avec les bonnes données
        navigate('/ak/trip', { 
            state: { 
                city: city,
                destination: destination,
                date: date, 
                returnDate: returnDate 
            } 
        });
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

    if (loadingSelected) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
                <Header />
                <div className="container mx-auto px-4 py-16">
                    <div className="flex items-center justify-center">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
                            <p className="text-xl text-gray-600">Découverte des destinations surprises...</p>
                            <p className="text-sm text-gray-500 mt-2">Nous cherchons les meilleures options pour vous</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
                <Header />
                <div className="container mx-auto px-4 py-16">
                    <div className="max-w-md mx-auto text-center">
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                            <p className="font-medium">Oops ! Une erreur s'est produite</p>
                            <p className="text-sm mt-1">{error}</p>
                        </div>
                        <button 
                            onClick={() => navigate(-1)}
                            className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                        >
                            Retour
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
            <Header />
            
            <div className="container mx-auto px-4 py-8">
                {/* En-tête */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        🎲 Destinations Surprise depuis {city}
                    </h1>
                    <p className="text-lg text-gray-600 mb-6">
                        Voici toutes les destinations possibles pour votre voyage du {formatDate(date)} au {formatDate(returnDate)}
                    </p>
                </div>

                {/* Liste des destinations */}
                {availableCities.length > 0 ? (
                    <div className="max-w-4xl mx-auto">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {availableCities.map((destination, index) => {
                                // Compter le nombre de trains pour cette destination
                                const trainCount = allTrips.results?.filter(trip => trip.destination === destination).length || 0;
                                
                                return (
                                    <div
                                        key={index}
                                        onClick={() => handleCitySelection(destination)}
                                        className="group cursor-pointer bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-200 overflow-hidden transform transition-all duration-300 hover:scale-105 hover:border-purple-300"
                                    >
                                        <div className="p-6">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex-1">
                                                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                                                        📍 {destination}
                                                    </h3>
                                                    <p className="text-gray-600 text-sm">
                                                        {trainCount} train{trainCount > 1 ? 's' : ''} disponible{trainCount > 1 ? 's' : ''}
                                                    </p>
                                                </div>
                                                <div className="bg-purple-100 text-purple-600 p-2 rounded-full group-hover:bg-purple-200 transition-colors">
                                                    🚆
                                                </div>
                                            </div>
                                            
                                            <div className="space-y-2 mb-4">
                                                <div className="flex items-center text-sm text-gray-500">
                                                    <span className="mr-2">🚀</span>
                                                    Départ de {city}
                                                </div>
                                                <div className="flex items-center text-sm text-gray-500">
                                                    <span className="mr-2">📅</span>
                                                    {formatDate(date)}
                                                </div>
                                            </div>
                                            
                                            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center py-3 px-4 rounded-lg font-medium group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-200">
                                                Choisir cette destination →
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="bg-white rounded-xl shadow-lg p-12">
                            <div className="text-6xl mb-6">😔</div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                Aucune destination trouvée
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Malheureusement, aucun train TGV MAX n'est disponible depuis {city} 
                                pour la date du {formatDate(date)}.
                            </p>
                            <div className="space-y-4">
                                <p className="text-sm text-gray-500">Suggestions :</p>
                                <div className="grid gap-2 text-sm text-gray-600">
                                    <div>• Essayez une autre date de départ</div>
                                    <div>• Vérifiez une ville de départ différente</div>
                                    <div>• Consultez les horaires quelques jours plus tard</div>
                                </div>
                            </div>
                            <button 
                                onClick={() => navigate(-1)}
                                className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                            >
                                ← Modifier ma recherche
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
