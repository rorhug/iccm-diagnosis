import React from 'react';

import { CounterChoice } from './CounterChoice'
import  Tutorial  from './Tutorial'
import  {TapCounter}  from './TapCounter';
import { RrComponents } from '../../utils/constants';

// This holds all existing Components on this screen.
const COMPONENTS = {
    [RrComponents.counterchoice]: CounterChoice,
    [RrComponents.tutorial]: Tutorial,
    [RrComponents.tapcounter]: TapCounter
}

export default class RespiratoryRate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        currentComponent: RrComponents.counterchoice
    }
  }

  renderNext = (rrcomponent) => {
    console.log('LOGGING')
    console.log(rrcomponent)
    this.setState({ currentComponent: rrcomponent })
  }

  render() {
    let CurrentComponent = COMPONENTS[this.state.currentComponent]
    
    return <CurrentComponent
      renderNext={this.renderNext} 
      respRate={this.props.respRate}/>
  }
}