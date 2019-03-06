import React from 'react';
import { Icon } from 'expo';
import { ScrollView } from 'react-native';

import { Sections } from '../utils/constants';

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

const initialState = {
  currentQuestionId: "1"
}

export class Section extends React.Component {
  constructor(props) {
    super(props)
    this.state = props.initialState || initialState;
    console.log(this.state);
    console.log(this.props.questionBox())
  }

  moveToQuestion = (id) => {
    //let currentQuestion = this.currentQuestion()
    
    //if (id === Sections.next) this.props.onCompletion()
    this.setState({ currentQuestionId: id })
  }

  currentQuestion = () => this.props.questions[this.state.currentQuestionId]

  answerButtons = (question) => {
    if (question.sectionEnd) {
      return <AnswerButton onPress={() => this.props.onCompletion(this.state.currentQuestionId)}>
        <AnswerText>Next Section</AnswerText>
      </AnswerButton>
    } else if (question.answers.length > 0) {
      return question.answers.map((answer, index) => 
        <AnswerButton
          accessibilityLabel={answer.text}
          onPress={() => this.moveToQuestion(answer.goto)}
          key={index}
        >
          <AnswerText>{answer.text}</AnswerText>
        </AnswerButton>)
    } else {
      return <Text>Invalid Question (no answers or sectionEnd)</Text>
    }
  }

  renderQuestions = (question) => {
    if(this.props.questionBox){
      return <this.props.questionBox/>
    }else{
      return <Question>{question.text}</Question>
    }
  }

  // {question.text}</QuestionBox>
  render() {
    let question = this.currentQuestion();
    console.log(this.props.questionBox);
    
    // let QuestionBox = this.props.questionBox || Question;
    // console.log(QuestionBox);
    return <ScrollView>
      <Header>{this.props.title}</Header>
      {this.renderQuestions(question)}
      <ButtonsBox>
        {this.answerButtons(question)}
      </ButtonsBox>
    </ScrollView>
  }

}


