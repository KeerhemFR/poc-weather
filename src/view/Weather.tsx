//React imports
import React, { useEffect, useState } from 'react';
//Components imports
import { WeatherCard } from '../components/WeatherCard';
//Interfaces imports
import { WeatherType } from '../interfaces/weather.type';
//Services imports
import axios, { AxiosResponse } from 'axios';

const API_KEY = 'c6dea39f86ea31dc114f0a4f0eec8fa9';
const CACHE_EXPIRY = 3600 * 500;

/**
 * Component handling the data of the weather depending the browser location
 *
 * @returns {React.ReactElement} component displaying weather data
 */
export const Weather: React.FC = React.memo(() => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [weather, setWeather] = useState<WeatherType>();

  /**
   * Handle the navigator location, or error if unable to access it
   */
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setError(null);
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setError('User denied the request for Geolocation.');
              break;
            case error.POSITION_UNAVAILABLE:
              setError('Location information is unavailable.');
              break;
            case error.TIMEOUT:
              setError('The request to get user location timed out.');
              break;
            default:
              setError('An unknown error occurred.');
              break;
          }
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  getLocation();

  /**
   * Function to check if the data in the cache expired the settled time limit
   *
   * @param {number} timestamp timestamp of the data saved in the cache
   * @returns {boolean} indicate if the cache expired
   */
  const isCacheExpired = (timestamp: number): boolean => {
    return Date.now() - timestamp > CACHE_EXPIRY;
  };

  //Use effect holding the weather fetching function
  useEffect(() => {
    /**
     * Function to handle the api call and save the data in cache
     *
     * @returns {void}
     */
    const fetchWeather = async () => {
      const cachedTimestamp = localStorage.getItem('cache_timestamp');
      const cachedCoords = localStorage.getItem('cache_coords');
      const cachedData = localStorage.getItem('cache_data');

      //Check if cached data exist and actual coordonates exist
      if (
        cachedData &&
        cachedTimestamp &&
        cachedCoords &&
        latitude &&
        longitude
      ) {
        const timestamp = parseInt(cachedTimestamp, 10);
        const coords = JSON.parse(cachedCoords);
        const latDif = Math.abs(latitude - coords.lat);
        const lonDif = Math.abs(longitude - coords.lon);

        //Check if the cache has expired,
        //and if current location is far appart current one
        //Use cached data if not expired and close to the previous location
        if (
          !isCacheExpired(timestamp) &&
          (latDif as number) < 0.5 &&
          (lonDif as number) < 0.5
        ) {
          setWeather(JSON.parse(cachedData));
          return;
        }
      }

      //If cache requirements not meet, do the API call with current location
      await axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
        )
        .then(({ data }: AxiosResponse<WeatherType>) => {
          //Save the API call data in the storage
          setWeather(data);
          localStorage.setItem(
            'cache_coords',
            JSON.stringify({ lat: latitude, lon: longitude })
          );
          localStorage.setItem('cache_data', JSON.stringify(data));
          localStorage.setItem('cache_timestamp', Date.now().toString());
          return;
        })
        .catch((error) => {
          setError('Failed to fetch weather data');
        });
    };

    if (latitude && longitude) {
      fetchWeather();
    }
  }, [latitude, longitude]);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  return <>{weather ? <WeatherCard weather={weather} /> : <p>Loading...</p>}</>;
});
