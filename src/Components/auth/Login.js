import React,  { Fragment, Component } from 'react';
import { View, Image, ImageBackground} from 'react-native';
import * as NB from 'native-base';
// NativeBase
import {Text} from 'native-base';
//import {CustomHeader} from '../CustomHeader'
import HomeStyle from '../LayoutsStytle/HomeStyle';

{/*Login  */}
export class Login extends React.Component {
    render() {
      return ( 
        <Fragment>    
         <ImageBackground source={require('../Image/background_images.jpg') } style={{width: '100%', height: '100%', }}   > 
          <NB.Container  style={HomeStyle.PageContainerLogin}  >
            <NB.View style={HomeStyle.PageView} >
                  <NB.CardItem style={{backgroundColor:'transparent'}} > 
                        
                      <NB.Left style={{width:'100%',  justifyContent: 'center',}}>
                          <NB.Text style={HomeStyle.SingIn} > Sign In   </NB.Text> 
                         
                      </NB.Left>
                      <NB.Button onPress={() => this.props.navigation.navigate('Menu')} iconRight transparent style={{marginTop:-20,}}>
                          <NB.Icon  name="close" style={{fontSize:30,color:'#333333', }}  /> 
                      </NB.Button>
                      
                    </NB.CardItem>

                 
                      <NB.Content style={HomeStyle.FormContent} >
                         <NB.Form >
                            <NB.Item  >
                              <NB.Input placeholder='EMAIL'/> 
                            </NB.Item>
                            <NB.Item error>
                              <NB.Input placeholder='PASSWORD'/>
                              <NB.Icon name='close-circle' />
                            </NB.Item> 
                          
                             <NB.Item style={{borderBottomWidth:0,justifyContent: 'center', alignItems:'center',marginTop:20,marginBottom:30,}} >
                              <NB.Text style={{fontSize:19,color:'#333333',}}> Forgot Password? </NB.Text>
                             </NB.Item> 

                             <NB.Item style={{borderBottomWidth:0,justifyContent: 'center',alignItems:'center'}} >
                                <NB.Button style={{backgroundColor:'#ff1a00',borderRadius:50,width:'80%',justifyContent: 'center',alignItems:'center',height:58,}}>
                                      <NB.Text style={{fontSize:18,color:'#ffffff',}}>Sign in</NB.Text>
                                </NB.Button> 
                             </NB.Item>
                              
                             </NB.Form >

                             <NB.Form >
                             <NB.Item style={{borderBottomWidth:0,justifyContent: 'center',alignItems:'center',marginTop:10,}} >
                                <NB.Button iconLeft light  style={{backgroundColor:'#3b5998',borderRadius:50,width:'100%',height:58,  justifyContent: 'center',}}>
                                   <NB.Text style={{fontSize:18,color:'#ffffff',marginTop:-13,}}> <Image    source={require('../Image/facebook.png')}    />   Sign in with facebook</NB.Text>
                                </NB.Button> 
                             </NB.Item>


                             <NB.Item style={{borderBottomWidth:0,justifyContent: 'center', alignItems:'center',marginTop:90,marginBottom:15,}} >
                              <NB.Text style={{fontSize:19,color:'#333333',}}>Don’t have a account yet? </NB.Text>
                             </NB.Item>  
                                <NB.Item style={{borderBottomWidth:0,justifyContent: 'center',alignItems:'center',marginTop:5,marginBottom:10,}} >
                                    <NB.Button onPress={() => this.props.navigation.navigate('Register')}  iconLeft light  style={{backgroundColor:'#ff9900',width:'80%',height:58,  justifyContent: 'center',}}>
                                      <NB.Text style={{fontSize:18,color:'#ffffff',}}>  sign up for free</NB.Text>
                                    </NB.Button> 
                              </NB.Item>

                             </NB.Form>
                             

                         
                      </NB.Content>
                  

            
              </NB.View>
            </NB.Container>
          </ImageBackground> 

  </Fragment>
      );
    }
  }
  {/* End Login */}