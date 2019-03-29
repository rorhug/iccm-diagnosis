import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
} from 'react-native'
<<<<<<< HEAD
import {
    AnswerButton,
    AnswerTextView,
    AnswerText
} from '../../utils/styles';
import styled from '@emotion/native';

=======
import { 
  Header,
  InfoText,
  QuestionBox,
  ButtonsBox,
  Question,
  AnswerButton,
  InfoButton,
  InfoImage,
  AnswerText,
  AnswerTextView,
  AnswerRow,
  LineBreak
} from '../../utils/styles';
>>>>>>> reset button on tap screen
import TimerCircle from './TimerCircle'
import { QuestionText } from '../../utils/constants';

const finished = 'finished'
const tapping = 'tapping'
const start = 'start'

<<<<<<< HEAD
/* Styling */
const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  padding: 20px;
`
=======
initialState = {
  time: 0,
  current: start,
  count: 0,
}
>>>>>>> reset button on tap screen

export class TapCounter extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  startTapping = () => {
    this.setTick();
    this.setState({
      current: tapping,
    })
  }

  onCompletion = () => {
    clearInterval(this.interval);
    console.log(this.state.time)
    this.setState({ current: finished, bpm: this.state.count });
  }

  reset = () => {
    clearInterval(this.interval);
    this.setState(initialState);
  }

  setTick() {
    this.interval = setInterval(() => {
      time = this.state.time +1
      this.setState({time:time});
      //console.log(this.state.time)
    }, 1000);
  }

  onPress = () => {
    this.state.count += 1;
  }

  render() {
    switch (this.state.current) {
      case start:
<<<<<<< HEAD
        return (
          <Container>
            <AnswerButton
              onPress={this.startTapping}
            >
                <AnswerTextView>
                    <AnswerText> First Press Start </AnswerText>
                </AnswerTextView>
            </AnswerButton>
          </Container>
        )

=======
>>>>>>> reset button on tap screen
      case tapping:
        return (
          <View style={styles.container}>

            <TimerCircle
              seconds={59}
              secondsElapsed={this.state.time}
              radius={80}
              borderWidth={20}
              color='#f00'
              bgColor="#fff"
              shadowColor='#999'
              textStyle={{ fontSize: 20 }}
              onTimeElapsed={this.onCompletion}
              style={{ margin: 10 }}
            />

            <AnswerButton
              style={{height:100}}
              onPress={this.state.current===start? this.startTapping : this.onPress}
            >
              <AnswerTextView style={{height:100}}
              ><AnswerText>{this.state.current===start? 'Tap to Start' : 'Tap at every inhalation'}</AnswerText></AnswerTextView>
            </AnswerButton>
            <AnswerButton
              onPress={this.reset}
            >
              <AnswerTextView
              ><AnswerText>Reset</AnswerText></AnswerTextView>
            </AnswerButton>
            
          </View>
        )
      case finished:
        return (
          <View style={styles.container}>
            <View>
              <QuestionText>
                Inhalations per minute: {this.state.bpm}
              </QuestionText>
            </View>
            <AnswerButton
              onPress={() => this.props.respRate(this.state.bpm)}
            >
              <AnswerTextView><AnswerText> Continue </AnswerText></AnswerTextView>
            </AnswerButton>
          </View>
        )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
<<<<<<< HEAD
    paddingHorizontal: 10
  },
  startbutton: {
    alignItems: 'center',
    backgroundColor: '#0ace0a',
    padding: 20,
  },
  tapbutton: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 80
  },
  stopbutton: {
    alignItems: 'center',
    backgroundColor: '#ce0a0a',
    padding: 20
  },
  calbutton: {
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 10
  },
  countContainer: {
    alignItems: 'center',
    padding: 10
  },
  countText: {
    color: '#FF00FF'
=======
    paddingHorizontal: 10,
    paddingTop: 50
>>>>>>> reset button on tap screen
  }
})
