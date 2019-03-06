import React from 'react';
import Accordion from 'react-native-collapsible/Accordion';
import { Section } from '../Section';
import styled, { css } from '@emotion/native'

import { Text, View } from 'react-native';

const Title = styled.View`
  flex-basis: 65%
`

const ButtonsBox = styled.View`
  display: flex;
  flex-direction: row;
  background-color: #eeeeee;
  padding-bottom: 10px;
`

const Content = styled.View`
  padding: 10px;
  margin: 10px;
`

const InfoView = styled.View`
`

const InfoText = styled.Text`
  font-size: 18px;
  background-color: #ffffff;
  padding: 10px;
  margin: 10px 10px 0 10px;
`

const AgeButton = styled.TouchableOpacity`
`

const AgeText = styled.Text`
  font-size: 18px;
  background-color: #ffffff;
  padding: 10px;
  margin: 10px 10px 0 10px;
`
const infoItemStyle = css`
  flex-basis: 35%
`

const collapseStyle = css`
  display: flex
`

const sectionStyle = css`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
`

// <Section questions={questions} />
export class PatientDetails extends React.Component {

  static questions = [
    {
      text: '< 2 months',
      content: '',
    },
    {
      text: '< 1 year',
      content: 'cannot walk',
    },
    {
      text: '1-5 year',
      content: '1) can walk\n2)cannot touch the opposite ear with fingers while passing over the head - IMG??',
    },
    {
      text: '> 5 year',
      content: 'can touch the ear as shown in image',
    },
  ];

  state = {
    activeSections: [],
    currentQuestionId: "1"
  };

  accordion = () => {
    console.log(PatientDetails.questions)
    return (
      <>
      <AgeText>What age is the child?</AgeText>
      <ButtonsBox>
        <Accordion
          sections={PatientDetails.questions}
          expandMultiple={true}
          activeSections={this.state.activeSections}
          renderSectionTitle={this._renderSectionTitle}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
          onChange={this._updateSections}
          sectionContainerStyle={sectionStyle}
          touchableProps={{style: infoItemStyle}}
          collapsibleProps={{style: collapseStyle}}
          underlayColor={null}
        />
      </ButtonsBox>
      </>
    )
  };

  _renderSectionTitle = section => {
    return (
      <Title>
        <AgeButton onPress={() => this.props.onCompletion(PatientDetails.questions.indexOf(section))}>
          <AgeText>{section.text}</AgeText>
        </AgeButton>
      </Title>
    );
  };

  _renderHeader = section => {
    return (
      <InfoView>
        <InfoText>help</InfoText>
      </InfoView>
    );
  };

  _renderContent = section => {
    return (
      <Content>
        <Text>{section.content}</Text>
      </Content>
    );
  };

  _updateSections = activeSections => {
    this.setState({ activeSections });
  };

  render() {
    return <Section
      title="Patient Age"
      questions={PatientDetails.questions}
      onCompletion={this.props.onCompletion}
      questionBox={this.accordion}
      initialState={this.state} />
  }
}
