import { useState } from 'react';
import { SafeAreaView, Platform, KeyboardAvoidingView, View, Text, TouchableOpacity } from 'react-native';
import { useUserStore } from '@/store/userStore';
import { logIn } from '@/services/auth';
import { setUserData } from '@/services/storage';
import { user_auth_state, ERROR_MESSAGES, screens } from '@/constants';
import TextField from '@/components/TextField';
import { logErrorToServer } from '@/services/logging';
import { useRouter } from 'expo-router';

interface IUserData {
    userId: string;
    email: string | null;
    isLoggedIn: boolean;
}

const Login = () => {

    const router = useRouter();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const { setUserId, setIsLoggedIn } = useUserStore();

    const handleEmailPasswordLogin = async () => {
        try {
            if (!email || !password) {
                throw new Error(ERROR_MESSAGES.REQUIRED_FIELDS);
            }
            const userCredential = await logIn(email, password);
            setUserId(userCredential.user.uid);
            const userData: IUserData = {
                userId: userCredential.user.uid,
                email: userCredential.user.email || null,
                isLoggedIn: true,
            };
            setUserData(user_auth_state, userData);
            setUserId(userData.userId);
            setIsLoggedIn(true);
            router.push(screens.WEATHER);
        } catch (error) {
            const err = error as Error;
            setEmailError(ERROR_MESSAGES.INVALID_CREDENTIALS);
            logErrorToServer(err);
        }
    };

    return (
        <SafeAreaView className='flex-1 bg-white'>
            <KeyboardAvoidingView
                className='flex-1'
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View className='flex-1 justify-center'>
                    {emailError && <Text className='text-red-600 mx-6'>{emailError}</Text>}
                    <View className='items-center px-4 pt-6 pr-8 rounded-lg'>
                        <TextField
                            placeholder='E-mail'
                            onChangeText={setEmail}
                            value={email}
                            className='rounded-2xl mx-3'
                            leftIcon='email'
                            leftIconSize={24}
                        />
                        <TextField
                            placeholder='Password'
                            onChangeText={setPassword}
                            value={password}
                            secureTextEntry
                            className='rounded-2xl mx-3'
                            leftIcon='password'
                            leftIconSize={24}
                        />
                    </View>
                    <View className='mx-6'>
                        <TouchableOpacity className='self-center my-10 border-2 w-full py-4 items-center rounded-full border-secondary-100' onPress={handleEmailPasswordLogin}>
                            <Text className='font-bold text-[14px]'>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Login;