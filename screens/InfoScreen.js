import React from 'react';
import {
    View,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native';
import styled, { css } from '@emotion/native'

import { RrComponents } from '../utils/constants';

// Create Buttons with Images for this screen.
const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 10px;
  margin-top: 10px;
  align-items: center;
  justify-content: flex-start;
`

const SubHeading = styled.Text`
    font-weight: bold;
    font-size: 24px;
    padding-vertical: 10px;
`

const Paragraph = styled.Text`
    font-weight: normal;
    font-size: 16px;
    padding-vertical: 10px;
/*    letterSpacing: 0.5;*/
    align-items: center;
`

export default class InfoScreen extends React.Component {
  static navigationOptions = {
    title: 'Info',
  };

  render() {
    return (
      <Container>

        <Image
        source={require('../assets/images/logo.png')}
        style={{width: 100, height: 100}}
        />

        <Image
        source={require('../assets/images/name.png')}
        style={{width: 200, height: 80}}
        />

        <SubHeading>Symptom Diagnosis</SubHeading>

        <Paragraph>This is a simple testing application for providing quick and decisive medical diagnosis.
         By following each section
        of the survey, a number of referrals may be provided to you based off your symptoms.</Paragraph>
        <Paragraph>By following the referral(s) provided to you, we hope that illness can be
        recognised and helped before it reaches a crucial stage. </Paragraph>

    </Container>
    );
  }

}


/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});*/
