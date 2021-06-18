//this is updated from the official library as well as optimization added

// from `react-native-inviewport`
//https://github.com/yamill/react-native-inviewport
import React, { Component } from 'react'
import { View, Dimensions } from 'react-native'

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

export default class InViewport extends Component {
  constructor(props) {
    super(props)
    this.state = { rectTop: 0, rectBottom: 0, didMount: false }
  }

  componentDidMount() {
    if (!this.props.disabled) {
      this.startWatching()

      this.setState({...this.state, didMount: true})
    }
  }

  componentWillUnmount() {
    //to avoid memory leak
    if(this.state.didMount){
      this.stopWatching()
      this.setState({...this.state, didMount: false})
    }
  }

  static getDerivedStateFromProps(props, state){
    if (props.disabled) {
      state.stopWatching
    }
    else{
      state.lastValue = null;
      state.startWatching
    }
    return null;
  }

  //deprecated method since react version 16
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.disabled) {
  //     this.stopWatching()
  //   } else {
  //     this.lastValue = null
  //     this.startWatching()
  //   }
  //   return null
  // }

  startWatching() {
    if (this.interval) {
      return
    }
    this.interval = setInterval(() => {
      if (!this.myview) {
        return
      }
      this.myview.measure((x, y, width, height, pageX, pageY) => {
        this.setState({
          rectTop: pageY,
          rectBottom: pageY + height,
          rectWidth: pageX + width
        })
      })
      this.isInViewPort()
    }, this.props.delay || 100)
  }

  stopWatching() {
    this.interval = clearInterval(this.interval)
  }

  isInViewPort() {
    const isVisible =
      this.state.rectBottom != 0 &&
      this.state.rectTop >= 0 &&
      this.state.rectBottom <= HEIGHT &&
      this.state.rectWidth > 0 &&
      this.state.rectWidth <= WIDTH
    if (this.lastValue !== isVisible) {
      this.lastValue = isVisible
      this.props.onChange(isVisible)
    }
  }

  render() {
    return (
      <View
        collapsable={false}
        ref={component => {
          this.myview = component
        }}
        {...this.props}
      >
        {this.props.children}
      </View>
    )
  }
}