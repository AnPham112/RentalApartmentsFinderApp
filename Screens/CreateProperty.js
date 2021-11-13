import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, Alert, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { useForm, Controller } from "react-hook-form";
import LinearGradient from 'react-native-linear-gradient';

const CreateProperty = ({ navigation, route }) => {
  const { control, handleSubmit, formState: { errors } } = useForm();

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
  const [isSelected, setIsSelected] = useState(true);
  const [typeError, setTypeError] = useState('');

  const handleSelected = () => {
    if (type.trim().length == 0) {
      setIsSelected(false)
      setTypeError('Property type is required')
    } else {
      setIsSelected(true)
    }
  }

  useEffect(() => {
    handleSelected()
  }, [type]);

  const createProperty = (data) => {
    if (isSelected) {
      fetch("http://192.168.1.24:3000/create-property", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: data.propertyName,
          address: data.address,
          type: type,
          furniture: furniture,
          bedroom: data.bedroom,
          price: data.monthlyPrice,
          reporter: data.reporter,
          note: note
        })
      }).then(async res => {
        const data = await res.json()
        if (res.ok) {
          Alert.alert("Property is created successfully")
          navigation.navigate("List")
        } else {
          Alert.alert('Warning', data.message)
          console.log(data.message)
        }
      })
        .catch((err) => console.log(err))
    }
  }

  const updateData = (data) => {
    if (isSelected) {
      fetch("http://192.168.1.24:3000/update", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: route.params._id,
          name: data.propertyName,
          address: data.address,
          type: type,
          furniture: furniture,
          bedroom: data.bedroom,
          price: data.monthlyPrice,
          reporter: data.reporter,
          note: note
        })
      }).then(async res => {
        const data = await res.json()
        if (res.ok) {
          Alert.alert("Property is updated successfully")
          navigation.navigate("List")
        } else {
          Alert.alert('Warning', data.message)
          console.log(data.message)
        }
      })
        .catch((err) => console.log(err))
    }
  }

  return (
    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#ffbe5d', '#ffd75d', '#fcf067']} style={styles.linearGradient}>
      <ScrollView>
        <View style={styles.container}>
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Property name is required'
              }
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Property name"
                placeholder="Enter property name here"
                mode="outlined"
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="propertyName"
            defaultValue={propertyName}
          />
          {errors.propertyName && <Text style={styles.errMessage}>{errors.propertyName.message}</Text>}

          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Property address is required'
              }
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Property address"
                placeholder="Enter detailed address here"
                mode="outlined"
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="address"
            defaultValue={address}
          />
          {errors.address && <Text style={styles.errMessage}>{errors.address.message}</Text>}
          <Picker
            accessibilityValue={type}
            selectedValue={type}
            onValueChange={(value) => setType(value)}
            mode="dropdown"
            dropdownIconColor="purple"
            dropdownIconRippleColor="purple"
            style={styles.picker}
          >
            <Picker.Item label="Select property type" value="" />
            <Picker.Item label="Apartment" value="Apartment" />
            <Picker.Item label="House" value="House" />
            <Picker.Item label="Penthouse" value="Penthouse" />
            <Picker.Item label="Villa" value="Villa" />
          </Picker>
          {isSelected ? null : <Text style={styles.errMessage}>{typeError}</Text>}
          <Picker
            accessibilityValue={furniture}
            selectedValue={furniture}
            onValueChange={(value) => setFurniture(value)}
            mode="dropdown"
            dropdownIconColor="purple"
            dropdownIconRippleColor="purple"
            style={styles.picker}
          >
            <Picker.Item label="Select furniture type" value="" />
            <Picker.Item label="Unfurnished" value="Unfurnished" />
            <Picker.Item label="Half furnished" value="Half furnished" />
            <Picker.Item label="Furnished" value="Furnished" />
          </Picker>
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: 'The number of bedrooms is required'
              },
              min: {
                value: 0,
                message: 'Value must be greater than or equal to 0'
              }
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Number of bedrooms"
                placeholder="Enter the number of bedrooms here"
                mode="outlined"
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="numeric"
              />
            )}
            name="bedroom"
            defaultValue={bedroom.toString()}
          />
          {errors.bedroom && <Text style={styles.errMessage}>{errors.bedroom.message}</Text>}
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Monthy price is required'
              },
              min: {
                value: 0,
                message: 'Value must be greater than or equal to 0'
              }
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Monthly price"
                placeholder="Enter monthly price here"
                mode="outlined"
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="numeric"
              />
            )}
            name="monthlyPrice"
            defaultValue={monthlyPrice.toString()}
          />
          {errors.monthlyPrice && <Text style={styles.errMessage}>{errors.monthlyPrice.message}</Text>}
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Reporter name is required'
              }
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Repoter"
                placeholder="Enter name of reporter here"
                mode="outlined"
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="reporter"
            defaultValue={reporter}
          />
          {errors.reporter && <Text style={styles.errMessage}>{errors.reporter.message}</Text>}
          <TextInput
            label="Note"
            style={styles.input}
            placeholder="Enter a note here"
            mode="outlined"
            value={note}
            onChangeText={text => setNote(text)}
          />
          {route.params
            ? (<View style={{ justifyContent: 'space-around', flexDirection: 'row' }}>
              <Button
                icon="content-save"
                mode="contained"
                style={styles.input}
                onPress={handleSubmit(updateData)}
              >
                Update
              </Button>
              <Button
                icon="cancel"
                mode="contained"
                style={styles.input}
                onPress={() => {
                  navigation.goBack()
                }}
              >
                Cancel
              </Button>
            </View>)
            :
            (<Button
              icon="plus"
              mode="contained"
              style={styles.input}
              onPress={handleSubmit(createProperty)}>
              Create
            </Button>)
          }
        </View>
      </ScrollView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  input: {
    marginHorizontal: 6,
    marginBottom: 8
  },
  picker: {
    marginBottom: 8
  },
  errMessage: {
    fontSize: 14,
    color: 'red',
    fontWeight: 'bold',
    marginLeft: 6,
    marginBottom: 8
  }
})

export default CreateProperty;