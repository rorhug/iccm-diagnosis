import React from 'react';
import { Section } from '../Section';
import { Age } from '../../utils/constants'
import { PatientDetails } from './PatientDetails'

// <Section questions={questions} />
export class Fever extends React.Component {
  static questions = {
    0: { // First question
      text: "Child with fever of history of fever in past 48 hours?",
      answers: [
        { text: "Yes", goto: (patient) => PatientDetails.ageWithinInnerRange(patient) ? "2" : "100" },
        { text: "No", goto: "101" },
      ]
    },
    2: { // Correct age + fever. RDT
      text: "Perform malaria pan PLDH RDT.\n\You can continue while waiting on the results.",
      answers: [
        { text: "Positive", goto: "3" },
        { text: "Negative", goto: "100" },
        { text: "Continue to next section", skip: true },
         // Refer
      ]
    },
    3: { // Has malaria.
      text:
      "Signs of severe malaria?\n\n" +
      "- Unconscious / prostrate\n" +
      "- Convulsions\n" +
      "- Lethargy\n" +
      "- Severe pallor\n" +
      "- Unable to drink / vomiting\n" +
      "- Respiratory distress\n" +
      "- Cyanosis",
      answers: [
        { text: "Yes", goto: "103" }, // Refer urgently
        { text: "No", goto: "4" }, 
      ]
    },
    4: {
      text: "Has the child been diagnosed and fully treated for malaria in last 28 days?\n\
  Did the child take all doses of ACT for 3 days without vomiting?",
      answers: [
        { text: "Yes", goto: "5" },
        { text: "No", goto: "102" }, // Simple malaria
      ]
    },
    5: {
      text: "Option 1. Refer to HC for slide/review: risk of treatment failure especially if soon after first treatment.\n\n\
  Option 2. If CHW has access to 2nd line treatment consider 2nd line ACTs (careful documentation).\n\n\
  Option 3. If no access to blood film or 2nd line treatment: retreat with 1st line ACTs with warning to return of worsen.",
      sectionEnd: true
    },
    100: {
        text: "Refer to Health Centre.",
        sectionEnd: true
    },
    101: {
        text: "All okay in this section.",
        sectionEnd: true
    },
    102: { // Simple malaria treatment.
        text: "Simple malaria.\n\
    Treat with oral ACT as per protocol (directly observe 1st dose) plus one dose paracetamol.",
        sectionEnd: true
    },
    103: { // Give pre-referral artesunate and refer to Hospital/HC urgently.
        text: "Severe malaria.\n\
    Give pre-referral artesunate and refer to Hospital/HC URGENTLY.",
        sectionEnd: true
    }
  }

  render() {
    return <Section title="Fever" questions={Fever.questions} {...this.props}/>
  }
}
