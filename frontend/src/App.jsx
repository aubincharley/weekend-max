import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage'
import Trip from './pages/Trip'

export default function App() {
  return (
    <BrowserRouter>
     <Routes>
      <Route path="/" element = {<HomePage/>}/>
      <Route path="/trip" element = {<Trip/>}/>
     </Routes>
    </BrowserRouter>
  )
}


