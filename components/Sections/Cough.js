import React from 'react';
import { Section } from '../Section';

const questions = {
  1: {
    text: "Cough?",
    answers: [
      { text: "yes", goto: "2" },
      { text: "no", goto: "3" },
    ]
  },
  2: {
    text: "High respitory rate?",
    answers: [
      { text: "yes", goto: "1" },
      { text: "no", goto: "3" },
    ]
  },
  3: {
    text: "Treat for pneumonia",
    answers: [
      { text: "start again?", goto: "1" },
    ]
  }
}

// TODO respitory rate reader

// <Section questions={questions} />
export class Cough extends React.Component {

  render() {
    return <Section title="Cough" questions={questions} />
  }
}
