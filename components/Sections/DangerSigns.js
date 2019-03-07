import React from 'react';
import { Section } from '../Section';

export class DangerSigns extends React.Component {
  static questions = {
  0: {
    text: "Does the child have any of the following danger signs?\n\
    - Convulsions\n\
    - Lethargy/Unconciousness\n\
    - Vomiting\n\
    - Unable to breastfeed/drink",
    answers: [
      { text: "Yes", goto: "2" },
      { text: "No", goto: "3"},
    ]
  },
  2: {
    text: "Refer to Health Centre.",
    sectionEnd: true
  },
  3: {
    text: "No danger signs reported.",
    sectionEnd: true
  },
}


  render() {
    return <Section title="DangerSigns" questions={DangerSigns.questions} onCompletion={this.props.onCompletion}/>
  }

}
