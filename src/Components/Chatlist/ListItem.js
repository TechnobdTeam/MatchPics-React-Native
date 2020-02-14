import React,  { Fragment, Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated, PanResponder,Dimensions,UIManager,LayoutAnimation} from 'react-native';
import * as NB from 'native-base';

export class ListItem extends React.Component {
      constructor(props){
            super(props);

      }

      render(){
       <View>
            <View style={styles.absolute}>
                <Text style={[style.text, {marginHorizontal: 10}]}>DELETE</Text>
                <Text style={[style.text, {marginHorizontal: 10}]}>DELETE</Text>
            </View>
            <Animated.View ref='tesk' style={StstylesyleSheet.item}>
                 <Text style={[style.text, {flex:1}]}> {this.props.item.text}</Text>
                 <TouchableOpacity>
                      <View style={styles.menu}></View>
                      <View style={styles.menu}></View>
                      <View style={styles.menu}></View>
                      <View style={styles.menu}></View>
                 </TouchableOpacity>

            </Animated.View>
       </View>

      }
}

const styles = styleSheet.create({
     item:{
         flexDirection:'row',
         alignItems:'center',
         backgroundColor:'white',
     },
     absolute:{
         posoition: 'absolute',
         width:'100%',
         height:'100%',
         justifyContent: 'space-between',
         alignItems:'center',
         backgroundColor:'red',
         flexDirection:'row',
     },
     text:{
         marginVertical: 20,
         fontSize:20,
         fontWeight:'bold',
         marginLeft:10,
     },
     menu:{

        width:20,
        height:2,
        backgroundColor:'silver',
        margin:2,
        marginHorizontal:10,
        borderRadius:3,


     },

});