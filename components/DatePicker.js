// taken from https://github.com/bamlab/react-native-formik/blob/f4885cd1f31a955de47c7f56fb37c2c3b5eb07e6/Example/DatePicker.js

import React from "react";
import DisableKeyboard from "react-native-formik/src/withPickerValues/DisableKeyboard";
import DateTimePicker from "react-native-modal-datetime-picker";
import { TextField } from "react-native-material-textfield";
// import { format } from "date-fns";

import { firestore } from 'firebase'

class DatePicker extends React.PureComponent {
  state = {
    pickerOpened: false
  };

  focus = () => this.openPicker();

  openPicker = () => {
    this.setState({ pickerOpened: true });
  };

  setValueAndClose = (value) => {
    let p = this.props.value
    // debugger;

    this.props.setFieldValue(value)
    this.setState({ pickerOpened: false }, () => {
      // this.props.setFieldTouched()
    })
  }


  handleDatePicked = value => {
    this.setValueAndClose(firestore.Timestamp.fromDate(value))
    if (this.props.onSubmitEditing) this.props.onSubmitEditing()
  };

  render() {
    let dateObject = this.props.value && this.props.value.toDate()
    return (
      <React.Fragment>
        <DisableKeyboard onPress={this.openPicker}>
          <TextField {...this.props} value={dateObject && dateObject.toISOString().slice(0,10)} />
        </DisableKeyboard>
        <DateTimePicker
          isVisible={this.state.pickerOpened}
          onConfirm={this.handleDatePicked}
          onCancel={this.setValueAndClose}
          {...this.props}
          date={dateObject}
          cancelTextIOS="Clear"
        />
      </React.Fragment>
    );
  }
}

export default DatePicker
