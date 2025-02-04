export const getWeatherBackground = (main: string) => {
    switch (main.toLowerCase()) {
      case 'sunny':
        return {
          image: require('../assets/app_images/sea_sunnypng.png'),
          color: '#4a90e2',
          iconPath: require('../assets/icons/clear.png'), 
        };
      case 'cloudy':
        return {
          image: require('../assets/app_images/sea_cloudy.png'),
          color: '#628594',
          iconPath: require('../assets/icons/partlysunny.png'),
        };
      case 'rainy':
        return {
          image: require('../assets/app_images/sea_rainy.png'),
          color: '#686868',
          iconPath: require('../assets/icons/rain.png'),
        };
      default:
        return {
          image: require('../assets/app_images/sea_sunnypng.png'),
          color: '#4a90e2',
          iconPath: require('../assets/icons/clear.png'),
        };
    }
  };
  