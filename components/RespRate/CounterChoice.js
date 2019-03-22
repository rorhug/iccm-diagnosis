import React from 'react';
import { 
    View,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native';
import styled, { css } from '@emotion/native'
import { RrComponents } from '../../utils/constants';
import { 
    AnswerText,
    AnswerTextView
} from '../../utils/styles';

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

export class CounterChoice extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <Container>
        <SubHeading>How would you like to count Respiratory Rate?</SubHeading>

        <TouchableOpacity onPress={() => this.props.renderNext(RrComponents.tutorial)}>
            <ImageButtonBox>
                <Image
                source={require('../../assets/images/breathing-thing.jpg')}
                style={{width: 150, height: 150}}
                />
                <AnswerTextView><AnswerText>RECORD</AnswerText></AnswerTextView>
            </ImageButtonBox>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.renderNext(RrComponents.tapcounter)}>
            <ImageButtonBox>
                <Image
                source={require('../../assets/images/tap.jpg')}
                style={{width: 150, height: 150}}
                />
                <AnswerTextView><AnswerText>TAP</AnswerText></AnswerTextView>
            </ImageButtonBox>
        </TouchableOpacity>
    </Container>
  }

}