
const STALE_TIME_MS = 1000 * 60 * 5; 
const RETRY_COUNT = 3;
const CACHE_TIME_MS = 1000 * 60 * 60 * 24;

export const queryConfig = {
    staleTime: STALE_TIME_MS,
    retry: RETRY_COUNT,
    cacheTime: CACHE_TIME_MS,
};

export const colorTheme = {
    primary: '#EA7474',  
    secondary: '#4A90E2', 
    cloudy: '#57575D',
    textPrimary: '#FFFFFF', 
    textSecondary: '#BDC3C7', 
    card : {
        background: '#444444',
        shadow: '#000000',
    },
};

export const screens: any = {
    WEATHER: '/weather/screens/Weather',
    DETAILS: '/details/screens/Details',
    FAVOURITES: '/favourites/screens/Favourites',
    LOGIN: '/login/screens/Login',
};

const KELVIN_TO_CELSIUS = 273.15;

export const weather = {
    KELVIN_TO_CELSIUS,
}

export const CURRENT_WEATHER_LAST_UPDATE = 'CURRENT_WEATHER_LAST_UPDATE';