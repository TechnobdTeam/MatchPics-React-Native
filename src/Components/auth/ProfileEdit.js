import React,  { Fragment, Component } from 'react';
import { View, Image, ImageBackground} from 'react-native';
import * as NB from 'native-base';
// NativeBase
import {Text} from 'native-base';
//import {CustomHeader} from '../CustomHeader'
import HomeStyle from '../LayoutsStytle/HomeStyle';
import Icon from 'react-native-vector-icons/FontAwesome5';
{/*Register */}
export class ProfileEdit extends React.Component {
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
                                <NB.H3 style={{color:'#333333',paddingBottom:8,fontSize:17,fontWeight:'bold',paddingLeft:15,}}>Real Name</NB.H3>
                           </NB.Item>
                              <NB.View style={{backgroundColor:'#fff',paddingLeft:0,marginLeft:-17,}} >
                                
                                <NB.List  >
                                    <NB.ListItem selected>
                                    <NB.Left>
                                        <NB.Text style={{color:'#696969',paddingLeft:17,textTransform:"uppercase",paddingLeft:30,}}>B hossain kanon</NB.Text>
                                    </NB.Left>
                                    <NB.Right>
                                    <Icon name="chevron-right"  style={{color:'#c6c6c6',paddingRight:25,fontSize:17}}  /> 
                                    </NB.Right>
                                    </NB.ListItem>
                                 </NB.List>
                                

                              </NB.View> 


                            <NB.Item style={{borderBottomWidth:0,}}>
                                <NB.H3 style={{color:'#333333',paddingBottom:8,paddingTop:20,fontSize:17,fontWeight:'bold',paddingLeft:15,}}>Here For</NB.H3>
                           </NB.Item>
                          <NB.View style={{backgroundColor:'#fff',marginLeft:-2,}} >
                                <NB.Item  > 
                                      <NB.Input style={{paddingLeft:14,paddingLeft:30,}} placeholder='FUN'/> 
                                      <Icon name="check-circle"  style={{color:'#c6c6c6',paddingRight:30,fontSize:20}}  /> 
                                </NB.Item>
                                <NB.Item  > 
                                      <NB.Input style={{paddingLeft:14,paddingLeft:30,}} placeholder='WHATEVER'/> 
                                      <Icon name="check-circle"  style={{color:'#c6c6c6',paddingRight:30,fontSize:20,}}  /> 
                                </NB.Item>
                                <NB.Item  > 
                                      <NB.Input style={{paddingLeft:14,paddingLeft:30,}} placeholder='DATING'/> 
                                      <Icon name="check-circle"  style={{color:'#c6c6c6',paddingRight:30,fontSize:20}}  /> 
                                </NB.Item>
                                <NB.Item  > 
                                      <NB.Input style={{color:'#696969',paddingLeft:30,}} placeholder='FRIENDSHIP'/> 
                                       
                                      <Icon name="check-circle"  style={{color:'#c6c6c6',paddingRight:30,fontSize:20}}  /> 
                                </NB.Item>
                                

                              </NB.View> 


                              <NB.Item style={{borderBottomWidth:0,}}>
                                <NB.H3 style={{color:'#333333',paddingBottom:8,paddingTop:20,fontSize:17,fontWeight:'bold',paddingLeft:15,}}>Birthday</NB.H3>
                           </NB.Item>
                          <NB.View style={{backgroundColor:'#fff',marginLeft:-17,}} >
                                
                                <NB.List  >
                                    <NB.ListItem selected>
                                    <NB.Left>
                                        <NB.Text style={{color:'#696969',paddingLeft:30,textTransform:"uppercase"}}>26 October 1998</NB.Text>
                                    </NB.Left>
                                    <NB.Right>
                                       
                                        <Icon name="chevron-right"  style={{color:'#c6c6c6',paddingRight:25,fontSize:17}}  /> 
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