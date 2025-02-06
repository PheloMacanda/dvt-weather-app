import { FC, useState } from 'react';
import { TextInput, KeyboardTypeOptions, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface TextFieldProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  className?: string;
  leftIcon?: "email" | "password";
  passwordInput?: boolean;
  leftIconColor?: string;
  leftIconStyles?: string;
  toggleButtonStyle?: string;
  leftIconSize?: number;
}

const TextField: FC<TextFieldProps> = ({
  placeholder,
  value,
  onChangeText,
  keyboardType,
  secureTextEntry,
  autoCapitalize,
  className,
  leftIcon,
  passwordInput,
  leftIconColor,
  leftIconStyles,
  toggleButtonStyle,
  leftIconSize
}) => {

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const togglePasswordVisibility = () => setIsPasswordVisible(prev => !prev);

  return (
    <View className='flex flex-row items-center relative'>
      <TextInput
        onChangeText={onChangeText}
        placeholder={placeholder}
        value={value}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        testID='textField'
        className={`h-14 w-full border-2 my-2 pb-2 rounded-full border-primary-100 text-lg px-10 ${className}`}
      />
      {leftIcon === 'email' ? (
        <View className={`absolute top-6 left-3 ${leftIconStyles}`}>
          <Ionicons name='mail-outline' color={leftIconColor} size={leftIconSize} />
        </View>
      ) : (
        <View className={`absolute top-6 left-3 ${leftIconStyles}`}>
          <Ionicons name='lock-closed-outline' color={leftIconColor} size={leftIconSize} />
        </View>
      )
      }
      {passwordInput && (
        <TouchableOpacity className={`${toggleButtonStyle}`} onPress={togglePasswordVisibility} role='button' accessibilityRole='button'>
          <Ionicons name={isPasswordVisible ? 'eye' : 'eye-off'} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TextField;