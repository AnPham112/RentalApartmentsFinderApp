import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { Card, FAB, Title } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Search from '../components/Search';
import InfoIcon from '../components/InforIcon';

const PropertyList = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fullData, setFullData] = useState([]);
  const [search, setSearch] = useState('');

  const fetchData = () => {
    fetch('http://192.168.1.24:3000/')
      .then(res => res.json())
      .then(results => {
        setData(results);
        setFullData(results);
        setLoading(false);
      })
  }

  useEffect(() => {
    fetchData();
  }, []);

  const renderPropertyList = (item) => {
    return (
      <Card style={styles.cardStyle} onPress={() => navigation.navigate('Detail', { item })}>
        <View style={styles.cardViews}>
          <Title style={styles.PropertyName}>{item.name}</Title>
          <Text style={styles.Address}>{item.address}</Text>
          <View style={styles.row}>
            <InfoIcon name={'home'} size={20} color={'#000'}>{item.type}</InfoIcon>
            <InfoIcon name={'bed'} size={20} color={'#000'}>{item.bedroom}</InfoIcon>
            <InfoIcon name={'tag'} size={20} color={'#000'}>${item.price}</InfoIcon>
            <InfoIcon name={'user-cog'} size={20} color={'#000'}>{item.reporter}</InfoIcon>
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
    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#ffbe5d', '#ffd75d', '#fcf067']} style={styles.linearGradient}>
      <View style={styles.container}>
        <Search
          name={'search'}
          size={20}
          autoCapitalize={'none'}
          autoCorrect={false}
          placeholder={'Search property name here'}
          value={search}
          onChangeText={(text) => handleSearch(text)}
        />
        <FlatList
          data={data}
          renderItem={({ item }) => {
            return renderPropertyList(item)
          }}
          keyExtractor={item => item._id}
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
    </LinearGradient >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  linearGradient: {
    flex: 1
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

export default PropertyList;