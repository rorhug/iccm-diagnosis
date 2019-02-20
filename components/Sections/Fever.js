import React from 'react';
import { Section } from '../Section';

import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';


const questions = {
  1: {
    text: "What is the thing?",
    answers: [
      { text: "dog", goto: "2" },
      { text: "cat", goto: "3" },
      { text: "mouse", goto: "1" },
    ]
  },
  2: {
    text: "Start again?",
    answers: [
      { text: "yes", goto: "1" },
      { text: "go to end", goto: "3" },
    ]
  },
  3: {
    text: "Last question...",
    answers: [
      { text: "start again?", goto: "1" },
    ]
  }
}

// <Section questions={questions} />
export class Fever extends React.Component {

  render() {
    return <Section title="Fever" questions={questions} />
  }
}
