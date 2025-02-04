export interface IFavourite {
    userId: string;
    latitude: number;
    longitude: number;
    forecast: any;
    current: any;
    photo: string;
    placeId: string;
    date: string;
    name: string;
}

export type AddFavouriteResponse = {
    status: 'success' | 'failure';
    message: string;
    docId?: string;
};