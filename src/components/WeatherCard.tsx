//React imports
import React from 'react';
//Interfaces imports
import { WeatherType } from '../interfaces/weather.type';

interface WeatherCardType {
  weather?: WeatherType;
}

/**
 * Card displaying receiving weather informations
 *
 * @param {WeatherType} weather weather informations received from the parent
 * @return {React.ReactElement} a card displaying the current weather informations
 */
export const WeatherCard: React.FC<WeatherCardType> = React.memo(
  ({ weather }) => {
    return (
      <article className="weather-card">
        <div className="main-info">
          <div className="main-upper">
            <div className="img-cont">
              <img
                src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}.png`}
                alt={weather?.weather[0].main}
              />
            </div>
            <div>
              <p>{weather?.weather[0].description}</p>
              <p>Temperature: {Math.round(weather?.main.temp as number)}°C</p>
            </div>
          </div>
          <div className="main-bottom">
            <div className="space-setter">
              <p>Min: {Math.round(weather?.main.temp_min as number)}°C</p>
              <p>Max: {Math.round(weather?.main.temp_max as number)}°C</p>
              <p>
                Feeling like: {Math.round(weather?.main.feels_like as number)}°C
              </p>
            </div>
          </div>
        </div>
        <div className="detailed-info">
          <p>Clouds: {weather?.clouds.all}%</p>
          <p>Pressure: {weather?.main.pressure} hPa</p>
          <p>Humidity: {weather?.main.humidity}%</p>
          {weather?.rain && <p>Rain: {weather?.rain?.['1h']}mm</p>}
          {weather?.snow && <p>Snow: {weather?.snow?.['1h']}mm</p>}
          <p>Visibility: {weather?.visibility} m</p>
          <p>Wind Speed: {weather?.wind.speed} m/s</p>
          <p>Wind Direction Degree: {weather?.wind.deg}°</p>
        </div>
      </article>
    );
  }
);
