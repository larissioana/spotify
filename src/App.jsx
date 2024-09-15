import { Suspense, lazy } from 'react';
import './App.css'
import Dashboard from './components/dashboard/Dashboard'
import Navbar from './components/navbar/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async';
const ScrollToTop = lazy(() => import('./components/ScrollToTop'));
const Artistpage = lazy(() => import('./components/pages/artistPage/Artistpage'))
const SearchPage = lazy(() => import('./components/pages/searchPage/SearchPage'))
const AlbumsTracks = lazy(() => import('./components/albumTracks/AlbumsTracks'))

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Navbar />
        <ScrollToTop />
        <Suspense>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/artist/:id" element={<Artistpage />} />
            <Route path="/album/:id" element={<AlbumsTracks />} />
            <Route path="/search/:query" element={<SearchPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
