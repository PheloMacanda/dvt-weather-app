import axios from 'axios';
import { parseWeatherResponse } from '@/utils/weatherDataParser';
import { IWeatherApiResponse, IWeatherListApiResponse } from '@/interfaces/weather';
import { weather } from '@/constants';

// Service
const service = () => {}
/**
 * Fetches the current weather data for a given location.
 *
 * @param lat - The latitude of the location.
 * @param lng - The longitude of the location.
 * @returns A promise that is resolved to an object containing the current weather data or an error object.
 */

export const getCurrentWeather = async (lat: number, lng: number): Promise<IWeatherApiResponse> => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        lat,
        lon: lng,
        appid: process.env.EXPO_PUBLIC_WEATHER_API_KEY
      },
    });    

    response.data.main.temp =  Math.round(response.data.main.temp - weather.KELVIN_TO_CELSIUS);
    response.data.main.temp_min = Math.round(response.data.main.temp_min - weather.KELVIN_TO_CELSIUS);
    response.data.main.temp_max = Math.round(response.data.main.temp_max - weather.KELVIN_TO_CELSIUS);
    const mainWeather = response.data.weather[0].main.toLowerCase();
    if (mainWeather.includes('clear')) {
      response.data.weather[0].main = 'Sunny'; 
    } else if (mainWeather.includes('cloud')) {
      response.data.weather[0].main = 'Cloudy'; 
    } else if (mainWeather.includes('rain')) {
      response.data.weather[0].main = 'Rainy'; 
    }


    return response.data as IWeatherApiResponse;
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message);
  }
};

/**
 * Fetches the weather forecast data for a given location.
 *
 * @param lat - The latitude of the location.
 * @param lng - The longitude of the location.
 * @returns A promise that resolves to an object containing the weather forecast data or an error object.
 */
export const getForecastWeather = async (lat: number, lng: number): Promise<IWeatherListApiResponse> => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
      params: {
        lat,
        lon: lng,
        appid: process.env.EXPO_PUBLIC_WEATHER_API_KEY
      },
    });

    const weatherData: IWeatherListApiResponse = await parseWeatherResponse(response.data);

    return weatherData;
  } catch (error) {
    const err = error as Error
    throw new Error(err.message);
  }
};

export default service;