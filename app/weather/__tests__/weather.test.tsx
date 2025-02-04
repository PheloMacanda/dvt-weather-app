import { render } from '@testing-library/react-native';
import { Weather } from '../components';

describe("Weather Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(<Weather />);
    expect(getByText("Weather Component")).toBeTruthy();
  });
});