import React from 'react';
import { Icon } from 'expo';
import { ScrollView, Text, View, Dimensions, Image } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { Sections } from '../utils/constants';
import RespiratoryRate from './RespRate/RespiratoryRate';
import { Ionicons } from '@expo/vector-icons';

import { 
    Header,
    InfoText,
    QuestionBox,
    ButtonsBox,
    Question,
    AnswerButton,
    InfoButton,
    InfoImage,
    AnswerText,
    AnswerTextView,
    AnswerRow,
    LineBreak
} from '../utils/styles';

export class Section extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentQuestionId: this.props.startQuestion,
      ...this.props.initialState
    };
  }

  currentQuestion = () => this.props.questions[this.state.currentQuestionId]

  moveToQuestion = (id) => {
    if (this.props.questions[id].containsFunction) {
      id = this.props.questions[id].function(this.props.patientAge);
    }

    this.setState({ currentQuestionId: id })
  }

  _toggleSection(answer) {
    const activeSections = this.state.activeSections
    let updatedSections = [];

    if (activeSections.includes(answer)) {
      updatedSections = activeSections.filter(a => a !== answer);
    } else if (this.props.expandMultiple) {
      updatedSections = [...activeSections, answer];
    } else {
      updatedSections = [answer];
    }
    this.setState({ activeSections: updatedSections });
  }

  infoCollapsable = (answer, key) => {
    return (
      <>
        <InfoButton onPress={() => this._toggleSection(key)}>
          <AnswerTextView><Ionicons name="md-information-circle" size={25} color="#FFB732"/></AnswerTextView>
        </InfoButton>

        <LineBreak />

        <Collapsible
          collapsed={!this.state.activeSections.includes(key)}
        >
          <InfoText>{answer.info}</InfoText>
          {answer.img && <InfoImage source={answer.img}/>}
        </Collapsible>
      </>
    )
  }

  answerButtons = (question) => {
    if (question.sectionEnd && !question.answers) {
      return <AnswerButton onPress={() => this.props.onCompletion(this.state.currentQuestionId)}>
        <AnswerTextView><AnswerText>Next Section</AnswerText></AnswerTextView>
      </AnswerButton>
    }
    else if (question.answers.length > 0) {
      return question.answers.map((answer, index) =>
        <AnswerRow key={index}>
          <AnswerButton
            accessibilityLabel={answer.text}
            onPress={() => answer.goto===undefined ?
              this.props.onCompletion(index, skip=answer.skip) :
              this.moveToQuestion(answer.goto)}
          >
            <AnswerTextView><AnswerText>{answer.text}</AnswerText></AnswerTextView>
          </AnswerButton>
          {answer.info != undefined && this.infoCollapsable(answer, index)}
        </AnswerRow>)
    }
    else {
      return <Text>Invalid Question (no answers or sectionEnd)</Text>
    }
  }

  renderQuestion = (question) => {
    /* Do not change the styling on first View. */
    return <View style={{ flex: 1 }}>
        <Header>{this.props.title}</Header>
        <ScrollView style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20 }}>

            <QuestionBox>
                <Question>{question.text}</Question>
            </QuestionBox>

            <ButtonsBox>
                {this.answerButtons(question)}
            </ButtonsBox>

        </ScrollView>
    </View>
  }

  // TODO move the following to functions out of Section
  respRateDecision = (question) => {
    return function (respRate) {
      questionId = question.resultToGoto(this.props.patientAgeOne, respRate)
      console.log(`Section.respRateDecision :: Next question id = ${questionId}`)
      this.moveToQuestion(questionId)
    }.bind(this)
  }

  renderSpecialScreen = (question) => {
    switch (question.screenTitle) {
      case "RespiratoryRate":
        return <RespiratoryRate respRate={this.respRateDecision(question)} />
    }
  }

  render() {
    let question = this.currentQuestion()
    console.log(this.state.currentQuestionId)
    if (question.specialScreen) {
      return this.renderSpecialScreen(question);
    } else {
      return this.renderQuestion(question);
    }
  }

}