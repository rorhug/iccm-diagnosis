import React from 'react';
import Accordion from 'react-native-collapsible/Accordion';
import { Text } from 'react-native';
import { Section } from '../Section';

export class DangerSigns extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      activeSections: []
    };
  }

  static questions = {
<<<<<<< HEAD
  0: {
    text: "Does the child have any of the following danger signs?\n\
    - Convulsions\n\
    - Lethargy/Unconciousness\n\
    - Vomiting\n\
    - Unable to breastfeed/drink",
=======
  1: {
    text: "Does the child have any of the following danger signs?",
>>>>>>> Adding more detail for danger signs
    answers: [
      { text: "Convulsions",
          info: <Text>Convulsions can be a sign of cerebral malaria or meningitis. This child needs immediate 
          treatment with medication not available in iCCM. It is useful to do RDT and give pre-referral 
          malaria treatment if positive</Text>,
          goto: "1"
      },

      { text: "Lethargy/Unconciousness",
        info: '',
        goto: "1"
      },

      { text: "Vomiting",
        info: '',
        goto: "1"
      },

      { text: "Unable to drink/breastfeed",
        info: '',
        goto: "1"
      },

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
    return <Section 
    title="DangerSigns" 
    initialState={this.state}
    questions={DangerSigns.questions} 
    onCompletion={this.props.onCompletion}
    activeSections={[]}
    expandMultiple={true}
    />
  }

}
