import React,  { Fragment, Component } from 'react';
import { View, Image, ImageBackground} from 'react-native';
import * as NB from 'native-base';
// NativeBase
//import {CustomHeader} from '../CustomHeader'
import HomeStyle from '../LayoutsStytle/HomeStyle';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Text, Toast, Root} from 'native-base';
{/*Register */}
export class ForgotPassword extends React.Component {
  render() {
    return (
        <Root>
        <Fragment>   
      
         <ImageBackground source={require('../Image/background_images.jpg') } style={{width: '100%', height: '100%', }}   > 
          <NB.Container  style={HomeStyle.PageContainerLogin}  >
            
          
            <NB.View style={HomeStyle.PageView} >

            <NB.CardItem style={{backgroundColor:'transparent'}} > 

                <NB.Button onPress={() => this.props.navigation.navigate('Login')} iconRight transparent style={{ }}>
                      
                      <Icon name="long-arrow-alt-left"  style={{fontSize:30,color:'#333333',  }}  /> 
                  </NB.Button>

                      
                    <NB.Left style={{width:'100%',justifyContent: 'center', alignItems:'center'}}>

                    
                          <NB.Text style={{   fontSize:30, color:'#333333',  alignItems:'center', justifyContent:'center'}} >Forgot Password   </NB.Text> 
                         
                      </NB.Left>
         
                      
                    </NB.CardItem>

 

                    
                      <View style={{flex:1,alignItems:"center", justifyContent:"center"}} >
                       
                         <NB.Form >
                            <NB.Item  style={{marginTop:20}} >
                              <NB.Input   placeholder='EMAIL'
                                // onChangeText={(value) => this.setState({email: value})}
                              /> 
                            </NB.Item> 


                            
                            <NB.Item style={{borderBottomWidth:0,justifyContent: 'center',alignItems:'center',marginTop:30,}} >
                                <NB.Button style={{shadowOpacity: 0,elevation:0,backgroundColor:'#ff1a00',borderRadius:50,width:'80%',justifyContent: 'center',alignItems:'center',height:59,}} onPress={() => this.verifyLogin()}>
                                      <NB.Text style={{fontSize:18,color:'#ffffff',}}>SUBMIT</NB.Text>
                                </NB.Button> 
                             </NB.Item>
                              
                             </NB.Form >
 
                            
                        </View>
           
                    
            
              </NB.View>
         

            </NB.Container>
          </ImageBackground> 
      
      </Fragment>
        </Root>
       
    );
  }
}
{/* End Register */}