
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';

export default function Homepage() {
  const [selectedMode, setSelectedMode] = useState(null);
  const navigate = useNavigate();

  const handleModeSelection = (mode) => {
    if (mode === 'targeted') {
      navigate('/ak');
    } else if (mode === 'discovery') {
      navigate('/dk');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">weekend parfait</span> vous attend
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Découvrez des destinations incroyables pour vos escapades spontanées. 
            Que vous ayez une idée précise ou envie de vous laisser surprendre, nous avons ce qu'il vous faut !
          </p>
        </div>

        {/* Mode Selection Cards */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 mb-16">
          {/* Mode Voyage Ciblé */}
          <div 
            className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
            onClick={() => handleModeSelection('targeted')}
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-transparent group-hover:border-blue-400 transition-all duration-300">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-8 text-white text-center">
                <div className="text-6xl mb-4">🎯</div>
                <h2 className="text-2xl font-bold mb-2">Voyage Ciblé</h2>
                <p className="text-blue-100">Je sais où je veux aller</p>
              </div>
              <div className="p-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">Choisissez votre destination</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">Planifiez vos dates précises</span>
                  </div>
                </div>
                <button className="w-full mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200">
                  Commencer ma recherche →
                </button>
              </div>
            </div>
          </div>

          {/* Mode Voyage Surprise */}
          <div 
            className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
            onClick={() => handleModeSelection('discovery')}
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-transparent group-hover:border-purple-400 transition-all duration-300">
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-8 text-white text-center">
                <div className="text-6xl mb-4">🎲</div>
                <h2 className="text-2xl font-bold mb-2">Voyage Surprise</h2>
                <p className="text-purple-100">Laissez-moi vous surprendre</p>
              </div>
              <div className="p-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700">Choisissez votre départ</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700">Planifiez vos dates précises</span>
                  </div>
                </div>
                <button className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-700 transition-all duration-200">
                  Surprenez-moi ! →
                </button>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
}

