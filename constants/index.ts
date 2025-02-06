// Constant representing the key used to store user authentication state.
export const user_auth_state = 'user_v2';

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
    green: '#47AB2F',
    lightGreen: '#71DA57',
    cloudy: '#57575D',
    textPrimary: '#FFFFFF', 
    textSecondary: '#BDC3C7', 
    card : {
        background: '#444444',
        shadow: '#000000',
    },
};

export const screens: any = {
    WEATHER: '/(tabs)',
    PROFILE: '/profile',
    FAVOURITES: '/favourites',
    LOGIN: '/login',
};

const KELVIN_TO_CELSIUS = 273.15;

export const weather = {
    KELVIN_TO_CELSIUS,
}

export const CURRENT_WEATHER_LAST_UPDATE = 'CURRENT_WEATHER_LAST_UPDATE';

/*
    Login Screen Based Constants
*/

export const ERROR_MESSAGES = {
    REQUIRED_FIELDS: 'Email and password are required',
    INVALID_CREDENTIALS: 'Wrong email or password',
};

export const PLACEHOLDERS = {
    EMAIL: 'Email',
    PASSWORD: 'Password',
};