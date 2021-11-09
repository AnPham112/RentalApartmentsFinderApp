import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Search = (props) => {
  return (
    <View style={styles.searchSection}>
      <FontAwesome style={styles.searchIcon} name={props.name} size={props.size} />
      <TextInput
        autoCapitalize={props.autoCapitalize}
        autoCorrect={props.autoCorrect}
        style={styles.searchInput}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={props.onChangeText}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  searchSection: {
    marginTop: 8,
    marginHorizontal: 10,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 15
  },
  searchIcon: {
    padding: 8,
  },
  searchInput: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
  }
})

export default Search;

