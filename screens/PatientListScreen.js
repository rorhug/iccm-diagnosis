import React from 'react'
import {
  SectionList,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import { WebBrowser } from 'expo'
import { Icon } from 'expo'


import styled, { css } from '@emotion/native'


const SectionListRow = styled.Text`
  width: 100%;
`

const SectionListHeader = styled(SectionListRow)`
  background-color: #eeeeee;
  padding: 5px 10px;
  font-size: 14px;
`

const SectionListItem = styled(SectionListRow)`
  background-color: #ffffff;
  padding: 15px 10px;
  border: 1px solid #eeeeee;
  border-width: 1px 0 0 0;
  font-size: 18px;
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

export default class PatientListScreen extends React.Component {
  static navigationOptions = {
    title: "DyanmoDiagnoser",
    headerBackTitle: "Patients"
  };

  constructor(props) {
    super(props)
  }

  renderItem = ({item, index, section}) => <SectionListItem key={index}>{item}</SectionListItem>

  renderSectionHeader = ({section: {title}}) => (
    <SectionListHeader style={{fontWeight: 'bold'}}>{title}</SectionListHeader>
  )

  renderNewPatientButtons = () => <NewPatientWrap>
    <TouchableOpacity onPress={this.newPatientButtonPressed}>
      <NewPatientButton>
        <Icon.Ionicons
          name={"md-person-add"}
          size={40}
        />
        <Text>New Patient</Text>
      </NewPatientButton>
    </TouchableOpacity>
  </NewPatientWrap>

  newPatientButtonPressed = () => this.props.navigation.navigate(
    'PatientView',
    { patient: { first_name: "Markov", last_name: "Kollektiv" } }
  )

  render() {
    return <SectionList
      renderItem={this.renderItem}
      renderSectionHeader={this.renderSectionHeader}
      sections={[
        {
          title: 'New Patient',
          data: [0],
          renderItem: this.renderNewPatientButtons
        },
        {title: 'In Progress', data: ['item3', 'item4']},
        {title: 'Complete', data: ['item5', 'item6']},
      ]}
      keyExtractor={(item, index) => item + index}
    />
  }

}
