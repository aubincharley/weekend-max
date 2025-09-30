
import {useState} from 'react';

import Header from './components/Header';

import AK from './AK';
import DK from './DK'

export default function Homepage() {
  const [knowdest,useKnowdest] = useState(false);
  const [dontknowdest,useDontKnowdest] = useState(false);

  const handleClick = (city,date,returnDate) => {
    navigate('./trip', { state: { city,date,returnDate } });
  };

  return (
    <div>
      <Header />
      <button className='border p-2 m-5 hover:bg-gray-300' onClick={() => {useKnowdest(true); useDontKnowdest(false)}}>Je connais ma destination</button>
     <button className='border p-2 m-5 hover:bg-gray-300' onClick={() => {useDontKnowdest(true);useKnowdest(false)}}>Je veux voyager, peu importe la destination</button>
      {knowdest && (<AK/>)}
      {dontknowdest && (<DK/>)}
      
      
    </div>
  );
}

