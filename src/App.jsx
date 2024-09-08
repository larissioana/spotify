import { Suspense } from 'react';
import './App.css'
import Dashboard from './components/dashboard/Dashboard'
import Navbar from './components/navbar/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Artistpage from './components/pages/artistPage/Artistpage';
import Spinner from './components/spinner/Spinner';
import AlbumsTracks from './components/albumTracks/AlbumsTracks';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Suspense fallback={<Spinner />}><Dashboard /></Suspense>} />
          <Route path="/artist/:id" element={<Suspense fallback={<Spinner />}><Artistpage /></Suspense>} />
          <Route path="/album/:id" element={<Suspense fallback={<Spinner />}><AlbumsTracks /></Suspense>} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
