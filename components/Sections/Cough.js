import React from 'react';
import { Section } from '../Section';
import { QuestionText } from '../../utils/constants'

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
                { text: "Less than 3w", goto: "3" },
                { text: "More than 3w", goto: "100" },
            ]
        },
        3: { // Automatically check age of child.
            containsFunction: true,
            function: (age) => {
                console.log(age)
                switch (age) {
                    case QuestionText.age.less2m.text:
                        console.log('Age less2m');
                        return "100"
                    case QuestionText.age.less1y.text:
                        console.log('Age less1y');
                        return "6"
                    case QuestionText.age.oneto5.text:
                        console.log('Age oneto5');
                        return "6"
                    case QuestionText.age.over5.text:
                        console.log('Age over5');
                        return "100"
                }
                return "6"
                // if age < 2 months or > 5 years -> return 100 (Refer)
                // else age okay return 6
            }
        },
        6: {
            text: "Click 'Continue' to measure childs respiratory rate.",
            answers: [
                { text: "Continue", goto: "7" }
            ]
        },
        7: {
            specialScreen: true,
            screenTitle: "RespiratoryRate",
            resultToGoto: (result) => {
                // need age and RR count.
                // Child < 1 year & RR < 50 -> goto 102
                // Child < 1 year & RR >= 50 -> goto 8

                // Child > 1 year & RR < 40 -> goto 102
                // Child > 1 year & RR >= 40 -> goto 8

                return "6"
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