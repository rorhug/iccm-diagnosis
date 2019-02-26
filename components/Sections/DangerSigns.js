import React from 'react';
import { Section } from '../Section';
import { Sections } from '../../utils/constants';

const questions = {
  1: {
    text: "Does the child have any of the following danger signs?\n\
    - Convulsions\n\
    - Lethargy/Unconciousness\n\
    - Vomiting\n\
    - Unable to breastfeed/drink",
    answers: [
      { text: "Yes", goto: "2" },
      { text: "No", goto: Sections.next },
    ]
  },
  2: {
    text: "Refer to Health Centre.",
    answers: [
      { text: "Next Section", goto: Sections.next },
    ]
  },
}

// TODO respitory rate reader

// <Section questions={questions} />
export class DangerSigns extends React.Component {

  render() {
    return <Section title="DangerSigns" questions={questions} onCompletion={this.props.onCompletion}/>
  }
}