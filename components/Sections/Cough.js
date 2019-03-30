import React from 'react';
import { Section } from '../Section';
import { QuestionText, Age } from '../../utils/constants'

import { PatientDetails } from './PatientDetails'

// import console = require('console');

// TODO respitory rate reader

// <Section questions={questions} />
class Cough extends React.Component {
    static questions = {
        0: {
            text: "Child with cough or rapid breathing and/or fever?",
            answers: [
                { text: "Yes", goto: "2" },
                { text: "No", goto: "101" },
            ]
        },
        2: { // Cough too long?
            text: "Cough/rapid breathing and/or fever lasting (in weeks):",
            answers: [
                { text: "Less than 3w", goto: (patient) => PatientDetails.ageWithinInnerRange(patient) ? "6" : "100" },
                { text: "More than 3w", goto: "100" },
            ]
        },
        6: {
            specialScreen: true,
            screenTitle: "RespiratoryRate",
            resultToGoto: (patient, respRate) => {
                let lessThanAYearOld = PatientDetails.lessThanAYearOld(patient)
                console.log(`Cough.js quesiton[7]. Age: ${patient.lessThanAYearOld}, Resp: ${respRate}`)

                if ((lessThanAYearOld && respRate < 50) ||
                    (!lessThanAYearOld && respRate < 40)) {
                    return "102"
                } else if (
                    (lessThanAYearOld && respRate >= 50) ||
                    (!lessThanAYearOld && respRate >= 40)) {
                    return "8"
                }
            }
        },
        8: {
            text: "Pneumonia.\n\
      Signs of severe pneumonia?\n\
          - Chest indrawing\n\
          - Stridor\n\
          - Nasal flaring\n\
          - Cyanosis",
            answers: [
                { text: "Yes", goto: "104" },
                { text: "No", goto: "103" },
            ]
        },
        100: { // Wrong are group / cough too long
            text: "Refer to Health Centre.",
            sectionEnd: true
        },
        101: { // Has nothing.
            text: "All okay in this section.", // TO-DO: What's a better message for this?
            sectionEnd: true
        },
        102: { // No danger
            text: "No danger signs:\n\
        Rhinitis, common cold.",
            sectionEnd: true
        },
        103: {
            text: "Pneumonia.\n\
        Treat with amoxicillin.",
            sectionEnd: true
        },
        104: { // Severe pneumonia
            text: "Severe pneumonia.\n\
        Give first dose of amoxicillin and refer to Health Centre.",
            sectionEnd: true
        }
    }

    render() {
        return <Section
            title="Cough"
            questions={Cough.questions}
            {...this.props}
        />
    }
}

export { Cough }
