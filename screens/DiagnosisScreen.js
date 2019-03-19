import React from 'react';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import { WaitingScreen } from '../components/WaitingScreen';
import { Cough } from '../components/Sections/Cough';
import { DangerSigns } from '../components/Sections/DangerSigns';
import { Diarrhoea } from '../components/Sections/Diarrhoea';
import { Fever } from '../components/Sections/Fever';
import { PatientDetails } from '../components/Sections/PatientDetails';
import { Sections, QuestionText } from '../utils/constants';
import { Container } from '../utils/styles';


import { ResultsScreen } from './ResultsScreen';

const End = <Container>End of Survey</Container>

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
      startQuestion: 0,
      current: Sections.patient_details,
      next: [
        Sections.dangersigns,
        Sections.fever,
        Sections.cough,
        Sections.diarrhoea
      ],
      waiting: [],
      completed: []
    },
    sectionResults: {}
  }
}


export default class DiagnosisScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = initialState()
  }

  static navigationOptions = {
    header: null,
  };

  resetState = () => {
    this.setState(initialState())
  }

  currentSection = () => this.state.sections.current;

  saveResult = (id) => {
    this.setState({
      sectionResults: { ...this.state.sectionResults, [this.state.sections.current]: id }
    })
  }

  moveToNextSection = (endingQuestionId, skip = false) => {
    var sections = this.state.sections;
    console.log(`Ending question in ${sections.current} Id ${endingQuestionId}`)
    this.saveResult(endingQuestionId)
    sections.waitScreen = sections.waiting.length > 0

    if (skip) {
      sections.waiting.push(sections.current);
    } else {
      sections.completed.push(sections.current);
    }
    sections.current = sections.next.shift();
    sections.startQuestion = 0;

    this.setState(sections);
  };

  continueSection = (section, id) => {
    console.log('new')
    console.log(section)
    var sections = this.state.sections;
    sections.next.push(sections.current);
    sections.current = section;
    index = sections.waiting.indexOf(section)
    if (index > -1) {
      sections.waiting.splice(index, 1);
    }
    sections.startQuestion = id;
    sections.waitScreen = false;
    this.setState(sections)
  };

  skipWaitScreen = () => {
    let sections = this.state.sections;
    sections.waitScreen = false;
    this.setState(sections);
  };

  render() {
    let currentSection = this.state.sections.current;
    if (this.state.sections.waitScreen) {
      return (
        <WaitingScreen
          waiting={this.state.sections.waiting}
          current={currentSection}
          sectionResults={this.state.sectionResults}
          continueSection={this.continueSection}
          skipWaitScreen={this.skipWaitScreen}
          components={sections}
        />
      );
    } else if (currentSection) {
      let CurrentSectionComponent = sections[currentSection]
      let age_id = this.state.sectionResults[Sections.patient_details]
      return (
        <Container>
          <CurrentSectionComponent
            navigation={this.props.navigation}
            patientAge={PatientDetails.patientAge(age_id)}
            patientAgeOne={PatientDetails.patientAgeOne(age_id)}
            onCompletion={this.moveToNextSection}
            startQuestion={this.state.sections.startQuestion}
          />
        </Container>
      );
    } else {
      return (
        /* Do not change the styling on this Container. */
        <Container style={{ flex: 1 }}>
          <ResultsScreen
            reset={this.resetState}
            sectionResults={this.state.sectionResults}
            sectionComponents={sections}
            continueSection={this.continueSection}
          />
        </Container>
      );
    }
  }

}
