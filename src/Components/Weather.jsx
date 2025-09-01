import React, { useState } from "react";
import axios from "axios";

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "cc236eeec4d5b7960e450dc58078b3ca";

  const getWeather = () => {
    if (!city) return;

    axios
      .get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
          q: city,
          appid: API_KEY,
          units: "metric",
        },
      })
      .then((res) => {
        setWeather(res.data);
        setError("");
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          setError("❌ City not found");
        } else {
          setError("⚠️ Error fetching data");
        }
        setWeather(null);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-600">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96 text-center">
        <h1 className="text-2xl font-bold mb-4">🌤 Weather Now</h1>

        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-2 border rounded-lg mb-3 focus:outline-none"
        />
        <button
          onClick={getWeather}
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
        >
          Get Weather
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {weather && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold">
              {weather.name}, {weather.sys.country}
            </h2>
            <p className="text-lg">🌡 {weather.main.temp}°C</p>
            <p className="capitalize">☁️ {weather.weather[0].description}</p>
            <img
              className="mx-auto"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="weather-icon"
            />
          </div>
        )}
      </div>
    </div>
  );
}
