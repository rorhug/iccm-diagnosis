import React from 'react';
import { 
    View,
    ScrollView 
} from 'react-native';
import styled, { css } from '@emotion/native'

// Create Buttons with Images for this screen.

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

export default class CounterChoiceScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  navigateTo = (screenName)=> {
      this.props.navigation.navigate(screenName)
  }

  render() {
    return <View>
        <Header>Counter Choice.</Header>
        <AnswerText>This screen will have buttons with images.</AnswerText>
        <ButtonsBox>
            <AnswerButton onPress={() => this.navigateTo('Tutorial')}>
                <AnswerText>RECORD</AnswerText>
            </AnswerButton>
            <AnswerButton onPress={() => this.navigateTo('TapCounter')}>
                <AnswerText>TAP</AnswerText>
            </AnswerButton>
        </ButtonsBox>
    </View>
  }

}