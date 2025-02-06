import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TextField from '../TextField';

jest.mock("@expo/vector-icons", () => ({
    Ionicons: "",
}));

describe('TextField Component', () => {
    it('renders correctly with placeholder and value', () => {
        const { getByPlaceholderText } = render(
            <TextField placeholder="Enter text" value="Test value" />
        );

        const input = getByPlaceholderText('Enter text');
        expect(input.props.value).toBe('Test value');
    });

    it('calls onChangeText when text is entered', () => {
        const mockOnChangeText = jest.fn();
        const { getByTestId } = render(
            <TextField placeholder="Enter text" onChangeText={mockOnChangeText} />
        );

        fireEvent.changeText(getByTestId('textField'), 'New text');
        expect(mockOnChangeText).toHaveBeenCalledWith('New text');
    });

    it('toggles password visibility when button is pressed', () => {
        const { getByRole, getByTestId } = render(
            <TextField passwordInput secureTextEntry />
        );

        const button = getByRole('button');
        fireEvent.press(button);

        expect(getByTestId('textField').props.secureTextEntry).toBeTruthy();

        fireEvent.press(button);
        expect(getByTestId('textField').props.secureTextEntry).toBeTruthy();
    });
});