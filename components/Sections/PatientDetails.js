import React from 'react';
import Accordion from 'react-native-collapsible/Accordion';
import { Section } from '../Section';
import styled, { css } from '@emotion/native'

import { Text, View } from 'react-native';

const Title = styled.View`
  flex-basis: 60%
`

const ButtonsBox = styled.View`
  display: flex;
  flex-direction: row;
  background-color: #eeeeee;
  padding-bottom: 10px;
`

const Content = styled.View`
  padding: 10px;
  margin-left: 5px;
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
  flex-basis: 30%
`

const accordionStyle = css`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
`

// TO-DO: Get age earlier, auto-answer age-related questions?
const SECTIONS = [
  {
    title: 'First',
    content: 'ABCD ipsum...',
  },
  {
    title: 'Second',
    content: 'Lorem hipsum...',
  },
];


// <Section questions={questions} />
export class PatientDetails extends React.Component {

  state = {
    activeSections: [],
    currentQuestionId: "1"
  };

  accordion = () => {
    return (
      <ButtonsBox>
        <Accordion
          sections={SECTIONS}
          expandMultiple={true}
          activeSections={this.state.activeSections}
          renderSectionTitle={this._renderSectionTitle}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
          onChange={this._updateSections}
          sectionContainerStyle={accordionStyle}
          touchableProps={{style: infoItemStyle}}
          underlayColor={null}
        />
      </ButtonsBox>

    )
  };

  // render title of expandible - just return padding
  _renderSectionTitle = section => {
    return (
      <Title>
        <AgeButton onPress={() => this.props.onCompletion()}>
          <AgeText>{section.title}</AgeText>
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

  questions = {
    1: {
      text: 'test',
      answers: [{ text: "Yes", goto: "1" },]
    }
  }

  render() {
    return <Section
      title="Patient Details"
      questions={this.questions}
      onCompletion={this.props.onCompletion}
      questionBox={this.accordion}
      initialState={this.state} />
  }
}
