import { render } from '@testing-library/react-native';
import LoginBase from '../components/LoginBase';

describe("Login Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(<LoginBase />);
    expect(getByText("Login Component")).toBeTruthy();
  });
});