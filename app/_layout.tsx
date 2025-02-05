import { Stack } from 'expo-router';
import { useUserStore } from '@/store/userStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LocationProvider } from '@/context/LocationContext';
import { WeatherDataProvider } from '@/context/WeatherDataContext';

const queryClient = new QueryClient();

export default function RootLayout() {

  const { isLoggedIn } = useUserStore();

  return (
    <QueryClientProvider client={queryClient}>
      <LocationProvider>
        <WeatherDataProvider>
          <Stack screenOptions={{ headerShown: false }}>
            {!isLoggedIn ? (
              <Stack.Screen name='(auth)' options={{ headerShown: false }} />
            ) :
              (
                <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
              )
            }
          </Stack>
        </WeatherDataProvider>
      </LocationProvider>
    </QueryClientProvider>
  )
}
