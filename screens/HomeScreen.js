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
import { Container } from '../utils/styles';

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

  moveToNextSection = (endingQuestionId, skip=false) => {
    var sections = this.state.sections;
    console.log(`Ending question in ${sections.current} Id ${endingQuestionId}`)
    this.saveResult(endingQuestionId)
    waiting = sections.waiting.length > 0

    if(skip){
      console.log("SKIPPING")
      sections.waiting.push(sections.current);
    }else{
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
    this.setState(sections)
  };

  renderWaitingSections = (section, index) => {
    let id = this.state.sectionResults[section];
    let text = sections[section].questions[id].text
    return (
        <TouchableOpacity 
          key={index}
          onPress={()=> this.continueSection(section, id, index)}>
          <AnswerText>{text}</AnswerText>
        </TouchableOpacity>
    )
  }

  render() {
    let currentSection = this.state.sections.current;
    let waiting = this.state.sections.waiting;
    if (waiting.length > 0){
      console.log(waiting);
      return(
        <ButtonsBox>
          {waiting.map(this.renderWaitingSections)}
        </ButtonsBox>
      );
    }else if (currentSection) {
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
