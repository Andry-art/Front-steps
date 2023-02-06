import { ChangeEvent, FC, useCallback, useState } from 'react';
import {
  Image,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputFocusEventData,
  TouchableOpacity,
} from 'react-native';
import { textType } from '../constants/types';
import PasswordInvisibleSource from '../../assets/passwordUnvisible.png';
import PasswordVisibleSource from '../../assets/passwordVisible.png';

interface Props {
  onChangeText: (e: string | ChangeEvent<string>) => void;
  value: string;
  textContentType?: textType;
  keyboardType?: KeyboardTypeOptions | undefined;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  errors: string | undefined;
  isPassword: boolean;
  touched?: boolean | undefined;
  placeholder?: string;
  isRegistration?: boolean;
}

const Input: FC<Props> = ({
  onChangeText,
  value,
  textContentType = 'none',
  keyboardType,
  onBlur,
  errors,
  isPassword,
  touched,
  placeholder,
}) => {
  const [visiblePass, setVisiblePass] = useState<boolean>(true);

  const passwordVisibility = useCallback(() => {
    setVisiblePass(prev => !prev);
  }, []);

  return (
    <>
    <TextInput
      style={styles.input}
        onChangeText={onChangeText}
        value={value}
        keyboardType={keyboardType}
        textContentType={textContentType}
        secureTextEntry={isPassword ? visiblePass : false}
        onBlur={onBlur}
        placeholder={placeholder}
    />
    {isPassword && (
      <TouchableOpacity onPress={passwordVisibility}>
        <Image
          source={
            visiblePass ? PasswordInvisibleSource : PasswordVisibleSource
          }
          style={styles.passwordIcon}
        />
      </TouchableOpacity>
    )}
    {(touched && errors) && <Text style={styles.error}>{errors}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  passwordIcon: {
    position: 'absolute',
    right: 15,
    bottom: 22,
  },
});

export default Input;
