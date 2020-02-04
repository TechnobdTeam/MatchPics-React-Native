import React from 'react';
import { View} from 'react-native';
// NativeBase
import {Text} from 'native-base';
import {CustomHeader} from '../../CustomHeader'


 {/* Feed Detils */}
 export class FeedDetils extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
          {/* header shortcode */}
               <CustomHeader title="Feed Detils" navigation={this.props.navigation}/>
          {/*End  header shortcode */}
          <View style={{flex: 1,justifyContent: 'center', alignItems: 'center'}}>
              
              <Text>Feed Detils Screen!</Text> 
                  
          </View>
      </View>
    );
  }
}
