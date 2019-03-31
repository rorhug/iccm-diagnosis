import React from 'react';
import { Text, View } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import styled, { css } from '@emotion/native'

import { Section } from '../Section';
import { QuestionText, Age } from '../../utils/constants'

export class PatientDetails extends React.Component {
  static ageEstimateAnswers = [
    { text: '< 2 months', _monthRange: [0, 2] },
    {
      text: '< 1 year',
      info: 'cannot walk',
      _monthRange: [2, 12]
    },
    {
      text: '1-5 year',
      info: '1) can walk\n2)cannot touch the opposite ear with fingers while passing over the head - IMG??',
      img: require('../../assets/images/age-info-less5y.png'),
      _monthRange: [12, 60]
    },
    {
      text: '> 5 year',
      info: 'can touch the ear as shown in image',
      img: require('../../assets/images/age-info-over5y.png'),
      _monthRange: [60, undefined]
    },
  ]
  static ageWithinInnerRange = (patient) => [PatientDetails.ageEstimateAnswers[1].text, PatientDetails.ageEstimateAnswers[2].text].includes(patient.ageEstimateText)
  static lessThanAYearOld    = (patient) => [PatientDetails.ageEstimateAnswers[0].text, PatientDetails.ageEstimateAnswers[1].text].includes(patient.ageEstimateText)

  static questions = {
    0: {
      text: "Estimate the childs age:",
      sectionEnd: true,
      answers: PatientDetails.ageEstimateAnswers
    }
  }

  static ageEstimateText = ageInMonths => PatientDetails.ageEstimateAnswers.find(answer =>
    ageInMonths >= answer._monthRange[0] && (!answer._monthRange[1] || ageInMonths < answer._monthRange[1])
  ).text

  onCompletion = (index) => {
    this.props.patient.update({
      givenAgeEstimate: PatientDetails.ageEstimateAnswers[index].text
    }).then(
      () => this.props.onCompletion(0)
    ).catch((e) => alert("Error saving.", e))
  }

  render() {
    return <Section
      title="Patient Age"
      questions={PatientDetails.questions}
      startQuestion="0"
      expandMultiple={true}
      onCompletion={this.onCompletion}
      patient={this.props.patient}
    />
  }
}
