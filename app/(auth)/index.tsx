import { useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { retrieveUserData } from '@/services/storage';
import { user_auth_state, screens } from '@/constants';
import { useUserStore } from '@/store/userStore';

const Splash = () => {

    const { setUserId, setIsLoggedIn } = useUserStore();
    const router = useRouter();

    useEffect(() => {
        const checkIfUserIsLoggedIn = async () => {
            try {
                const userData = await retrieveUserData(user_auth_state);

                if (userData && userData.isLoggedIn) {
                    setUserId(userData.userId);
                    setIsLoggedIn(true);
                    router.push(screens.WEATHER)
                }
            } catch (error) {
                const err = error as Error;
                throw new Error(err.message);
            }
        };

        checkIfUserIsLoggedIn();
    }, []);

    const navigateToLogin = () => {
        router.push(screens.LOGIN);
    };

    const navigateToWeather = () => {
        router.push(screens.WEATHER);
    };

    return (
        <SafeAreaView className='flex-1 justify-center items-center bg-white'>
            <View className='w-full relative'>
                <View className='flex-row justify-center'>
                    <Text className='p-3 text-2xl font-bold text-secondary-100'>Welcome to the DVT Weather App</Text>
                </View>
                <View className='flex-row pt-5 self-center'>
                    <Text className='text-center text-lg font-semibold text-secondary-100'>Giving you the weather forecast at your location!</Text>
                </View>
            </View>
            <View className='py-5 items-center w-[100%] px-10'>
                <TouchableOpacity className='my-4 py-4 border-2 border-secondary-100 w-[100%] items-center rounded-full' onPress={navigateToLogin}>
                    <Text className='font-bold text-primary-200'>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity className='my-4 py-4 bg-secondary-100 w-[100%] items-center rounded-full' onPress={navigateToWeather}>
                    <Text className='font-bold text-white'>Skip</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Splash;