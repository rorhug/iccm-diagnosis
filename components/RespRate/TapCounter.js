import React from 'react';
import { 
    View,
    ScrollView
} from 'react-native';
import styled, { css } from '@emotion/native'

const Header = styled.Text`
  font-weight: bold;
  font-size: 40px;
  padding-bottom: 10px;
`

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 20px;
  margin-top: 40px;
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

export class TapCounter extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <Container>
        <Header>Tap Counter Screen.</Header>
        <AnswerText>This screen will have a Tap Counter.</AnswerText>
        <ButtonsBox>
            <AnswerButton onPress={() => this.props.respRate(30)}>
                <AnswerText>RR = 30</AnswerText>
            </AnswerButton>
            <AnswerButton onPress={() => this.props.respRate(50)}>
                <AnswerText>RR = 50</AnswerText>
            </AnswerButton> 
        </ButtonsBox>
    </Container>
  }

}