
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import citiesData from '../assets/cities.json';

export default function AK() {
  const [search, setSearch] = useState('');
  const [dest, setDest] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [communes, setCommunes] = useState([]);
  const [date,setDate] = useState('')
  const [returnDate,setReturnDate] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    // Chargement des villes au montage
    if (citiesData && citiesData.cities) {
      setCommunes(citiesData.cities);
    }
  }, []);

  const handleClick = (city,date,returnDate) => {
    navigate('./trip', { state: { city,date,returnDate ,dest} });
  };

  return (
    <div>
      <div className='ml-10'>
        <p className='text-2xl font-bold mb-4'>D'où partez-vous ?</p>
        <input
          type="text"
          placeholder="Je pars de :"
          value={search}
          onChange={e => {
            setSearch(e.target.value);
            setIsSearching(true);
          }}
          className='border p-2 w-full max-w-md mb-4 focus:bg-gray-200'
        />

        {isSearching && (
          <ul className='text-left max-w-md'>
            {communes
              .filter(commune =>
                commune.toLowerCase().includes(search.toLowerCase())
              )
              .map((commune, index) => (
                <li
                  key={index}
                  className='hover:bg-gray-200 p-2 cursor-pointer'
                  onClick={() => {
                    setSearch(commune);
                    setIsSearching(false);
                  }}
                >
                  {commune}
                </li>
              ))}
          </ul>
        )}

        <p className='text-2xl font-bold mb-4'>Où allez-vous ?</p>
        <input
          type="text"
          placeholder="Je veux aller à :"
          value={search}
          onChange={e => {
            setDest(e.target.value);
            setIsSearching(true);
          }}
          className='border p-2 w-full max-w-md mb-4 focus:bg-gray-200'
        />

        {isSearching && (
          <ul className='text-left max-w-md'>
            {communes
              .filter(commune =>
                commune.toLowerCase().includes(search.toLowerCase())
              )
              .map((commune, index) => (
                <li
                  key={index}
                  className='hover:bg-gray-200 p-2 cursor-pointer'
                  onClick={() => {
                    setDest(commune);
                    setIsSearching(false);
                  }}
                >
                  {commune}
                </li>
              ))}
          </ul>
        )}

        <p className='text-2xl font-bold mb-4'>Quand voulez-vous partir ?</p>
        <input
        type = 'date'
        placeholder='Je veux partir :'
        value = {date}
        onChange={e=>setDate(e.target.value)}
        className='border p-2 w-full max-w-md mb-4 focus:bg-gray-200'
        />

         <p className='text-2xl font-bold mb-4'>Quand voulez-vous revenir ?</p>
        <input
        type = 'date'
        placeholder='Je veux revenir:'
        value = {returnDate}
        onChange={e=>setReturnDate(e.target.value)}
        className='border p-2 w-full max-w-md mb-4 focus:bg-gray-200'
        />

      </div>
      <button
        className=' bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-200 ml-10'
        onClick={() => {
          if (search && date && returnDate) {
            handleClick(search,date,returnDate,dest);
          } else {
            alert("Choisissez une ville et deux dates!");
          }
        }}
      >
        Rechercher les destinations possibles
      </button>

      
    </div>
  );
}

