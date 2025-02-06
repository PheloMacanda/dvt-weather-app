import { FC } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Marker, Callout } from 'react-native-maps';
import { useRouter } from 'expo-router';
import { screens, weather as WEATHER } from '@/constants';
import i18n from '@/i18n';

interface Coords {
    latitude: number;
    longitude: number;
}

interface WeatherMarkerProps {
    coordinate: Coords;
    weather: string;
    onViewDetails?: () => void;
    placeName: string;
    placeId: any;
    feelsLike: any;
}

const WeatherMarker: FC<WeatherMarkerProps> = ({ coordinate, weather, onViewDetails, placeName, placeId, feelsLike }) => {

    const router = useRouter();

    const { t } = i18n;

    const navigateToPath = () => {
        router.push({
            params: {
                placeId: placeId,
                temp: weather,
                feelsLike: Math.round(feelsLike - WEATHER.KELVIN_TO_CELSIUS)
            },
            pathname: screens.PROFILE
        });
    }

    return (
        <Marker coordinate={coordinate}>
            <View className='bg-secondary-100 p-2 rounded-3xl items-center justify-center w-16 h-16 border-2 border-secondary-100 shadow-md'>
                <Text className='text-white'>{weather}</Text>
            </View>
            <Callout tooltip>
                <View className='bg-white rounded-lg p-2 w-36 border-2 border-secondary-100 shadow-md'>
                    <Text className='font-bold text-lg mb-2 text-secondary-500'>{placeName}</Text>
                    <Text className='mb-3 text-secondary-500 text-sm'>{weather}</Text>
                    <TouchableOpacity className='bg-secondary-100 p-3 rounded-lg items-center' onPress={navigateToPath}>
                        <Text className='text-white font-lg'>{t('view')}</Text>
                    </TouchableOpacity>
                </View>
            </Callout>
        </Marker>
    )
};

export default WeatherMarker;