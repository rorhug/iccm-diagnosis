import Audio from 'react-native-audio-polyfill'

const audio1 = new Audio()

audio1.onload = () => {
  console.log('audio loaded')
  audio1.play()
}
