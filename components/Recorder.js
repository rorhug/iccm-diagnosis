import React from 'react';
import {
  Dimensions,
  Image,
  View,
  Platform,
} from 'react-native';
import {
  AnswerText,
  BlueButton,
  CenteredText,
  Container,
  ScrollContainer,
  Header,
  ImageButton,
  InnerView,
  Slider,
  Question,
  RightText,
  RowContainer,
} from '../utils/styles';
import TimerCircle from './RespRate/TimerCircle'
import { RrComponents } from '../utils/constants';
import { Asset, Audio, FileSystem, Permissions } from 'expo';


class Icon {
  constructor(module, width, height) {
    this.module = module;
    this.width = width;
    this.height = height;
    Asset.fromModule(this.module).downloadAsync();
  }
}

const ICON_RECORD_BUTTON = new Icon(require('../assets/images/record_button.png'), 70, 119);
const ICON_RECORDING = new Icon(require('../assets/images/record_icon.png'), 20, 14);

const ICON_PLAY_BUTTON = new Icon(require('../assets/images/play_button.png'), 34, 51);
const ICON_PAUSE_BUTTON = new Icon(require('../assets/images/pause_button.png'), 34, 51);
const ICON_STOP_BUTTON = new Icon(require('../assets/images/stop_button.png'), 22, 22);

const ICON_MUTED_BUTTON = new Icon(require('../assets/images/muted_button.png'), 56, 64);
const ICON_UNMUTED_BUTTON = new Icon(require('../assets/images/unmuted_button.png'), 64, 64);

const ICON_TRACK_1 = new Icon(require('../assets/images/track_1.png'), 166, 5);
const ICON_THUMB_1 = new Icon(require('../assets/images/thumb_1.png'), 18, 19);
const ICON_THUMB_2 = new Icon(require('../assets/images/thumb_2.png'), 15, 19);

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');
const DISABLED_OPACITY = 0.5;
const UPSCALE_IMG = 1.2;


export class Recorder extends React.Component {
  static navigationOptions = {
    title: 'Recorder',
  };

  constructor(props) {
    console.log('consturct')
    super(props);
    this.recording = null;
    this.sound = null;
    this.isSeeking = false;
    this.shouldPlayAtEndOfSeek = false;
    this.state = {
      haveRecordingPermissions: false,
      isLoading: false,
      isPlaybackAllowed: false,
      muted: false,
      soundPosition: null,
      soundDuration: null,
      recordingDuration: null,
      shouldPlay: false,
      isPlaying: false,
      isRecording: false,
      fontLoaded: true,
      shouldCorrectPitch: true,
      volume: 1.0,
      rate: 1.0,
    };

    let recordingOptions = Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY
    try {
      recordingOptions.ios.outputFormat = Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_LINEARPCM
      recordingOptions.ios.extension = ".wav"
    } catch{
      console.log('options already set')
    }
    console.log(JSON.stringify(recordingOptions.ios))
    this.recordingSettings = recordingOptions
    // // UNCOMMENT THIS TO TEST maxFileSize:
    // this.recordingSettings.android['maxFileSize'] = 12000;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  componentDidMount() {
    this._mounted = true;
    this._askForPermissions();
  }

  _askForPermissions = async () => {
    const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    this.setState({
      haveRecordingPermissions: response.status === 'granted',
    });
  };

  _updateScreenForSoundStatus = status => {
    if (status.isLoaded && this._mounted) {
      this.setState({
        soundDuration: status.durationMillis,
        soundPosition: status.positionMillis,
        shouldPlay: status.shouldPlay,
        isPlaying: status.isPlaying,
        rate: status.rate,
        muted: status.isMuted,
        volume: status.volume,
        shouldCorrectPitch: status.shouldCorrectPitch,
        isPlaybackAllowed: true,
      });
    } else if (this._mounted) {
      this.setState({
        soundDuration: null,
        soundPosition: null,
        isPlaybackAllowed: false,
      });
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  };

  _updateScreenForRecordingStatus = status => {
    if (status.canRecord) {
      this.setState({
        isRecording: status.isRecording,
        recordingDuration: status.durationMillis,
      });
    } else if (status.isDoneRecording) {
      this.setState({
        isRecording: false,
        recordingDuration: status.durationMillis,
      });
      if (!this.state.isLoading) {
        this._stopRecordingAndEnablePlayback();
      }
    }
  };

  async _stopPlaybackAndBeginRecording() {
    this.setState({
      isLoading: true,
    });
    if (this.sound !== null) {
      await this.sound.unloadAsync();
      this.sound.setOnPlaybackStatusUpdate(null);
      this.sound = null;
    }
    // TO DO HANDEL RECETION WITH PERMISSIONS SCREEN
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: true,
    });
    if (this.recording !== null) {
      this.recording.setOnRecordingStatusUpdate(null);
      this.recording = null;
    }

    const recording = new Audio.Recording();
    await recording.prepareToRecordAsync(this.recordingSettings);
    recording.setOnRecordingStatusUpdate(this._updateScreenForRecordingStatus);

    this.recording = recording;
    await this.recording.startAsync(); // Will call this._updateScreenForRecordingStatus to update the screen.
    this.setState({
      isLoading: false,
    });
  }

  async _stopRecordingAndEnablePlayback() {
    this.setState({
      isLoading: true,
    });
    try {
      await this.recording.stopAndUnloadAsync();
    } catch (error) {
      // Do nothing -- we are already unloaded.
    }
    const info = await FileSystem.getInfoAsync(this.recording.getURI());
    console.log(`FILE INFO: ${JSON.stringify(info)}`);
    // TO DO HANDEL RECETION WITH PERMISSIONS SCREEN
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      playsInSilentLockedModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: true,
    });
    const { sound, status } = await this.recording.createNewLoadedSoundAsync(
      {
        isLooping: true,
        isMuted: this.state.muted,
        volume: this.state.volume,
        rate: this.state.rate,
        shouldCorrectPitch: this.state.shouldCorrectPitch,
      },
      this._updateScreenForSoundStatus
    );
    this.sound = sound;
    this.setState({
      isLoading: false,
    });
  }

  _onRecordPressed = () => {
    if (this.state.isRecording) {
      this._stopRecordingAndEnablePlayback();
    } else {
      this._stopPlaybackAndBeginRecording();
    }
  };

  _onPlayPausePressed = () => {
    if (this.sound != null) {
      if (this.state.isPlaying) {
        this.sound.pauseAsync();
      } else {
        this.sound.playAsync();
      }
    }
  };

  _onStopPressed = () => {
    if (this.sound != null) {
      this.sound.stopAsync();
    }
  };

  _onMutePressed = () => {
    if (this.sound != null) {
      this.sound.setIsMutedAsync(!this.state.muted);
    }
  };

  _onVolumeSliderValueChange = value => {
    if (this.sound != null) {
      this.sound.setVolumeAsync(value);
    }
  };

  _onSeekSliderValueChange = value => {
    if (this.sound != null && !this.isSeeking) {
      this.isSeeking = true;
      this.shouldPlayAtEndOfSeek = this.state.shouldPlay;
      this.sound.pauseAsync();
    }
  };

  _onSeekSliderSlidingComplete = async value => {
    if (this.sound != null) {
      this.isSeeking = false;
      const seekPosition = value * this.state.soundDuration;
      if (this.shouldPlayAtEndOfSeek) {
        this.sound.playFromPositionAsync(seekPosition);
      } else {
        this.sound.setPositionAsync(seekPosition);
      }
    }
  };

  _getSeekSliderPosition() {
    if (
      this.sound != null &&
      this.state.soundPosition != null &&
      this.state.soundDuration != null
    ) {
      return this.state.soundPosition / this.state.soundDuration;
    }
    return 0;
  }

  _getMMSSFromMillis(millis) {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = number => {
      const string = number.toString();
      if (number < 10) {
        return '0' + string;
      }
      return string;
    };
    return padWithZero(minutes) + ':' + padWithZero(seconds);
  }

  _getPlaybackTimestamp() {
    if (
      this.sound != null &&
      this.state.soundPosition != null &&
      this.state.soundDuration != null
    ) {
      return `${this._getMMSSFromMillis(this.state.soundPosition)} / ${this._getMMSSFromMillis(
        this.state.soundDuration
      )}`;
    }
    return '';
  }

  _getRecordingTimestamp() {
    if (this.state.recordingDuration != null) {
      return `${this._getMMSSFromMillis(this.state.recordingDuration)}`;
    }
    return `${this._getMMSSFromMillis(0)}`;
  }

  renderRecorder = () => (
    <View style={{ alignItems: 'center' }}>
      <ImageButton
        onPress={this._onRecordPressed}
        disabled={this.state.isLoading}
      >
        <Image source={ICON_RECORD_BUTTON.module} />
      </ImageButton>
      <AnswerText>{this.state.isRecording ? 'Recording' : 'Press to Record'}</AnswerText>
      {/* <AnswerText>{this._getRecordingTimestamp()}</AnswerText> */}
      <TimerCircle
        start={this.state.isRecording}
        onTimeElapsed={this._onRecordPressed}
        seconds={60}
        radius={60}
        borderWidth={15}
        color='#05668d'
        bgColor="#fff"
        shadowColor='#999'
        textStyle={{ fontSize: 20, color: '#05668d' }}
        updateText={() => this._getRecordingTimestamp()}
        style={{ margin: 20, alignSelf: 'center' }}
      />
    </View>
  )

  renderPlayback = (isDisabled) => (
    <View style={{ marginTop: 'auto', opacity: isDisabled ? DISABLED_OPACITY : 1.0 }}>
      <CenteredText>Playback</CenteredText>
      <Slider
        trackImage={ICON_TRACK_1.module}
        thumbImage={ICON_THUMB_1.module}
        value={this._getSeekSliderPosition()}
        onValueChange={this._onSeekSliderValueChange}
        onSlidingComplete={this._onSeekSliderSlidingComplete}
        disabled={isDisabled}
      />

      <RowContainer>
        <ImageButton
          style={{ width: ICON_PLAY_BUTTON.width * (UPSCALE_IMG + 0.5) }}
          onPress={this._onPlayPausePressed}
          disabled={isDisabled}>
          <Image source={this.state.isPlaying ? ICON_PAUSE_BUTTON.module : ICON_PLAY_BUTTON.module}
            style={{
              width: ICON_PLAY_BUTTON.width * UPSCALE_IMG,
              height: ICON_PLAY_BUTTON.height * UPSCALE_IMG,
              resizeMode: 'contain'
            }}
          />
        </ImageButton>
        {/* PLAY_BUTTON is used for consitent sizing */}
        <ImageButton
          style={{ width: ICON_PLAY_BUTTON.width * (UPSCALE_IMG + 0.5) }}
          onPress={this._onStopPressed}
          disabled={isDisabled}>
          <Image source={ICON_STOP_BUTTON.module}
            style={{
              width: ICON_PLAY_BUTTON.width * UPSCALE_IMG,
              height: ICON_PLAY_BUTTON.height * UPSCALE_IMG,
              resizeMode: 'contain'
            }}
          />
        </ImageButton>
        <RightText>{this._getPlaybackTimestamp()}</RightText>
      </RowContainer>
      {this.renderVolume(isDisabled)}
      {!this.props.navigation && this.renderButtons()}
    </View>
  )

  renderVolume = (isDisabled) => (
    <View style={{ opacity: isDisabled ? DISABLED_OPACITY : 1.0 }}>
      <CenteredText>Volume</CenteredText>
      <RowContainer>
        <ImageButton
          onPress={this._onMutePressed}
          disabled={isDisabled}>
          <Image source={this.state.muted ? ICON_MUTED_BUTTON.module : ICON_UNMUTED_BUTTON.module} />
        </ImageButton>
        <Slider style={{
          marginLeft: 'auto',
          width: DEVICE_WIDTH / 2.0 + ICON_MUTED_BUTTON.width
        }}
          trackImage={ICON_TRACK_1.module}
          thumbImage={ICON_THUMB_2.module}
          value={1}
          onValueChange={this._onVolumeSliderValueChange}
          disabled={isDisabled}
        />
      </RowContainer>
    </View>
  )

  renderButtons = () => (
    <>
      <BlueButton title="Breaths Per Minute < 40"
        onPress={() => this.props.respRate(35)}
      />
      <BlueButton title="Breaths Per Minute >= 40 and < 50"
        onPress={() => this.props.respRate(45)}
      />
      <BlueButton title="Breaths Per Minute >= 50"
        onPress={() => this.props.respRate(55)}
      />
    </>
  )

  renderInstructions = () => (
    <>
      <Question
        text="Press start to record the childs breath for 1 minute."
      />
    </>
  )

  renderNoPermission = () => {
    return Platform.OS === 'ios' ?
      (<Question
        text="To use the recorder: please manualy enable audio recording permission for this app in the settings."
      />
      )
      : (<>
        <Question
          text="Please enable audio recording permission to use the recorder."
        />
        <BlueButton title="Enable Recording" onPress={this._askForPermissions} />
        </>)
  }

  render() {
    playbackDisabled = !this.state.isPlaybackAllowed || this.state.isLoading
    return (
      <Container>
        {!this.props.navigation &&
          <Header
            title="Recorder" visible={true}
            onPress={() => this.props.renderNext(RrComponents.counterchoice)} />
        }
        <ScrollContainer>
          <InnerView>
            {!this.state.haveRecordingPermissions ?
              this.renderNoPermission() :
              (<>
                {this.renderRecorder()}
                {!playbackDisabled && this.renderPlayback(playbackDisabled)}
                {playbackDisabled && this.renderInstructions()}
              </>)
            }
          </InnerView>
        </ScrollContainer>
      </Container>
    )
  }
}
