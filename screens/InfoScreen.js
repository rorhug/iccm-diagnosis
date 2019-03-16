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
  /*margin-top: 10px;
  align-items: center;*/
  justify-content: flex-start;
`
const ImageView = styled.View`
  flex = 1;
  background-color: #fff;
  padding: 5px;
  flex-direction: 'row';
  /*margin-top: 10px;*/
  align-items: center;
  /*justify-content: space-evenly;*/
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
        <ScrollView style={{ paddingLeft: 0, paddingRight: 0 }}>
          <ImageView>
            <Image
            source={require('../assets/images/DD.png')}
            style={{width: 310, height: 100,justifyContent: 'flex-start'}}
            />

            <Image
            source={require('../assets/images/MSFsmall.png')}
            style={{width: 80, height: 40,justifyContent: 'flex-end'}}
            />
          </ImageView>

          <SubHeading>Symptom Diagnosis</SubHeading>

          <Paragraph>This is a simple testing application for providing quick and decisive medical diagnosis.
           By following each section
          of the survey, a number of referrals may be provided to you based off your symptoms.</Paragraph>
          <Paragraph>By following the referral(s) provided to you, we hope that illness can be
          recognised and helped before it reaches a crucial stage. </Paragraph>

        </ScrollView>

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