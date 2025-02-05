import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useUserStore } from '@/store/userStore';
import { logIn } from '@/services/auth';
import { setUserData } from '@/services/storage';
import { user_auth_state, ERROR_MESSAGES, screens } from '@/constants';
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
    const [error, setError] = useState<string>('');
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
            setUserData(user_auth_state, userData)
            setUserId(userData.userId);
            setIsLoggedIn(true);
            router.push(screens.WEATHER);
        } catch (error) {
            const err = error as Error;
            setError(ERROR_MESSAGES.INVALID_CREDENTIALS);
            logErrorToServer(err);
        }
    };

    return (
        <View className='flex-1 justify-center items-center'>
            {/* <Text>Login</Text> */}
        </View>
    )
}

export default Login;