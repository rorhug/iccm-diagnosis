// src: https://stackoverflow.com/questions/49273865/how-to-implement-react-native-countdown-circle?fbclid=IwAR3St_hzIV964vqoxyrXOQDVV0pT5rEXG_T2KCwiyjH0gVPSJRnllGDV2pI
import React from "react";
import {
    Easing,
    Animated,
    StyleSheet,
    Text,
    View,
    ViewPropTypes
} from "react-native";
import PropTypes from "prop-types";

// compatability for react-native versions < 0.44
const ViewPropTypesStyle = ViewPropTypes
    ? ViewPropTypes.style
    : View.propTypes.style;

const styles = StyleSheet.create({
    outerCircle: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e3e3e3"
    },
    innerCircle: {
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    leftWrap: {
        position: "absolute",
        top: 0,
        left: 0
    },
    halfCircle: {
        position: "absolute",
        top: 0,
        left: 0,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        backgroundColor: "#f00"
    }
});

function calcInterpolationValuesForHalfCircle1(animatedValue, { shadowColor }) {
    const rotate = animatedValue.interpolate({
        inputRange: [0, 50, 50, 100],
        outputRange: ["0deg", "180deg", "180deg", "180deg"]
    });

    const backgroundColor = shadowColor;
    return { rotate, backgroundColor };
}

function calcInterpolationValuesForHalfCircle2(
    animatedValue,
    { color, shadowColor }
) {
    const rotate = animatedValue.interpolate({
        inputRange: [0, 50, 50, 100],
        outputRange: ["0deg", "0deg", "180deg", "360deg"]
    });

    const backgroundColor = animatedValue.interpolate({
        inputRange: [0, 50, 50, 100],
        outputRange: [color, color, shadowColor, shadowColor]
    });
    return { rotate, backgroundColor };
}

function getInitialState(props) {
    return {
        circleProgress,
        secondsElapsed: 0,
        text: props.updateText(0, props.seconds),
        interpolationValuesHalfCircle1: calcInterpolationValuesForHalfCircle1(
            circleProgress,
            props
        ),
        interpolationValuesHalfCircle2: calcInterpolationValuesForHalfCircle2(
            circleProgress,
            props
        )
    };
}
let circleProgress = new Animated.Value(0);

export default class TimerCircle extends React.PureComponent {
    static propTypes = {
        start: PropTypes.bool.isRequired,
        seconds: PropTypes.number.isRequired,
        secondsElapsed: PropTypes.number,
        radius: PropTypes.number.isRequired,
        color: PropTypes.string,
        shadowColor: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
        bgColor: PropTypes.string,
        borderWidth: PropTypes.number,
        containerStyle: ViewPropTypesStyle,
        textStyle: Text.propTypes.style,
        updateText: PropTypes.func,
        onTimeElapsed: PropTypes.func
    };

    static defaultProps = {
        start: true,
        color: "#f00",
        shadowColor: "#999",
        bgColor: "#e9e9ef",
        borderWidth: 2,
        seconds: 10,
        secondsElapsed: 0,
        children: null,
        containerStyle: null,
        textStyle: null,
        onTimeElapsed: () => null,
        updateText: (elapsedSeconds, totalSeconds) =>
            (totalSeconds - elapsedSeconds).toString()
    };

    constructor(props) {
        super(props);
        circleProgress = new Animated.Value(0);
        this.state = getInitialState(props);
        if (this.props.start) this.runAnimation();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.start !== nextProps.start) {
            // Stop animation
            if (!nextProps.start) {
                Animated.timing(this.state.circleProgress).stop();
                circleProgress = new Animated.Value(0);
            // start animation
            } else if (nextProps.start) {
                this.runAnimation();
            }
            this.setState(getInitialState(nextProps));
        }
    }


    onCircleAnimated = ({ finished }) => {
        // if animation was interrupted by stopAnimation don't restart it.
        if (!finished) return;

        const secondsElapsed = this.state.secondsElapsed + 1;
        const callback =
            secondsElapsed < this.props.seconds
                ? this.runAnimation
                : this.props.onTimeElapsed
        const updatedText = this.props.updateText(
            secondsElapsed,
            this.props.seconds
        );
        this.setState(
            {
                ...getInitialState(this.props),
                secondsElapsed,
                text: updatedText
            },
            callback
        );
    };

    runAnimation = () => {
        val = parseFloat(JSON.stringify(this.state.circleProgress)) + 100 / this.props.seconds
        Animated.timing(this.state.circleProgress, {
            toValue: val,
            duration: 1000,
            easing: Easing.linear
        }).start(this.onCircleAnimated)
    };

    renderHalfCircle({ rotate, backgroundColor }) {
        const { radius } = this.props;

        return (
            <View
                style={[
                    styles.leftWrap,
                    {
                        width: radius,
                        height: radius * 2
                    }
                ]}
            >
                <Animated.View
                    style={[
                        styles.halfCircle,
                        {
                            width: radius,
                            height: radius * 2,
                            borderRadius: radius,
                            backgroundColor,
                            transform: [
                                { translateX: radius / 2 },
                                { rotate },
                                { translateX: -radius / 2 }
                            ]
                        }
                    ]}
                />
            </View>
        );
    }

    renderInnerCircle() {
        const radiusMinusBorder = this.props.radius - this.props.borderWidth;
        return (
            <View
                style={[
                    styles.innerCircle,
                    {
                        width: radiusMinusBorder * 2,
                        height: radiusMinusBorder * 2,
                        borderRadius: radiusMinusBorder,
                        backgroundColor: this.props.bgColor,
                        ...this.props.containerStyle
                    }
                ]}
            >
                <Text style={this.props.textStyle}>{this.state.text}</Text>
            </View>
        );
    }

    render() {
        const {
            interpolationValuesHalfCircle1,
            interpolationValuesHalfCircle2
        } = this.state;
        return (
            <View
                style={[
                    styles.outerCircle,
                    {
                        width: this.props.radius * 2,
                        height: this.props.radius * 2,
                        borderRadius: this.props.radius,
                        backgroundColor: this.props.color,
                        ...this.props.style
                    }
                ]}
            >
                {this.renderHalfCircle(interpolationValuesHalfCircle1)}
                {this.renderHalfCircle(interpolationValuesHalfCircle2)}
                {this.renderInnerCircle()}
            </View>
        );
    }
}