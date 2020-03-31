import React from 'react';
import { View} from 'react-native';
// NativeBase
import {Button, Text} from 'native-base';
import {CustomHeader} from '../../CustomHeader'

export class Search extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
      {/* header shortcode */}
        <CustomHeader title="Search" isHome={true} navigation={this.props.navigation} />
      {/* End header shortcode */}
   
      <View style={{flex: 1,justifyContent: 'center', alignItems: 'center'}}>
          <Text>Search Screen!</Text> 
            <Button light style={{marginTop:15}}   onPress={() => this.props.navigation.navigate('SearchDetils')}   >
            <Text style={{color:'#000'}}> Go to Search Detail</Text>
          </Button>   
      </View> 

  </View>
    );
  }
}