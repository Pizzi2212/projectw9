import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import MyNav from './components/MyNav'
import MyMeteo from './components/MainComponent'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import React, { useState } from 'react'
import MyFooter from './components/MyFooter'
import Details from './components/Details'
import Cities from './components/Cities'

function App() {
  const [city, setCity] = useState('Tokyo')

  return (
    <Router>
      <div>
        <header>
          <MyNav searcher={city} setSearcher={setCity} subtitle="Weather" />
        </header>
        <main>
          <Routes>
            <Route
              path="/"
              element={<MyMeteo city={city} setCity={setCity} />}
            />
            <Route path="/details/:city" element={<Details />} />
            <Route path="/Cities" element={<Cities />} />
          </Routes>
        </main>
        <footer>
          <MyFooter />
        </footer>
      </div>
    </Router>
  )
}

export default App
