import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import {
  Text,
} from 'react-native';
import { Recorder } from '../components/Recorder';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Record Test',
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return <Recorder></Recorder>;
  }
}
