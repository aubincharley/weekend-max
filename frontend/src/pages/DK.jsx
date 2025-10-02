import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import citiesData from '../assets/cities.json';
import Header from './components/Header';

export default function DK() {
  const [departure, setDeparture] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [communes, setCommunes] = useState([]);
  const [date, setDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Chargement des villes au montage
    if (citiesData && citiesData.cities) {
      setCommunes(citiesData.cities);
    }
  }, []);

  const handleSubmit = () => {
    if (departure && date && returnDate) {
      navigate('./trip', { 
        state: { 
          city: departure, 
          date: date, 
          returnDate: returnDate,
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* En-tête */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">🎲 Voyage Découverte</h1>
    
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
                    setIsSearching(true);
                  }}
                  onFocus={() => setIsSearching(true)}
                  className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 text-lg"
                />
                {isSearching && departure && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                    {communes
                      .filter(commune =>
                        commune.toLowerCase().includes(departure.toLowerCase())
                      )
                      .slice(0, 5)
                      .map((commune, index) => (
                        <div
                          key={index}
                          className="p-3 hover:bg-purple-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                          onClick={() => {
                            setDeparture(commune);
                            setIsSearching(false);
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
                  className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 text-lg"
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
                  className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 text-lg"
                />
              </div>
            </div>

            {/* Zone de surprise */}
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-6 text-center">
              <div className="text-2xl mb-2">🎁</div>
              <h3 className="text-lg font-semibold text-purple-800 mb-2">Mode Découverte Activé !</h3>
              <p className="text-purple-600 text-sm">
                Nous allons vous proposer les destinations liées à votre ville de départ.
              </p>
            </div>

            {/* Bouton de recherche */}
            <button
              onClick={handleSubmit}
              disabled={!departure || !date || !returnDate}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {!departure || !date || !returnDate 
                ? '⚠️ Veuillez remplir tous les champs' 
                : '🎲 Surprenez-moi avec des destinations !'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}