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

const MaterialInput = compose(
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

@observer
class PatientViewScreen extends React.Component {
  static navigationOptions = {
    title: "Patient"
  }

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
        <MaterialInput label="First Name" name="firstName" />
        <MaterialInput label="Last Name" name="lastName" />
        <FocusedDatePicker label="Birthday" name="dateOfBirth" />
        <Button onPress={handleSubmit} title={submitButtonText} />
      </Form>
    );
  }

  submitForm = values => {
    let valuesToWrite = {
      createdAt: new Date(), // before ...values so ignored if already present
      ...values,
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
    }

    if (this.state.patientDoc) {
      this.state.patientDoc.update(valuesToWrite).then(() => {
        this.props.navigation.goBack()
      }).catch((e) => alert("Error saving.", e))
    } else {
      store.patients.add(valuesToWrite).then((patient) => {
        this.props.navigation.navigate('Diagnosis', { patient: patient })
      }).catch((e) => {
        alert("Error saving.")
        console.log(e)
      })
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



