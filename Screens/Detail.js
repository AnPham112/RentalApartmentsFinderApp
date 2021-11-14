import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, StyleSheet, Alert } from 'react-native';
import { Button, Title } from 'react-native-paper';
import { DataTable, TextInput } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import ContentCell from '../components/ContentCell';

const Detail = (props) => {
  const [propertyNote, setPropertyNote] = useState('');
  const [data, setData] = useState([]);
  const { _id, name, address, type, furniture, bedroom, price, reporter, note, createdAt } = props.route.params.item
  const deleteProperty = () => {
    fetch('http://192.168.1.24:3000/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: _id
      })
    }).then(res => res.json())
      .then(result => {
        Alert.alert("Property is removed successfully");
        props.navigation.navigate('List');
      }).catch(err => {
        console.log(err);
      })
  }

  const addNote = () => {
    fetch(`http://192.168.1.24:3000/create-note`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: _id,
        content: propertyNote
      })
    }).then(res => res.json())
      .then(setPropertyNote(''))
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    fetch(`http://192.168.1.24:3000/get-notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: _id
      })
    }).then(async res => {
      const results = await res.json()
      if (res.ok) {
        if (results) { setData(results.notes) }
      }
    })
  }, [data]);

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
          text: "OK", onPress: () => deleteProperty()
        }
      ]
    );
  }

  const renderNotes = () => {
    return (
      data?.map((item, index) => (
        <View key={index} style={styles.cardStyle}>
          <View style={styles.cardViews}>
            <Text>{moment(item.createdAt).format('MMM Do YYYY, h:mm:ss a')}</Text>
            <Text style={styles.note}>{item.content}</Text>
          </View>
        </View>
      ))
    )
  }

  return (
    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#ffbe5d', '#ffd75d', '#fcf067']} style={styles.linearGradient}>
      <ScrollView>
        <View style={styles.container}>
          <View style={{ alignItems: 'center' }}>
            <Title style={styles.title}>{name}</Title>
          </View>
          <DataTable>
            <DataTable.Row>
              <DataTable.Cell><Entypo name="location" size={20} /></DataTable.Cell>
              <ContentCell>{address}</ContentCell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell><FontAwesome name='home' size={20} /></DataTable.Cell>
              <ContentCell>{type}</ContentCell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell><FontAwesome name='bed' size={20} /></DataTable.Cell>
              <ContentCell>{bedroom}</ContentCell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell><FontAwesome name='tag' size={20} /></DataTable.Cell>
              <ContentCell>${price}</ContentCell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell><MaterialCommunityIcons name='desk-lamp' size={22} /></DataTable.Cell>
              <ContentCell>{furniture}</ContentCell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell><FontAwesome5 name='user-cog' size={20} /></DataTable.Cell>
              <ContentCell>{reporter}</ContentCell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell><MaterialCommunityIcons name='clock-time-four-outline' size={20} /></DataTable.Cell>
              <ContentCell>{moment(createdAt).format('MMM Do YYYY, h:mm:ss a')}</ContentCell>
            </DataTable.Row>
          </DataTable>

          <View style={styles.row}>
            <TextInput
              label="Note"
              placeholder="Enter note here"
              mode="outlined"
              style={styles.input}
              value={propertyNote}
              onChangeText={(text) => setPropertyNote(text)}
            />
            <Button
              icon="plus"
              mode="contained"
              onPress={() => addNote()}
            >Add</Button>
          </View>
          {note ? (<View style={styles.cardStyle}>
            <View style={styles.cardViews}>
              <Text>{moment(createdAt).format('MMM Do YYYY, h:mm:ss a')}</Text>
              <Text style={styles.note}>{note}</Text>
            </View>
          </View>) : null}

          {renderNotes()}

          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 16, marginBottom: 16 }}>
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
        </View>
      </ScrollView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  linearGradient: {
    flex: 1
  },
  title: {
    marginVertical: 8,
    fontSize: 25
  },
  cardStyle: {
    marginTop: 8,
    marginBottom: 12,
  },
  input: {
    width: 280
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  cardViews: {
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 13,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 4,
    elevation: 14,
  },
  note: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 8,
  }
})

export default Detail;