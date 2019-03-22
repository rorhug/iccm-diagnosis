import React from 'react';
import {
  View,
  ScrollView
} from 'react-native';
import { Header, AnswerTextView } from '../utils/styles';
import styled, { css } from '@emotion/native'

const AnswerText = styled.Text`
  font-size: 18px;
  background-color: #ffffff;
  padding: 10px;
  margin: 10px 10px 0 10px;
`
const SubHeading = styled.Text`
    font-weight: bold;
    font-size: 24px;
    padding-bottom: 10px;
`
const AnswerButton = styled.TouchableOpacity`
  width: 100%;
`
const ButtonsBox = styled.View`
  display: flex;
  align-items: center;
  margin: 20px 0 0 0;
  background-color: #eeeeee;
  padding-bottom: 10px;
`

export class ResultsScreen extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    let results = this.props.sectionResults;
    let components = this.props.sectionComponents
    console.log(results)

    return (
        <View style={{ flex: 1 }}>
            <Header>Results</Header>
            <ScrollView style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20 }}>
                
                <View>
                    {Object.keys(results).map(function(key) {
                    let endingId = results[key]
                    return <View key={key}>
                        <SubHeading>Section: {key}</SubHeading>
                        <AnswerTextView><AnswerText>Answer: {components[key].questions[endingId].text}</AnswerText></AnswerTextView>
                    </View>
                    })}
                </View>
                <ButtonsBox>
                    <AnswerButton onPress={() => this.props.reset()}>
                        <AnswerTextView><AnswerText>Back to Start</AnswerText></AnswerTextView>
                    </AnswerButton>
                </ButtonsBox>

            </ScrollView>
        </View>
    );
  }

}