import React from 'react';
import Accordion from 'react-native-collapsible/Accordion';
import { Section } from '../Section';
import styled, { css } from '@emotion/native'

import { Text, View } from 'react-native';

export class PatientDetails extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      activeSections: []
    };
  }

  static questions = [
    {
      text: '< 2 months',
      info: '',
    },
    {
      text: '< 1 year',
      info: 'cannot walk',
    },
    {
      text: '1-5 year',
      info: '1) can walk\n2)cannot touch the opposite ear with fingers while passing over the head - IMG??',
    },
    {
      text: '> 5 year',
      info: 'can touch the ear as shown in image',
    },
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
