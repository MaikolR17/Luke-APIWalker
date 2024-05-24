import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from '../Navbar/Navbar';
import SearchForm from '../SearchForm/SearchForm';
import Result from '../Results/Results';

function App() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <SearchForm setResult={setResult} setError={setError} />
        <Routes>
          <Route path="/" element={<div> {error ? <p>{error}</p> : <p>Search for a Star Wars entity</p>}</div>} />
          <Route path="/:resource/:id" element={<Result result={result} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
