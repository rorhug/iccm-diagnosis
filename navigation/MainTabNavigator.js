import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import RecordScreen from '../screens/RecordScreen';

import CounterChoiceScreen from '../screens/CounterChoiceScreen';
import TapCounterScreen from '../screens/TapCounterScreen';
import TutorialScreen from '../screens/TutorialScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  CounterChoice: { screen: CounterChoiceScreen, navigationOptions: { header: null } },
  Tutorial: { screen: TutorialScreen, navigationOptions: { header: null } },
  TapCounter: { screen: TapCounterScreen, navigationOptions: { header: null } },
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
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

/*
// Temporary Stack
const CounterStack = createStackNavigator({
CounterChoice: { screen: CounterChoiceScreen, navigationOptions: { header: null } },
  Tutorial: { screen: TutorialScreen, navigationOptions: { header: null } },
  TapCounter: { screen: TapCounterScreen, navigationOptions: { header: null } }
});
CounterStack.navigationOptions = {
    tabBarLabel: 'CounterChoice',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
      />
    )
};
// Temporary Stack
*/

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
  Record: RecordScreen,
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

export default createBottomTabNavigator({
  HomeStack,
  // LinksStack,
  RecordStack,
  // CounterStack
});
