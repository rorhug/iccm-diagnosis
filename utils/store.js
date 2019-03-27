import firebase from '@firebase/app'
import '@firebase/firestore'
import { initFirestorter, Collection, Document, isTimestamp } from 'firestorter'
import { struct } from 'superstruct'
import { configure, computed } from 'mobx'

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

const isOptionalTimestamp = (val) => isTimestamp(val) || val === undefined

class Patient extends Document {
  constructor(source, options) {
    super(source, {
      ...(options || {}),
      schema: struct({
        firstName: 'string',
        lastName: 'string',
        dateOfBirth: isOptionalTimestamp,
        createdAt: isTimestamp,
        diagnosedAt: isOptionalTimestamp,
      })
    })
  }

  @computed get fullName() {
    return [this.data.firstName, this.data.lastName].join(' ') || "unnamed patient"
  }
}

const patients = new Collection('patients', {
  mode: 'auto',
  createDocument: (source, options) => new Patient(source, options)
})

export default { patients }
