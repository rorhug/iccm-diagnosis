import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
} from 'react-native'

const finished = 'finished'
const tapping = 'tapping'
const start = 'start'

export class TapCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 1,
      current: start
    };
    this.count = 1;
  }

  startTapping = () => {

    setTimeout(() => {
      clearInterval(this.interval);
      this.setState({ current: finished, bpm: this.count });
    }, 60000);

    this.setState({ current: tapping })
  }

  tick() {
    this.interval = setInterval(() => {
      this.setState(prevState => ({
        time: prevState.time + 1
      }));
    }, 1000);
  }

  onPress = () => {
    this.count += 1
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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
          <TouchableHighlight
            style={styles.tapbutton}
            onPress={this.onPress}
          >
            <Text>Tap at every inhalation</Text>
          </TouchableHighlight>
        )
      case finished:
        return (
          <View style={styles.container}>
            <View style={[styles.countContainer]}>
              <Text style={[styles.countText]}>
                The bpm is: {this.state.bpm}
              </Text>
            </View>

            <TouchableHighlight
              style={styles.calbutton}
              onPress={() => this.props.respRate(this.state.bpm)}
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
    flex: 1,
    justifyContent: 'center',
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
