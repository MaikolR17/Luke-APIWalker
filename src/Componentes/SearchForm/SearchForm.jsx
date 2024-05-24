import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./SearchForm.css"

const SearchForm = ({ setResult, setError }) => {
  const [resource, setResource] = useState('people');
  const [id, setId] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://swapi.dev/api/${resource}/${id}`);
      setResult(response.data);
      setError(null);
      navigate(`/${resource}/${id}`);
    } catch (error) {
      setError("Estos no son los droides que está buscando");
      setResult(null);
    }
  };

  return (
    <div>
      <select value={resource} onChange={e => setResource(e.target.value)}>
        <option value="people">People</option>
        <option value="films">Films</option>
        <option value="starships">Starships</option>
        <option value="vehicles">Vehicles</option>
        <option value="species">Species</option>
        <option value="planets">Planets</option>
      </select>
      <input type="number" value={id} onChange={e => setId(e.target.value)} placeholder="ID" />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchForm;
