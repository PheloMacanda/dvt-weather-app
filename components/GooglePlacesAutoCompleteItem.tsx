import 'react-native-get-random-values';

import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { colorTheme } from '@/constants';

interface GooglePlacesAutoCompleteItemProps {
    updateLocation: (
        lat: number,
        lon: number,
        altitude?: number | null,
        accuracy?: number | null,
        altitudeAccuracy?: number | null,
        heading?: number | null,
        speed?: number | null
    ) => void;
    toggleModalVisibility: () => void;
}

const GooglePlacesAutoCompleteItem: FC<GooglePlacesAutoCompleteItemProps> = ({ updateLocation, toggleModalVisibility }) => {
    return (
        <GooglePlacesAutocomplete
            placeholder='Search'
            fetchDetails={true}
            onPress={(data, details = null) => {
                if (details?.geometry?.location) {
                    const { lat, lng } = details.geometry.location;
                    const altitude = null;
                    const accuracy = null;
                    const altitudeAccuracy = null;
                    const heading = null;
                    const speed = null;
                    updateLocation(lat,lng, altitude, accuracy, altitudeAccuracy, heading, speed);
                    toggleModalVisibility();
                }
            }}
            query={{
                key: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
                language: 'en'
            }}
            styles={styles}
            enablePoweredByContainer={false}
        />
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 0,
        marginLeft: 10,
        marginRight: 10,
    },
    textInputContainer: {
        backgroundColor: '#121212',
        borderTopWidth: 0,
        borderBottomWidth: 0,
    },
    textInput: {
        backgroundColor: '#252525',
        borderRadius: 10,
        color: 'white',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
    },
    listView: {
        backgroundColor: '#121212', // Changed to match modal background
    },
    row: {
        backgroundColor: colorTheme.card.background,
        borderRadius: 5,
        marginVertical: 5,
        padding: 10,
        borderWidth: 1,
        borderColor: colorTheme.textPrimary,
        flex: 1,
        flexShrink: 1,
        flexDirection: 'row',
        maxWidth: '100%',
    },
    description: {
        color: colorTheme.textPrimary,
        flexWrap: 'wrap',
        flexShrink: 1,
    },
    predefinedPlacesDescription: {
        color: '#1faadb',
    },
});

export default GooglePlacesAutoCompleteItem;