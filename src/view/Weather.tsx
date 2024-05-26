import { useEffect, useState } from 'react';
import axios from 'axios';
import { WeatherType } from '../interfaces/weather.type';

const API_KEY = 'c6dea39f86ea31dc114f0a4f0eec8fa9';

export const Weather = () => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [weather, setWeather] = useState<WeatherType | null>(null);

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

  const getWeather = async () => {
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      )
      .then((response: any) => {
        setWeather(response.data);
      })
      .catch((error) => {
        setError('Failed to fetch weather data');
      });
  };

  useEffect(() => {
    if (latitude && longitude) {
      getWeather();
    }
    console.log(weather);
  }, [latitude, longitude]);

  return (
    <>
      <p>
        {latitude},{longitude}
      </p>
    </>
  );
};
