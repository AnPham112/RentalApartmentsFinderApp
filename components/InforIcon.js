import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const InfoIcon = ({ name, size, color, children }) => {
  return (
    <View style={styles.infoContainer}>
      <FontAwesome5 name={name} size={size} color={color} style={styles.iconStyle} />
      <Text style={styles.text}>{children}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  infoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 16
  },
  iconStyle: {
    marginRight: 8
  },
  text: {
    color: '#1C1C1C'
  }
})

export default InfoIcon;