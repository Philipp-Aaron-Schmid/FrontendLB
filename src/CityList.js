import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CityList({ cities, onDeleteCity }) {
  const [weatherData, setWeatherData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCities, setFilteredCities] = useState(cities);

  useEffect(() => {
    // Function to fetch weather data for a given city
    const fetchWeatherData = async (city) => {
      try {
        const response = await axios.get(
          `http://api.weatherstack.com/current?access_key=f2c7de1ae140db82f7d9cc8898514296&query=${city.latitude},${city.longitude}`
        );

        // Extract relevant weather data from the API response
        const temperature = response.data.current.temperature;
        const rainfall = response.data.current.precip;

        // Update weatherData state with the new data
        setWeatherData((prevWeatherData) => ({
          ...prevWeatherData,
          [city.location]: { temperature, rainfall },
        }));
      } catch (error) {
        console.error(`Error fetching weather data for ${city.location}:`, error);
      }
    };

    // Fetch weather data for all cities when the component mounts or when cities change
    cities.forEach((city) => fetchWeatherData(city));
  }, [cities]);

  useEffect(() => {
    // Filter the cities based on the search term for location or label
    const filtered = cities.filter(
      (city) =>
        city.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        city.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCities(filtered);
  }, [cities, searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <h2>Cities List</h2>
      <input
        type="text"
        placeholder="Search by location or label"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <ul>
        {filteredCities.map((city, index) => (
          <li key={index}>
            Location: {city.location}, Label: {city.label}
            <button onClick={() => onDeleteCity(city)}>Delete</button>
            {weatherData[city.location] && (
              <div>
                Temperature: {weatherData[city.location].temperature}°C
                Rainfall: {weatherData[city.location].rainfall} mm
              </div>
            )}
            <hr />
          </li>
          
        ))}
      </ul>
    </div>
  );
}

export default CityList;

