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

const accordionStyle = css`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
`

const AgeOptions = [
  {
    title: '< 2 months',
    content: '',
  },
  {
    title: '< 1 year',
    content: 'cannot walk',
  },
  {
    title: '1-5 year',
    content: '1) can walk\n2)cannot touch the opposite ear with fingers while passing over the head - IMG??',
  },
  {
    title: '> 5 year',
    content: 'can touch the ear as shown in image',
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
          sections={AgeOptions}
          expandMultiple={true}
          activeSections={this.state.activeSections}
          renderSectionTitle={this._renderSectionTitle}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
          onChange={this._updateSections}
          sectionContainerStyle={accordionStyle}
          touchableProps={{style: infoItemStyle}}
          collapsibleProps={{style: collapseStyle}}
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
      title="Patient Age"
      questions={this.questions}
      onCompletion={this.props.onCompletion}
      questionBox={this.accordion}
      initialState={this.state} />
  }
}
