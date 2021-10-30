import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, StyleSheet, Alert, FlatList } from 'react-native';
import { Button, Title } from 'react-native-paper';
import { DataTable, TextInput } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';

const Detail = (props) => {
  const [propertyNote, setPropertyNote] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
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

  const getNotes = () => {
    fetch(`http://192.168.1.24:3000/get-notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: _id
      })
    }).then(res => res.json())
      .then(results => {
        setData(results.notes)
        setLoading(false);
      })
  }

  useEffect(() => {
    getNotes()
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
          text: "OK", onPress: () => _deleteProperty()
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
    <ScrollView nestedScrollEnabled={true}>
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
            <DataTable.Cell><MaterialCommunityIcons name='clock-time-four-outline' size={20} /></DataTable.Cell>
            <DataTable.Cell style={{ flex: 3 }}>
              <Text style={{ fontSize: 15 }}>
                {moment(createdAt).format('MMM Do YYYY, h:mm:ss a')}
              </Text>
            </DataTable.Cell>
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

        <View style={styles.cardStyle}>
          <View style={styles.cardViews}>
            <Text>{moment(createdAt).format('MMM Do YYYY, h:mm:ss a')}</Text>
            <Text style={styles.note}>{note}</Text>
          </View>
        </View>

        {renderNotes()}

        {/* <FlatList
          data={data}
          keyExtractor={item => item._id}
          renderItem={({ item }) => {
            return renderNotes(item)
          }}
          onRefresh={() => getNotes()}
          refreshing={loading}
        /> */}

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