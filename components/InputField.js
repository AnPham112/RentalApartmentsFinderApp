import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

const InputField = ({ placeholder, keyboardType, label, value, onChangeText, onBlur }) => {
  return (
    <TextInput
      label={label}
      placeholder={placeholder}
      mode="outlined"
      style={styles.input}
      onBlur={onBlur}
      onChangeText={onChangeText}
      value={value}
      keyboardType={keyboardType}
    />
  )
}
const styles = StyleSheet.create({
  input: {
    marginHorizontal: 6,
    marginBottom: 8
  }
})

export default InputField;