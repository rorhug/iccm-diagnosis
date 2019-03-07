import React from 'react';
import { Icon } from 'expo';
import { ScrollView, Text, View, Dimensions } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { Sections } from '../utils/constants';
import RespiratoryRate from './RespRate/RespiratoryRate';

import styled, { css } from '@emotion/native'

const info_width = (Dimensions.get('window').width/100)*80;

const Header = styled.Text`
  font-weight: bold;
  font-size: 40px;
  padding-bottom: 10px;
`

const InfoText = styled.Text({
  padding: 20,
  width: info_width
})

const ButtonsBox = styled.View`
  display: flex;
  margin: 20px 0 0 0;
  background-color: #eeeeee;
  padding-bottom: 10px;
`

const Question = styled.Text`
  font-size: 20px;
`

const AnswerButton = styled.TouchableOpacity`
  flex: 2 2;
`

const InfoButton = styled.TouchableOpacity`
`

const AnswerText = styled.Text`
  font-size: 18px;
  background-color: #ffffff;
  padding: 10px;
  margin: 10px 10px 0 10px;
`

const AnswerRow = styled.View`
  display: flex;
  flex-flow: row wrap;
  align-content: space-between;
  justify-content: space-between;
`
const LineBreak = styled.View`
  width: 100%
`

const initialState = {
  currentQuestionId: "0"
}

export class Section extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ...initialState, 
      ...this.props.initialState
    };
    console.log(this.state)
    console.log(this.props)
  }

  moveToQuestion = (id) => {
    this.setState({ currentQuestionId: id })
  }

  currentQuestion = () => this.props.questions[this.state.currentQuestionId]

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
    console.log(updatedSections)
    this.setState({ activeSections: updatedSections });
  }

  infoCollapsable = (answer, key) => {
    return (
      <>
        <InfoButton onPress={() => this._toggleSection(key)}>
            <AnswerText>help</AnswerText>
        </InfoButton>

        <LineBreak/>

        <Collapsible 
          collapsed={!this.state.activeSections.includes(key)}>
          
          <InfoText>{answer.info}</InfoText>
        </Collapsible>
      </>
    )
  }

  respRateDecision = (question) => {
    return function(respRate) {
        questionId = question.resultToGoto(respRate)
        console.log(`Section.respRateDecision :: Next question id = ${questionId}`)
        this.moveToQuestion(questionId)
    }.bind(this)
  }

answerButtons = (question) => {
    if (question.sectionEnd && !question.answers)
    {
    return <AnswerButton onPress={() => this.props.onCompletion(this.state.currentQuestionId)}>
        <AnswerText>Next Section</AnswerText>
    </AnswerButton>
    }
    else if (question.containsFunction)
    {
        // This function takes age.
        question.function()
    }
    else if (question.answers.length > 0) 
    {
    return question.answers.map((answer, index) =>
        <AnswerRow key={index}>
        <AnswerButton
            accessibilityLabel={answer.text}
            onPress={() => question.sectionEnd ? 
            this.props.onCompletion(this.state.currentQuestionId) :
            this.moveToQuestion(answer.goto)}
        >
            <AnswerText>{answer.text}</AnswerText>
        </AnswerButton>
        {answer.info!=undefined && this.infoCollapsable(answer, index)}
        </AnswerRow>)
    } 
    else 
    {
    return <Text>Invalid Question (no answers or sectionEnd)</Text>
    }
}

  renderQuestion = (question) => {
    return <ScrollView>
        <Header>{this.props.title}</Header>
        <Question>{question.text}</Question>

        <ButtonsBox>
            {this.answerButtons(question)}
        </ButtonsBox>

    </ScrollView>
  }

  renderSpecialScreen = (question) => {
    switch(question.screenTitle) {
        case "RespiratoryRate":
            return <RespiratoryRate respRate={this.respRateDecision(question)}/>
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


