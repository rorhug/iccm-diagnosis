import React from 'react';
import {
  Text,
  Button,
  View,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'MeasurementScreen',
  };


  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={() => {
          navigate('Counter', {
            endButton : 'Return',
            respRate: () => { this.props.navigation.pop() }
          })
        }
        } underlayColor="white">
          <View style={styles.button}>
            <Text style={styles.buttonText}>Breaths per Minute Using TapCounter</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => navigate('Counter1')}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Breaths per Minute Using SoundAnalysis</Text>
          </View>
        </TouchableHighlight>
      </View>
      //  <Button
      //    title="Breaths per Minute Using SoundAnalysis"
      //    onPress={() => navigate('Counter1')}
      //  />
    );
  }
}
//remove just temp styling
const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    alignItems: 'center'
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  buttonText: {
    padding: 20,
    color: 'white'
  }
});
