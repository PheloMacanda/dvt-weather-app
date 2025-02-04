
const STALE_TIME_MS = 1000 * 60 * 5; 
const RETRY_COUNT = 3;
const CACHE_TIME_MS = 1000 * 60 * 60 * 24;

export const queryConfig = {
    staleTime: STALE_TIME_MS,
    retry: RETRY_COUNT,
    cacheTime: CACHE_TIME_MS,
};

export const screens: any = {
    WEATHER: '/weather/screens/Weather',
    DETAILS: '/details/screens/Details',
    LOGIN: '/login/screens/Login'
};

const KELVIN_TO_CELSIUS = 273.15;

export const weather = {
    KELVIN_TO_CELSIUS,
}

export const CURRENT_WEATHER_LAST_UPDATE = 'CURRENT_WEATHER_LAST_UPDATE';