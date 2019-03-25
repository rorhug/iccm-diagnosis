import React, { Component } from 'react'
import {
  Animated,
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
} from 'react-native'
import { styled } from '@emotion/native'
import TimerCircle from './TimerCircle'

const finished = 'finished'
const tapping = 'tapping'
const start = 'start'

export default class TapCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 1,
      current: start
    };
    this.time = 0;
    this.count = 0;
  }

  startTapping = () => {
    this.setTick();
    this.setState({
      current: tapping
    })
  }

  onCompletion = () => {
    clearInterval(this.interval);
    this.setState({ current: finished, bpm: this.count });
  }

  setTick() {
    this.interval = setInterval(() => {
      this.time += 1
      console.log(this.time)
    }, 1000);
  }

  onPress = () => {
    this.count += 1;
  }

  render() {
    switch (this.state.current) {
      case start:
        return (
          <View style={styles.container}>
            <TouchableHighlight
              style={styles.startbutton}
              onPress={this.startTapping}
            >
              <Text> First Press Start </Text>
            </TouchableHighlight>
          </View>
        )

      case tapping:
        return (
          <View style={styles.container}>

            <TimerCircle
              seconds={59}
              radius={80}
              borderWidth={20}
              color='#f00'
              bgColor="#fff"
              shadowColor='#999'
              textStyle={{ fontSize: 20 }}
              onTimeElapsed={this.onCompletion}
              style={{ margin: 10 }}
            />

            <TouchableHighlight
              style={styles.tapbutton}
              onPress={this.onPress}
            >
              <Text>Tap at every inhalation</Text>
            </TouchableHighlight>
          </View>
        )
      case finished:
        return (
          <View style={styles.container}>
            <View style={[styles.countContainer]}>
              <Text style={[styles.countText]}>
                Inhalations per minute: {this.state.bpm}
              </Text>
            </View>
            <TouchableHighlight
              style={styles.calbutton}
              onPress={() => this.props.respRate(this.state.bpm)}
            >
              <Text> {this.props.endButton || 'Continue'} </Text>
            </TouchableHighlight>
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
    paddingHorizontal: 10
  },
  startbutton: {
    alignItems: 'center',
    backgroundColor: '#0ace0a',
    padding: 20
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
  }
})
