import firebase from '@firebase/app'
import '@firebase/firestore'
import { initFirestorter, Collection, Document, isTimestamp } from 'firestorter'
import { struct } from 'superstruct'
import { configure } from 'mobx';

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


// export function isTimestamp(val: any): boolean {
//   if (val instanceof Date) {
//     return true;
//   }
//   return (
//     typeof val === "object" &&
//     typeof val.seconds === "number" &&
//     typeof val.nanoseconds === "number"
//   );
// }

const isOptionalTimestamp = (val) => isTimestamp(val) || val === undefined
// const isTimestampOrServerTimestamp = (val) => isTimestamp(val) || (typeof val === 'object' && val._methodName === "FieldValue.serverTimestamp")

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
}

// const articles = new Collection('articles', {
//   createDocument: (source, options) => new Patient(source, options)
// });

const patients = new Collection('patients', {
  mode: 'auto',
  createDocument: (source, options) => new Patient(source, options)
  // DocumentClass: Patient
})

export default { patients }
