import React from 'react';
import { View} from 'react-native';
// NativeBase
import {Button, Text} from 'native-base';
import {CustomHeader} from '../../CustomHeader'

{/* Feed Home Screen */}
export class Feed extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
          {/* header shortcode */}
          <CustomHeader title="Feed" isHome={true}  navigation={this.props.navigation}/>
       
            <View style={{flex: 1,justifyContent: 'center', alignItems: 'center'}}>
                <Text>Feed Screen !</Text> 
                  <Button light style={{marginTop:15}}   onPress={() => this.props.navigation.navigate('FeedDetils')} >
                  <Text style={{color:'#000'}}> Go to Feed Details</Text>
                </Button>   
            </View>  
      </View>
    );
  }
}