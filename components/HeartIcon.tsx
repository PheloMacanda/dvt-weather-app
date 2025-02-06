import { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IWeatherApiResponse, IWeatherListApiResponse } from '@/interfaces/weather';
import { useRouter } from 'expo-router';
import { screens } from '@/constants';
import { getPlaceDetails } from '@/services/googlePlaces';
import { colorTheme } from '@/constants';
import { addFavourite } from '@/services/weather/favourites';
import { IFavourite } from '@/interfaces/favourite';
import { showAlert } from '@/utils/alert';
import i18n from '@/i18n';

interface HeartIconProps {
    userId: string | null;
    forecastWeather: IWeatherListApiResponse | null;
    currentWeather: IWeatherApiResponse | null;
    isLoggedIn: boolean;
}

const HeartIcon:FC<HeartIconProps> = ({
    userId,
    forecastWeather,
    currentWeather,
    isLoggedIn
}) => {

    const router = useRouter();

    const { t } = i18n;

    const handleFavourite = async () => {
        if (!isLoggedIn) {
            router.push(screens.LOGIN);
            return;
        } else {
            try {
                const placeDetails = await getPlaceDetails(currentWeather?.coord.lat!, currentWeather?.coord.lon!);

                if ('error' in placeDetails) {
                    console.error(`Error fetching place details ${placeDetails.error}`);
                    return;
                };

                const photo = placeDetails?.photos[0] || '';
                const latitude = currentWeather?.coord.lat;
                const longitude = currentWeather?.coord.lon;
                const placeId = placeDetails.placeId;

                const useFavourite: IFavourite = {
                    userId: userId!,
                    latitude: latitude!,
                    longitude: longitude!,
                    forecast: forecastWeather,
                    current: currentWeather,
                    photo,
                    placeId: placeId!,
                    date: new Date().toISOString(),
                    name: placeDetails.name
                };

                const response = await addFavourite(useFavourite);

                if (response.status === "success") {
                    showAlert(t('successFavourite'));
                }
            } catch (error) {
                const err = error as Error;
                throw new Error(err.message);
            }
        }
    }

    return (
        <TouchableOpacity onPress={handleFavourite} className='absolute top-3 left-3 pt-4'>
            <Ionicons name='heart' size={40} color={colorTheme.primary} />
        </TouchableOpacity>
    )
}

export default HeartIcon;