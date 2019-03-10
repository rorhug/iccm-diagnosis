import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
} from 'react-native'

export class TapCounter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, time:0,started:false,finished:false,isCalculated:false };
    this.tick = this.tick.bind(this);
  }

  tick(){
    this.interval = setInterval(() => {
    this.setState(prevState => ({
     time: prevState.time + 1
    }));
    }, 1000);
    this.setState({
     started:true
  })
  }
  onPress = () => {
    this.setState({
      count: this.state.count+1
    })
  }
  stopbutton = () => {
    clearInterval(this.interval);
    this.setState({
      finished:true
    })
  }
  calculatebpm = () => {
    if(this.state.finished){
    this.bpm=(this.state.count/this.state.time)*60
    this.bpm=Math.round(this.bpm)
    this.setState({
      isCalculated:true
    })
  }
  }
  componentWillUnmount(){
    clearInterval(this.interval);
  }



 render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
         style={styles.startbutton}
         onPress={this.tick}
         disabled={this.state.started}
        >
         <Text> First Press Start </Text>
        </TouchableHighlight>
        <TouchableHighlight
         style={styles.tapbutton}
         onPress={this.onPress}
         disabled={this.state.finished}
        >
         <Text>Tap at every inhalation</Text>
        </TouchableHighlight>
        <TouchableHighlight
         style={styles.stopbutton}
         onPress={this.stopbutton}
         disabled={this.state.finished}
        >
         <Text> press STOP when done </Text>
        </TouchableHighlight>
        <TouchableHighlight
         style={styles.calbutton}
         onPress={this.calculatebpm}
         disabled={this.state.isCalculated}
        >
         <Text> Calculate </Text>
        </TouchableHighlight>
        <View style={[styles.countContainer]}>
          <Text style={[styles.countText]}>
          Inhalations: {this.state.count}
          </Text>
       </View>
        <View style={[styles.countContainer]}>
          <Text style={[styles.countText]}>
            Time taken: { this.state.time !== 0 ?this.state.time:null}
          </Text>
        </View>
        <View style={[styles.countContainer]}>
          <Text style={[styles.countText]}>
          The calculated bpm is: { this.bpm !== 0 ?this.bpm: null}
          </Text>
        </View>
      </View>
    )
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
