interface ICoordinates {
    lon: number;
    lat: number;
}

interface IWeather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

interface IPrimary {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
}

interface IWind {
    speed: number;
    deg: number;
    gust: number;
}

interface ICloud {
    all: number;
}

interface ISystem {
    country: string;
    sunrise: number;
    sunset: number;
}

interface IWeatherListItem {
    dt: number;
    main: IPrimary;
    weather: IWeather[];
    clouds: ICloud;
    wind: IWind;
    visibility: number;
    pop: number;
    sys: ISystem;
    dt_txt: string;
}

export interface IWeatherApiResponse {
    coord: ICoordinates;
    weather: IWeather[];
    base: string;
    main: IPrimary;
    visibility: number;
    wind: IWind;
    clouds: ICloud;
    dt: number;
    sys: ISystem;
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

export interface IWeatherListApiResponse {
    list: IWeatherListItem[];
}

export interface IWeatherDataContextProps {
    currentWeather: IWeatherApiResponse | null;
    forecastWeather: IWeatherListApiResponse | null;
    currentWeatherError: Error | null;
    forecastWeatherError: Error | null;
    isFetchingCurrentWeather: boolean;
    isFetchingForecastWeather: boolean;
}