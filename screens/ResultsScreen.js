import React from 'react';
import { View } from 'react-native';
import {
    Container,
    ScrollContainer,
    Header,
    AnswerText,
    AnswerButton,
    AnswerTextView,
    ButtonsBox,
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
            <Container>
                <Header>Results</Header>
                <ScrollContainer>

                    <View>
                        {Object.keys(results).map((key) => {
                            let endingId = results[key]
                            let question = components[key].questions[endingId]
                            let startId = question.sectionEnd ? 0 : endingId
                            return <View key={key}>
                                <SubHeading>{section_names[key]}</SubHeading>
                                {question.sectionEnd && <ResultAnswerText>{question.text}</ResultAnswerText>}
                                {!question.sectionEnd && key !== Sections.patient_details &&
                                    <ButtonsBox>
                                        <AnswerButton onPress={() => this.props.continueSection(key, startId)}>
                                            <AnswerTextView><AnswerText>{question.sectionEnd ? 'Retake' : 'Complete'}</AnswerText></AnswerTextView>
                                        </AnswerButton>
                                    </ButtonsBox>
                                }
                            </View>
                        })}
                    </View>

                    {/* This view is just to create space between components. */}
                    <View style={{ marginTop: 15 }}></View>

                    <AnswerButton onPress={this.props.restartDiagnosis}>
                        <BackTextView><BackText>Restart Diagnosis</BackText></BackTextView>
                    </AnswerButton>

                    <AnswerButton onPress={() => this.props.navigation.goBack()}>
                        <BackTextView><BackText>View Patient</BackText></BackTextView>
                    </AnswerButton>
                </ScrollContainer>
            </Container>
        );
    }

}
