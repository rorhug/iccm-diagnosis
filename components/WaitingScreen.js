import React from 'react';
import { ScrollView, View } from 'react-native';

import {
  Header,
  ButtonsBox,
  Question,
  AnswerButton,
} from '../utils/styles';

export class WaitingScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  renderWaitingSections = (section, index) => {
    let id = this.props.sectionResults[section];
    let text = this.props.components[section].questions[id].text
    return (
      <AnswerButton
        title={text}
        key={index}
        onPress={() => this.props.continueSection(section, id)}
      />
      )
  }

  renderNextSection = () => {
    return (<AnswerButton
      title="No - continue"
      onPress={() => this.props.skipWaitScreen()}/>
    );
  }

  render() {
    return (
      /* Do not change the styling on this View. */
      <View style={{ flex: 1 }}>
        <Header title="Questions to Continue"/>
        <ScrollView style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20 }}>
            <Question text="Are any of these Tasks complete?"/>
          <ButtonsBox>
            {this.props.waiting.map(this.renderWaitingSections)}
            {this.renderNextSection()}
          </ButtonsBox>
        </ScrollView>
      </View>
    );
  }
}

