import React from 'react';
import { ScrollView, View } from 'react-native';

import {
  Header,
  QuestionBox,
  ButtonsBox,
  Question,
  AnswerButton,
  AnswerText,
  AnswerTextView,
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
        key={index}
        onPress={() => this.props.continueSection(section, id)}>
        <AnswerTextView><AnswerText>{text}</AnswerText></AnswerTextView>
      </AnswerButton>
    )
  }

  renderNextSection = () => {
    return (<AnswerButton onPress={() => this.props.skipWaitScreen()}>
      <AnswerTextView>
        <AnswerText>No - continue</AnswerText>
      </AnswerTextView>
    </AnswerButton>);
  }

  render() {
    return (
      /* Do not change the styling on this View. */
      <View style={{ flex: 1 }}>
        <Header title="Questions to Continue"/>
        <ScrollView style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20 }}>
          <QuestionBox>
            <Question>Are any of these Tasks complete?</Question>
          </QuestionBox>
          <ButtonsBox>
            {this.props.waiting.map(this.renderWaitingSections)}
            {this.renderNextSection()}
          </ButtonsBox>
        </ScrollView>
      </View>
    );
  }
}

