import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Alert
} from 'react-native'
import { WebBrowser } from 'expo'
import { Icon } from 'expo'
import styled, { css } from '@emotion/native'

import { compose, defaultProps } from "recompose"
import { Formik } from "formik"
// import * as Yup from "yup"
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


import {
  Container,
  InnerView,
  ScrollContainer,
  BlueButton
} from '../utils/styles'
import DatePicker from "../components/DatePicker";
import store from '../utils/store'
import DiagnosisScreen from './DiagnosisScreen'
// 
// const Container = styled.View`
//   flex: 1;
//   background-color: #fff;
//   padding: 0 20px;
//   /*margin-top: 15px;*/
// `

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
      patient: props.navigation.getParam('patient'),
      isSaving: false,
    }
  }

  componentDidMount() {
    if (this.props.navigation.state.params.startQuestionnaire) { this.submitForm({}) }
  }

  navigateToDiagnosis = (patient) => this.props.navigation.navigate('Diagnosis', { patient: patient })

  submitForm = values => {
    let valuesToWrite = {
      createdAt: new Date(), // before ...values so ignored if already present
      ...values,
      firstName: values.firstName ? values.firstName.trim() : "",
      lastName:  values.lastName ? values.lastName.trim() : "",
      sectionResults: {},
    }

    this.setState({ isSaving: true })

    if (this.state.patient) {
      this.state.patient.update(valuesToWrite).then(() => {
        this.setState({ isSaving: false })
        this.props.navigation.goBack()
      }).catch(this.handleSaveError)
    } else {
      store.patients.add(valuesToWrite).then((patient) => {
        this.setState({ isSaving: false, patient })
        this.navigateToDiagnosis(patient)
      }).catch(this.handleSaveError)
    }
  }

  handleSaveError = (e) => {
    this.setState({ isSaving: false })
    alert("Error saving.")
    console.log(e)
  }

  submitButtonText = (formValues) => {
    if (this.state.isSaving) {
      return "Saving..."
    } else if (this.state.patient) {
      return "Save"
    } else if (Object.keys(formValues).length === 0) {
      return "Skip to Diagnosis"
    } else {
      return "Save and Start Diagnosis"
    }
  }

  renderForm = ({ handleSubmit, values }) => <Form>
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
    <BlueButton onPress={handleSubmit} title={this.submitButtonText(values)} disabled={this.state.isSaving} />
  </Form>

  deletePatient = () => Alert.alert(
    'Delete Patient',
    'Are you sure?',
    [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          this.setState({ isSaving: true })
          this.state.patient.delete().then(
            () => this.props.navigation.popToTop()
          ).catch(
            () => alert("Error deleting patient.")
          )
        }
      },
    ],
    { cancelable: true },
  )

  savedPatientButtons = () => {
    let diagnosisInitialState = DiagnosisScreen.initialState(this.state.patient)
    return <>
      <BlueButton
        title={diagnosisInitialState.sections.current ? "Continue Diagnosis" : "Diagnosis Results"}
        onPress={() => this.navigateToDiagnosis(this.state.patient)}
      />
      <BlueButton title="Delete Patient" color="#ff0000" onPress={this.deletePatient} />
    </>
  }

  render() {
    let initialValues = this.state.patient && toJS(this.state.patient.data)

    return <Container>
      <ScrollContainer>
        <InnerView>
        <Formik
          onSubmit={this.submitForm}
          initialValues={initialValues}
          // validationSchema={validationSchema}
          render={this.renderForm}
        />
        {this.state.patient && this.savedPatientButtons()}
        </InnerView>
      </ScrollContainer>
    </Container>
  }
}



export default PatientViewScreen



