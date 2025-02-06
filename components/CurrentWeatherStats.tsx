import { FC } from 'react';
import { View, Text } from 'react-native';
import i18n from '@/i18n';

interface CurrentWeatherStatsProps {
    min: number;
    current: number;
    max: number;
}

interface Item {
    label: string;
    value: number;
}

const CurrentWeatherStats:FC<CurrentWeatherStatsProps> = ({ min, current, max }) => {

    const { t } = i18n;

    const values: Array<Item> = [
        {
            label: t('min'),
            value: min
        },
        {
            label: t('current'),
            value: current
        },
        {
            label: t('max'),
            value: max
        }
    ];

    return (
        <View className='flex-row items-center justify-between p-0 pr-3 pl-3 pb-3 border-b border-b-white'>
            {values.map(({ label, value }) => (
                <View key={label} className='items-center'>
                    <Text className='text-sm text-white font-semibold'>{value}
                        <Text className='text-sm relative -top-1'>°</Text>
                    </Text>
                    <Text className='text-white text-sm'>{label}</Text>
                </View>
            ))}
        </View>
    )
}

export default CurrentWeatherStats;