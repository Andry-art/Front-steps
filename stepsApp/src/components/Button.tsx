import { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
  isSecondary?: boolean;
  disabled?: boolean;
}

const Button: FC<Props> = ({ title, onPress, isSecondary, disabled }) => {
  return (
    <TouchableOpacity
      style={isSecondary ? styles.buttonSecondary : styles.button}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={isSecondary ? styles.textSecondary : styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 40,
    backgroundColor: 'gray',
    borderRadius: 20,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSecondary: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
  textSecondary: {
    color: 'black',
  },
});

export default Button;
