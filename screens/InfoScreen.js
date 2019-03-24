import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export class InfoScreen extends React.Component {
  static navigationOptions = {
    title: 'Info',
  };

  render() {
    return <Container>
        <SubHeading>How would you like to count Respiratory Rate?</SubHeading>

        <Image
        source={require('../../assets/images/Logo.PNG')}
        style={{width: 150, height: 150}}
        />

        <Image
        source={require('../../assets/images/Name.PNG')}
        style={{width: 150, height: 150}}
        />
    </Container>
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
