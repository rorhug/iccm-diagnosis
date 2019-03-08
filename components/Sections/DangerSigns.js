import React from 'react';
import { Text } from 'react-native';
import { Section } from '../Section';

export class DangerSigns extends React.Component {

state = { activeSections: [] }

  static questions = {
  0: {
    text: "Does the child have any of the following danger signs?",
    answers: [
      { text: "Convulsions",
          info: <Text>Convulsions can be a sign of cerebral malaria or meningitis. This child needs immediate 
          treatment with medication not available in iCCM. It is useful to do RDT and give pre-referral 
          malaria treatment if positive</Text>,
          goto: "0"
      },

      { text: "Lethargy/Unconciousness",
        info: <Text>Can be a sign of severe dehydration, hypoglycaemia, cerebral malaria/
        meningitis. It is useful to do RDT and if positivie give pre-referral malaria treatment.
        If diarrhea and signs of dehydration treat with ORD during referral, but only if patient
        is able to drink and swallow. Beware for aspiration</Text>,
        goto: "0"
      },

      { text: "Vomiting",
        info: <Text>Need to refer as child might vomit all medication, ORS. Can be
        a sign of meningitis</Text>,
        goto: "0"
      },

      { text: "Unable to drink/breastfeed",
        info: <Text>Can be a sign of severe respiratory distress, general severe illness.
        Therapy will fail</Text>,
        goto: "0"
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
