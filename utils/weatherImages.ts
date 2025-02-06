export const getWeatherBackground = (main: string) => {
    switch (main.toLowerCase()) {
      case 'sunny':
        return {
          image: require('../assets/app_images/forest_sunny.png'),
          color: '#41a941',
          iconPath: require('../assets/icons/clear.png'), 
        };
      case 'cloudy':
        return {
          image: require('../assets/app_images/forest_cloudy.png'),
          color: '#628594',
          iconPath: require('../assets/icons/partlysunny.png'),
        };
      case 'rainy':
        return {
          image: require('../assets/app_images/forest_rainy.png'),
          color: '#686868',
          iconPath: require('../assets/icons/rain.png'),
        };
      default:
        return {
          image: require('../assets/app_images/forest_sunny.png'),
          color: '#41a941',
          iconPath: require('../assets/icons/clear.png'),
        };
    }
  };
  