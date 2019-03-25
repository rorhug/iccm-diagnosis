import React from 'react';
import {
    View,
    ScrollView
} from 'react-native';
import {
    Header,
    AnswerText,
    AnswerButton,
    AnswerTextView,
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

<<<<<<< HEAD
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
=======
    constructor(props) {
        super(props)
        console.log(this.props)
    }

    renderAnswerText = (text) => {
        return <AnswerTextView>
            <AnswerText>{text}</AnswerText>
        </AnswerTextView>
    }

    render() {
        let results = this.props.sectionResults;
        let components = this.props.sectionComponents;
        return (
            <View style={{ flex: 1 }}>
                <Header>Results</Header>
                <ScrollView style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20 }}>

                    <View>
                        {Object.keys(results).map((key) => {
                            let endingId = results[key]
                            let question = components[key].questions[endingId]
                            let startId = question.sectionEnd ? 0 : endingId
                            let text = question.sectionEnd ? 'Retake' : 'Complete'
                            return (
                                <View key={key}>
                                    <SubHeading>Section: {key}</SubHeading>
                                    {question.sectionEnd && this.renderAnswerText(`Answer: ${question.text}`) }
                                    <AnswerButton onPress={() => this.props.continueSection(key, startId)}>
                                        {this.renderAnswerText(text)}
                                    </AnswerButton>
                                </View>
                            )
                        })}
                    </View>
                    <AnswerButton onPress={() => this.props.reset()}>
                        <AnswerTextView><AnswerText>Back to Start</AnswerText></AnswerTextView>
                    </AnswerButton>

                </ScrollView>
            </View>
        );
    }
>>>>>>> retake/complete button on result screen

}