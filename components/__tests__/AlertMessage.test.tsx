import { render, fireEvent } from '@testing-library/react-native';
import Toast from 'react-native-toast-message';
import AlertMessage from '../AlertMessage';
import { Ionicons } from '@expo/vector-icons';

jest.mock('react-native-toast-message', () => ({
    show: jest.fn(),
    hide: jest.fn(),
}));

jest.mock("@expo/vector-icons", () => ({
    Ionicons: "",
}));

describe('AlertMessage Component', () => {
    it('renders correctly with provided text', () => {
        const { getByText, getByTestId } = render(
            <AlertMessage text1="Test Alert" />
        );
        expect(getByTestId('alertMessageContainer')).toBeTruthy();
        expect(getByText('Test Alert')).toBeTruthy();
    });

    it('calls Toast.hide when close button is pressed', () => {
        const { getByTestId } = render(<AlertMessage text1="Test Alert" />);
        const closeButton = getByTestId('alertMessage').findByType(Ionicons);
        fireEvent.press(closeButton);
        expect(Toast.hide).toHaveBeenCalled();
    });
});