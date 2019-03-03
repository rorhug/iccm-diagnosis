import React from 'react';
import { 
    View,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native';
import styled, { css } from '@emotion/native'

// Create Buttons with Images for this screen.
const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 20px;
  margin-top: 20px;
  align-items: center;
  justify-content: space-around;
`

const SubHeading = styled.Text`
    font-weight: bold;
    font-size: 24px;
    padding-bottom: 10px;
`

const ImageButtonBox = styled.View`
  align-self: baseline;
  background-color: #eeeeee;
  padding: 10px;
`

const AnswerText = styled.Text`
    font-size: 18px;
    text-align: center;
    font-weight: bold;
    background-color: #ffffff;
    padding: 10px;
    margin-top: 10px;
`

export default class CounterChoiceScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  navigateTo = (screenName)=> {
      this.props.navigation.navigate(screenName)
  }

  render() {
    return <Container>
        <SubHeading>How would you like to count Respiratory Rate?</SubHeading>

        {/* When clicked navigate to appropriate screen. Record -> TutorialScreen, Tap -> TapCounterScreen */}
        <TouchableOpacity>
            <ImageButtonBox>
                <Image
                source={require('../assets/images/breathing-thing.jpg')}
                style={{width: 150, height: 150}}
                />
                <AnswerText>RECORD</AnswerText>
            </ImageButtonBox>
        </TouchableOpacity>



        <TouchableOpacity>
            <ImageButtonBox>
                <Image
                source={require('../assets/images/tap.jpg')}
                style={{width: 150, height: 150}}
                />
                <AnswerText>TAP</AnswerText>
            </ImageButtonBox>
        </TouchableOpacity>
    </Container>
  }

}