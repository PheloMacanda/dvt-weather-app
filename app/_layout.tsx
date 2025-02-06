import { Stack } from 'expo-router';
import { useUserStore } from '@/store/userStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LocationProvider } from '@/context/LocationContext';
import { WeatherDataProvider } from '@/context/WeatherDataContext';
import Toast, { BaseToastProps } from 'react-native-toast-message';
import AlertMessage from '@/components/AlertMessage';
import { StyleSheet } from 'react-native';
import { colorTheme } from '@/constants';

const queryClient = new QueryClient();

export default function RootLayout() {

  const { isLoggedIn } = useUserStore();

  const toastConfig = {
    success: (props: BaseToastProps) => (
      <AlertMessage
        {...props}
        style={styles.alertContainer}
      />
    )
  };

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
          <Toast config={toastConfig} />
        </WeatherDataProvider>
      </LocationProvider>
    </QueryClientProvider>
  )
}

const styles = StyleSheet.create({
  alertContainer: {
    backgroundColor: colorTheme.textPrimary,
    width: '90%',
    borderRadius: 12,
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: 20
  }
});