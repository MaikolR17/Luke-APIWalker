import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./Results.css";

const Result = () => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [homeworld, setHomeworld] = useState(null);
  const { resource, id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`https://swapi.dev/api/${resource}/${id}`);
            setResult(response.data);
            setError(null);

            if (resource === 'people' && response.data.homeworld) {
                const homeworldResponse = await axios.get(response.data.homeworld);
                setHomeworld(homeworldResponse.data.name);
            }
      } catch (error) {
        setError("Estos no son los droides que está buscando");
        setResult(null);
      }
    };
    fetchData();
  }, [resource, id]);

  if (error) {
    return (
      <div>
        <h2>{error}</h2>
        <img src="https://ew.com/thmb/SB6FWBPXLFn_vLXiRRhoLzJBMzk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/revenge-of-the-sith-2000-8a98ad56e8834130969bddf9350671c7.jpg" alt="Obi-Wan Kenobi" />
      </div>
    );
  }

  return result ? (
    <div>
      <h2>{result.name}</h2>
      <p>Height: {result.height}</p>
      <p>Hair Color: {result.hair_color}</p>
      <p>Birth Year: {result.birth_year}</p>
      {homeworld && <p>Homeworld: {homeworld}</p>}
    </div>
  ) : null;
};

export default Result;
