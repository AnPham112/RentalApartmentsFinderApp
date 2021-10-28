import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text, Image, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';

const images = [
  'https://cdn.pixabay.com/photo/2016/11/29/03/53/house-1867187_960_720.jpg',
  'https://cdn.pixabay.com/photo/2015/03/26/09/41/condominium-690086_960_720.jpg',
  'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
]

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Home = ({ navigation }) => {
  const [imgActive, setImgActive] = useState(0);

  const onchange = (nativeEvent) => {
    if (nativeEvent) {
      const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
      if (slide != imgActive) {
        setImgActive(slide);
      }
    }
  }

  return (
    <View>
      <View style={styles.wrap}>
        <ScrollView
          onScroll={({ nativeEvent }) => onchange(nativeEvent)}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          style={styles.wrap}
        >
          {
            images.map((img, index) => (
              <Image
                key={index}
                resizeMode='stretch'
                style={styles.wrap}
                source={{ uri: img }}
              />
            ))
          }
        </ScrollView>
        <View style={styles.indicatorContainer}>
          {
            images.map((img, index) => (
              <View key={index} style={imgActive == index ? styles.indicatorActive : styles.indicator}></View>
            ))
          }
        </View>
      </View>

      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 19, marginBottom: 8 }}>Welcome to</Text>
        <Text style={{ fontFamily: 'RampartOne-Regular', fontSize: 30, color: '#000', marginBottom: 15 }}>HappyHouse</Text>
        <Text style={{ fontSize: 20, marginBottom: 8 }}>Find your sweet home</Text>
        <Button
          mode="contained"
          onPress={() => {
            navigation.replace('List')
          }}
        >
          Get started
        </Button>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wrap: {
    width: WIDTH,
    height: HEIGHT * 0.4,
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  indicator: {
    height: 3,
    width: 30,
    backgroundColor: 'white',
    marginHorizontal: 5,
    marginVertical: 3
  },
  indicatorActive: {
    height: 3,
    width: 30,
    backgroundColor: 'orange',
    marginHorizontal: 5,
    marginVertical: 3
  }
});

export default Home;