import React from 'react';
import { Text, View } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import styled, { css } from '@emotion/native'

import { Section } from '../Section';
import { QuestionText, Age } from '../../utils/constants'

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

  static patientAge = (age_id) => {
    if (PatientDetails.questions[age_id]) {
      return PatientDetails.questions[age_id].text
    }
  }

  static patientAgeOne = (age_id) => {
    age_text = PatientDetails.patientAge(age_id);
    switch (age_text) {
      case Age.less2m:
      case Age.less1y:
        return Age.less1y
      case Age.oneto5:
      case Age.oneto5:
        return Age.over1y
    }
  }

  render() {
    return <Section
      title="Patient Age"
      initialState={this.state}
      questions={PatientDetails.q}
      activeSections={[]}
      expandMultiple={true}
      {...this.props}
    />
  }
}
