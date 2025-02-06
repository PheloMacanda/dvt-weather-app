import { FC } from 'react';
import { Text, View } from 'react-native';
import { colorTheme } from '@/constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface TodayWeatherProps {
    condition: string;
    temp: number;
}

const TodayWeather:FC<TodayWeatherProps> = ({
    condition,
    temp
}) => {
    return (
        <View className='items-center pb-16'>
            <View className='flex-row items-start'>
                <Text className='text-[65px] text-white font-semibold'>{temp ?? 0}</Text>
                <MaterialCommunityIcons name='circle-outline' color={colorTheme.textPrimary} size={20} className='pl-3' />
            </View>
            <Text className='text-4xl text-white'>{(condition ?? 'sunny').toLocaleUpperCase()}</Text>
        </View>
    )
}

export default TodayWeather;