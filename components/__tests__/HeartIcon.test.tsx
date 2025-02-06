import { render, fireEvent } from '@testing-library/react-native';
import HeartIcon from '../HeartIcon';
import { useRouter } from 'expo-router';
import { addFavourite } from '@/services/weather/favourites';
import { getPlaceDetails } from '@/services/googlePlaces';
import { showAlert } from '@/utils/alert';
import { screens } from '@/constants';
import i18n from '@/i18n';

jest.mock("@expo/vector-icons", () => ({
    Ionicons: "",
}));

jest.mock('expo-router', () => ({ useRouter: jest.fn() }));
jest.mock('@/services/weather/favourites', () => ({ addFavourite: jest.fn() }));
jest.mock('@/services/googlePlaces', () => ({ getPlaceDetails: jest.fn() }));
jest.mock('@/utils/alert', () => ({ showAlert: jest.fn() }));

const mockRouter = { push: jest.fn() };
const mockT = jest.fn((key) => key);

(i18n as any).t = mockT;

(useRouter as any).mockReturnValue(mockRouter);

describe('HeartIcon Component', () => {
  it('navigates to login if user is not logged in', () => {
    const { getByRole } = render(
      <HeartIcon userId={null} forecastWeather={null} currentWeather={null} isLoggedIn={false} />
    );

    const button = getByRole('button');
    fireEvent.press(button);
    expect(mockRouter.push).toHaveBeenCalledWith(screens.LOGIN);
  });

  it('adds a favourite if user is logged in and place details are retrieved', async () => {
    const mockWeather = { coord: { lat: 12.34, lon: 56.78 } };
    const mockPlaceDetails = { placeId: '123', name: 'Test Place', photos: ['test-photo'] };
    (getPlaceDetails as any).mockResolvedValue(mockPlaceDetails);
    (addFavourite as any).mockResolvedValue({ status: 'success' });
    
    const { getByRole } = render(
      <HeartIcon userId='user-123' forecastWeather={null} currentWeather={mockWeather as any} isLoggedIn={true} />
    );

    const button = getByRole('button');
    await fireEvent.press(button);
    
    expect(getPlaceDetails).toHaveBeenCalledWith(12.34, 56.78);
    expect(addFavourite).toHaveBeenCalled();
    expect(showAlert).toHaveBeenCalledWith('successFavourite');
  });
});