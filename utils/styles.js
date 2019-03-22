import { Dimensions, Platform } from 'react-native';
import styled, { css } from '@emotion/native';

const info_width = (Dimensions.get('window').width / 100) * 80;

/*
    TO-DO:
    - Restyle CounterChoice screen - M
    - Restyle Results screen - M
    - Icons - L
    - DangesSigns - list with checkboxes -L
*/

exports.Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 20px;
`

exports.ScrollContainer = styled.ScrollView`
    flex: 1;
    padding-left: 20px;
    padding-right: 20px;
`

exports.QuestionBox = styled.View`
    display: flex;
    background-color: #F5F5F5;
    padding: 5px;
    border-radius: 10px;
    border-width: 1px; 
    border-color: #fff;
`

exports.ButtonsBox = styled.View`
  display: flex;
  margin: 20px 0 20px 0;
  background-color: #F5F5F5;
  padding-top: 5px;
  padding-bottom: 15px;
  border-radius: 10px;
  border-width: 1px; 
  border-color: #fff;
`

var paddingbottom = Platform.OS === 'ios' ? `30px` : `15px`;

exports.Header = styled.Text`
  font-weight: bold;
  font-size: 40px;
  padding-top: 30px;
  padding-bottom: ${paddingbottom};
  text-align: center;
  color: #fff;
  background-color: #05668d;
`

exports.Question = styled.Text`
  font-size: 24px;
  font-style: italic;
  text-align: center;
  color: #05668d;
`

exports.AnswerText = styled.Text`
  font-size: 20px;
  color: #05668d;
`

exports.AnswerTextView = styled.View`
  background-color: #FFB732;
  padding: 10px;
  margin: 10px 10px 0 10px;
  border-radius: 10px;
`

exports.InfoText = styled.Text({
  padding: 20,
  width: info_width
})

exports.AnswerButton = styled.TouchableOpacity`
  flex: 2 2;
`

exports.InfoButton = styled.TouchableOpacity`
`

exports.InfoImage = styled.Image`
  align-self: center;
  width: 150;
  height: 150;
`

exports.AnswerRow = styled.View`
  display: flex;
  flex-flow: row wrap;
  align-content: space-between;
  justify-content: space-between;
`
exports.LineBreak = styled.View`
  width: 100%
`
