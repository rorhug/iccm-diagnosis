import React from 'react';
import { 
  BlueButton, 
  ColumnContainer,
  Question,
} from '../utils/styles'

export default class MeasurementScreen extends React.Component {
  static navigationOptions = {
    title: 'MeasurementScreen',
  };

  navTapCounter = (navigate) => {
    navigate('Counter', {
      endButton : 'Return to Measurement Screen',
      respRate: () => { this.props.navigation.pop() }
    })
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ColumnContainer>
        <Question
          text="Press start to record the childs breath for 1 minute."
        />
        <BlueButton 
          title="Breaths per Minute Using TapCounter" 
          onPress={()=>this.navTapCounter(navigate)}
        />
        <BlueButton 
          title="Breaths per Minute Using Recordings"
          onPress={() => navigate('Counter1')}
        />
      </ColumnContainer>
    );
  }
}