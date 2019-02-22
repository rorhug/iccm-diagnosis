import React from 'react';
import { Section } from '../Section';
import Questions from '../../utils/constants';

// TO-DO: Get age earlier, auto-answer age-related questions?
const questions = {
  1: { // First question
    text: "Child with fever of history of fever in past 48 hours?",
    answers: [
      { text: "Yes", goto: "3" },
      { text: "No", goto: Questions.nextSection },
    ]
  },
  3: { // YES fever or history of fever
    text: "Child between 2 months and 5 years old?",
    answers: [
      { text: "Yes", goto: "5" },
      { text: "No", goto: "4" },
    ]
  },
  4: {
    text: "Refer to Health Centre.",
    answers: [
      { text: "Next Section", goto: Questions.nextSection },
    ]
  },
  5: { // Correct age + fever. RDT
    text: "Perform malaria pan PLDH RDT.\n(Wait screen.)",
    answers: [
      { text: "Positive", goto: "6" },
      { text: "Negative", goto: "4" }, // Refer
    ]
  },
  6: { // Has malaria.
    text:
    "Signs of severe malaria?\n \
    - Unconscious / prostrate\n \
    - Convulsions\n \
    - Lethargy\n \
    - Severe pallor\n \
    - Unable to drink / vomiting\n \
    - Respiratory distress\n \
    - Cyanosis",
    answers: [
      { text: "Yes", goto: "7" }, // Refer urgently
      { text: "No", goto: "8" }, 
    ]
  },
  7: { // Give pre-referral artesunate and refer to Hospital/HC urgently.
    text: "Severe malaria.\n\
Give pre-referral artesunate and refer to Hospital/HC URGENTLY.",
    answers: [
      { text: "Next Section", goto: Questions.nextSection },
    ]
  },
  8: {
    text: "Diagnosed and fully treated for malaria in last 28 days?\n\
Did the child take all doses of ACT for 3 days without vomiting?",
    answers: [
      { text: "Yes", goto: "10" },
      { text: "No", goto: "9" }, 
    ]
  },
  9: { // Simple malaria treatment.
    text: "Simple malaria.\n\
Treat with oral ACT as per protocol (directly observe 1st dose) plus one dose paracetamol.",
    answers: [
      { text: "Next Section", goto: Questions.nextSection },
    ]
  },
  10: {
    text: "Option 1. Refer to HC for slide/review: risk of treatment failure especially if soon after first treatment.\n\n\
Option 2. If CHW has access to 2nd line treatment consider 2nd line ACTs (careful documentation).\n\n\
Option 3. If no access to blood film or 2nd line treatment: retreat with 1st line ACTs with warning to return of worsen.",
    answers: [
      { text: "Next Section", goto: Questions.nextSection },
    ]
  },
}

// <Section questions={questions} />
export class Fever extends React.Component {
  render() {
    console.log(this.props);

    return <Section title="Fever" questions={questions} onCompletion={this.props.onCompletion}/>
  }
}
