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



import styled, { css } from '@emotion/native'
import { Section } from '../components/Section';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 20px;
  margin-top: 40px;
`

export default class HomeScreen extends React.Component {
  
  constructor(props){
    super(props)
    this.state = {
      sections: {
        current: <Fever onCompletion={this.moveToNextSection.bind(this)}/>,
        next: [
          <Cough onCompletion={this.moveToNextSection.bind(this)}/>,
          <Diarrhoea onCompletion={this.moveToNextSection.bind(this)}/>
        ],
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
    console.log(sections);

    this.setState(
      sections
    );
  };

  static navigationOptions = {
    header: null,
  };

  render() {

    return (
      <Container>
       { this.currentSection() }
      </Container>
    );
  }

}

