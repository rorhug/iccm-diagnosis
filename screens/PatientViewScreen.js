import React, { PropTypes } from 'react'
import {
  SectionList,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import { WebBrowser } from 'expo'
import { Icon } from 'expo'


import styled, { css } from '@emotion/native'

class PatientViewScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          patient: PropTypes.object.isRequired,
        })
      })
    })
  }

  render() {
    

  }
}



export default PatientViewScreen
