import './App.css'

import { Routes, Route } from 'react-router-dom'
import Login from './routes/login/Login'
import Home from './routes/home/Home'
import MyTicket from './routes/myticket/MyTicket'
import Ticketing from "./routes/ticketing/Ticketing";
import Admin from "./routes/admin/Admin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/myticket" element={<MyTicket />} />
      <Route path="/ticketing" element={<Ticketing />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  )
}

export default App
