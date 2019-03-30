import React from 'react';
import { Icon } from 'expo';
import Collapsible from 'react-native-collapsible';
import RespiratoryRate from './RespRate/RespiratoryRate';
import { Ionicons } from '@expo/vector-icons';

import { 
    Container, 
    ScrollContainer,
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
      activeCollapibles: []
    }
  }

  currentQuestion = () => this.props.questions[this.state.currentQuestionId]

  gotoQuestion = (goto) => {
    if (typeof goto === 'function') {
      this.setState({ currentQuestionId: goto(this.props.patient) })
    } else {
      this.setState({ currentQuestionId: goto })
    }
    // if (this.props.questions[id].containsFunction) {
    //   id = this.props.questions[id].function(this.props.patientAge);
    // }

    // this.setState({ currentQuestionId: id })
  }

  _toggleSection(answer) {
    const activeCollapibles = this.state.activeCollapibles
    let updatedSections = [];

    if (activeCollapibles.includes(answer)) {
      updatedSections = activeCollapibles.filter(a => a !== answer);
    } else if (this.props.expandMultiple) {
      updatedSections = [...activeCollapibles, answer];
    } else {
      updatedSections = [answer];
    }
    this.setState({ activeCollapibles: updatedSections });
  }

  infoCollapsable = (answer, key) => {
    return (
      <>
        <InfoButton onPress={() => this._toggleSection(key)}>
          <AnswerTextView><Ionicons name="md-information-circle" size={25} color="#FFB732"/></AnswerTextView>
        </InfoButton>

        <LineBreak />

        <Collapsible
          collapsed={!this.state.activeCollapibles.includes(key)}
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
            onPress={() => answer.goto === undefined ?
              this.props.onCompletion(index) :
              this.gotoQuestion(answer.goto)}
          >
            <AnswerTextView><AnswerText>{answer.text}</AnswerText></AnswerTextView>
          </AnswerButton>
          {answer.info != undefined && this.infoCollapsable(answer, index)}
        </AnswerRow>)
    }
    else {
      return <AnswerTextView><AnswerText>Invalid Question (no answers or sectionEnd)</AnswerText></AnswerTextView>
    }
  }

  renderQuestion = (question) => {
    /* Do not change the styling on first View. */
    return <Container>
        <Header>{this.props.title}</Header>
        <ScrollContainer>

            <QuestionBox>
                <Question>{question.text}</Question>
            </QuestionBox>

            <ButtonsBox>
                {this.answerButtons(question)}
            </ButtonsBox>

        </ScrollContainer>
    </Container>
  }

  // TODO move the following to functions out of Section
  respRateDecision = (question) => {
    return function (respRate) {
      const questionId = question.resultToGoto(this.props.patient, respRate)
      console.log(`Section.respRateDecision :: Next question id = ${questionId}`)
      this.gotoQuestion(questionId)
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
    
    if (question.specialScreen) {
      return this.renderSpecialScreen(question);
    } else {
      return this.renderQuestion(question);
    }
  }

}
