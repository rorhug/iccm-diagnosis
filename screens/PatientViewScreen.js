import React from 'react'
import PropTypes from 'prop-types'
import {
  SectionList,
  Text,
  View,
  TouchableOpacity,
  Button,
  // TextInput
} from 'react-native'
import { WebBrowser } from 'expo'
import { Icon } from 'expo'
import styled, { css } from '@emotion/native'

import { compose, defaultProps } from "recompose"
import { Formik } from "formik"
import * as Yup from "yup"
import {
  handleTextInput,
  withNextInputAutoFocusForm,
  withNextInputAutoFocusInput,
  withFormikControl
} from "react-native-formik"
import { TextField } from "react-native-material-textfield";
import { inject, observer } from 'mobx-react';
import { firestore } from 'firebase'

import DatePicker from "../components/DatePicker";
import store from '../utils/store'

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 20px;
  margin-top: 15px;
`

const materialInputProps = { fontSize: 20, titleFontSize: 15, labelFontSize: 15 }

const MyInput = compose(
  defaultProps(materialInputProps),
  handleTextInput,
  withNextInputAutoFocusInput,
)(TextField);

const FocusedDatePicker = compose(
  defaultProps(materialInputProps),
  withFormikControl,
  withNextInputAutoFocusInput
)(DatePicker);

const Form = withNextInputAutoFocusForm(View);


// const validationSchema = Yup.object().shape({
//   email: Yup.string()
//     .required("please! email?")
//     .email("well that's not an email"),
//   password: Yup.string()
//     .required()
//     .min(2, "pretty sure this will be hacked")
// });

// <MyInput label="Email" name="email" type="email" />
// <MyInput label="Password" name="password" type="password" />



@observer
class PatientViewScreen extends React.Component {
  static navigationOptions = {
    title: "Patient"
  };

  // static propTypes = {
  //   navigation: PropTypes.shape({
  //     state: PropTypes.shape({
  //       params: PropTypes.shape({
  //         patient: PropTypes.object.isRequired,
  //       }).isRequired
  //     })
  //   })
  // }
  constructor(props) {
    super(props)
    this.state = {
      patientDoc: props.navigation.state.params.patientDoc,
    }
  }

  renderForm = ({ handleSubmit, values }) => {
    let submitButtonText = this.state.patientDoc ? "Save" : (Object.keys(values).length === 0 ? "Skip to Diagnosis" : "Save and Continue")
    return (
      <Form>
        <MyInput label="First Name" name="firstName" />
        <MyInput label="Last Name" name="lastName" />
        <FocusedDatePicker label="Birthday" name="dateOfBirth" />
        <Button onPress={handleSubmit} title={submitButtonText} />
      </Form>
    );
  }

  submitForm = values => {
    let s = this.state
    if (this.state.patientDoc) {
      this.state.patientDoc.update(values).then(() => {
        this.props.navigation.goBack()
      }).catch((e) => alert("Error saving.", e))
      // let patient = this.props.patientsStore.updatePatient(this.state.patient, values)
      // this.props.navigation.goBack()
    } else {
      // createdAt: firestore.FieldValue.serverTimestamp()
      store.patients.add({ ...values, createdAt: new Date() }).then((patient) => {
        this.props.navigation.navigate('Diagnosis', { patient: patient })
      }).catch((e) => {
        alert("Error saving.")
        console.log(e)
      })
      // let patient = this.props.patientsStore.createPatient(values)
      // this.props.navigation.navigate('Diagnosis', { patient: patient })
    }
  }

  render() {
    return <Container>
      <Formik
        onSubmit={this.submitForm}
        initialValues={this.state.patientDoc && this.state.patientDoc.data}
        // validationSchema={validationSchema}
        render={this.renderForm}
      />
    </Container>
  }
}



export default PatientViewScreen



