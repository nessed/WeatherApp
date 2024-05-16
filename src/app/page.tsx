"use client"
import React, { useState } from 'react';

interface WeatherData {
  name: string;
  sys: { country: string };
  main: { temp: number, feels_like: number };
  weather: { description: string }; 
}

export default function Home() {
  const API_KEY = "7412188b2560b2b9621bac504e83346e";

  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState <WeatherData | null>(null);

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const fetchWeather = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      const data = await response.json();
      console.log(data)
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover"
      style={{
        backgroundImage: "url('https://i.ibb.co/31L8ZP0/waves.png')"
      }}
    >
      <div className='absolute  bg-blue-300 bg-opacity-70 p-4 border-gray-300 bg-opacity-40 rounded-md pb-20 shadow-lg'>
        <div className='font-bold justify-center  text-center'>Get the weather!</div>
        <div className='py-2 justify-center text-center'>Enter a city and get the weather below!</div>

        {/* Input box and button */}
        <div className="flex space-x-4">
          <input 
            className=' p-2 w-60 bg-blue-100 bg-opacity-70 border-gray-300 bg-opacity-40 rounded-md shadow-lg'
            value={city}
            onChange={handleCityChange}
          />
          <button
            className='bg-blue-600 shadow- rounded-lg text-white px-2 bg-opacity-10 bg-gradient-to-t from-blue-500 to-blue-400'
            onClick={fetchWeather}
          >
            Get Weather
          </button>
        </div>

        {/* Weather information display */}
        {weatherData && weatherData.name && weatherData.sys && weatherData.sys.country && weatherData.main && weatherData.weather &&  (
          <div className='my-4 flex-auto text-center'>
            <h3 className='justify-center'>{weatherData.name}, {weatherData.sys.country}</h3>
            <p>Temperature: {weatherData.main.temp}°C</p>
            <p>Weather: {weatherData.weather.description}</p>
            <p> Feels like: {weatherData.main.feels_like}°C</p>
          </div>
        )}
      </div>
    </div>
  );
}
