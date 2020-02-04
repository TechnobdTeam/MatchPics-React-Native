import React from 'react';
import { View} from 'react-native';
// NativeBase
import {Text} from 'native-base';
import {CustomHeader} from '../CustomHeader'

{/*Setting */}
export class Setting extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
          {/* header shortcode */} 
             <CustomHeader title="Setting Screen" navigation={this.props.navigation}/>
          {/* End header shortcode */}
       
          <View style={{flex: 1,justifyContent: 'center', alignItems: 'center'}}>
              <Text>Setting Screen !</Text> 
                  
          </View> 
      </View>
    );
  }
}
{/* End Setting */}
