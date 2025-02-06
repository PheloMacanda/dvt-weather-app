import { useCallback, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import MapView from 'react-native-maps';
import { WeatherMarker } from '@/components';
import { getUserData } from '@/services/weather/favourites';
import { useUserStore } from '@/store/userStore';
import { useLocation } from '@/context/LocationContext';
import { colorTheme } from '@/constants';
import { useFocusEffect } from 'expo-router';

interface MapData {
  id: string;
  placeName: string;
  weather: string;
  latitude: number;
  longitude: number;
  placeId: string;
  feelsLike: number;
}

const Map = () => {
  const { location } = useLocation();
  const { userId } = useUserStore();
  const [mapData, setMapData] = useState<MapData[]>([]);

  useFocusEffect(
    useCallback(() => {
      const getFavorites = async () => {
        try {
          const response = await getUserData(userId!);
          const formattedResponse = response.map((data, index) => ({
            id: index.toString(),
            placeName: data.name,
            weather: `${data.current.main.temp}°C`,
            latitude: data.latitude,
            longitude: data.longitude,
            placeId: data.placeId,
            feelsLike: data.current.main.feels_like,
          }));

          setMapData(formattedResponse);
        } catch (error) {
          const err = error as Error;
          throw new Error(err.message);
        }
      }

      if (userId) {
        getFavorites();
      }
    }, [userId]
    )
  );

  if (!location) {
    return (
      <View className='flex-1 bg-secondary-300 justify-center items-center' testID='loaderContainer'>
        <ActivityIndicator size='large' color={colorTheme.primary} />
      </View>
    );
  }

  return (
    <View className='flex-1'>
      <MapView
        testID='mapView'
        style={{ width: '100%', height: '100%' }}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0922,
        }}
      >
        {mapData.map((data, index) => (
          <WeatherMarker
            key={index}
            coordinate={{ latitude: data.latitude, longitude: data.longitude }}
            weather={data.weather}
            placeName={data.placeName}
            placeId={data.placeId}
            feelsLike={data.feelsLike}
          />
        ))}
      </MapView>
    </View>
  );
};

export default Map;