import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/colors';

interface Props {
  title: string;
  onPress: () => void;
  isSecondary?: boolean;
  disabled?: boolean;
  style?: any;
  isMain?: boolean;
}

const Button: FC<Props> = ({ title, onPress, isSecondary, disabled, style, isMain }) => {
  return (
    <TouchableOpacity
      style={isSecondary ? styles.buttonSecondary : [styles.button, style]}
      onPress={onPress}
      disabled={disabled}
    >
      {isMain ? (
        <Text style={styles.main}>{title.toLocaleUpperCase()}</Text>
      ) : (
        <Text style={isSecondary ? styles.textSecondary : styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    backgroundColor: COLORS.gray,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonSecondary: {
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: COLORS.white,
  },
  textSecondary: {
    color: COLORS.black,
  },
  main: {
    fontSize: 25,
    fontWeight: '700',
    color: COLORS.white,
  },
});

export default Button;
