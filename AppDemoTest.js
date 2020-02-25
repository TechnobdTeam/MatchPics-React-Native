// import React, { Component } from 'react';
// import { Text, View, Button } from 'react-native';

// // import StickyParalaxHeader from 'react-native-sticky-parallax-header'

// export default class AppDemoTest extends Component {


//   render() {
//     return (
//      <View>
//          <Text style={{color:'#000', margin:100}}> Hi Prokash</Text>
//          <Button title='Submi jimikt'></Button>

//          <Button title='Submi jimikt'></Button>
//      </View>
//     );
//   }
// }

import React, {Component} from 'react';
import {StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import * as NB from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
// import 

export default class AppDemoTest extends Component{
  constructor(props){
    super(props);
this.state = {
}
}
render() {
return (
      <SafeAreaView style={styles.container}>

          <View>
          <NB.Header  >
                            <NB.Left>
                                <NB.Button onPress={() => this.props.navigation.navigate('MyMatches')} transparent>
                                
                                <Icon name="arrow-left"  style={{fontSize:24,color:'#fff', }}  /> 
                                
                                </NB.Button>
                            </NB.Left>

                            <NB.Body  >
                            <NB.Segment style={{backgroundColor:'transparent'}}>
                                
                                </NB.Segment>
                            </NB.Body>
                            <NB.Right>
                                <NB.Button transparent>
                            
                                </NB.Button>
                            </NB.Right>
                        </NB.Header> 
          </View>

            <ScrollView 
                    style={[styles.container, {backgroundColor: '#abb6d2'}]}
                    contentContainerStyle={{flexGrow: 1}}
                    >
            <View>
                        <Text>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla cursus finibus elementum. Phasellus odio enim, accumsan vitae rutrum in, ornare eu dolor. Maecenas neque lectus, tincidunt ac nisl et, eleifend condimentum justo. Maecenas eu molestie ligula. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam eu turpis pulvinar, maximus mi nec, volutpat est. Vivamus et felis leo. Fusce a sapien eros. Integer pellentesque fermentum risus, eu interdum justo. Aliquam hendrerit aliquam velit, id congue mauris blandit id. Maecenas sed odio lacus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam eu blandit tortor. Pellentesque quis porttitor arcu. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum sodales blandit efficitur.
                        </Text>
                        <Text style={{marginTop: 10}}>
                            Proin ac accumsan mauris, nec tincidunt neque. Fusce et sem vel purus aliquet pulvinar. Praesent nec tortor id sapien posuere egestas a gravida leo. Vivamus et erat sem. Nulla non sapien vel enim fringilla tincidunt quis non orci. Aenean sagittis mollis mattis. Aenean bibendum lectus sed accumsan auctor. Donec vestibulum dictum bibendum.
                            </Text>
                        </View>
            <View style={{marginTop: 10, height: 400}}>
                        <ScrollView 
                            style={{backgroundColor: '#cb8c92'}} 
                            contentContainerStyle={{flexGrow: 1}}
                            nestedScrollEnabled
                        >
                            <Text>
                            Sed justo nulla, egestas vel urna quis, rutrum ornare erat. In vitae turpis est. Phasellus ut consequat velit. Aliquam erat volutpat. Vivamus sodales volutpat lobortis. Nulla dapibus ante dui, ut rhoncus nibh dictum et. Phasellus ut malesuada ante.
                            </Text>
                            <Text style={{marginTop: 10}}>
                            Fusce sagittis felis dolor, eget pretium sem consectetur non. Integer eget egestas neque. Pellentesque a velit tempus, tristique arcu ut, porttitor lacus. Donec ut ante quam. Nullam finibus nunc vitae metus malesuada, nec pulvinar dolor vulputate. Phasellus eu rhoncus lectus. Ut id augue convallis, maximus mi non, pulvinar felis. Fusce eu enim purus. Ut in enim sed purus iaculis rhoncus eu eget lorem. Duis vel purus nibh. Phasellus rhoncus diam et bibendum dapibus.
                            </Text>
                            <Text style={{marginTop: 10}}>
                            Nullam quis porta sem. Aenean at erat id justo sollicitudin congue sed et massa. Aliquam mattis sodales tortor sed hendrerit. Aenean eu semper nibh. Vestibulum et ipsum quis mauris sagittis varius nec at nunc. Etiam vitae lorem non neque lobortis tincidunt. Suspendisse viverra vitae arcu id consequat. Etiam id euismod enim. Morbi eros lorem, auctor venenatis gravida non, cursus a odio. Fusce ultricies diam ipsum, a tincidunt metus ultricies et. Donec maximus sem sapien, ut feugiat dolor hendrerit et. Vivamus eu nibh dui. Nunc pretium leo a pharetra dictum. Phasellus vel velit et magna finibus elementum. In lorem dui, semper ac diam a, ultricies ultrices tellus. Nam molestie justo vel volutpat ultrices.
                            </Text>
                        </ScrollView>
                        </View>
            <View>
                        <Text style={{marginTop: 10}}>
                            Integer consectetur lobortis leo id malesuada. Curabitur rhoncus rhoncus est, ac bibendum orci feugiat vitae. Mauris laoreet ligula at sem consequat, id scelerisque nibh mattis. Aenean tempus egestas molestie. Phasellus molestie hendrerit sodales. Phasellus aliquam at nulla tempor hendrerit. Mauris congue tempor nulla, sed finibus erat pharetra commodo. Vivamus et mauris ut risus dictum eleifend et eget dolor. Phasellus non tellus id quam semper tempor. Pellentesque scelerisque felis ac ante vestibulum, at iaculis justo dapibus. Nunc molestie lorem nec sagittis bibendum.
                        </Text>
                        <Text style={{marginTop: 10}}>
                            Praesent id posuere risus. Phasellus vulputate sagittis dolor eget dapibus. Duis arcu sapien, ultrices nec lacus id, volutpat pellentesque massa. Donec imperdiet elit eu ex porttitor, non egestas nunc pretium. Suspendisse potenti. Pellentesque convallis turpis quis leo pretium ornare. Ut libero nisi, eleifend a vehicula non, dapibus sed ex. Etiam at feugiat nisl, quis luctus sapien. Mauris ac ante vel libero sagittis pretium. Morbi ullamcorper id libero ac rhoncus. Mauris vel cursus dui. In euismod rhoncus tortor, sit amet placerat est suscipit nec.
                        </Text>
                        </View>
            </ScrollView>
        </SafeAreaView>
    );
}
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 10
  }
});