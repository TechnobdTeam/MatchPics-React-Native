import React,  { Fragment, Component } from 'react';
import { View, Image, ImageBackground, PermissionsAndroid,AppRegistry, StyleSheet} from 'react-native';
import * as NB from 'native-base';
// NativeBase
import {Text} from 'native-base';
//import {CustomHeader} from '../CustomHeader'
import HomeStyle from '../LayoutsStytle/HomeStyle';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Slider from "react-native-slider";
import sliderData from "../Slider/Data.js";
{/*Register */}
export class Appearance extends React.Component {

  constructor(props){
    super(props);
    this.state = {

    };

  }


  getMatchedUserName(value){

    // var Userindex
    console.log(value | 0)
    return sliderData[value | 0].id;
  }


  render() {
    return (
        <Fragment>    
        <ImageBackground source={require('../Image/background_images.jpg') } style={{width: '100%', height: '100%', }}   > 
          <NB.Container   style={HomeStyle.EditprofileContainer}  >
            <NB.View style={HomeStyle.EditprofilePageView} >
                  <NB.CardItem style={{backgroundColor:'transparent'}} > 
                        
                     <NB.Button onPress={() => this.props.navigation.navigate('MyProfile')} iconRight transparent style={{ }}>
                      
                          <Icon name="long-arrow-alt-left"  style={{fontSize:30,color:'#333333',  }}  /> 
                      </NB.Button>
                      <NB.Left style={{width:'100%',justifyContent: 'center', alignItems:'center'}}>
                          <NB.Text style={{fontSize:40,color:'#333333',alignItems:'center',justifyContent:'center'}} > Edit Profile  </NB.Text> 
                         
                      </NB.Left>
                    
                      
                    </NB.CardItem>

                    <NB.Content>
                        <NB.Form>
                          
                           <NB.Item style={{borderBottomWidth:0,}}>
                                <NB.H3 style={{color:'#333333',paddingBottom:8,fontSize:17,fontWeight:'bold',paddingLeft:15,}}>Appearence</NB.H3>
                           </NB.Item>
                              <NB.View style={{backgroundColor:'#fff',paddingLeft:0,marginLeft:-17,}} >
                                
                                <NB.List  >
                                    <NB.ListItem selected>
                                    <NB.Left>
                                        <NB.Text style={{color:'#333333',paddingLeft:17,textTransform:"uppercase",paddingLeft:30,}}>Ethnicity</NB.Text>
                                    </NB.Left>
                                    <NB.Right style={{flex:1,}}>
                                       <NB.Text style={{color:'#696969',fontSize:17,alignItems:"center",justifyContent:"center",}}>Asia  <Icon name="chevron-right"  style={{color:'#c6c6c6',paddingRight:25,fontSize:17,}}  /></NB.Text> 
                                    </NB.Right>
                                    </NB.ListItem>
                                 </NB.List>

                                 <NB.List  >
                                    <NB.ListItem selected>
                                    <NB.Left>
                                        <NB.Text style={{color:'#333333',paddingLeft:17,textTransform:"uppercase",paddingLeft:30,}}>body type</NB.Text>
                                    </NB.Left>
                                    <NB.Right style={{flex:1,}}>
                                       <NB.Text style={{color:'#696969',fontSize:17,alignItems:"center",justifyContent:"center",}}>Average  <Icon name="chevron-right"  style={{color:'#c6c6c6',paddingRight:25,fontSize:17,}}  /></NB.Text> 
                                    </NB.Right>
                                    </NB.ListItem>
                                 </NB.List>

                                 <NB.List  >
                                    <NB.ListItem selected>
                                    <NB.Left>
                                        <NB.Text style={{color:'#333333',paddingLeft:17,textTransform:"uppercase",paddingLeft:30,}}>Hair color</NB.Text>
                                    </NB.Left>
                                    <NB.Right style={{flex:1,}}>
                                       <NB.Text style={{color:'#696969',fontSize:17,alignItems:"center",justifyContent:"center",}}>Average  <Icon name="chevron-right"  style={{color:'#c6c6c6',paddingRight:25,fontSize:17,}}  /></NB.Text> 
                                    </NB.Right>
                                    </NB.ListItem>
                                 </NB.List>

                                 <NB.List  >
                                    <NB.ListItem selected>
                                    <NB.Left>
                                        <NB.Text style={{color:'#333333',paddingLeft:17,textTransform:"uppercase",paddingLeft:30,}}>eye color</NB.Text>
                                    </NB.Left>
                                    <NB.Right style={{flex:1,}}>
                                       <NB.Text style={{color:'#696969',fontSize:17,alignItems:"center",justifyContent:"center",}}>Brown  <Icon name="chevron-right"  style={{color:'#c6c6c6',paddingRight:25,fontSize:17,}}  /></NB.Text> 
                                    </NB.Right>
                                    </NB.ListItem>
                                 </NB.List>



 
                                

                              </NB.View> 


                            <NB.Item style={{borderBottomWidth:0,}}>
                                <NB.H3 style={{color:'#333333',paddingBottom:8,paddingTop:20,fontSize:17,fontWeight:'bold',paddingLeft:15,}}>Lifestyle</NB.H3>
                           </NB.Item>
                         
                           <NB.View style={{backgroundColor:'#fff',paddingLeft:0,marginLeft:-17,}} >

                                 <NB.List  >
                                    <NB.ListItem selected>
                                    
                                  <NB.Text style={{color:'#333333',paddingLeft:17,textTransform:"uppercase",paddingLeft:30,}}>favorite way to spend time</NB.Text>
                                   
                                    <NB.Right style={{flex:1,}}>
                                       <NB.Text style={{color:'#696969',fontSize:17,alignItems:"center",justifyContent:"center",}}>Asia  <Icon name="chevron-right"  style={{color:'#c6c6c6',paddingRight:25,fontSize:17,}}  /></NB.Text> 
                                    </NB.Right>
                                    </NB.ListItem>
                                 </NB.List>


                                 <NB.List  >
                                    <NB.ListItem selected>
                                    <NB.Left>
                                        <NB.Text style={{color:'#333333',paddingLeft:17,textTransform:"uppercase",paddingLeft:30,}}>Smoking</NB.Text>
                                    </NB.Left>
                                    <NB.Right style={{flex:1,}}>
                                       <NB.Text style={{color:'#696969',fontSize:17,alignItems:"center",justifyContent:"center",}}>Ocassionally  <Icon name="chevron-right"  style={{color:'#c6c6c6',paddingRight:25,fontSize:17,}}  /></NB.Text> 
                                    </NB.Right>
                                    </NB.ListItem>
                                 </NB.List>



                                 <NB.List  >
                                    <NB.ListItem selected>
                                    <NB.Left>
                                        <NB.Text style={{color:'#333333',paddingLeft:17,textTransform:"uppercase",paddingLeft:30,}}>drinking</NB.Text>
                                    </NB.Left>
                                    <NB.Right style={{flex:1,}}>
                                       <NB.Text style={{color:'#696969',fontSize:17,alignItems:"center",justifyContent:"center",}}>Never  <Icon name="chevron-right"  style={{color:'#c6c6c6',paddingRight:25,fontSize:17,}}  /></NB.Text> 
                                    </NB.Right>
                                    </NB.ListItem>
                                 </NB.List>

                                 <NB.List  >
                                    <NB.ListItem selected>
                                    <NB.Left>
                                        <NB.Text style={{color:'#333333',paddingLeft:17,textTransform:"uppercase",paddingLeft:30,}}>asdfas dfasdf</NB.Text>
                                    </NB.Left>
                                    <NB.Right style={{flex:1,}}>
                                       <NB.Text style={{color:'#696969',fontSize:17,alignItems:"center",justifyContent:"center",}}>asdfasdfasdf  <Icon name="chevron-right"  style={{color:'#c6c6c6',paddingRight:25,fontSize:17,}}  /></NB.Text> 
                                    </NB.Right>
                                    </NB.ListItem>
                                 </NB.List>



                           
                           </NB.View> 
                            

                              <NB.Item style={{borderBottomWidth:0,justifyContent: 'center',alignItems:'center',marginTop:30,}} >
                                <NB.Button  iconRight  style={{backgroundColor:'#1cc875',borderRadius:50,width:'70%',justifyContent: 'center',alignItems:'center',height:58,paddingTop:0,}}>
                                      <NB.Text style={{fontSize:17,color:'#ffffff',}}>save </NB.Text>
                                      <Icon name="check"  style={{color:'#fff',paddingRight:30,fontSize:17}}  /> 
                                </NB.Button> 
                             </NB.Item>

                            </NB.Form >



                    </NB.Content>
            
              </NB.View>
            </NB.Container>
          </ImageBackground> 

  </Fragment>
       
    );
  }
}
{/* End Register */}


const styles = StyleSheet.create({
 

  container: {
      margin: 15,
       
      marginBottom:0,
   
     },

  track: {
    height: 3,
    borderRadius: 3, 
    backgroundColor: '#e44c91',
  },

  thumb: {
    width: 30,
    height: 30,
    shadowColor: '#000',
    backgroundColor: '#fff',
    borderColor: '#cdcd',
    borderWidth: 1,
    borderRadius: 40 / 2,
    shadowOffset: {width: 2, height: 1},
    shadowRadius: 2,
    shadowOpacity: 0.35,
  }


});