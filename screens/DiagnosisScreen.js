import React from 'react';
import PropTypes from 'prop-types'
import {
  ScrollView,
  View
} from 'react-native';
import { WebBrowser } from 'expo';
import { toJS } from 'mobx'

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

const sectionComponents = {
  [Sections.patient_details]: PatientDetails,
  [Sections.dangersigns]: DangerSigns,
  [Sections.fever]: Fever,
  [Sections.cough]: Cough,
  [Sections.diarrhoea]: Diarrhoea,
}

const initialSectionsForPatient = patient => {
  let sections = [
    Sections.dangersigns,
    Sections.fever,
    Sections.cough,
    Sections.diarrhoea
  ]
  if (!patient.ageEstimateText) { sections.unshift(Sections.patient_details) }
  return sections
}

export default class DiagnosisScreen extends React.Component {

  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          patient: PropTypes.object.isRequired,
        }).isRequired
      })
    })
  }

  static initialState = (patient) => {
    let { sectionResults } = patient.data
    let sections = initialSectionsForPatient(patient)
    let completedSections = Object.keys(sectionResults)
    let remainingSections = sections.filter(section => !completedSections.includes(section))

    return {
      sections: {
        startQuestion: 0,
        current: remainingSections.shift(),
        next: remainingSections,
        waiting: [],
        completed: completedSections
      },
      sectionResults: toJS(sectionResults)
    }
  }

  constructor(props) {
    super(props)
    this.state = DiagnosisScreen.initialState(this.patient())
  }

  static navigationOptions = {
    header: null,
  };

  patient = () => this.props.navigation.getParam('patient')

  restartDiagnosis = () => this.patient().removeDiagnosis().then(() => this.setState(DiagnosisScreen.initialState(this.patient())))

  currentSection = () => this.state.sections.current

  saveResult = (id) => {
    let sectionResults = { ...this.state.sectionResults, [this.state.sections.current]: id }
    this.setState({
      sectionResults
    })

    let isComplete = this.state.sections.next.length === 0
    this.patient().update({
      sectionResults,
      ...(isComplete && { diagnosedAt: new Date })
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

    this.setState({ sections })
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
    this.setState({ sections })
  };

  skipWaitScreen = () => {
    let sections = this.state.sections
    sections.waitScreen = false
    this.setState({ sections })
  };

  render() {
    console.log(this.state)
    let currentSection = this.state.sections.current;
    if (this.state.sections.waitScreen) {
      return (
        <WaitingScreen
          waiting={this.state.sections.waiting}
          sectionResults={this.state.sectionResults}
          continueSection={this.continueSection}
          skipWaitScreen={this.skipWaitScreen}
          components={sections}
        />
      );
    } else if (currentSection) {
      let CurrentSectionComponent = sectionComponents[currentSection]
      return (
        <Container>
          <CurrentSectionComponent
            navigation={this.props.navigation}
            patient={this.patient()}
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
            restartDiagnosis={this.restartDiagnosis}
            sectionResults={this.state.sectionResults}
            sectionComponents={sectionComponents}
            continueSection={this.continueSection}
            navigation={this.props.navigation}
          />
        </Container>
      );
    }
  }

}
