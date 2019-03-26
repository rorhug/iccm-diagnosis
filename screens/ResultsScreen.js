import React from 'react';
import {
  View,
  ScrollView
} from 'react-native';
import {
    Header,
    AnswerText,
    AnswerButton,
    AnswerTextView
} from '../utils/styles';
import styled, { css } from '@emotion/native'
import { Sections } from '../utils/constants';

const SubHeading = styled.Text`
    margin-top: 15px;
    font-weight: bold;
    font-size: 24px;
    color: #2f4858;
`
const ResultAnswerText = styled.Text`
  font-size: 20px;
  padding-left: 10px;
  padding-right: 10px;
  color: #05668d;
`

const BackText = styled.Text`
  font-size: 20px;
  text-align: center;
  color: #fff;
`

const BackTextView = styled.View`
  background-color: #05668d;
  padding: 10px;
  margin: 10px 10px 0 10px;
  border-radius: 10px;
`

const section_names = {
    [Sections.patient_details]: 'Patient details',
    [Sections.dangersigns]: 'Danger signs',
    [Sections.fever]: 'Fever',
    [Sections.cough]: 'Cough',
    [Sections.diarrhoea]: 'Diarrhoea',
  }

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
            <ScrollView style={{ paddingLeft: 20, paddingRight: 20 }}>
                
                <View>
                    {Object.keys(results).map(function(key) {
                    let endingId = results[key]
                    return <View key={key}>
                        <SubHeading>{section_names[key]}</SubHeading>
                        <ResultAnswerText>{components[key].questions[endingId].text}</ResultAnswerText>
                    </View>
                    })}
                </View>
                
                {/* This view is just to create space between components. */}
                <View style={{ marginTop: 15 }}></View>

                <AnswerButton onPress={() => this.props.reset()}>
                    <BackTextView><BackText>Back to Start</BackText></BackTextView>
                </AnswerButton>

                {/* This view is just to create space between components. */}
                <View style={{ marginBottom: 20 }}></View>

            </ScrollView>
        </View>
    );
  }

}