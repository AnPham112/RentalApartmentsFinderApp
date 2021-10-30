import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { Card, FAB, Title, TextInput } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const PropertyList = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    fetch('http://192.168.1.24:3000/')
      .then(res => res.json())
      .then(results => {
        setData(results.properties);
        setFullData(results.properties);
        setLoading(false);
      })
  }

  useEffect(() => {
    fetchData();
  }, [])

  const renderPropertyList = (item) => {
    return (
      <Card style={styles.cardStyle} onPress={() => navigation.navigate('Detail', { item })}>
        <View style={styles.cardViews}>
          <Title style={styles.PropertyName}>{item.name}</Title>
          <Text style={styles.Address}>{item.address}</Text>
          <View style={styles.row}>
            <View style={styles.infoContainer}>
              <FontAwesome name='home' size={25} color='#000' style={styles.iconStyle} />
              <Text>{item.type}</Text>
            </View>
            <View style={styles.infoContainer}>
              <FontAwesome name='bed' size={25} color='#000' style={styles.iconStyle} />
              <Text>{item.bedroom}</Text>
            </View>
            <View style={styles.infoContainer}>
              <FontAwesome name='tag' size={23} color='#000' style={styles.iconStyle} />
              <Text>${item.price}</Text>
            </View>
          </View>
        </View>
      </Card>
    )
  }

  const handleSearch = (text) => {
    if (text) {
      const newData = fullData.filter((item) => {
        const itemData = item.name
          ? item.name.toUpperCase()
          : ''.toUpperCase()
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1
      });
      setData(newData);
      setSearch(text);
    } else {
      setData(fullData);
      setSearch(text);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize='none'
        autoCorrect={false}
        style={styles.searchInput}
        placeholder="Search here"
        value={search}
        onChangeText={(text) => handleSearch(text)}
      />
      <FlatList
        data={data}
        keyExtractor={item => item._id}
        renderItem={({ item }) => {
          return renderPropertyList(item)
        }}
        onRefresh={() => fetchData()}
        refreshing={loading}
      />

      <FAB
        style={styles.fab}
        small={false}
        icon="plus"
        theme={{ colors: { accent: '#8000FF' } }}
        onPress={() => navigation.navigate('Create')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  cardStyle: {
    marginTop: 4,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 12,
  },
  cardViews: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 4,
    elevation: 12,
  },
  row: {
    flexDirection: 'row',
    marginVertical: 3
  },
  infoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 16
  },
  iconStyle: {
    marginRight: 5
  },
  PropertyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 3
  },
  Address: {
    fontSize: 15,
    color: '#000',
    marginVertical: 3
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  searchInput: {
    marginTop: 8,
    marginHorizontal: 10,
    marginBottom: 8,
    backgroundColor: '#fff',
    elevation: 11
  }
})

export default PropertyList;