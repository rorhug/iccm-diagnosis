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

import DatePicker from "../components/DatePicker";

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



class PatientViewScreen extends React.Component {
  static navigationOptions = {
    title: "Patient"
  };

  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          patient: PropTypes.object.isRequired,
        }).isRequired
      })
    })
  }

  renderForm = props => {
    let submitButtonText = Object.keys(props.values).length === 0 ? "Skip to Diagnosis" : "Save and Continue"
    return (
      <Form>
        <MyInput label="First Name" name="firstName" type="name" />
        <MyInput label="Last Name" name="lastName" type="name" />
        <FocusedDatePicker label="Birthday" name="birthday" />
        <Button onPress={props.handleSubmit} title={submitButtonText} />
      </Form>
    );
  }

  submitForm = values => console.log(values)

  render() {
    return <Container>
      <Formik
        onSubmit={this.submitForm}
        // validationSchema={validationSchema}
        render={this.renderForm}
      />
    </Container>
  }
}



export default PatientViewScreen



