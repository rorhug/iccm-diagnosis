import React from 'react';
import Accordion from 'react-native-collapsible/Accordion';
import { Section } from '../Section';
import styled, { css } from '@emotion/native'

import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';

const Content = styled.View`
  background-color: #fff;
  padding: 10px;
`

const Header = styled.View`
  background-color: #F5FCFF;
  padding: 20px;
`

const HeaderText = styled.Text`
  text-align: center;
  font-size: 20px;
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
      <Accordion
        sections={SECTIONS}
        expandMultiple={true}
        activeSections={this.state.activeSections}
        renderSectionTitle={this._renderSectionTitle}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
        onChange={this._updateSections}
      />
    )
  };

  // render title of expandible - just return padding
  _renderSectionTitle = section => {
    return (
      <Content/>
    );
  };

  _renderHeader = section => {
    return (
      <Header>
        <HeaderText>{section.title}</HeaderText>
      </Header>
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
