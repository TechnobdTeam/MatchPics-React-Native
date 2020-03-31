import React from 'react';
import { View} from 'react-native';
// NativeBase
import {Text} from 'native-base';
import {CustomHeader} from '../../CustomHeader'

{/* Search Detils */}
export class SearchDetils extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
          {/* header shortcode */} 
             <CustomHeader title="Search Detils" navigation={this.props.navigation} />
          {/* End header shortcode */}
       
          <View style={{flex: 1,justifyContent: 'center', alignItems: 'center'}}>
              <Text>Search Detils Screen !</Text> 
                  
          </View> 
      </View>
    );
  }
}
{/* End Search Detils */}
