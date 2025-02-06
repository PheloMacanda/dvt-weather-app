import { useState, useEffect, Fragment } from 'react';
import { View, Text, ImageBackground, ActivityIndicator, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { useLocation } from '@/context/LocationContext';
import { useWeatherData } from '@/context/WeatherDataContext';
import { useUserStore } from '@/store/userStore';
import { SearchModal, ForecastItem, TodayWeather, CurrentWeatherStats, HeartIcon } from '@/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colorTheme, CURRENT_WEATHER_LAST_UPDATE } from '@/constants';
import NetInfo from '@react-native-community/netinfo';
import i18n from '@/i18n';
import { getWeatherBackground } from '@/utils/weatherImages';
import { showAlert } from '@/utils/alert';
import { MaterialIcons } from '@expo/vector-icons';

const Weather = () => {

  const { t } = i18n;

  const [assets, setAssets] = useState({
    image: null,
    color: colorTheme.lightGreen,
    iconPath: null
  });

  const firstElement = 0;
  const [isConnected, setIsConnected] = useState<boolean | null>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const { location, errorMsg, updateLocation, resetToCurrentLocation } = useLocation();
  const {
    currentWeather,
    forecastWeather,
    currentWeatherError,
    forecastWeatherError,
    isFetchingCurrentWeather,
    isFetchingForecastWeather
  } = useWeatherData();

  const { userId, isLoggedIn } = useUserStore();
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const toggleModalVisibility = () => {
    setIsModalVisible(prevState => !prevState);
  };

  useEffect(() => {
    if (currentWeather) {
      const { image, color, iconPath } = getWeatherBackground(currentWeather?.weather[firstElement]?.main);
      setAssets({ image, color, iconPath });
    }
  }, [currentWeather]);

  useEffect(() => {
    const getLastUpdate = async () => {
      try {
        const currentWeatherLastUpdate = await AsyncStorage.getItem(CURRENT_WEATHER_LAST_UPDATE);
        setLastUpdate(currentWeatherLastUpdate ? new Date(JSON.parse(currentWeatherLastUpdate)) : null);
      } catch (error) {
        const err = error as Error;
        throw new Error(err.message);
      }
    };

    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected)
    });

    getLastUpdate();

    return () => {
      unsubscribe();
    }
  }, []);

  useEffect(() => {
    if (!isConnected) showAlert(t('noInternet'));
  }, [isConnected]);

  if (isFetchingCurrentWeather || isFetchingForecastWeather || !location) {
    return (
      <View className='flex-1 justify-center items-center bg-primary-100'>
        <ActivityIndicator size='large' color={colorTheme.primary} />
      </View>
    )
  }

  if (currentWeatherError || forecastWeatherError || errorMsg) {
    return (
      <View className='flex-1 justify-center items-center bg-primary-100'>
        <Text className='text-white font-semibold'>Error loading weather data</Text>
      </View>
    );
  };

  return (
    <View className='flex-1'>
      <View className='flex-1'>
        <ImageBackground source={assets.image ?? require('@/assets/app_images/forest_sunny.png')} className='flex-1 w-full justify-center object-fill'>
          <View className='absolute top-2 left-2 flex-row items-center'>
            {isConnected ? (
              <Text className='text-white font-bold'>{t('live')}</Text>
            ) : (lastUpdate ? (
              <Text className='text-white font-bold'>{t('lastUpdate')}: {lastUpdate.toLocaleTimeString()}</Text>
            ) : null)}
          </View>
          <HeartIcon
            userId={userId}
            forecastWeather={forecastWeather}
            currentWeather={currentWeather}
            isLoggedIn={isLoggedIn}
          />
          <View className='py-5 rounded-lg my-5 flex-1 justify-center items-center'>
            <TodayWeather
              condition={currentWeather?.weather[firstElement]?.main!}
              temp={currentWeather?.main.temp!}
            />
          </View>
        </ImageBackground>
        <View style={{ backgroundColor: assets.color }} className='flex-1 bg-primary-50 pt-4'>
          <CurrentWeatherStats
            min={currentWeather?.main.temp_min ?? 0}
            current={currentWeather?.main.temp ?? 0}
            max={currentWeather?.main.temp_max! ?? 0}
          />
          <View className='pt-2'>
            {forecastWeather?.list.reverse().map((forecastData, index) => {
              const { iconPath } = getWeatherBackground(forecastData?.weather[firstElement]?.main);
              return <ForecastItem key={index} forecastData={forecastData as any} path={iconPath} />
            })}
          </View>
        </View>
        <TouchableOpacity className='absolute bottom-5 right-5 flex-row items-center bg-secondary-300 pr-16 pl-2 py-2 rounded-full' onPress={toggleModalVisibility}>
          <MaterialIcons name='search' size={24} color='white' />
          <Text className='text-white ml-2 text-sm'>{t('search')}</Text>
        </TouchableOpacity>
        <TouchableOpacity className='absolute bottom-5 right-5 flex-row items-center bg-secondary-300 px-4 py-2 rounded-full' onPress={resetToCurrentLocation}>
          <MaterialIcons name='my-location' size={24} color='white' />
        </TouchableOpacity>
      </View>
      <SearchModal
        isModalVisible={isModalVisible}
        toggleModalVisibility={toggleModalVisibility}
        updateLocation={updateLocation}
      />
    </View>
  );
};

export default Weather;