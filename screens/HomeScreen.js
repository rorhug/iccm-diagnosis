import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import { Fever } from '../components/Sections/Fever';
import { Cough } from '../components/Sections/Cough';
import { Diarrhoea } from '../components/Sections/Diarrhoea';
import { Sections } from '../utils/constants';

import styled, { css } from '@emotion/native'
import { Section } from '../components/Section';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 20px;
  margin-top: 40px;
`
const End = <View>End of Survey</View>

const sections = {
  [Sections.fever]: Fever,
  [Sections.cough]: Cough,
  [Sections.diarrhoea]: Diarrhoea,
}

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      sections: {
        current: Sections.fever,
        next: [Sections.cough, Sections.diarrhoea],
        waiting: [],
        completed: []
      }
    };
  }

  currentSection = () => this.state.sections.current;

  moveToNextSection = () => {
    var sections = this.state.sections;
    sections.completed.push(sections.current);
    sections.current = sections.next.shift();

    this.setState(
      sections
    );
  };

  static navigationOptions = {
    header: null,
  };

  render() {
    // current default content
    let content = <Text>You have completed all Sections.</Text>

    let CurrentSection = sections[this.state.sections.current];
    if (CurrentSection) { 
      content = (<CurrentSection onCompletion={this.moveToNextSection} />)
    }

    return (
      <Container>
        {content}
      </Container>
    );
  }

}

