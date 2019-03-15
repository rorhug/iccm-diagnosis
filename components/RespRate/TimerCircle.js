// based on https://github.com/MrToph/react-native-countdown-circle
import React, { Component } from 'react'
import {
    Easing,
    Animated,
    Text
} from 'react-native'
import styled from '@emotion/native'

const radius = 100
const radiusMinusBorder = radius - 30

const OuterCircle = styled.View({
    width: radius * 2,
    height: radius * 2,
    borderRadius: radius,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f00',
});

const InnerCircle = styled.View({
    width: radiusMinusBorder * 2,
    height: radiusMinusBorder * 2,
    borderRadius: radiusMinusBorder,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
});

const HalfCircle = {
    position: 'absolute',
    top: 0,
    left: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: '#f00',
    width: radius,
    height: radius * 2,
    borderRadius: radius,
};

const LeftWrap = styled.View({
    position: 'absolute',
    top: 0,
    left: 0,
    width: radius,
    height: radius * 2
});

function calcHalfCircle1(animatedValue, { shadowColor }) {
    const rotate = animatedValue.interpolate({
        inputRange: [0, 50, 50, 100],
        outputRange: ['0deg', '180deg', '180deg', '180deg'],
    })
    const backgroundColor = shadowColor
    console.log(backgroundColor)
    return { rotate, backgroundColor }
}

function calcHalfCircle2(animatedValue, { color, shadowColor }) {
    const rotate = animatedValue.interpolate({
        inputRange: [0, 50, 50, 100],
        outputRange: ['0deg', '0deg', '180deg', '360deg'],
    })
    const backgroundColor = animatedValue.interpolate({
        inputRange: [0, 50, 50, 100],
        outputRange: [color, color, shadowColor, shadowColor],
    })
    console.log(backgroundColor)
    return { rotate, backgroundColor }
}

function getInitialState(props) {
    const circleProgress = new Animated.Value(0)
    return {
        secondsElapsed: 0,
        circleProgress,
        halfCircle1: calcHalfCircle1(circleProgress, props),
        halfCircle2: calcHalfCircle2(circleProgress, props),
    }
}

export default class TimerCircle extends React.Component {

    constructor(props) {
        super(props)
        console.log('Timer')
        this.state = getInitialState(props)
        console.log('end state')
        this.restartAnimation()
    }

    onCircleAnimated = ({ finished }) => {
        // if animation was interrupted by stopAnimation don't restart it.
        if (!finished) return
        const secondsElapsed = this.state.secondsElapsed + 1
        console.log(secondsElapsed)

        const callback = secondsElapsed < this.props.seconds
            ? this.restartAnimation
            : this.props.onTimeElapsed
        this.setState(
            {
                ...getInitialState(this.props),
                secondsElapsed,
            },
            callback,
        )
    };

    restartAnimation = () => {
        this.state.circleProgress.stopAnimation()
        Animated.timing(this.state.circleProgress, {
            toValue: 100,
            duration: 1000,
            easing: Easing.linear,
        }).start(this.onCircleAnimated)
    };

    renderHalfCircle({ rotate, backgroundColor }) {
        <LeftWrap>
            <Animated.View style={[
                HalfCircle,
                {
                    backgroundColor,
                    transform: [
                        { translateX: radius / 2 },
                        { rotate },
                        { translateX: -radius / 2 },
                    ],
                }
            ]} />
        </LeftWrap>
    }

    render() {
        const {
            halfCircle1,
            halfCircle2,
        } = this.state
        return (
            <OuterCircle>
                {this.renderHalfCircle(halfCircle1)}
                {this.renderHalfCircle(halfCircle2)}
                <InnerCircle>
                    <Text>Hello</Text>
                </InnerCircle>
            </OuterCircle>
        )
    }
}