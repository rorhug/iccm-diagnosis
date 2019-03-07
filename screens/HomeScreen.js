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
import { Cough } from '../components/Sections/Cough';
import { DangerSigns } from '../components/Sections/DangerSigns';
import { Diarrhoea } from '../components/Sections/Diarrhoea';
import { Fever } from '../components/Sections/Fever';
import { PatientDetails } from '../components/Sections/PatientDetails';
import { Sections } from '../utils/constants';

import styled, { css } from '@emotion/native'
import { Section } from '../components/Section';

import { ResultsScreen } from './ResultsScreen';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 20px;
  margin-top: 40px;
`
const End = <View>End of Survey</View>

const sections = {
  [Sections.patient_details]: PatientDetails,
  [Sections.dangersigns]: DangerSigns,
  [Sections.fever]: Fever,
  [Sections.cough]: Cough,
  [Sections.diarrhoea]: Diarrhoea,
}

const initialState = () => {
  return {
    sections: {
      current: Sections.patient_details,
      next: [Sections.dangersigns, Sections.fever, Sections.cough, Sections.diarrhoea],
      waiting: [],
      completed: []
    },
    sectionResults: {}
  }
}


export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = initialState()
  }

  currentSection = () => this.state.sections.current;

  moveToNextSection = (endingQuestionId) => {
    var sections = this.state.sections;
    console.log(`Ending question in ${sections.current} Id ${endingQuestionId}`)

    this.saveResult(endingQuestionId)
    sections.completed.push(sections.current);
    sections.current = sections.next.shift();

    this.setState( sections );
  };

  saveResult = (id) => {
    this.setState({
      sectionResults: { ...this.state.sectionResults, [this.state.sections.current]: id }
    })
  }

  resetState = () => {
    this.setState(initialState())
  }

  static navigationOptions = {
    header: null,
  };

  render() {
    let currentSection = this.state.sections.current;
    if (currentSection) {
      let CurrentSectionComponent = sections[currentSection]
      return (
        <Container>
          <CurrentSectionComponent
            navigation={this.props.navigation}
            patientAge={PatientDetails.patientAge(this.state.sectionResults[Sections.patient_details])} 
            onCompletion={this.moveToNextSection}
          />
        </Container>
      );
    } else {
      return (
        <ScrollView>
          <Container>
            <ResultsScreen 
              reset={this.resetState} 
              sectionResults={this.state.sectionResults} 
              sectionComponents={sections} 
            />
          </Container>
        </ScrollView>
      );
    }
  }

}
