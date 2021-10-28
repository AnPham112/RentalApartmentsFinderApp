import React from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { Button, Title } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DataTable } from 'react-native-paper';

const Profile = (props) => {
  const { _id, name, address, type, furniture, bedroom, price, reporter, note, createdAt } = props.route.params.item
  const _deleteProperty = () => {
    fetch('http://192.168.1.24:3000/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: _id
      })
    }).then(res => res.json())
      .then(deleteProp => {
        Alert.alert(`${deleteProp.name} deleted successfully`);
        props.navigation.navigate('List');
      }).catch(err => {
        console.log(err);
      })
  }

  const deleteConfirmationAlert = () => {
    Alert.alert(
      "Are you sure?",
      "Do you really want to delete this property",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK", onPress: () => _deleteProperty()
        }
      ]
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Title style={styles.title}>{name}</Title>
      </View>
      <DataTable>
        <DataTable.Row>
          <DataTable.Cell><Entypo name="location" size={20} /></DataTable.Cell>
          <DataTable.Cell style={{ flex: 3 }}>
            <Text style={{ fontSize: 15 }}>
              {address}
            </Text>
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell><FontAwesome name='home' size={20} /></DataTable.Cell>
          <DataTable.Cell style={{ flex: 3 }}>
            <Text style={{ fontSize: 15 }}>
              {type}
            </Text>
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell><FontAwesome name='bed' size={20} /></DataTable.Cell>
          <DataTable.Cell style={{ flex: 3 }}>
            <Text style={{ fontSize: 15 }}>
              {bedroom}
            </Text>
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell><FontAwesome name='tag' size={20} /></DataTable.Cell>
          <DataTable.Cell style={{ flex: 3 }}>
            <Text style={{ fontSize: 15 }}>
              ${price}
            </Text>
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell><MaterialCommunityIcons name='desk-lamp' size={22} /></DataTable.Cell>
          <DataTable.Cell style={{ flex: 3 }}>
            <Text style={{ fontSize: 15 }}>
              {furniture}
            </Text>
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell><FontAwesome5 name='user-cog' size={20} /></DataTable.Cell>
          <DataTable.Cell style={{ flex: 3 }}>
            <Text style={{ fontSize: 15 }}>
              {reporter}
            </Text>
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell><MaterialCommunityIcons name='note-text-outline' size={20} /></DataTable.Cell>
          <DataTable.Cell style={{ flex: 3 }}>
            <Text style={{ fontSize: 15 }}>
              {note}
            </Text>
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell><MaterialCommunityIcons name='clock-time-four-outline' size={20} /></DataTable.Cell>
          <DataTable.Cell style={{ flex: 3 }}>
            <Text style={{ fontSize: 15 }}>
              {createdAt}
            </Text>
          </DataTable.Cell>
        </DataTable.Row>
      </DataTable>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 16 }}>
        <Button
          icon="file-document-edit-outline"
          mode="contained"
          onPress={() => props.navigation.navigate("Create",
            { _id, name, address, type, furniture, bedroom, price, reporter, note }
          )}
        >
          Edit
        </Button>
        <Button icon="delete" mode="contained" onPress={() => deleteConfirmationAlert()}>
          Delete
        </Button>
      </View>
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    marginVertical: 8,
    fontSize: 25
  }
})

export default Profile;