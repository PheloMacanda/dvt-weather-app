import { firestore } from '@/config/firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { IFavourite, AddFavouriteResponse } from '@/interfaces/favourite';

const favService = () => {}
/**
 * Adds a favourite weather location for a user to the database.
 *
 * @param userFavourite - An object representing the user's favourite weather location details.
 * @returns A promise that will be resolves to an object which will then indicate that the api call was a success.
 * @throws Will throw an error if the api fails.
 */

export const addFavourite = async (userFavorite: IFavourite): Promise<AddFavouriteResponse> => {
    try {
        const favoritesCollectionRef = collection(firestore, "favourites");
        const docRef = await addDoc(favoritesCollectionRef, userFavorite);

        return { status: 'success', message: 'Favorite successfully added', docId: docRef.id };
    } catch (error) {
        const err = error as Error;
        console.error('Failed to add favorite:', err);
        throw new Error(err.message);
    }
};

/**
 * Fetches the data(favourites) of a user based on their userId.
 *
 * @param userId - The unique identifier of the user whose data you want to fetch.
 * @returns A promise that resolves to an array of user data objects.
 * @throws Will throw an error if the operation fails.
 */
export const getUserData = async (userId: string): Promise<Array<IFavourite>> => {
    try {

        const favoritesCollectionRef = collection(firestore, "favourites");
        const q = query(favoritesCollectionRef, where("userId", "==", userId));

        const querySnapshot = await getDocs(q);
        const userData = querySnapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data() } as unknown as IFavourite;
        });
        return userData;
    } catch (error) {
        const err = error as Error;
        console.error('Failed to fetch user data:', err);
        throw new Error(`Failed to fetch user data ${err.message}`);
    }
};

export default favService;