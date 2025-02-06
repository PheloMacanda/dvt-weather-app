import { render } from '@testing-library/react-native';
import Icon from '../Icon';
import { Image } from 'react-native';

describe('Icon Component', () => {
  it('renders correctly with the provided path', () => {
    const mockPath = { uri: 'https://plus.unsplash.com/premium_photo-1683865776032-07bf70b0add1?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' };
    const { getByRole } = render(<Icon path={mockPath} />);
    
    const image = getByRole('img');
    expect(image).toBeTruthy();
    expect(image.props.source).toEqual(mockPath);
  });
});