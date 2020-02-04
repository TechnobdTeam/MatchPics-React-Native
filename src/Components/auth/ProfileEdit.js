import React,  { Fragment, Component } from 'react';
import { View, Image, ImageBackground} from 'react-native';
import * as NB from 'native-base';
// NativeBase
import {Text} from 'native-base';
//import {CustomHeader} from '../CustomHeader'
import HomeStyle from '../LayoutsStytle/HomeStyle';
 
{/*Register */}
export class ProfileEdit extends React.Component {
  render() {
    return (
        <Fragment>    
        <ImageBackground source={require('../Image/background_images.jpg') } style={{width: '100%', height: '100%', }}   > 
          <NB.Container   style={HomeStyle.PageContainer}  >
            <NB.View style={HomeStyle.SingupPageView} >
                  <NB.CardItem style={{backgroundColor:'transparent'}} > 
                        
                  <NB.Button onPress={() => this.props.navigation.navigate('MyProfile')} iconRight transparent style={{ }}>
                          <NB.Icon  name="ios-arrow-round-back" style={{fontSize:30,color:'#333333', }}  /> 
                      </NB.Button>
                      <NB.Left style={{width:'100%',justifyContent: 'center', alignItems:'center'}}>
                          <NB.Text style={HomeStyle.SingIn} > Edit Profile  </NB.Text> 
                         
                      </NB.Left>
                    
                      
                    </NB.CardItem>

                    <NB.Content>
                        <NB.Form>
                          
                           <NB.Item style={{borderBottomWidth:0,}}>
                                <NB.H3 style={{color:'#333333',paddingBottom:8,}}>Real Name</NB.H3>
                           </NB.Item>
                              <NB.View style={{backgroundColor:'#fff',paddingLeft:0,marginLeft:-17,}} >
                                
                                <NB.List  >
                                    <NB.ListItem selected>
                                    <NB.Left>
                                        <NB.Text style={{color:'#696969',paddingLeft:17,}}>B hossain kanon</NB.Text>
                                    </NB.Left>
                                    <NB.Right>
                                        <NB.Icon name="arrow-forward" style={{color:'#696969'}} />
                                    </NB.Right>
                                    </NB.ListItem>
                                 </NB.List>
                                

                              </NB.View> 


                            <NB.Item style={{borderBottomWidth:0,}}>
                                <NB.H3 style={{color:'#333333',paddingBottom:8,paddingTop:20,}}>Here For</NB.H3>
                           </NB.Item>
                          <NB.View style={{backgroundColor:'#fff',marginLeft:-2,}} >
                                <NB.Item  > 
                                      <NB.Input style={{paddingLeft:14,}} placeholder='Fun'/> 
                                      <NB.Icon name='ios-checkmark-circle-outline' />
                                </NB.Item>
                                <NB.Item  > 
                                      <NB.Input style={{paddingLeft:14,}} placeholder='Whatever'/> 
                                      <NB.Icon name='ios-checkmark-circle-outline' />
                                </NB.Item>
                                <NB.Item  > 
                                      <NB.Input style={{paddingLeft:14,}} placeholder='Dating'/> 
                                      <NB.Icon style={{color:'#00c6ff',}} name='ios-checkmark-circle-outline' />
                                </NB.Item>
                                <NB.Item  > 
                                      <NB.Input style={{paddingLeft:14,}} placeholder='Friendship'/> 
                                      <NB.Icon name='ios-checkmark-circle-outline' />
                                </NB.Item>
                                

                              </NB.View> 


                              <NB.Item style={{borderBottomWidth:0,}}>
                                <NB.H3 style={{color:'#333333',paddingBottom:8,paddingTop:20,}}>Birthday</NB.H3>
                           </NB.Item>
                          <NB.View style={{backgroundColor:'#fff',marginLeft:-17,}} >
                                
                                <NB.List  >
                                    <NB.ListItem selected>
                                    <NB.Left>
                                        <NB.Text style={{color:'#696969',paddingLeft:17,}}>26 October 1998</NB.Text>
                                    </NB.Left>
                                    <NB.Right>
                                        <NB.Icon name="arrow-forward" style={{color:'#696969'}} />
                                    </NB.Right>
                                    </NB.ListItem>
                                 </NB.List>
                                

                              </NB.View> 
                            

                              <NB.Item style={{borderBottomWidth:0,justifyContent: 'center',alignItems:'center',marginTop:30,}} >
                                <NB.Button  iconRight  style={{backgroundColor:'#1cc875',borderRadius:50,width:'70%',justifyContent: 'center',alignItems:'center',height:58,paddingTop:0,}}>
                                      <NB.Text style={{fontSize:18,color:'#ffffff',}}>save </NB.Text>
                                      <NB.Icon style={{color:'#fff',fontSize:30,}} name='ios-checkmark' /> 
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