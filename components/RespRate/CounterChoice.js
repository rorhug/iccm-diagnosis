import React from 'react';
import { 
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import styled, { css } from '@emotion/native'
import { RrComponents } from '../../utils/constants';
import { 
    AnswerText,
    AnswerTextView,
    QuestionBox,
    Question,
    Header
} from '../../utils/styles';

const ButtonContainer = styled.View`
    border-radius: 5px;
    flex-direction: row;
    align-self: baseline;
    background-color: #eeeeee;
    padding: 10px;
    margin: auto;
    marginTop: 20px;
`

export class CounterChoice extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <View style={{ flex: 1 }}>
        <Header>Respiratory Rate</Header>
        <View style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20 }}>

            <QuestionBox>
                <Question>How would you like to count Respiratory Rate?</Question>
            </QuestionBox>
            <ButtonContainer>
                <TouchableOpacity onPress={() => this.props.renderNext(RrComponents.tutorial)}>
                    <Image
                    source={require('../../assets/images/breathing-thing.jpg')}
                    style={{width: 130, height: 130}}
                    />
                    <AnswerTextView><AnswerText>Record</AnswerText></AnswerTextView>
                </TouchableOpacity>

                <View style={{ width: 10 }}></View>

                <TouchableOpacity onPress={() => this.props.renderNext(RrComponents.tapcounter)}>
                    <Image
                    source={require('../../assets/images/tap.jpg')}
                    style={{width: 130, height: 130}}
                    />
                    <AnswerTextView><AnswerText>Tap</AnswerText></AnswerTextView>
                </TouchableOpacity>
            </ButtonContainer>

        </View>
    </View>
  }

}