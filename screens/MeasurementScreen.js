import React from 'react';
import{
  Text,
  Button,
  View,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import { BlueButton, Container } from '../utils/styles'

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'MeasurementScreen',
  };

  navTapCounter = (navigate) => {
    navigate('Counter', {
      endButton : 'Return',
      respRate: () => { this.props.navigation.pop() }
    })
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container style={{justifyContent: 'space-between'}}>

        <BlueButton 
          title="Breaths per Minute Using TapCounter" 
          onPress={()=>this.navTapCounter(navigate)}
        />
        <BlueButton 
          title="Breaths per Minute Using SoundAnalysis"
          onPress={() => navigate('Counter1')}
        />
      </Container>
    );
  }
}