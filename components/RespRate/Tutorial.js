import React from 'react';
import { 
    View,
    ScrollView
} from 'react-native';
import { AnswerText, Header } from '../../utils/styles';

export class Tutorial extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <View>
        <Header>Tutorial Screen.</Header>
        <AnswerText>This screen will have a gif and 2 buttons.</AnswerText>
    </View>
  }

}