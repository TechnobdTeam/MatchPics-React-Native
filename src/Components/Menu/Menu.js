import React,  { Fragment, Component } from 'react';
import { View, Image, ImageBackground} from 'react-native';
import * as NB from 'native-base';
// NativeBase
import {Text} from 'native-base';
//import {CustomHeader} from '../CustomHeader'
import HomeStyle from '../LayoutsStytle/HomeStyle';


{/*Register */}
export class Menu extends React.Component {
  render() {
    return (
      <Fragment> 

       <ImageBackground source={require('../Image/background_uplode_images.jpg') } style={{width: '100%', height: '100%', }}   >
       <NB.Container   style={HomeStyle.PageContainer}  >
            <NB.View style={HomeStyle.SingupPageView} >
                  <NB.CardItem style={{backgroundColor:'transparent',}} > 
                        
                      <NB.Left style={{width:'100%',justifyContent: 'center', alignItems:'center'}}>
                      <Image style={{width:200,height:69,}}   source={require('../Image/logo.png')} />
                         
                      </NB.Left>
                      <NB.Button   onPress={() => this.props.navigation.navigate('UploadImage')}  iconRight transparent style={{marginTop:-20,}}>
                          <NB.Icon name="close" style={{fontSize:30,color:'#333333', }}  /> 
                      </NB.Button>
                      
                    </NB.CardItem>

                    <NB.Content style={{backgroundColor:'#fff', borderBottomLeftRadius:10,borderBottomRightRadius:10,}}>
                 
                          
                          
                          <NB.View>

                            <NB.Content>
                                    <NB.ListItem  style={{marginLeft:0,paddingLeft:17,}}>
                                    <NB.Icon name="ios-contact" style={{fontSize:30,color:'#e41b5b', }}  /> 
                                        <NB.Body>
                                        <NB.Text onPress={() => this.props.navigation.navigate('MyProfile')}   style={{textTransform:'uppercase',fontSize:17,}}>my profile</NB.Text>
                                        </NB.Body>
                                    </NB.ListItem>
                            </NB.Content>

                            <NB.Content>
                                    <NB.ListItem style={{marginLeft:0,paddingLeft:17,}} >
                                    <NB.Icon name="md-cloud-upload" style={{fontSize:30,color:'#e41b5b', }}  /> 
                                        <NB.Body>
                                        <NB.Text style={{textTransform:'uppercase',fontSize:17,}} >photo upload</NB.Text>
                                        </NB.Body>
                                    </NB.ListItem>
                            </NB.Content>

                            <NB.Content>
                                    <NB.ListItem style={{marginLeft:0,paddingLeft:17,}} >
                                    <NB.Icon name="md-people" style={{fontSize:30,color:'#e41b5b', }}  /> 
                                        <NB.Body>
                                        <NB.Text onPress={() => this.props.navigation.navigate('MyMatches')} style={{textTransform:'uppercase',fontSize:17,}} >my matches</NB.Text>
                                        </NB.Body>
                                    </NB.ListItem>
                            </NB.Content>

                            <NB.Content>
                                    <NB.ListItem style={{marginLeft:0,paddingLeft:17,}} >
                                    <NB.Icon name="md-heart-empty" style={{fontSize:30,color:'#e41b5b', }}  /> 
                                        <NB.Body>
                                        <NB.Text style={{textTransform:'uppercase',fontSize:17,}} >my favorite</NB.Text>
                                        </NB.Body>
                                    </NB.ListItem>
                            </NB.Content>

                            <NB.Content>
                                    <NB.ListItem style={{marginLeft:0,paddingLeft:17,}} >
                                    <NB.Icon name="md-chatboxes" style={{fontSize:30,color:'#e41b5b', }}  /> 
                                        <NB.Body>
                                        <NB.Text style={{textTransform:'uppercase',fontSize:17,}} >messages</NB.Text>
                                        </NB.Body>
                                    </NB.ListItem>
                            </NB.Content>

                            <NB.Content>
                                    <NB.ListItem style={{marginLeft:0,paddingLeft:17,}}>
                                    <NB.Icon name="ios-search" style={{fontSize:30,color:'#e41b5b', }}  /> 
                                        <NB.Body>
                                        <NB.Text style={{textTransform:'uppercase',fontSize:17,}} >search</NB.Text>
                                        </NB.Body>
                                    </NB.ListItem>
                            </NB.Content>

                            <NB.Content>
                                    <NB.ListItem style={{marginLeft:0,paddingLeft:17,}}>
                                    <NB.Icon name="ios-cart" style={{fontSize:30,color:'#e41b5b', }}  /> 
                                        <NB.Body>
                                        <NB.Text style={{textTransform:'uppercase',fontSize:17,}} >buy subscription</NB.Text>
                                        </NB.Body>
                                    </NB.ListItem>
                            </NB.Content>

                            <NB.Content>
                                    <NB.ListItem style={{marginLeft:0,paddingLeft:17,}}>
                                    <NB.Icon name="ios-cog" style={{fontSize:30,color:'#e41b5b', }}  /> 
                                        <NB.Body>
                                        <NB.Text style={{textTransform:'uppercase',fontSize:17,}} >terms & conditions</NB.Text>
                                        </NB.Body>
                                    </NB.ListItem>
                            </NB.Content>

                            <NB.Content>
                                    <NB.ListItem style={{marginLeft:0,paddingLeft:17,}}>
                                    <NB.Icon name="ios-key" style={{fontSize:30,color:'#e41b5b', }}  /> 
                                        <NB.Body>
                                          <NB.Text onPress={() => this.props.navigation.navigate('Login')}   style={{textTransform:'uppercase',fontSize:17,}} >login </NB.Text>
                                        </NB.Body>
                                    </NB.ListItem>
                            </NB.Content> 

                            <NB.Content>
                                    <NB.ListItem style={{marginLeft:0,paddingLeft:17,}}>
                                    <NB.Icon name="ios-key" style={{fontSize:30,color:'#e41b5b', }}  /> 
                                        <NB.Body>
                                        <NB.Text onPress={() => this.props.navigation.navigate('auth')}   style={{textTransform:'uppercase',fontSize:17,}} >logout</NB.Text>
                                        </NB.Body>
                                    </NB.ListItem>
                            </NB.Content> 

                          </NB.View>  

                    </NB.Content>
            
              </NB.View>
            </NB.Container>
          
        </ImageBackground>
      </Fragment>
    );
  }
}
{/* End Register */}