import React, { useState } from 'react';

function Add({ onAddCity, onUpdateCitiesList }) {
  const [formData, setFormData] = useState({
    location: '',
    label: '',
    coordinates: '', // Store coordinates as a single string
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Split the coordinates string into latitude and longitude
    const [latitude, longitude] = formData.coordinates.split(',').map(parseFloat);

    if (
      isNaN(latitude) ||
      isNaN(longitude) ||
      longitude < -180 ||
      longitude > 180 ||
      latitude < -90 ||
      latitude > 90
    ) {
      // Invalid longitude or latitude, display an error message or handle it as needed
      console.error('Invalid longitude or latitude');
      alert('Invalid latitude (-90 to 90) or longitude (-180 to 180): format: lat,long');
      return;
    }

    // Trigger the callback to add the new city
    onAddCity({ ...formData, latitude, longitude });

    // Save the data to localStorage (you can replace this with other storage mechanisms)
    const citiesData = JSON.parse(localStorage.getItem('cities')) || [];
    citiesData.push({ ...formData, latitude, longitude });
    localStorage.setItem('cities', JSON.stringify(citiesData));

    // Update the list of cities
    onUpdateCitiesList(citiesData);

    // Reset the form
    setFormData({
      location: '',
      label: '',
      coordinates: '',
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="label">Label:</label>
        <input
          type="text"
          id="label"
          name="label"
          value={formData.label}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="coordinates">Coordinates (Lat, Lon):</label>
        <input
          type="text"
          id="coordinates"
          name="coordinates"
          value={formData.coordinates}
          onChange={handleChange}
          placeholder="google maps format"
          required
        />
        <br />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Add;
