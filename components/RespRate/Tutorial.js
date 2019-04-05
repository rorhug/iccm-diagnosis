import React from 'react';
import {
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { 
  AnswerText, 
  AnswerTextView,
  Container, 
  Header } from '../../utils/styles';
import { RrComponents } from '../../utils/constants';


export default class Tutorial extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {

    return <Container>
      <Header title="Tutorial Screen"/>
      <View>
        <Image
          source={require('../../assets/images/breathing-thing.jpg')}
          style={{ width: 150, height: 150 }}
        />
      </View>
      <View>
        <Image
          source={require('../../assets/images/tap.jpg')}
          style={{ width: 150, height: 150 }}
        />
      </View>
      <View>
        <TouchableOpacity onPress={() => this.props.renderNext(RrComponents.recorder)}>
          <AnswerText>All Setup Ready to Record</AnswerText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.renderNext(RrComponents.tapcounter)}>
          <AnswerText>Too Noisy/Baby Crying/..</AnswerText>
        </TouchableOpacity>
      </View>
    </Container>
  }

}