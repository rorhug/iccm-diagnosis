import React from 'react';
import { Section } from '../Section';

const questions = {
  1: {
    text: "Diarrhoea?",
    answers: [
      { text: "yes", goto: "2" },
      { text: "no", goto: "3" },
    ]
  },
  2: {
    text: "ORS?",
    answers: [
      { text: "yes", goto: "1" },
      { text: "no", goto: "3" },
    ]
  },
  3: {
    text: "Refer",
    answers: [
      { text: "End", goto: "1" },
    ]
  }
}

// <Section questions={questions} />
export class Diarrhoea extends React.Component {

  render() {
    return <Section title="Diarrhoea" questions={questions} />
  }
}
