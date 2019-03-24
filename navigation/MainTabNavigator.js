import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import RecordScreen from '../screens/RecordScreen';
import InfoScreen from '../screens/InfoScreen';

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

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Questionaire',
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

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const RecordStack = createStackNavigator({
  Record: InfoScreen,
});

RecordStack.navigationOptions = {
  tabBarLabel: 'Record',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

/*const InfoStack = createStackNavigator({
  Info: InfoScreen,
});

RecordStack.navigationOptions = {
  tabBarLabel: 'Info',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};
*/
export default createBottomTabNavigator({
  InfoStack,
  HomeStack,
  RecordStack
});
