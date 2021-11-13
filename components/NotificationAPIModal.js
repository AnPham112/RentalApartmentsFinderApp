import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Vibration } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Sound from 'react-native-sound';

const WIDTH = Dimensions.get('window').width;

const NotificationAPIModal = (props) => {
  const [ringIsDisabled, setRingIsDisabled] = useState(false);
  const [vibrateIsDisabled, setVibrateIsDisabled] = useState(false);

  const sound = new Sound('doorbell.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
  });

  const playSound = () => {
    setRingIsDisabled(true)
    sound.play((success) => {
      if (!success) {
        console.log('Sound does not play')
      }
    })
    setTimeout(() => {
      setRingIsDisabled(false)
    }, 1800);
  }

  const startVibration = () => {
    setVibrateIsDisabled(true)
    Vibration.vibrate(1000);
    setTimeout(() => {
      setVibrateIsDisabled(false)
    }, 1100);
  };

  const closeModal = (bool) => {
    props.changeModalVisible(bool);
  }

  return (
    <TouchableOpacity
      disabled={true}
      style={styles.container}>
      <View style={styles.modal}>
        <View style={styles.textView}>
          <Text style={[styles.titleText, { color: 'purple' }]}>
            Notification API
          </Text>
          <Text style={styles.descText}>
            Click the button to execute the feature
          </Text>
        </View>
        <View style={styles.buttonsView}>
          <TouchableOpacity
            style={styles.touchableOpacity}
            disabled={ringIsDisabled}
            onPress={playSound}
          >
            <View style={styles.button}>
              <FontAwesome name="bell" size={16} color='#017071' />
              <Text style={[styles.btnText, { color: '#017071' }]}>
                Ring bell
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.touchableOpacity}
            disabled={vibrateIsDisabled}
            onPress={startVibration}
          >
            <View style={styles.button}>
              <MaterialIcons name="vibration" size={18} color='#017071' />
              <Text style={[styles.btnText, { color: '#017071' }]}>
                Vibrate
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchableOpacity}
            onPress={() => closeModal(false)}
          >
            <Text style={[styles.btnText, { color: '#017071' }]}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modal: {
    height: 150,
    width: WIDTH - 40,
    backgroundColor: '#F3E2A9',
    borderRadius: 8
  },
  textView: {
    flex: 1,
    // alignItems: 'center'
  },
  titleText: {
    color: 'purple',
    fontWeight: 'bold',
    fontSize: 24,
    marginVertical: 8,
    marginHorizontal: 16
  },
  descText: {
    marginVertical: 8,
    marginHorizontal: 16,
    fontSize: 16,
    color: '#000'
  },
  btnText: {
    marginVertical: 8,
    marginHorizontal: 16,
    fontSize: 16,
    fontWeight: 'bold'
  },
  touchableOpacity: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center'
  },
  buttonsView: {
    width: '100%',
    flexDirection: 'row'
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export default NotificationAPIModal;