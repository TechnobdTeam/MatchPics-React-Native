import React,  { Fragment, Component } from 'react';
import { View, Image, ImageBackground} from 'react-native';
import * as NB from 'native-base';
// NativeBase
import {Text} from 'native-base';
//import {CustomHeader} from '../CustomHeader'
import HomeStyle from '../LayoutsStytle/HomeStyle';
 
{/*Register */}
export class Register extends React.Component {
  render() {
    return (
      <Fragment>    
      <ImageBackground source={require('../Image/background_images.jpg') } style={{width: '100%', height: '100%', }}   > 
        <NB.Container   style={HomeStyle.PageContainer}  >
          <NB.View style={HomeStyle.SingupPageView} >
                <NB.CardItem style={{backgroundColor:'transparent'}} > 
                      
                    <NB.Left style={{width:'100%',justifyContent: 'center', alignItems:'center'}}>
                        <NB.Text style={HomeStyle.SingIn} > Sign Up   </NB.Text> 
                       
                    </NB.Left>
                    <NB.Button iconRight transparent style={{marginTop:-20,}}>
                        <NB.Icon onPress={() => this.props.navigation.navigate('Login')}   name="close" style={{fontSize:30,color:'#333333', }}  /> 
                    </NB.Button>
                    
                  </NB.CardItem>

                  <NB.Content>
                      <NB.Form>
                        
                         <NB.Item style={{borderBottomWidth:0,}}>
                              <NB.H3 style={{color:'#333333',paddingBottom:8,}}>User</NB.H3>
                         </NB.Item>
                        <NB.View style={{backgroundColor:'#fff',marginLeft:-2,}} >
                            <NB.Item > 
                                    <NB.Input  style={{paddingLeft:14,}} placeholder='USER NAME'/> 
                                </NB.Item>
                                <NB.Item error>
                                    <NB.Input style={{paddingLeft:14,}} placeholder='EMAIL'/>
                                    <NB.Icon name='close-circle' />
                                </NB.Item> 

                            </NB.View> 
                            <NB.Item style={{borderBottomWidth:0,}}>
                              <NB.H3 style={{color:'#333333',paddingBottom:8,paddingTop:20,}}>Password</NB.H3>
                         </NB.Item>
                        <NB.View style={{backgroundColor:'#fff',marginLeft:-2,}} >
                            <NB.Item error > 
                                    <NB.Input style={{paddingLeft:14,}} placeholder='TYPE PASSWORD'/> 
                                    <NB.Icon name='close-circle' />
                                </NB.Item>
                                <NB.Item >
                                    <NB.Input style={{paddingLeft:14,}} placeholder='CONFIRM PASSWORD'/>
                                   
                                </NB.Item> 

                            </NB.View> 
                            <NB.Item style={{borderBottomWidth:0,justifyContent: 'center',alignItems:'center',marginTop:40,}}>
                               <NB.Button style={{backgroundColor:'#a5a5a5',width:110,height:110,borderRadius:100,}} >
                                   
                                    <NB.Text style={{textAlign:'center',fontSize:16,textTransform:'capitalize'}}>Add Avatar</NB.Text>
                                
                                </NB.Button>
                            </NB.Item>

                            <NB.Item style={{borderBottomWidth:0,justifyContent: 'center',alignItems:'center',marginTop:30,}} >
                              <NB.Button  iconRight  style={{backgroundColor:'#ff1a00',borderRadius:50,width:'80%',justifyContent: 'center',alignItems:'center',height:58,paddingTop:0,}}>
                                    <NB.Text style={{fontSize:18,color:'#ffffff',}}>next </NB.Text>
                                    <NB.Icon style={{color:'#fff',fontSize:30,}} name='ios-arrow-round-forward' /> 
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