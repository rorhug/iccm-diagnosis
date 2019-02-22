import React from 'react';
import { Icon } from 'expo';
import { ScrollView } from 'react-native';

import Questions from '../utils/constants';

import styled, { css } from '@emotion/native'

const Header = styled.Text`
  font-weight: bold;
  font-size: 40px;
  padding-bottom: 10px;
`

const ButtonsBox = styled.View`
  display: flex;
  align-items: center;
  margin: 20px 0 0 0;
  background-color: #eeeeee;
  padding-bottom: 10px;
`

const Question = styled.Text`
  font-size: 20px;
`

const AnswerButton = styled.TouchableOpacity`
  width: 100%;
`

const AnswerText = styled.Text`
  font-size: 18px;
  background-color: #ffffff;
  padding: 10px;
  margin: 10px 10px 0 10px;
`

export class Section extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentQuestionId: "1"
    }
  }

  moveToQuestion = (id) => {
    if (id === Questions.nextSection) this.props.onCompletion()
    this.setState({ currentQuestionId: id })
  }

  currentQuestion = () => this.props.questions[this.state.currentQuestionId]


  render() {
    let question = this.currentQuestion()
    const answerButtons = question.answers.map((answer, index) => 
    <AnswerButton
      accessibilityLabel={answer.text}
      onPress={() => this.moveToQuestion(answer.goto)}
      key={index}
    >
      <AnswerText>{answer.text}</AnswerText>
    </AnswerButton>)


    return <ScrollView>
      <Header>{this.props.title}</Header>

      <Question>{question.text}</Question>

      <ButtonsBox>
        {answerButtons}
      </ButtonsBox>
    </ScrollView>
  }

}


