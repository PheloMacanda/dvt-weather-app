import { FC } from 'react';
import { Image } from 'react-native';

interface IconProps {
    path: any;
};

const Icon:FC<IconProps> = ({
    path
}) => (
    <Image source={path} className='w-8 h-8' role='img' />
);

export default Icon;