import { FC } from 'react';
import { View, Text } from 'react-native';
import Icon from './Icon';

type ForecastData = {
    day: string,
    main: {
        temp: number
    },
    path: number
};

interface ForecastItemProp {
    forecastData: ForecastData;
    path: string;
}

const ForecastItem: FC<ForecastItemProp> = ({ forecastData, path }) => {

    return (
        <View className='flex-row items-center justify-between p-0 pr-2 pl-2 pb-2'>
            <Text className='w-20 text-left text-white font-semibold text-sm'>{forecastData.day}</Text>
            <Icon path={path} />
            <Text className='w-20 text-right text-white'>
                {forecastData.main.temp}
                <Text className='relative -top-1 text-sm text-white'>°</Text>
            </Text>
        </View>
    );

};

export default ForecastItem;