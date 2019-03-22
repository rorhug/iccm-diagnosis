import React from 'react';
import {
  ScrollView,
  View
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import { Cough } from '../components/Sections/Cough';
import { DangerSigns } from '../components/Sections/DangerSigns';
import { Diarrhoea } from '../components/Sections/Diarrhoea';
import { Fever } from '../components/Sections/Fever';
import { PatientDetails } from '../components/Sections/PatientDetails';
import { Sections, QuestionText } from '../utils/constants';

import { ResultsScreen } from './ResultsScreen';
import {
  Container,
  Header,
  QuestionBox,
  Question,
  ButtonsBox,
  AnswerButton,
  AnswerText,
  AnswerTextView,
} from '../utils/styles';

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


export default class HomeScreen extends React.Component {

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

  continueSection = (section, id, index) => {
    var sections = this.state.sections;
    sections.next.push(sections.current);
    sections.current = section;
    sections.waiting.splice(index, 1);
    sections.startQuestion = id;
    sections.waitScreen = false;
    this.setState(sections)
  };

  renderWaitingSections = (section, index) => {
    let id = this.state.sectionResults[section];
    let text = sections[section].questions[id].text
    return (
      <AnswerButton
        key={index}
        onPress={() => this.continueSection(section, id, index)}>
        <AnswerTextView><AnswerText>{text}</AnswerText></AnswerTextView>
      </AnswerButton>
    )
  }

  render() {
    let currentSection = this.state.sections.current;
    if (this.state.sections.waitScreen) {
      return (
        /* Do not change the styling on this View. */
        <View style={{ flex: 1 }}>
          <Header>Unfinished sections</Header>
          <ScrollView style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20 }}>

            <QuestionBox>
              <Question>Select Section to continue</Question>
            </QuestionBox>
            <ButtonsBox>
              {this.state.sections.waiting.map(this.renderWaitingSections)}
              <AnswerButton
                onPress={() => {
                  let sections = this.state.sections;
                  sections.waitScreen = false;
                  this.setState(sections);
                }}>
                  <AnswerTextView>
                    <AnswerText>No - continue</AnswerText>
                  </AnswerTextView>
              </AnswerButton>
            </ButtonsBox>
          </ScrollView>

        </View>
      );
    } else if (currentSection) {
      let CurrentSectionComponent = sections[currentSection]
      let age_id = this.state.sectionResults[Sections.patient_details]
      return (
        /* Do not change the styling on this View. */
        <View style={{ flex: 1 }}>
          <CurrentSectionComponent
            navigation={this.props.navigation}
            patientAge={PatientDetails.patientAge(age_id)}
            patientAgeOne={PatientDetails.patientAgeOne(age_id)}
            onCompletion={this.moveToNextSection}
            startQuestion={this.state.sections.startQuestion}
          />
        </View>
      );
    } else {
      return (
        /* Do not change the styling on this View. */
        <View style={{ flex: 1 }}>
          <ResultsScreen
            reset={this.resetState}
            sectionResults={this.state.sectionResults}
            sectionComponents={sections}
          />
        </View>
      );
    }
  }

}
