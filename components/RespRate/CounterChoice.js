import React from 'react';
import { 
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import { RrComponents } from '../../utils/constants';
import { 
    AnswerText,
    AnswerTextView,
    QuestionBox,
    Question,
    Header,
    ImageButtonsContainer
} from '../../utils/styles';


export class CounterChoice extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <View style={{ flex: 1 }}>
        <Header title="Respiratory Rate"/>
        <View style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20 }}>

            <QuestionBox>
                <Question>How would you like to count Respiratory Rate?</Question>
            </QuestionBox>
            <ImageButtonsContainer>
                <TouchableOpacity onPress={() => this.props.renderNext(RrComponents.tutorial)}>
                    <Image
                    source={require('../../assets/images/breathing-thing.jpg')}
                    style={{width: 130, height: 130}}
                    />
                    <AnswerTextView><AnswerText>Record</AnswerText></AnswerTextView>
                </TouchableOpacity>

                <View style={{ width: 10 }}></View>

                <TouchableOpacity onPress={() => this.props.renderNext(RrComponents.tapcounter)}>
                    <Image
                    source={require('../../assets/images/tap.jpg')}
                    style={{width: 130, height: 130}}
                    />
                    <AnswerTextView><AnswerText>Tap</AnswerText></AnswerTextView>
                </TouchableOpacity>
            </ImageButtonsContainer>

        </View>
    </View>
  }

}