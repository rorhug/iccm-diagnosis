import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import DiagnosisScreen from '../screens/DiagnosisScreen';
import LinksScreen from '../screens/LinksScreen';
import RecordScreen from '../screens/RecordScreen';
import InfoScreen from '../screens/InfoScreen';
import PatientListScreen from '../screens/PatientListScreen';
import PatientViewScreen from '../screens/PatientViewScreen';
import MeasurementScreen from '../screens/MeasurementScreen';
import {TapCounter}  from '../components/RespRate/TapCounter.js';

const InfoStack = createStackNavigator({
  Info: InfoScreen
});

InfoStack.navigationOptions = {
  tabBarLabel: 'Info',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const PatientListScreenStack = createStackNavigator({
  PatientList: PatientListScreen,
  PatientView: PatientViewScreen,
  Diagnosis: DiagnosisScreen,
});

PatientListScreenStack.navigationOptions = {
  tabBarLabel: 'Patients',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-help-circle${focused ? '' : '-outline'}`
          : 'md-help-circle'
      }
    />
  ),
};
const mapNavigationStateParamsToProps = (ScreenComponent) => {
  return class extends React.Component {
    static navigationOptions = ScreenComponent.navigationOptions
    render() {
      const { params } = this.props.navigation.state
      return <ScreenComponent {...this.props} {...params} />
    }
  }
}

const MeasurementStack = createStackNavigator({
  Measurement: MeasurementScreen,
  Counter: { screen: mapNavigationStateParamsToProps(TapCounter) },
  Counter1: RecordScreen,
});

MeasurementStack.navigationOptions = {
  tabBarLabel: 'Measurement',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  InfoStack,
  PatientListScreenStack,
  // HomeStack,
  MeasurementStack
}, {
  initialRouteName: "PatientListScreenStack"
});
