import { createContext, ReactNode, FC, useState, useEffect, useContext } from 'react';
import * as Location from 'expo-location';
import i18n from "@/i18n";
import AsyncStorage from '@react-native-async-storage/async-storage';

const LOCATION_STORAGE_KEY = 'USER_LOCATION';

interface LocationContextProps {
    location: Location.LocationObject;
    errorMsg: string;
    updateLocation: (
        lat: number,
        lon: number,
        altitude?: number | null,
        accuracy?: number | null,
        altitudeAccuracy?: number | null,
        heading?: number | null,
        speed?: number | null
    ) => Promise<void>;
    resetToCurrentLocation: () => Promise<void>;
}

const LocationContext = createContext<LocationContextProps | undefined>(undefined);

interface LocationProviderProps {
    children: ReactNode;
}

export const LocationProvider: FC<LocationProviderProps> = ({ children }) => {
    const initialLocationObj: Location.LocationObject = {
        coords: {
            accuracy: 0,
            altitude: 0,
            altitudeAccuracy: 0,
            heading: 0,
            latitude: 0,
            longitude: 0,
            speed: 0
        },
        timestamp: Date.now(),
    }
    const [location, setLocation] = useState<Location.LocationObject>(initialLocationObj);
    const [errorMsg, setErrorMsg] = useState<string>('');
    const PERMISSION_STATUS = 'granted';

    const { t } = i18n;

    const updateLocation = async (
        lat: number,
        lon: number,
        altitude?: number | null,
        accuracy?: number | null,
        altitudeAccuracy?: number | null,
        heading?: number | null,
        speed?: number | null
    ) => {
        // Update the location state with the new coordinates
        setLocation({
            coords: {
                latitude: lat,
                longitude: lon,
                altitude: altitude!,
                accuracy: accuracy!,
                altitudeAccuracy: altitudeAccuracy!,
                heading: heading!,
                speed: speed!,
            },
            timestamp: Date.now(),
        });
    };

    const resetToCurrentLocation = async () => {
        try {
            const cachedLocationData = await AsyncStorage.getItem(LOCATION_STORAGE_KEY);
            if (cachedLocationData) {
                setLocation(JSON.parse(cachedLocationData));
            } else {
                const currentLocation = await Location.getCurrentPositionAsync({});
                setLocation(currentLocation);
                await AsyncStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(currentLocation));
            }
        } catch (error) {
            setErrorMsg(t('locationFetchError'));
        }
    };

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== PERMISSION_STATUS) {
                setErrorMsg(t('locationPermissionDenied'));
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            await AsyncStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(location));
            setLocation(location);
        })();
    }, []);

    return (
        <LocationContext.Provider
            value={{ location, errorMsg, updateLocation, resetToCurrentLocation }}
        >
            {children}
        </LocationContext.Provider>
    )
};

export const useLocation = () => {
    const { t } = i18n;
    const context = useContext(LocationContext);
    if (context === undefined) {
        throw new Error(t('useLocationError'));
    }
    return context;
};