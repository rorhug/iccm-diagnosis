import React from 'react';
import { 
  BlueButton, 
  ColumnContainer,
  Question,
  QuestionBox,
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
        <QuestionBox><Question>
          Press start to record the childs breath for 1 minute
        </Question></QuestionBox>
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