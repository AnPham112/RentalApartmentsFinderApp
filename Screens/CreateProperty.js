import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker'

const CreateProperty = ({ navigation, route }) => {
  const getDetails = (category) => {
    if (route.params) {
      switch (category) {
        case "name":
          return route.params.name
        case "address":
          return route.params.address
        case "type":
          return route.params.type
        case "furniture":
          return route.params.furniture
        case "bedroom":
          return route.params.bedroom
        case "price":
          return route.params.price
        case "reporter":
          return route.params.reporter
        case "note":
          return route.params.note
      }
    }
    return ""
  }

  const [propertyName, setPropertyName] = useState(getDetails("name"));
  const [address, setAddress] = useState(getDetails("address"));
  const [type, setType] = useState(getDetails("type"));
  const [furniture, setFurniture] = useState(getDetails("furniture"));
  const [bedroom, setBedroom] = useState(getDetails("bedroom"));
  const [monthlyPrice, setMonthlyPrice] = useState(getDetails("price"));
  const [reporter, setReporter] = useState(getDetails("reporter"));
  const [note, setNote] = useState(getDetails("note"));

  const _submitData = () => {
    fetch("http://192.168.1.24:3000/create-property", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: propertyName,
        address: address,
        type: type,
        furniture: furniture,
        bedroom: bedroom,
        price: monthlyPrice,
        reporter: reporter,
        note: note
      })
    }).then(res => res.json())
      .then(data => {
        Alert.alert(`${data.name} is created successfully`)
        navigation.navigate("List")
      }).catch((err) => console.log(err))
  }

  const _updateData = () => {
    fetch("http://192.168.1.24:3000/update", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: route.params._id,
        name: propertyName,
        address: address,
        type: type,
        furniture: furniture,
        bedroom: bedroom,
        price: monthlyPrice,
        reporter: reporter,
        note: note
      })
    }).then(res => res.json())
      .then(data => {
        Alert.alert(`${data.name} is updated successfully`)
        navigation.navigate("List")
      }).catch((err) => console.log(err))
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <TextInput
          label="Property name"
          style={styles.input}
          placeholder="Enter property name here"
          mode="outlined"
          value={propertyName}
          onChangeText={text => setPropertyName(text)}
        />
        <TextInput
          label="Property address"
          style={styles.input}
          placeholder="Enter detailed address here"
          mode="outlined"
          value={address}
          onChangeText={text => setAddress(text)}
        />
        <Picker
          accessibilityValue={type}
          selectedValue={type}
          onValueChange={(value) => setType(value)}
          mode="dropdown"
          dropdownIconColor="purple"
          dropdownIconRippleColor="purple"
          style={styles.picker}
        >
          <Picker.Item label="Select type" value="" />
          <Picker.Item label="Apartment" value="Apartment" />
          <Picker.Item label="House" value="House" />
          <Picker.Item label="Penthouse" value="Penthouse" />
          <Picker.Item label="Villa" value="Villa" />
        </Picker>
        <Picker
          accessibilityValue={furniture}
          selectedValue={furniture}
          onValueChange={(value) => setFurniture(value)}
          mode="dropdown"
          dropdownIconColor="purple"
          dropdownIconRippleColor="purple"
          style={styles.picker}
        >
          <Picker.Item label="Select furniture" value="" />
          <Picker.Item label="Unfurnished" value="Unfurnished" />
          <Picker.Item label="Half furnished" value="Half furnished" />
          <Picker.Item label="Furnished" value="Furnished" />
        </Picker>
        <TextInput
          label="Number of bedrooms"
          style={styles.input}
          placeholder="Enter the number of bedrooms here"
          mode="outlined"
          value={bedroom.toString()}
          onChangeText={text => setBedroom(text)}
        />
        <TextInput
          label="Monthly price"
          style={styles.input}
          placeholder="Enter monthly price here"
          mode="outlined"
          value={monthlyPrice.toString()}
          onChangeText={text => setMonthlyPrice(text)}
        />
        <TextInput
          label="Repoter"
          style={styles.input}
          placeholder="Enter name of reporter here"
          mode="outlined"
          value={reporter}
          onChangeText={text => setReporter(text)}
        />
        <TextInput
          label="Note"
          style={styles.input}
          placeholder="Enter a not here"
          mode="outlined"
          value={note}
          onChangeText={text => setNote(text)}
        />

        {route.params
          ? <Button
            icon="content-save"
            mode="contained"
            style={styles.input}
            onPress={() => _updateData()}
          >
            Update
          </Button>
          : <Button
            icon="content-save"
            mode="contained"
            style={styles.input}
            onPress={() => _submitData()}
          >
            Save
          </Button>
        }

      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  input: {
    marginHorizontal: 6,
    marginBottom: 18
  },
  picker: {
    marginBottom: 18
  }
})

export default CreateProperty;