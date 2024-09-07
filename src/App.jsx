import { Suspense } from 'react';
import './App.css'
import Dashboard from './components/dashboard/Dashboard'
import Navbar from './components/navbar/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Artistpage from './components/pages/artistPage/Artistpage';
import Spinner from './components/spinner/Spinner';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Suspense fallback={<Spinner />}><Dashboard /></Suspense>} />
          <Route path="/artist/:id" element={<Suspense fallback={<Spinner />}><Artistpage /></Suspense>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
