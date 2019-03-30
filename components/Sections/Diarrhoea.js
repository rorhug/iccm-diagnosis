import React from 'react';
import { Section } from '../Section';
import { Age } from '../../utils/constants'
import { PatientDetails } from './PatientDetails'

/*
    TO-DO: Questions are structured weirdly on the sheet,
    possible to restructure in a better way, but need to make sure with client.
*/

// <Section questions={questions} />
export class Diarrhoea extends React.Component {
  static questions = {
    0: {
      text: "Child with:\n\
- Diarrhea (3 or more loose stools in 24 hrs)\n\
- lasting 3 weeks or less\n\
- WITHOUT blood or rice water aspect.\n\
\n\
Is all the above TRUE?",
      answers: [
        { text: "yes", goto: (patient) => PatientDetails.ageWithinInnerRange(patient) ? "2" : "100" },
        { text: "no", goto: "3" },
      ]
    },
    2: { // Danger signs
        text: "Signs of severe dehydration?\n\
        - Sunken eyes\n\
        - Skin pinch > 3 seconds\n\
        - Other danger signs",
        answers: [
          { text: "yes", goto: "5" }, // Age already checked - skipping 4
          { text: "no", goto: "101" }, // Uncomplicated diarrhea
        ]
    },
    3: {
        text: "Less than 3 stools in 24 hrs?",
        answers: [
            { text: "yes", goto: "102" },
            { text: "other problem", goto: (patient) => PatientDetails.ageWithinInnerRange(patient) ? "5" : "100" }
        ]
    },
    5: {
      text: "Longer than 3 week history?",
      answers: [
        { text: "yes", goto: "100" },
        { text: "other problem", goto: "6" },
      ]
    },
    6: {
      text: "Bloody diarrhea or rice water stools?",
      answers: [
        { text: "yes", goto: "100" },
        { text: "other problem", goto: "7" },
      ]
    },
    7: {
      text: "Signs of severe dehydration?",
      answers: [
        { text: "yes", goto: "100" },
        { text: "no", goto: "103" },
      ]
    },

    100: {
        text: "Refer to Health Centre.",
        sectionEnd: true
    },
    101: {
        text: "Uncomplicated diarrhea: give ORS and Zinc sulfate according to age, \n\
    plus Albendazole (if not received within last 6 months).",
        sectionEnd: true
    },
    102: {
        text: "No need for treatment. Continue normal feeding according to age.",
        sectionEnd: true
    },
    103: {
        text: "Everything okay in this section.",
        sectionEnd: true
    },
    104: {
        text: "Patient needs human diagnosis.",
        sectionEnd: true
    }
  }

  render() {
    return <Section title="Diarrhoea" questions={Diarrhoea.questions} {...this.props}/>
  }
}
