import React from 'react';

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
    AnswerTextView,
    AnswerRow,
    LineBreak
} from '../utils/styles';

export class Section extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentQuestionId: this.props.startQuestion,
      activeCollapsibles: [],
      stack: [],
    }
  }

  currentQuestion = () => this.props.questions[this.state.currentQuestionId]

  gotoQuestion = (goto) => {

    this.setState({
      stack: [this.state.currentQuestionId, ...this.state.stack],
      currentQuestionId: typeof goto === 'function' ? goto(this.props.patient) : goto
    })
  }

  goBack = () => {
    let prev = this.state.stack.pop()
    this.setState({
      stack: this.state.stack,
      currentQuestionId: prev || this.props.startQuestion,
    })
  }

  _toggleSection(answer) {
    const activeCollapsibles = this.state.activeCollapsibles
    let updatedSections = [];

    if (activeCollapsibles.includes(answer)) {
      updatedSections = activeCollapsibles.filter(a => a !== answer);
    } else if (this.props.expandMultiple) {
      updatedSections = [...activeCollapsibles, answer];
    } else {
      updatedSections = [answer];
    }
    this.setState({ activeCollapsibles: updatedSections });
  }

  infoCollapsable = (answer, key) => {
    return (
      <>
        <InfoButton onPress={() => this._toggleSection(key)}>
          <AnswerTextView><Ionicons name="md-information-circle" size={25} color="#FFB732" /></AnswerTextView>
        </InfoButton>

        <LineBreak />

        <Collapsible
          collapsed={!this.state.activeCollapsibles.includes(key)}
        >
          <InfoText>{answer.info}</InfoText>
          {answer.img && <InfoImage source={answer.img} />}
        </Collapsible>
      </>
    )
  }

  answerButtons = (question) => {
    if (question.sectionEnd && !question.answers) {
      return <AnswerButton 
        onPress={() => this.props.onCompletion(this.state.currentQuestionId)}
        title="Next Section"
        />
    }
    else if (question.answers.length > 0) {
      return question.answers.map((answer, index) =>
        <AnswerRow key={index}>
          <AnswerButton
            title={answer.text}
            accessibilityLabel={answer.text}
            onPress={() => answer.goto === undefined ?
              this.props.onCompletion(index, skip = answer.skip) :
              this.gotoQuestion(answer.goto)}
          />
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
      <Header title={this.props.title} 
        onPress={this.goBack} visible={this.state.stack.length>0}
      />
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
