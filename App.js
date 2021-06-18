import React, { useState, useCallback } from "react";
import { Text, View, StyleSheet, FlatList, Dimensions } from 'react-native';
import VideoPlayer from './VideoPlayer';

const HEIGHT = Dimensions.get('window').height; 

function App () {
  const [data, setData] = useState([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20])

  //use callBack with flatlist configs to avoid re-renders 
  const renderItems = useCallback(
    ({index}) => {
      return (
        <View style={{height: HEIGHT, backgroundColor: '#336699', justifyContent: 'center', alignItems: 'center'}}>
          <Text>{index}</Text>
          <Text><VideoPlayer /></Text>
        </View>
      )
    },
    [],
  )

  const keyExtractor = useCallback((index) => `${index}`, [])
  
//getItemLayout is buggy when dynamic screen sizes are involved
//to avoid the issue declare height and width before class starts
  const getItemLayout = useCallback(
    (data, index) => {
      return { length: HEIGHT, offset:  HEIGHT* index, index };
    },
    [],
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItems}
        keyExtractor={keyExtractor}
        getItemLayout={getItemLayout}
        showsVerticalScrollIndicator={false}
        snapToInterval={HEIGHT}
        snapToAlignment={"center"}
        decelerationRate={"fast"}
        disableIntervalMomentum
        initialNumToRender={10}
        windowSize={5}
        maxToRenderPerBatch={5}
        updateCellsBatchingPeriod={50}
        removeClippedSubviews={false}
      />
    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  }
});

export default App;
