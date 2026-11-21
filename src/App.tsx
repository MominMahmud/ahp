import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Footer } from '@/components/Footer/Footer'
import { NavBar } from '@/components/NavBar/NavBar'
import { Home } from '@/pages/Home/Home'
import { Login } from '@/pages/Login/Login'
import { RequestDemo } from '@/pages/RequestDemo/RequestDemo'

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/request-demo" element={<RequestDemo />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
