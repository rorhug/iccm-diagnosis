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
import { observer, Observer } from 'mobx-react'
// import { Observer } from 'mobx-react/native';
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
  padding: 10px;
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
  padding: 10px 10px 0 10px;
  display: flex;
`

const NewPatientButton = styled(View)`
  align-items: center;
  /*background-color: #eeeeee;*/
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  border: 2px solid #05668d;
`

const ButtonText = styled(Text)`
  font-size: 20px;
  color: #05668d;
`

@observer
export default class PatientListScreen extends React.Component {
  static navigationOptions = {
    title: "Dynamo Diagnoser",
    headerBackTitle: "Patients"
  }

  ageStr = (patient) => {
    if (!patient.data.dateOfBirth) { return }
    let years = Math.floor(patient.ageInMonths / 12)
    let monthsOld = Math.floor(patient.ageInMonths) % 12
    if (years === 0 && monthsOld === 0) {
      return `${Math.floor(patient.ageInDays)}d old`
    } else {
      return ((years !== 0 ? `${years}y` : '') + (monthsOld !== 0 ? ` ${monthsOld}m` : '') + " old")
    }
  }

  subtitle = (patient) => [
    this.ageStr(patient),
    patient.data.notes,
    `Created: ${patient.data.createdAt.toDate().toISOString()}`
  ].filter(s => s).join(", ").trim()

  renderItem = ({ item, index, section }) => <Observer>
    {() => <TouchableOpacity onPress={() => this.navigateToPatient(item)}>
      <SectionListItem>
        <SectionListItemTitle>{item.displayName}</SectionListItemTitle>
        <SectionListItemSubtitle>{this.subtitle(item)}</SectionListItemSubtitle>
      </SectionListItem>
    </TouchableOpacity>}
  </Observer>

  renderSectionHeader = ({section: {title}}) => (
    <SectionListHeader style={{fontWeight: 'bold'}}>{title}</SectionListHeader>
  )

  navigateToPatient = (patient) => this.props.navigation.navigate('PatientView', { patient: patient })

  renderNewPatientButtons = () => <NewPatientWrap>
    <TouchableOpacity onPress={() => this.navigateToPatient()}>
      <NewPatientButton>
        <Icon.Ionicons
          name={"md-person-add"}
          size={40}
          color={"#05668d"}
        />
        <ButtonText>New Patient</ButtonText>
      </NewPatientButton>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => this.props.navigation.navigate('PatientView', { startQuestionnaire: true })}>
      <NewPatientButton>
        <Icon.Ionicons
          name={"md-paper"}
          size={40}
          color={"#05668d"}
        />
        <ButtonText>Start Diagnosis</ButtonText>
      </NewPatientButton>
    </TouchableOpacity>
  </NewPatientWrap>

  render() {
    if (store.patients.isLoading) {
      return <Text>LOADING</Text>
    }

    const { docs, query } = store.patients
    let patients = docs.slice()

    let sections = [
      { title: "In Progress", data: [] },
      { title: "Completed", data: [] },
    ]
    patients.forEach((doc) => sections[doc.data.diagnosedAt ? 1 : 0].data.push(doc))

    return <SectionList
      renderItem={this.renderItem}
      renderSectionHeader={this.renderSectionHeader}
      sections={[
        {
          title: 'New Patient',
          data: [{ id: "_" }],
          renderItem: this.renderNewPatientButtons
        },
        ...sections.filter(section => section.data.length !== 0)
      ]}
      keyExtractor={ (item, index) => item.id + index }
    />
  }
}
