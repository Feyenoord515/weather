import React from 'react'; 
import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
const [city, setCity] = useState('');
const [weather, setWeather] = useState(null);

async function getWeatherData(city){
  const apiKey = "e252abb16f695b16ddcbdd6c5bad5c91";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  console.log(data)
  return data;
}

  return (
    <div className=" bg-gradient-to-r from-cyan-200 to-blue-400 min-h-screen">
    <div className="max-w-4xl mx-auto py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold flex items-center justify-center mb-4">Estado del tiempo</h1>
     <form onSubmit={async(e) => {
      e.preventDefault();
      const data = await getWeatherData(city);
      setWeather(data);
     }}> 
     <div className="flex items-center justify-center mb-4">
      <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Ciudad"    className="py-2 px-3 rounded-l-lg border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white" />
      <button type="submit"  className="py-2 px-4 bg-blue-500 hover:bg-blue-600 rounded-r-lg text-white font-bold" >Buscar</button>
     </div>
     </form>
     </div>
     {weather && (
      <div className="bg-blue-100 rounded-lg p-4">
         <h2 className="text-xl font-bold flex items-center justify-center mb-4">Pronóstico para {weather.name}</h2>
         <div className="flex items-center justify-center mb-4">
        <h3>{weather.weather[0].main}</h3>
        <img  src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt={weather.weather[0].description} />
        </div>
        <div className="flex items-center justify-center mb-4">
        <p>Temperatura: {weather.main.temp}ºC</p>
        </div>
        <div className="flex items-center justify-center mb-4">
        <p>Sensacion Termica: {weather.main.feels_like}ºC</p>
        </div>
        <div className="flex items-center justify-center mb-4">
        <p>Humedad: {weather.main.humidity}</p>
        </div>
        <div className="flex items-center justify-center mb-4">
        <p>Viento: {weather.wind.speed} km/h</p>
        </div>
      </div>
     )
     }
    </div>
    </div>
  );
}

export default App;
