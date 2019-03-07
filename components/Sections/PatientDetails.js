import React from 'react';
import { Text, View } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import styled, { css } from '@emotion/native'

import { Section } from '../Section';
import { QuestionText } from '../../utils/constants'

export class PatientDetails extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      activeSections: []
    };
  }

  static questions = [
      QuestionText.age.less2m,
      QuestionText.age.less1y,
      QuestionText.age.oneto5,
      QuestionText.age.over5
  ];

  static q = {
    0: {
      text: "What age is the child?",
      sectionEnd: true,
      answers: PatientDetails.questions
    }
  };

  render() {
    return <Section
      title="Patient Age"
      initialState={this.state}
      questions={PatientDetails.q}
      onCompletion={this.props.onCompletion}
      activeSections={[]}
      expandMultiple={true}
    />
  }
}
