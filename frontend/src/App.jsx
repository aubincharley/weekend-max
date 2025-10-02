import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/Homepage'
import Trip from './pages/Trip'
import AK from './pages/AK'
import DK from './pages/DK'
import DKTrip from './pages/DKtrip';

export default function App() {
  

  return (
    

    <BrowserRouter>
     <Routes>
      <Route path="/" element = {<HomePage/>}/>
      <Route path="ak/trip" element = {<Trip/>}/>
      <Route path="dk/trip" element = {<DKTrip/>}/>
      <Route path="/ak/" element = {<AK/>}/>
      <Route path="/dk/" element = {<DK/>}/>

     </Routes>
    </BrowserRouter>
    
  )
}


