import { render } from '@testing-library/react-native';
import WeatherBase from '../components/WeatherBase';

describe("Weather Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(<WeatherBase />);
    expect(getByText("Weather Component")).toBeTruthy();
  });
});