import { FC } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Toast, { BaseToastProps } from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';

const AlertMessage:FC<BaseToastProps> = ({ text1, text1Style, style }) => {

    const closeAlert = () => Toast.hide();

    return (
        <View className='w-[80%] p-3 flex-row justify-evenly overflow-hidden border shadow-lg bg-white border-black' style={style} testID='alertMessage'>
            <Text className='text-black font-medium flex wrap p-3 text-center' style={text1Style} numberOfLines={3}>{text1}</Text>
            <TouchableOpacity onPress={closeAlert}>
                <Ionicons name='close' color={'black'} size={20} className='ml-4' />
            </TouchableOpacity>
        </View>
    );
};

export default AlertMessage;