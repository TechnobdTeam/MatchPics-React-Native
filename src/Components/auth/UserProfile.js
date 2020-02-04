import React,  { Fragment, Component } from 'react';
import { View, Image, ImageBackground} from 'react-native';
import * as NB from 'native-base';
// NativeBase
import {Text} from 'native-base';
//import {CustomHeader} from '../CustomHeader'
import HomeStyle from '../LayoutsStytle/HomeStyle';


{/*Register */}
export class UserProfile extends React.Component {
  render() {
    return (
    <Fragment>    
        <ImageBackground   style={{width: '100%', height: '100%', backgroundColor:'#fff'}}   > 
           
             <NB.Header  transparent>
                  <NB.Left>
                    <NB.Button onPress={() => this.props.navigation.navigate('MyMatches')} transparent>
                      <NB.Icon name="ios-arrow-round-back" />
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


            <NB.Content style={{backgroundColor:'transparent',marginTop:-58,zIndex:-1,}}>
                <NB.View style={{height:400,}}>  
                     <NB.View style={{borderColor:'#fff',width:'100%',height:'100%',}}> 
                           <Image style={{width:'100%',height:'100%'}}   source={require('../Image/profile_single_images.jpg')} />
                           <Image style={{width:'100%',height:'50%',position:'absolute',zIndex:2,bottom:0,}}   source={require('../Image/slingle_profile_images_shap.png')} />
                      </NB.View>

                      <NB.View>
                        <NB.ListItem style={{borderBottomWidth:0,marginTop:-85,}}>
                            <NB.Left>
                              <NB.Body>
                                <NB.Text style={{color:'#fff',fontSize:23,}}>Nusrat Faria, F 32</NB.Text> 
                                <NB.Text style={{color:'#fff',fontSize:16,}}><NB.Icon name="ios-paper-plane" style={{color:'#fff',fontSize:16,}} /> Dhaka, Bangladesh </NB.Text>  
                                </NB.Body>
                            </NB.Left>
                            <NB.Right>
                            <NB.Icon style={{color:'#fff',fontSize:25,}} name="ios-information-circle" /> 
                            </NB.Right>
                        </NB.ListItem>
                </NB.View>


                  </NB.View>


              <NB.Container   style={HomeStyle.PageContainer}  >

                <NB.View style={{padding:20,}}>

                <NB.Text style={{fontSize:23,marginBottom:10,}}>About</NB.Text>  
                <NB.Text style={{marginBottom:10,}} >Coffee Meets Bagel goes anti-Tinder with a
                redesign focused on profiles, conversations. ...
                But more notably, it has ditched the big “Pass”
                or “Connect” buttons Coffee Meets Bagel goes anti-Tinder with a
                redesign focused on profiles, conversations. ...
                But more notably, it has ditched the big “Pass”
                or “Connect” buttons
                </NB.Text> 

                <NB.Text  style={{marginBottom:10,}} >Coffee Meets Bagel goes anti-Tinder with a
                redesign focused on profiles, conversations. ...
                But more notably, it has ditched the big “Pass”
                or “Connect” buttons Coffee Meets Bagel goes anti-Tinder with a
                redesign focused on profiles, conversations. ...
                But more notably, it has ditched the big “Pass”
                or “Connect” buttons
                </NB.Text>  

                <NB.Text  style={{marginBottom:10,}} >Coffee Meets Bagel goes anti-Tinder with a
                redesign focused on profiles, conversations. ...
                But more notably, it has ditched the big “Pass”
                or “Connect” buttons Coffee Meets Bagel goes anti-Tinder with a
                redesign focused on profiles, conversations. ...
                But more notably, it has ditched the big “Pass”
                or “Connect” buttons
                </NB.Text>  

                <NB.Text  style={{marginBottom:10,}} >Coffee Meets Bagel goes anti-Tinder with a
                redesign focused on profiles, conversations. ...
                But more notably, it has ditched the big “Pass”
                or “Connect” buttons Coffee Meets Bagel goes anti-Tinder with a
                redesign focused on profiles, conversations. ...
                But more notably, it has ditched the big “Pass”
                or “Connect” buttons
                </NB.Text>  
                        
                    
                </NB.View> 
            </NB.Container>
        </NB.Content> 
                <NB.Footer  >
                    <NB.FooterTab style={{backgroundColor:'#fff'}}>
                        <NB.Button badge vertical>
                        <NB.Badge><NB.Text>2</NB.Text></NB.Badge>
                        <NB.Icon style={{color:'#e41b5b'}} name="md-chatboxes" />
                        <NB.Text style={{color:'#333333'}}>Message</NB.Text>
                        </NB.Button>
                        <NB.Button vertical>
                        <NB.Icon style={{color:'#e41b5b'}}  name="md-heart-empty" />
                        <NB.Text style={{color:'#333333'}} >Favorite</NB.Text>
                        </NB.Button>
                        <NB.Button    vertical> 
                        <Image style={{width:20,height:20}}   source={require('../Image/block_icon.png')} />
                        <NB.Text style={{color:'#333333'}}>Block</NB.Text>
                        </NB.Button>
                        <NB.Button vertical>
                        <Image style={{width:20,height:20}}   source={require('../Image/report_icon.png')} />
                        <NB.Text style={{color:'#333333'}}>Report</NB.Text>
                        </NB.Button>
                    </NB.FooterTab>
                </NB.Footer>

         
        </ImageBackground> 
  
    </Fragment>
    );
  }
}
{/* End Register */}