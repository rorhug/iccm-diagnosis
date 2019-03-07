import React from 'react';
import { Section } from '../Section';

// import console = require('console');

// TODO respitory rate reader

// <Section questions={questions} />
class Cough extends React.Component {
  static questions = {
    0: {
      text: "Child > 2 months and < 5 years, with cough or rapid breathing and/or fever =< 3 weeks?",
      answers: [
        { text: "Yes", goto: "6" },
        { text: "No", goto: "2" },
      ]
    },
    2: { // Wrong age?
      text: "Child < 2 months or > 5 years?",
      answers: [
        { text: "Yes", goto: "3" },
        { text: "No", goto: "4" },
      ]
    },
    3: { // Wrong are group / cough too long
      text: "Refer to Health Centre.",
      sectionEnd: true
    },
    4: { // Cough too long?
      text: "Cough lasting longer than 3 weeks?",
      answers: [
        { text: "Yes", goto: "3" },
        { text: "No", goto: "5" },
      ]
    },
    5: { 
      text: "Needs human diagnosis.", // TO-DO: What's a better message for this?
      sectionEnd: true
    },
    6: { 
      text: "Count respiratory rate (RR) during 1 minute.\n\
  (Counter here)",
      answers: [
        { text: "Child < 1 year", goto: "7" },
        { text: "Child > 1 year", goto: "10" },
      ]
    },
    7: { // Child < 1 year
      text: "Respiratory Rate",
      answers: [
        { text: "RR < 50", goto: "8" },
        { text: "RR >= 50", goto: "9" },
      ]
    },
    8: { // No danger
      text: "No danger signs:\n\
  Rhinitis, common cold.",
      sectionEnd: true
    },
    9: {
      text: "Pneumonia.\n\
  Signs of severe pneumonia?\n\
      - Chest indrawing\n\
      - Stridor\n\
      - Nasal flaring\n\
      - Cyanosis",
      answers: [
        { text: "Yes", goto: "11" },
        { text: "No", goto: "12" },
      ]
    },
    10: { // Child > 1 year
      text: "Respiratory Rate",
      answers: [
        { text: "RR < 40", goto: "8" },
        { text: "RR >= 40", goto: "9" },
      ]
    },
    11: { // Severe pneumonia
      text: "Severe pneumonia.\n\
  Give first dose of amoxicillin and refer to Health Centre.",
      sectionEnd: true
    },
    12: {
      text: "Pneumonia.\n\
  Treat with amoxicillin.",
      sectionEnd: true
    },
  }

  render() {
    return <Section title="Cough" questions={Cough.questions} onCompletion={this.props.onCompletion}/>
  }
}

export { Cough }