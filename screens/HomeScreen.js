import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import { Fever } from '../components/Sections/Fever';
import { Cough } from '../components/Sections/Cough';


import styled, { css } from '@emotion/native'

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 20px;
  margin-top: 40px;
`

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };


  render() {


    return (
      <Container>
        <Cough />
      </Container>
    );
  }

}

