import { createContext, ReactNode, FC, useContext, useEffect } from 'react';
import { useLocation } from './LocationContext';
import { useQuery } from '@tanstack/react-query';
import { getCurrentWeather, getForecastWeather } from '@/services/weather';
import { IWeatherApiResponse, IWeatherListApiResponse, IWeatherDataContextProps } from '@/interfaces/weather';
import { queryConfig } from '@/constants';
import i18n from '@/i18n';

const WeatherDataContext = createContext<IWeatherDataContextProps | undefined>(undefined);

interface IWeatherDataProviderProps {
    children: ReactNode;
};

export const WeatherDataProvider: FC<IWeatherDataProviderProps> = ({ children }) => {
    const { location } = useLocation();

    const fetchCurrentWeather = () => getCurrentWeather(location!.coords.latitude, location!.coords.longitude);
    const fetchForecastWeather = () => getForecastWeather(location!.coords.latitude, location!.coords.longitude);

    const currentWeatherQuery = useQuery<IWeatherApiResponse, Error>(
        {
            queryKey: ['currentWeather'],
            queryFn: fetchCurrentWeather,
            enabled: !!location,
            staleTime: queryConfig.staleTime,
            retry: queryConfig.retry,
            gcTime: queryConfig.cacheTime
        }
    );

    const forecastWeatherQuery = useQuery<IWeatherListApiResponse, Error>(
        {
            queryKey: ['forecastWeather'],
            queryFn: fetchForecastWeather,
            enabled: !!location,
            staleTime: queryConfig.staleTime,
            retry: queryConfig.retry,
            gcTime: queryConfig.cacheTime,
        }
    );

    useEffect(() => {
        if (location) {
            currentWeatherQuery.refetch();
            forecastWeatherQuery.refetch();
        }
    }, [location]);

    return (
        <WeatherDataContext.Provider
            value={{
                currentWeather: currentWeatherQuery.data!,
                forecastWeather: forecastWeatherQuery.data!,
                currentWeatherError: currentWeatherQuery.error,
                forecastWeatherError: forecastWeatherQuery.error,
                isFetchingCurrentWeather: currentWeatherQuery.isFetching,
                isFetchingForecastWeather: forecastWeatherQuery.isFetching
            }}
        >
            {children}
        </WeatherDataContext.Provider>
    )
};

export const useWeatherData = () => {
    const { t } = i18n;

    const context = useContext(WeatherDataContext);
    if (context === undefined) {
        throw new Error(t('useWeatherDataError'));
    }
    return context;
};