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

export class TapCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      current: start
    };
  }

  startTapping = () => {
    this.setState({
      current: tapping
    })
  }

  onCompletion = () => {
    clearInterval(this.interval);
    this.setState({ current: finished });
  }

  onPress = () => {
    count = this.state.count + 1  
    this.setState({count})
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
                Inhalations per minute: {this.state.count}
              </Text>
            </View>
            <TouchableHighlight
              style={styles.calbutton}
              onPress={() => this.props.respRate(this.state.count)}
            >
              <Text> Continue </Text>
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
