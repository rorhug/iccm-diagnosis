import React from 'react';
import { 
    View
} from 'react-native';
import { AnswerText, AnswerTextView, Header } from '../../utils/styles';

export class Tutorial extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <View>
        <Header>Tutorial Screen.</Header>
        <AnswerTextView><AnswerText>This screen will have a gif and 2 buttons.</AnswerText></AnswerTextView>
    </View>
  }

}