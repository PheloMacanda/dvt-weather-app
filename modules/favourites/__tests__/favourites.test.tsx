import { render } from '@testing-library/react-native';
import FavouritesBase from '../components/FavouritesBase';

describe("Favourites Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(<FavouritesBase />);
    expect(getByText("Favourites Component")).toBeTruthy();
  });
});