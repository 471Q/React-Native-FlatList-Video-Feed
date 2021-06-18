import React, {useRef, useState} from 'react';
import { View, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { Video } from 'expo-av';

//the official library is deprecated. I have updated it this version
import InViewPort from './InViewPort';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const VideoPlayer =()=>{

  const [paused, setPaused] = useState(false)
  const video = useRef();

  const stopVideo = () => {
    if(video.current) {
      video.current.stopAsync();
    }
  }

  const playVideo = () => {
    if(video.current) {
      video.current.playAsync();
    }
  }

  const handlePlaying = (isVisible) => {
    isVisible ? playVideo() : stopVideo();
  }

  //using async is more reliable than setting shouldPlay with state variable
  const onPlayPausePress = () => {
    if(!paused){
      video.current.pauseAsync()
      setPaused(!paused)
    }
    else{
      video.current.playAsync();
      setPaused(!paused)
    }
  };

  return (
    <TouchableWithoutFeedback onPress={onPlayPausePress}>
      <View style={styles.container}>
        <InViewPort onChange={handlePlaying}>
        <Video
          ref={video}
          source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
          rate={1.0}
          volume={7.0}
          isLooping
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          style={{ width: WIDTH, height: HEIGHT - 62 }}
        />
        </InViewPort>
      </View>
    </TouchableWithoutFeedback>
  )
}  

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default VideoPlayer;