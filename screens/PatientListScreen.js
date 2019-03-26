import React from 'react'
import {
  SectionList,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import { WebBrowser } from 'expo'
import { Icon } from 'expo'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react';
import styled, { css } from '@emotion/native'


import store from '../utils/store'

// const SectionListRow = styled.Text`
//   width: 100%;
// `

const SectionListHeader = styled.Text`
  background-color: #eeeeee;
  padding: 5px 10px;
  font-size: 14px;
`

const SectionListItem = styled.View`
  background-color: #ffffff;
  padding: 15px 10px;
  border: 1px solid #eeeeee;
  border-width: 1px 0 0 0;
`

const SectionListItemTitle = styled(Text)`
  flex: 1;
  font-size: 18px;
  padding: 0 0 2px 0;
`

const SectionListItemSubtitle = styled(Text)`
  flex: 1;
  font-size: 12px;
  width: 100%;
  color: #444;
`

const NewPatientWrap = styled(View)`
  padding: 10px;
  display: flex;
  /*align-items: center;*/

`

const NewPatientButton = styled(View)`

  align-items: center;
  background-color: #eeeeee;
  padding: 10px;

`

@observer
export default class PatientListScreen extends React.Component {
  static navigationOptions = {
    title: "DyanmoDiagnoser",
    headerBackTitle: "Patients"
  };

  constructor(props) {
    super(props)
  }

  renderItem = ({ item, index, section }) => {
    let patient = item.data
    let title = `${patient.firstName} ${patient.lastName}` || item.id
    return <TouchableOpacity onPress={() => this.navigateToPatient(item)}>
      <SectionListItem>
        <SectionListItemTitle>Name: {title}</SectionListItemTitle>
        <SectionListItemSubtitle>{item.id}</SectionListItemSubtitle>
      </SectionListItem>
    </TouchableOpacity>
  }

  renderSectionHeader = ({section: {title}}) => (
    <SectionListHeader style={{fontWeight: 'bold'}}>{title}</SectionListHeader>
  )

  renderNewPatientButtons = () => <NewPatientWrap>
    <TouchableOpacity onPress={() => this.navigateToPatient()}>
      <NewPatientButton>
        <Icon.Ionicons
          name={"md-person-add"}
          size={40}
        />
        <Text>New Patient</Text>
      </NewPatientButton>
    </TouchableOpacity>
  </NewPatientWrap>

  // newPatientButtonPressed = () => this.props.navigation.navigate(
  //   'PatientView',
  //   { patient: { first_name: "Markov", last_name: "Kollektiv" } }
  // )

  navigateToPatient = (patientDoc) => this.props.navigation.navigate('PatientView', { patientDoc: patientDoc })

  render() {
    if (store.patients.isLoading && store.patients.length) {
      return <Text>LOADING</Text>
    }

    console.log("render")

    const { docs, query } = store.patients

    // let patients = docs.map(({ id, data }) => { return { id, data } })
    let patients = toJS(docs)
    // debugger

    return <SectionList
      renderItem={this.renderItem}
      renderSectionHeader={this.renderSectionHeader}
      sections={[
        {
          title: 'New Patient',
          data: [{ id: "_" }],
          renderItem: this.renderNewPatientButtons
        },
        { title: 'In Progress', data: patients },
      ]}
      keyExtractor={ (item, index) => item.id + index }
    />
  }

}
