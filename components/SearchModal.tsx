import { FC } from 'react';
import { Modal, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import GooglePlacesAutoCompleteItem from './GooglePlacesAutoCompleteItem';
import i18n from '@/i18n';

interface SearchModalProps {
    isModalVisible: boolean;
    toggleModalVisibility: () => void;
    updateLocation: (
        lat: number,
        lon: number,
        altitude?: number | null,
        accuracy?: number | null,
        altitudeAccuracy?: number | null,
        heading?: number | null,
        speed?: number | null
    ) => void;
}

const SearchModal: FC<SearchModalProps> = ({ isModalVisible, toggleModalVisibility, updateLocation }) => {

    const { t } = i18n;

    return (
        <Modal
            transparent={true}
            visible={isModalVisible}
            animationType='slide'
        >
            <View className='absolute bottom-12 right-10 bg-secondary-300 rounded-md'>
                <SafeAreaView className='w-full'>
                    <GooglePlacesAutoCompleteItem 
                        updateLocation={updateLocation}
                        toggleModalVisibility={toggleModalVisibility}
                    />
                </SafeAreaView>
                <TouchableOpacity onPress={toggleModalVisibility} className='justify-center p-2'>
                    <Text className='text-white'>{t('cancel')}</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

export default SearchModal;