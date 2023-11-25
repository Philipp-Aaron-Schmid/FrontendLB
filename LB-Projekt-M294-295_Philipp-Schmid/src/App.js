import React, { useState, useEffect } from 'react';
import Add from './Add';
import CityList from './CityList';
import './App.css';

function App() {
  const [cities, setCities] = useState([]);

  // Initialize the list of cities from localStorage when the component first loads
  useEffect(() => {
    const citiesData = JSON.parse(localStorage.getItem('cities')) || [];
    setCities(citiesData);
  }, []);

  const handleAddCity = (newCity) => {
    // You can perform any additional validation here before adding the city
    setCities([...cities, newCity]);
  };

  const handleDeleteCity = (cityToDelete) => {
    // Remove the city from the list of cities
    const updatedCities = cities.filter((city) => city !== cityToDelete);
    setCities(updatedCities);

    // Update localStorage with the updated list of cities
    localStorage.setItem('cities', JSON.stringify(updatedCities));
  };

  return (
    <div className="container">
      <h1>WeatherAPP</h1>
      <hr />
      <div className="form-container">
      <div className="add-module">
        <Add onAddCity={handleAddCity} onUpdateCitiesList={setCities} />
      </div>
      <div className="city-list">
        <CityList cities={cities} onDeleteCity={handleDeleteCity} />
      </div>
      </div>
    </div>
  );
}

export default App;
