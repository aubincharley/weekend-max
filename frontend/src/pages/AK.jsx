import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import citiesData from '../assets/cities.json';
import Header from './components/Header';
import axios from 'axios';

export default function AK() {
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [isDepartureSearching, setIsDepartureSearching] = useState(false);
  const [isDestinationSearching, setIsDestinationSearching] = useState(false);
  const [communes, setCommunes] = useState([]);
  const [date, setDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const tripLength = returnDate && date ? (new Date(returnDate) - new Date(date)) / (1000 * 60 * 60 * 24) : 0;
    axios.post('http://localhost:8000/api/logs/', { 
      leaving_city: departure,
      destination_city: destination,
      trip_length: tripLength,
    })
    .then(response => {
      console.log("Log entry created:", response.data);
    })
    .catch(error => {
      console.error("Error creating log entry:", error);
    });
  }, []);

  useEffect(() => {
    // Chargement des villes au montage
    if (citiesData && citiesData.cities) {
      setCommunes(citiesData.cities);
    }
  }, []);

  const handleSubmit = () => {
    if (departure && destination && date && returnDate) {
      navigate('./trip', { 
        state: { 
          city: departure, 
          destination: destination,
          date: date, 
          returnDate: returnDate 
        } 
      });
    }
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getMinReturnDate = () => {
    if (!date) return getMinDate();
    const departureDate = new Date(date);
    departureDate.setDate(departureDate.getDate() + 1);
    return departureDate.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* En-tête */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">🎯 Voyage Ciblé</h1>
            <p className="text-lg text-gray-600">Planifiez votre voyage avec une destination précise</p>
          </div>

          {/* Formulaire */}
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            {/* Ville de départ */}
            <div className="space-y-2">
              <label className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                🚀 D'où partez-vous ?
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tapez votre ville de départ..."
                  value={departure}
                  onChange={e => {
                    setDeparture(e.target.value);
                    setIsDepartureSearching(true);
                  }}
                  onFocus={() => setIsDepartureSearching(true)}
                  className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-lg"
                />
                {isDepartureSearching && departure && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                    {communes
                      .filter(commune =>
                        commune.toLowerCase().includes(departure.toLowerCase())
                      )
                      .slice(0, 5)
                      .map((commune, index) => (
                        <div
                          key={index}
                          className="p-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                          onClick={() => {
                            setDeparture(commune);
                            setIsDepartureSearching(false);
                          }}
                        >
                          📍 {commune}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>

            {/* Destination */}
            <div className="space-y-2">
              <label className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                🎯 Où souhaitez-vous aller ?
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tapez votre destination..."
                  value={destination}
                  onChange={e => {
                    setDestination(e.target.value);
                    setIsDestinationSearching(true);
                  }}
                  onFocus={() => setIsDestinationSearching(true)}
                  className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-lg"
                />
                {isDestinationSearching && destination && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                    {communes
                      .filter(commune =>
                        commune.toLowerCase().includes(destination.toLowerCase())
                      )
                      .slice(0, 5)
                      .map((commune, index) => (
                        <div
                          key={index}
                          className="p-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                          onClick={() => {
                            setDestination(commune);
                            setIsDestinationSearching(false);
                          }}
                        >
                          📍 {commune}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>

            {/* Dates */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                  📅 Date de départ
                </label>
                <input
                  type="date"
                  value={date}
                  min={getMinDate()}
                  onChange={e => setDate(e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-lg"
                />
              </div>

              <div className="space-y-2">
                <label className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                  🔄 Date de retour
                </label>
                <input
                  type="date"
                  value={returnDate}
                  min={getMinReturnDate()}
                  onChange={e => setReturnDate(e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-lg"
                />
              </div>
            </div>

            {/* Bouton de recherche */}
            <button
              onClick={handleSubmit}
              disabled={!departure || !destination || !date || !returnDate}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {!departure || !destination || !date || !returnDate 
                ? '⚠️ Veuillez remplir tous les champs' 
                : '🔍 Rechercher mon voyage'}
            </button>
          </div>

          {/* Conseils */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-800 mb-2">💡 Conseils pour votre recherche :</h3>
            <ul className="text-blue-700 space-y-1 text-sm">
              <li>• Choisissez une date de départ à partir d'aujourd'hui</li>
              <li>• La date de retour doit être après le départ</li>
              <li>• Utilisez l'autocomplétion pour trouver votre ville facilement</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

