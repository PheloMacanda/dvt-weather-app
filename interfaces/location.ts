export interface IPlaceDetails {
    name: string;
    fullAddress: string;
    numberOfReviews: number;
    website: string;
    phoneNumber: string;
    directions: string;
    restaurantRating: number;
    photos: string[];
    placeTypes: string[];
    placeId?: string;
  }
  
  export interface IErrorDetails {
    error: string;
  }
  
  export type PlaceDetailsResponse = IPlaceDetails | IErrorDetails;
  
export interface IPlaceInfo {
    id: string;
    placeName: string;
    temperature: string;
    imageUri: string;
    placeId: string;
    feelsLike: number;
}