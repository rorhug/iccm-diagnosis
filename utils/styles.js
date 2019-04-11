import { Dimensions, Platform } from 'react-native';
import styled, { css } from '@emotion/native';
import React from 'react'
import { Text,View } from 'react-native'
import { exp } from 'react-native/Libraries/Animated/src/Easing';
import { Ionicons } from '@expo/vector-icons';
import { _confirmProps } from 'react-native/Libraries/Modal/Modal';


const info_width = (Dimensions.get('window').width / 100) * 80;

/*
    TO-DO:
    - Restyle CounterChoice screen - M
    - Restyle Results screen - M
    - Icons - L
    - DangesSigns - list with checkboxes -L

    #05668d - dark blue
    #FFB732 - orange
    #F5F5F5 - light grey

*/

/*  button & question container */
let contentContainerColor = `#F5F5F5`;
let buttonsColor = `#fff`;
let buttonsTextColor = `#05668d`


exports.Container = styled.View`
  flex: 1;
  background-color: #fff;
`

exports.InnerView = styled.View`
  flex: 1;
  margin-bottom: 40px;
`

exports.ColumnContainer = styled.View`
  background-color: #fff;
  flex-direction: column;
  justify-content: flex-start;
  padding: 20px;
`

exports.ScrollContainer = styled.ScrollView`
    flexGrow: 1;
    padding: 20px;
    background-color: #fff;
`

exports.ButtonsBox = styled.View`
  display: flex;
  margin: 20px 0 20px 0;
  background-color: ${contentContainerColor};
  padding-top: 5px;
  padding-bottom: 15px;
  border-radius: 10px;
  border-width: 1px; 
  border-color: #fff;
`

/* This is only used on Counter Choice screen. */
exports.ImageButtonsContainer = styled.View`
    border-radius: 5px;
    flex-direction: row;
    align-self: baseline;
    background-color: ${contentContainerColor};
    padding: 10px;
    margin: auto;
    marginTop: 20px;
`

let paddingbottom = Platform.OS === 'ios' ? `30px` : `15px`;
const Header = styled.Text`
  align-self: center;
  font-weight: bold;
  font-size: 40px;
  padding-top: 30px;
  padding-bottom: ${paddingbottom};
  text-align: center;
  color: #fff;
`//05668d

const HeaderView = styled.View`
  background-color: #05668d;
  flex-direction: row;
  justify-content: center;
`
let marginTop = Platform.OS === 'ios' ? `35px` : `45px`;
const BackButton = styled.TouchableOpacity`
  width: 20;
  margin: 30px;
  marginTop: ${marginTop};
  mariginBottom: ${paddingbottom};
`

exports.Header = (props) => <HeaderView {...props}>
  <BackButton
    onPress={props.onPress}>
    <Ionicons
      name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
      size={40} color={props.visible ? '#fff' : 'transparent'} />
  </BackButton>

  <Header>{props.title}</Header>
  <BackButton/> 
</HeaderView>


const QuestionBox = styled.View`
    display: flex;
    background-color: #eaf2ff;
    padding: 5px;
    border-radius: 10px;
    border-width: 1px; 
    border-color: #fff;
`

const Question = styled.Text`
  font-size: 24px;
  font-style: italic;
  text-align: ${props => props.text.includes("- ")? 'justify': 'center'};
  color: #05668d;
`

exports.Question = (props) => <QuestionBox>
  <Question text={props.text}>
    {props.text}
  </Question>
</QuestionBox>

const AnswerText = styled.Text`
  font-size: 20px;
  color: ${buttonsTextColor};
`
const AnswerTextView = styled.View`
  background-color: ${buttonsColor};
  padding: 10px;
  margin: 10px 10px 0 10px;
  border-radius: 10px;
`
exports.AnswerTextView = AnswerTextView
exports.AnswerText = AnswerText

exports.InfoText = styled.Text({
  padding: 20,
  width: info_width
})

const AnswerButton = styled.TouchableOpacity`
  flex: 2 2;
`

exports.AnswerButton = (props) => <AnswerButton {...props}>
  <AnswerTextView>
    <AnswerText>{props.title}</AnswerText>
  </AnswerTextView>
</AnswerButton>

exports.InfoButton = styled.TouchableOpacity`
`
//  flex: 2 2;
const BlueButton = styled.TouchableOpacity`
  background-color: #05668d;
  margin: 10px 10px 0 10px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`

const ButtonText = styled.Text`
  font-size: 20px;
  color: #fff;
  text-align: center;
  text-align-vertical: center;
  padding: 10px;
  flex-direction: column;
`

exports.BlueButton = (props) => <BlueButton {...props}>
  <ButtonText>{props.title}</ButtonText>
</BlueButton>

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

/** RECORDER STYLING */

exports.RightText = styled.Text`
  text-align: right;
  align-self: flex-start;
  margin-left: auto;
  font-size: 20px;
  color: #000;
`

exports.CenteredText = styled.Text`
  text-align: center;
  align-self: center;
  font-size: 20px;
  color: #000;
`

exports.RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`

exports.Slider = styled.Slider`
  color: ${buttonsTextColor};
  thumbTintColor:  ${buttonsTextColor};
  
`

exports.ImageButton = styled.TouchableOpacity`
  underlayColor: ${buttonsTextColor}
`