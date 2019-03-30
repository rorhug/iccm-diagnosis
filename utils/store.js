import firebase from '@firebase/app'
import '@firebase/firestore'
import { initFirestorter, Collection, Document, isTimestamp } from 'firestorter'
import { struct } from 'superstruct'
import { configure, computed } from 'mobx'

import { PatientDetails } from '../components/Sections/PatientDetails';

configure({
  enforceActions: 'always'
})

firebase.initializeApp({
  apiKey: "AIzaSyA7EBMFD9FSz43aANRNKkyAmsGzL0s8Z8c",
  authDomain: "iccm-diagnosis.firebaseapp.com",
  databaseURL: "https://iccm-diagnosis.firebaseio.com",
  projectId: "iccm-diagnosis",
  storageBucket: "iccm-diagnosis.appspot.com",
  messagingSenderId: "255332830249"
})

const firestore = firebase.firestore()
// firestore.settings({ timestampsInSnapshots: true })

initFirestorter({ firebase: firebase })

const PATIENT_AGE_ESTIMATES = PatientDetails.ageEstimateAnswers.map((answer) => answer.text)
const MONTH_IN_MS = (365.25 / 12) * 86400000

const isOptionalAgeEstimate = (val) => val === undefined || PATIENT_AGE_ESTIMATES.includes(val)
const isOptionalTimestamp =   (val) => val === undefined || isTimestamp(val)

class Patient extends Document {
  constructor(source, options) {
    super(source, {
      ...(options || {}),
      schema: struct({
        firstName: 'string',
        lastName: 'string',
        notes: 'string?',
        dateOfBirth: isOptionalTimestamp,
        givenAgeEstimate: isOptionalAgeEstimate,
        createdAt: isTimestamp,
        diagnosedAt: isOptionalTimestamp,
      })
    })
  }

  @computed get displayName() {
    let fullName = [this.data.firstName, this.data.lastName].join(' ').trim()
    return fullName === '' ?  `unnamed ${this.id}` : fullName
  }

//   @computed get ageInMonths() {
//     // if (this.data.dateOfBirth) {
//       let months = Math.abs((new Date) - this.data.dateOfBirth.toDate()) / monthInMs
//     // } else {
// 
//     // }
//   }

  @computed get ageInMonths() {
    return this.data.dateOfBirth && Math.abs((new Date) - this.data.dateOfBirth.toDate()) / MONTH_IN_MS
  }
  @computed get ageEstimateText() {
    return this.data.dateOfBirth ? PatientDetails.ageEstimateText(this.ageInMonths) : this.data.givenAgeEstimate
  }
}

const patients = new Collection('patients', {
  mode: 'auto',
  createDocument: (source, options) => new Patient(source, options)
})

export default {
  patients,
  PATIENT_AGE_ESTIMATES
}
