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
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import { firestore } from 'firebase'

import DatePicker from "../components/DatePicker";
import store from '../utils/store'

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 20px;
  /*margin-top: 15px;*/
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
      patient: props.navigation.state.params.patient,
      isSaving: false,
    }
  }

  componentDidMount() {
    if (this.props.navigation.state.params.startQuestionnaire) { this.submitForm({}) }
  }

  renderForm = ({ handleSubmit, values }) => {
    let submitButtonText = this.state.patient ? "Save" : (Object.keys(values).length === 0 ? "Skip to Diagnosis" : "Save and Start Diagnosis")
    return (
      <Form>
        <MaterialInput label="First Name" name="firstName" disabled={this.state.isSaving} />
        <MaterialInput label="Last Name" name="lastName" disabled={this.state.isSaving} />
        <FocusedDatePicker
          label="Birthday"
          name="dateOfBirth"
          disabled={this.state.isSaving}
          maximumDate={new Date()}
          title="Leave blank if not certain"
        />
        <MaterialInput label="Notes..." name="notes" disabled={this.state.isSaving} multiline={true} />
        <Button onPress={handleSubmit} title={submitButtonText} disabled={this.state.isSaving} />
      </Form>
    )
  }

  handleSaveError = (e) => {
    this.setState({ isSaving: false })
    alert("Error saving.")
    console.log(e)
  }

  submitForm = values => {
    let valuesToWrite = {
      createdAt: new Date(), // before ...values so ignored if already present
      ...values,
      firstName: values.firstName ? values.firstName.trim() : "",
      lastName:  values.lastName ? values.lastName.trim() : "",
    }

    this.setState({ isSaving: true })

    if (this.state.patient) {
      this.state.patient.update(valuesToWrite).then(() => {
        this.setState({ isSaving: false })
        this.props.navigation.goBack()
      }).catch(this.handleSaveError)
    } else {
      store.patients.add(valuesToWrite).then((patient) => {
        this.setState({ isSaving: false })
        this.navigateToDiagnosis(patient)
      }).catch(this.handleSaveError)
    }
  }

  navigateToDiagnosis = (patient) => this.props.navigation.navigate('Diagnosis', { patient: patient })

  render() {
    let initialValues = this.state.patient && toJS(this.state.patient.data)
    // debugger;
    return <Container>
      <Formik
        onSubmit={this.submitForm}
        initialValues={initialValues}
        // validationSchema={validationSchema}
        render={this.renderForm}
      />

      {this.state.patient && <Button title="Continue Diagnosis" onPress={() => this.navigateToDiagnosis(this.state.patient)} />}
    </Container>
  }
}



export default PatientViewScreen



