import { useEffect, useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { getPlaceDetail } from '@/services/googlePlaces';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Linking } from 'react-native';
import { signOut } from 'firebase/auth';
import { colorTheme, screens, user_auth_state } from '@/constants';
import { FontAwesome } from '@expo/vector-icons';
import { removeUserData } from '@/services/storage';
import { useUserStore } from '@/store/userStore';
import { auth } from '@/config/firebase';
import { useFocusEffect } from 'expo-router';

const Profile = () => {

    const { placeId, temp, feelsLike } = useLocalSearchParams();
    const [placeData, setPlaceData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { setIsLoggedIn, setUserId } = useUserStore();

    const router = useRouter();

    useFocusEffect(
        useCallback(() => {
            const getPlace = async () => {
                setIsLoading(true);
                try {
                    const response = await getPlaceDetail(placeId.toString());
                    setPlaceData(response);
                } catch (error) {
                    const err = error as Error;
                    throw new Error(err.message);
                } finally {
                    setIsLoading(false)
                }
            };

            getPlace();
        }, [placeId])
    );

    const logout = async () => {
        try {
            await signOut(auth);
            setIsLoggedIn(false);
            setUserId(null);
            removeUserData(user_auth_state);
            router.push(screens.LOGIN);

        } catch (error) {
            console.error(error);
        }
    }

    if (isLoading) {
        return (
            <View className='flex-1 bg-secondary-300 justify-center items-center'>
                <ActivityIndicator size='large' color={colorTheme.primary} />
            </View>
        )
    }

    return (
        <View className='flex-1 bg-secondary-600'>
            {placeData ? (
                <View className='flex-1'>
                    <View className='flex-row justify-between items-center bg-secondary-300 p-4 h-52 m-4 rounded-2xl shadow-md'>
                        <View className='flex-1 justify-center items-center'>
                            <Text className='text-[22px] text-white font-bold'>{placeData.name}</Text>
                            <Text className='font-bold text-white text-7xl'>{temp}</Text>
                            <Text className='text-lg text-white'>Feels like {feelsLike}°C</Text>
                        </View>
                    </View>
                    <View className='p-3 m-4'>
                        <Text className='text-2xl font-bold mb-2 text-secondary-300'>{placeData.name}</Text>
                        <Text className='text-lg text-secondary-300'>{placeData.fullAddress}</Text>
                    </View>
                    <View className='flex-row justify-around'>
                        <TouchableOpacity
                            className={`w-16 h-16 bg-secondary-300 justify-center items-center rounded-lg border-2 border-white ${!placeData.directions && 'bg-white border-secondary-700'}`}
                            onPress={() => Linking.openURL(placeData.directions)}
                            disabled={!placeData.directions}
                        >
                            <FontAwesome name='map-marker' size={24} color={!placeData.directions ? 'gray' : 'white'} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            className={`w-16 h-16 bg-secondary-300 justify-center items-center rounded-lg border-2 border-white ${placeData.phoneNumber === 'N/A' && 'bg-white border-secondary-700'}`}
                            onPress={() => Linking.openURL(`tel:${placeData.phoneNumber}`)}
                            disabled={placeData.phoneNumber === 'N/A'}
                        >
                            <FontAwesome name="phone" size={24} color={placeData.phoneNumber === 'N/A' ? 'gray' : 'white'} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            className={`w-16 h-16 bg-secondary-300 justify-center items-center rounded-lg border-2 border-white ${placeData.website === 'N/A' && 'bg-white border-secondary-700'}`}
                            onPress={() => Linking.openURL(placeData.website)}
                            disabled={placeData.website === 'N/A'}
                        >
                            <FontAwesome name="globe" size={24} color={placeData.website === 'N/A' ? 'gray' : 'white'} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={logout} className='py-10 self-center'>
                        <Text className='font-bold'>Logout</Text>
                    </TouchableOpacity>
                </View>
            ) :
                (
                    <View className='flex-1 justify-center items-center'>
                        <TouchableOpacity onPress={logout}>
                            <Text className='font-bold'>Logout</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
        </View>
    );
};

export default Profile;