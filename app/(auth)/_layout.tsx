import { Stack } from 'expo-router';
import i18n from '@/i18n';
import { colorTheme } from '@/constants';

const AuthLayout = () => {

    const { t } = i18n;

    return (
        <Stack>
            <Stack.Screen 
                name='index'
                options={{
                    title: t('authIndex'),
                    headerTitle: t('authIndex'),
                    headerTitleStyle: {
                        color: colorTheme.textPrimary
                    },
                    headerStyle: {
                        backgroundColor: colorTheme.primary
                    }
                }}
            />
            <Stack.Screen 
                name='login'
                options={{
                    title: t('login')
                }}
            />
        </Stack>
    );
};

export default AuthLayout;