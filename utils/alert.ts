import Toast from 'react-native-toast-message';

export const showAlert = (message: string):void => {
    Toast.show({
        type: 'success',
        text1: message
    });
};