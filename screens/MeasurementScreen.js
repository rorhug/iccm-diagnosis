import React from 'react';
import { BlueButton, ColumnContainer } from '../utils/styles'

export default class MeasurementScreen extends React.Component {
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
      <ColumnContainer style={{justifyContent: 'space-between'}}>

        <BlueButton 
          title="Breaths per Minute Using TapCounter" 
          onPress={()=>this.navTapCounter(navigate)}
        />
        <BlueButton 
          title="Breaths per Minute Using SoundAnalysis"
          onPress={() => navigate('Counter1')}
        />
      </ColumnContainer>
    );
  }
}