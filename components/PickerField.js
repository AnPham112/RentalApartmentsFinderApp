import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const PickerField = ({ accessibilityValue, selectedValue, onValueChange, options }) => {
  return (
    <Picker
      accessibilityValue={accessibilityValue}
      selectedValue={selectedValue}
      onValueChange={onValueChange}
      mode="dropdown"
      dropdownIconColor="purple"
      dropdownIconRippleColor="purple"
      style={styles.picker}
    >
      {
        options.length > 0 ?
          options.map((option, index) => (
            <Picker.Item
              key={index}
              label={option.label}
              value={option.value} />
          ))
          : null
      }
    </Picker>
  )
}

const styles = StyleSheet.create({
  picker: {
    marginBottom: 8
  }
})

export default PickerField;

