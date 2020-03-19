import React from 'react'
import { StyleSheet, Text, Button, View } from 'react-native'
import BottomSheet from 'reanimated-bottom-sheet'

export default class Example extends React.Component {

  snapPoint = 2

  renderInner = () => (
    <React.Fragment> 
        <View>
          <Text>computed</Text>
        </View> 
    </React.Fragment>
  )

  renderHeader = () => (
    <View
      style={{
        height: 80,
        backgroundColor: 'green',
      }}
    >
      <Text>123</Text>
      {/* <Button onPress={() => this.bs.current.snapTo(0)} title="1" /> */}
    </View>
  )

  bs = React.createRef()

  resizeDrawer(){

    if(this.snapPoint == 2){
      this.snapPoint = 0
    }
    else{
      this.snapPoint = 2
    }

    this.bs.current.snapTo(this.snapPoint)
  }

  render() {
    return (
      <View style={styles.container}>
        <BottomSheet
          ref={this.bs}
          snapPoints={['50%', 200, 100]}
          renderContent={this.renderInner}
          renderHeader={this.renderHeader}
          initialSnap={this.snapPoint}
        /> 
         <Button onPress={() => this.resizeDrawer()} title="1" />

        {/* <Button
          onPress={() => this.bs.current.snapTo(2)}
          style={{
            zIndex: 0,
          }}
          title="2"
        />
        <Button onPress={() => this.bs.current.snapTo(3)} title="3" /> */}
      </View>
    )
  }
}

const IMAGE_SIZE = 200

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  box: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
  },
})