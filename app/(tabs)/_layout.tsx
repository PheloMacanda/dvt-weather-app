import { Tabs, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useUserStore } from '@/store/userStore';
import { screens, colorTheme } from '@/constants';
import i18n from '@/i18n';

export default function TabsLayout() {

    const { isLoggedIn } = useUserStore();

    const router = useRouter();

    const { t } = i18n;

    return (
        <Tabs
            screenOptions={({ route }) => ({
                headerShown: true,
                headerTitle: t(route.name),
                tabBarShowLabel: true,
                tabBarActiveTintColor: colorTheme.primary,
                tabBarStyle: {
                    backgroundColor: colorTheme.cloudy
                },
                tabBarLabelStyle: {
                    fontSize: 14,
                    color: colorTheme.textPrimary,
                    marginTop: 5
                },
                tabBarIconStyle: {
                    marginTop: 8
                },
                headerStyle: {
                    backgroundColor: colorTheme.cloudy
                },
                headerTitleStyle: {
                    color: colorTheme.textPrimary,
                    fontSize: 20
                }
            })}
        >
            <Tabs.Screen
                name='index'
                options={{
                    title: t('weather'),
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name='cloud-outline' color={color} size={size * 1.2} />
                    ),
                    tabBarLabel: t('weather')
                }}
            />
            <Tabs.Screen
                name='favourites'
                options={{
                    title: t('favourites'),
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name='star-outline' color={color} size={size * 1.2} />
                    ),
                    tabBarLabel: t('favourites'),
                    headerTitle: t('favourites')
                }}
                listeners={{
                    tabPress: (e) => {
                        if (!isLoggedIn) {
                            e.preventDefault();
                            router.push(screens.LOGIN);
                        }
                    },
                }}
            />
            <Tabs.Screen
                name='map'
                options={{
                    title: t('map'),
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name='map-outline' color={color} size={size * 1.2} />
                    ),
                    tabBarLabel: t('map')
                }}
                listeners={{
                    tabPress: (e) => {
                        if (!isLoggedIn) {
                            e.preventDefault();
                            router.push(screens.LOGIN);
                        }
                    },
                }}
            />
            <Tabs.Screen
                name='profile'
                options={{
                    title: t('profile'),
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-outline" color={color} size={size * 1.2} />
                    ),
                    tabBarLabel: t('profile'),
                    headerTitle: t('profile')
                }}
                listeners={{
                    tabPress: (e) => {
                        if (!isLoggedIn) {
                            e.preventDefault();
                            router.push(screens.LOGIN)
                        }
                    }
                }}
            />
        </Tabs>
    )
}