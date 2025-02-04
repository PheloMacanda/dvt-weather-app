import { render } from '@testing-library/react-native';
import { Login } from '../components';

describe("Login Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(<Login />);
    expect(getByText("Login Component")).toBeTruthy();
  });
});