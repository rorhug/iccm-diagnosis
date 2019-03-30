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
    title: "DyanmoDiagnoser",
    headerBackTitle: "Patients"
  }

  renderItem = ({ item, index, section }) => <Observer>
    {() => <TouchableOpacity onPress={() => this.navigateToPatient(item)}>
      <SectionListItem>
        <SectionListItemTitle>{item.displayName}</SectionListItemTitle>
        <SectionListItemSubtitle>{item.ageEstimateText}</SectionListItemSubtitle>
      </SectionListItem>
    </TouchableOpacity>}
  </Observer>

  renderSectionHeader = ({section: {title}}) => (
    <SectionListHeader style={{fontWeight: 'bold'}}>{title}</SectionListHeader>
  )

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

    <TouchableOpacity onPress={() => this.navigateToPatient()}>
      <NewPatientButton>
        <Icon.Ionicons
          name={"md-paper"}
          size={40}
          color={"#05668d"}
        />
        <ButtonText>Start Questionnaire</ButtonText>
      </NewPatientButton>
    </TouchableOpacity>
  </NewPatientWrap>

  navigateToPatient = (patient) => this.props.navigation.navigate('PatientView', { patient: patient })

  render() {
    const { docs, query } = store.patients

    let ss = store.patients
    if (store.patients.isLoading) {
      return <Text>LOADING</Text>
    }

    return <SectionList
      renderItem={this.renderItem}
      renderSectionHeader={this.renderSectionHeader}
      sections={[
        {
          title: 'New Patient',
          data: [{ id: "_" }],
          renderItem: this.renderNewPatientButtons
        },
        { title: 'In Progress', data: docs.length ? docs.slice() : [] },
      ]}
      keyExtractor={ (item, index) => item.id + index }
    />
  }
}
