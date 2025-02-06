import { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, ListRenderItem } from 'react-native';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { useUserStore } from '@/store/userStore';
import { screens } from '@/constants';
import { IPlaceInfo } from '@/interfaces/location';
import { colorTheme, weather as WEATHER } from '@/constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { getUserData } from '@/services/weather/favourites';
import i18n from '@/i18n';

const Favourites = () => {

  const { t } = i18n;

  const router = useRouter();
  const { userId } = useUserStore();
  const [refresh, setRefresh] = useState<number>(0);

  const fetchUserData = async () => {
    try {
      const response = await getUserData(userId!);
      return response.map((data, index) => ({
        id: index.toString(),
        placeName: data.name,
        temperature: `${data.current.main.temp}°C`,
        imageUri: data.photo,
        placeId: data.placeId,
        feelsLike: data.current.main.feels_like
      }));
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setRefresh((prev) => prev + 1);
    }, [])
  );

  const { data: favouritesData, error, isLoading } = useQuery<IPlaceInfo[], Error>(
    {
      queryKey: ['favouritesData', userId, refresh],
      queryFn: fetchUserData,
      enabled: !!userId,
      staleTime: 0
    }
  );

  if (isLoading) {
    return (
      <View className='flex-1 bg-secondary-300 flex justify-center items-center'>
        <ActivityIndicator 
          testID='loader'
          size='large'
          color={colorTheme.primary}
        />
      </View>
    )
  }

  if (error) {
    return (
      <View className='flex-1 justify-center items-center bg-secondary-300'>
        <Text className='text-white font-semibold'>Error loading data</Text>
      </View>
    )
  };

  const listEmptyComponent = () => {
    return (
      <View className='flex-1 justify-center items-center bg-secondary-300'>
        <Text className='text-white font-semibold'>You have no favourites yet.</Text>
      </View>
    )
  } 

  const navigateToDetails = (item: IPlaceInfo) => {
    router.push({
      pathname: screens.PROFILE,
      params: {
        placeId: item.placeId,
        temp: item.temperature,
        feelsLike: Math.round(item.feelsLike - WEATHER.KELVIN_TO_CELSIUS)
      }
    })
  }

  const renderFavouriteItem: ListRenderItem<IPlaceInfo> = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigateToDetails(item)}>
        <View className='flex-row bg-secondary-300 p-4 my-2 rounded-lg items-center shadow-lg'>
          <MaterialCommunityIcons name='weather-sunny' size={24} color='gold' />
          <View className='flex-1 flex-row justify-between items-center'>
            <Text className='text-lg text-white'>{item.placeName}</Text>
            <View className='items-end'>
              <Text className='text-lg text-white'>{item.temperature}</Text>
              <TouchableOpacity className='mt-2 p-2 bg-gold-100 rounded-md' onPress={() => navigateToDetails(item)}>
                <Text className='bg-gold-100 font-bold text-white'>{t('view')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View className='flex-1 p-6 bg-white'>
      <FlatList 
        data={favouritesData}
        renderItem={renderFavouriteItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={listEmptyComponent}
      />
    </View>
  );
};

export default Favourites;