import { render } from '@testing-library/react-native';
import MapBase from '../components/MapBase';

describe("Map Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(<MapBase />);
    expect(getByText("Map Component")).toBeTruthy();
  });
});