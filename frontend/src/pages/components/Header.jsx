import { useNavigate } from "react-router"
import train from '../../assets/train.png'
import { useEffect, useState } from "react"

export default function Header() {
  const [cursorUrl, setCursorUrl] = useState("auto")
  const navigate = useNavigate();

  useEffect(() => {
    // Crée un canvas pour dessiner l'emoji 🚆
    const c = document.createElement("canvas");
    const size = 64;
    c.width = c.height = size;
    const ctx = c.getContext("2d");

    const fontSize = 15;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `${fontSize}px serif`;
    ctx.fillText("🚅", size / 2, size / 2);

    // Génère une URL data pour le curseur
    const dataUrl = c.toDataURL("image/png");
    setCursorUrl(`url('${dataUrl}') 32 32, auto`);
  }, []);

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <header 
      className="bg-gradient-to-r from-red-600 via-purple-600 to-indigo-600 shadow-lg"
      style={{ cursor: cursorUrl }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo et titre */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleHomeClick}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200"
            >
              <div className="bg-white rounded-full p-2 shadow-md">
                <img 
                  src={train} 
                  alt="Weekend Max" 
                  className="h-8 w-8 object-contain" 
                />
              </div>
              <div className="text-white">
                <h1 className="text-xl font-bold tracking-tight">Weekend Max</h1>
                <p className="text-xs text-blue-100 hidden sm:block">Voyages de dernière minute</p>
              </div>
            </button>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => navigate('/')}
              className="text-white hover:text-blue-200 transition-colors duration-200 font-medium"
            >
              Accueil
            </button>
            {/* <button
              onClick={() => navigate('/trip')}
              className="text-white hover:text-blue-200 transition-colors duration-200 font-medium"
            >
              Mes Voyages
            </button>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-full font-medium hover:bg-blue-50 transition-colors duration-200 shadow-md">
              Rechercher
            </button> */}
          </nav>

          {/* Menu mobile */}
          <div className="md:hidden">
            <button className="text-white p-2">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Tagline */}
      {/* <div className="bg-white bg-opacity-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <p className="text-center text-blue-100 text-sm font-medium">
            ✨ Découvrez des destinations incroyables pour vos weekends spontanés
          </p>
        </div>
      </div> */}
    </header>
  )
}
