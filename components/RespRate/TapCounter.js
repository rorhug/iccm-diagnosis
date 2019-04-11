import React, { Component } from 'react'
import {
  BlueButton,
  Container,
  ScrollContainer,
  InnerView,
  ButtonsBox,
  Header,
  Question,
  AnswerButton,
  LineBreak
} from '../../utils/styles';
import TimerCircle from './TimerCircle'
import { RrComponents } from '../../utils/constants';

const finished = 'finished'
const tapping = 'tapping'
const start = 'start'

initialState = {
  time: 0,
  current: start,
  count: 0,
}

export class TapCounter extends Component {
  static navigationOptions = {
    title: 'Tap Screen',
  };

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  startTapping = () => {
    this.setState({
      current: tapping,
    })
  }

  onCompletion = () => {
    console.log(this.state.time)
    this.setState({ current: finished });
  }

  onPress = () => {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    content = (
      <>
        <TimerCircle
          start={this.state.current === tapping}
          onTimeElapsed={this.onCompletion}
          seconds={60}
          radius={80}
          borderWidth={20}
          color='#05668d'
          bgColor="#fff"
          shadowColor='#999'
          textStyle={{ fontSize: 20 }}
          style={{ margin: 10, alignSelf: 'center' }}
        />
        <Question
          text="Press Start then tap the button at every inhalation."
        />
        <ButtonsBox>
          <BlueButton
            style={{ height: 100 }}
            onPress={this.state.current === start ? this.startTapping : this.onPress}
            title={this.state.current === start ? 'Start' : 'Tap at every inhalation'}
          />
          <LineBreak style={{ height: 40 }} />
          <AnswerButton
            onPress={() => this.setState(initialState)}
            title="Reset"
          />
        </ButtonsBox>
      </>
    )
    if (this.state.current === finished) {
      content = (
        <>
          <Question
            text={`Inhalations per minute: ${this.state.count}`}
          />
          <ButtonsBox>
            <AnswerButton
              onPress={() => this.props.respRate(this.state.count)}
              title={this.props.endButton || 'Continue'}
            />
            <AnswerButton
              onPress={() => this.setState(initialState)}
              title="Redo"
            />
          </ButtonsBox>
        </>
      )
    }
    return (
      <Container>
        {!this.props.navigation &&
          <Header title="BPM Counter" visible={true}
            onPress={() => this.props.renderNext(RrComponents.counterchoice)} />}
        <ScrollContainer ><InnerView>
          {content}
        </InnerView>
        </ScrollContainer>
      </Container>
    )
  }
}
