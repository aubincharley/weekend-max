
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import SEOHead from '../components/SEOHead';

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
    <>
      <SEOHead 
        title="Weekend Max - Voyages TGV MAX de Dernière Minute | Escapades Spontanées"
        description="Trouvez et réservez vos voyages TGV MAX de dernière minute en France avec Weekend Max. Voyages ciblés ou surprises, partez à la découverte de nouvelles destinations pour vos weekends spontanés."
        keywords="weekend dernière minute, TGV MAX, voyage spontané, escapade france, train dernière minute, voyage surprise, weekend express, réservation train"
        canonicalUrl="https://weekend-max.onrender.com/"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />
        
        {/* Hero Section - Optimisé SEO */}
        <main className="container mx-auto px-4 py-16">
          <header className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              Votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">weekend parfait</span> vous attend
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Découvrez des destinations incroyables pour vos escapades spontanées avec <strong>Weekend Max</strong>. 
              Que vous ayez une idée précise ou envie de vous laisser surprendre, nous proposons des <strong>voyages TGV MAX de dernière minute</strong> partout en France !
            </p>
          </header>
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

        {/* Features Section */}
        <section className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Pourquoi choisir Weekend Max ?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <article className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Réservation Express</h3>
              <p className="text-gray-600">Trouvez et réservez votre <strong>voyage de dernière minute</strong> en quelques clics seulement.</p>
            </article>
            <article className="text-center p-6">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Prix Imbattables</h3>
              <p className="text-gray-600">Profitez d'<strong>offres exclusives TGV MAX</strong> et de tarifs préférentiels pour vos escapades spontanées.</p>
            </article>
            <article className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Expériences Uniques</h3>
              <p className="text-gray-600">Découvrez des <strong>destinations cachées</strong> et des expériences authentiques partout en France.</p>
            </article>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-4xl mx-auto text-center mt-20">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Prêt pour l'aventure ?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Plus de 10 000 voyageurs nous font confiance chaque mois pour leurs <strong>weekends spontanés</strong>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => handleModeSelection('targeted')}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200"
                aria-label="Recherche de voyage avec destination connue"
              >
                🎯 Je connais ma destination
              </button>
              <button 
                onClick={() => handleModeSelection('discovery')}
                className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200 border-2 border-purple-400"
                aria-label="Recherche de voyage surprise"
              >
                🎲 Surprenez-moi !
              </button>
            </div>
          </div>
        </section>
        </main>
      </div>
    </>
  );
}

