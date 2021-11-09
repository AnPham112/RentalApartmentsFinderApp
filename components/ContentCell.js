import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';

const ContentCell = ({ children }) => {
  return (
    <DataTable.Cell style={styles.contentCell}>
      <Text style={styles.text}>{children}</Text>
    </DataTable.Cell>
  )
}

const styles = StyleSheet.create({
  contentCell: {
    flex: 3
  },
  text: {
    fontSize: 15
  }
})

export default ContentCell;