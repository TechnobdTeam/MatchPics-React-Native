import React,  { Fragment, Component } from 'react';
import { View, Image, ImageBackground, FlatList , TouchableOpacity} from 'react-native';
import * as NB from 'native-base';
// NativeBase
import {Text} from 'native-base';
//import {CustomHeader} from '../CustomHeader'
import HomeStyle from '../LayoutsStytle/HomeStyle';


{/*Register */}
export class MyProfile extends React.Component {
  render() {
    return (
        <Fragment>    
           
        <ImageBackground source={require('../Image/profile_bg.png') } style={{width: '100%', height: '100%', paddingRight:0,marginRight:0,backgroundColor:'#f4f4f4'}}   > 
              
                <NB.Container   style={HomeStyle.PageContainer}  >
                    <NB.Header  transparent>
                        <NB.Left>
                            <NB.Button onPress={() => this.props.navigation.navigate('Menu')} transparent>
                            <NB.Icon name="ios-menu" />
                            </NB.Button>
                        </NB.Left>

                        <NB.Body  >
                        <NB.Segment style={{backgroundColor:'transparent'}}>
                            <NB.Text style={{color:'#fff',fontSize:23,}}>My Profile  </NB.Text>
                            </NB.Segment>
                        </NB.Body>
                        <NB.Right>
                            <NB.Button transparent>
                            <NB.Icon name="md-notifications" />
                            </NB.Button>
                        </NB.Right>
                    </NB.Header>

                    <NB.Content >

                        <TouchableOpacity >
                            <NB.View style={{alignItems:'center',justifyContent:'center',marginTop:10,marginBottom:60,}} >
                                <NB.View style={{borderWidth:3,borderColor:'#fff',borderRadius:100,width:180,height:180,overflow:'hidden',}}>

                                <Image style={{width:'100%',height:'100%'}}   source={require('../Image/user.jpg')} />
                            
                                    <NB.View style={{alignItems:'center',justifyContent:'center',marginTop:-45,}} >
                                        <NB.View  style={{alignItems:'center',justifyContent:'center',backgroundColor:'#fff',borderRadius:100,height:40,width:40, }}>
                                            <NB.Icon style={{color:'#b53386'}} name="ios-create" />
                                        </NB.View>
                                    </NB.View> 
                                
                                </NB.View>
    
                                    <NB.View><NB.Text style={{color:'#94217e',fontSize:23,}}>User Name Goes Here</NB.Text></NB.View>
                            </NB.View>
                        </TouchableOpacity>

                        <NB.View style={HomeStyle.UserProfileCard}  >  
                               <ImageBackground source={require('../Image/user_bnt_bg.png') } style={{  }} >

                                        <NB.CardItem style={HomeStyle.UserProfileImages}  >
                                            <NB.Left style={{}}>
                                                <NB.Icon style={{color:'#fff',}} name='md-person' />
                                                <NB.Text  style={{color:'#fff',fontSize:20,}} >Profile</NB.Text>
                                            </NB.Left>

                                            <NB.Right>
                                                <NB.Button onPress={() => this.props.navigation.navigate('ProfileEdit')}   light style={{backgroundColor:'#e32a89',borderRadius:7,height:35,marginTop:5,}}> 
                                                    <NB.Text style={{color:'#fff',textTransform:'capitalize'}}>Change</NB.Text>
                                                </NB.Button>

                                            </NB.Right>
                                            </NB.CardItem>  
                                 </ImageBackground> 
                            </NB.View>

                            <NB.View style={HomeStyle.UserProfileCard}  >  
                               <ImageBackground source={require('../Image/Social_bnt_bg.png') } style={{  }} >

                                        <NB.CardItem style={HomeStyle.UserProfileImages}  >
                                            <NB.Left style={{}}>
                                                <NB.Icon style={{color:'#fff',}} name='ios-keypad' />
                                                <NB.Text  style={{color:'#fff',fontSize:20,}} >Social</NB.Text>
                                            </NB.Left>

                                            <NB.Right>
                                                <NB.Button  light style={{backgroundColor:'#00a8ff',borderRadius:7,height:35,marginTop:5,}}> 
                                                    <NB.Text style={{color:'#fff',textTransform:'capitalize',}}>Change</NB.Text>
                                                </NB.Button>

                                            </NB.Right>
                                            </NB.CardItem>  
                                 </ImageBackground> 
                            </NB.View>

                            <NB.View style={HomeStyle.UserProfileCard}  >  
                               <ImageBackground source={require('../Image/Location_bnt_bg.png') } style={{  }} >

                                        <NB.CardItem style={HomeStyle.UserProfileImages}  >
                                            <NB.Left style={{}}>
                                                <NB.Icon style={{color:'#fff',}} name='ios-pin' />
                                                <NB.Text  style={{color:'#fff',fontSize:20,}} >Location</NB.Text>
                                            </NB.Left>

                                            <NB.Right>
                                                <NB.Button  light style={{backgroundColor:'#f68e1e',borderRadius:7,height:35,marginTop:5,}}> 
                                                    <NB.Text style={{color:'#fff',textTransform:'capitalize',}}>Change</NB.Text>
                                                </NB.Button>

                                            </NB.Right>
                                            </NB.CardItem>  
                                 </ImageBackground> 
                            </NB.View>

                            <NB.View style={HomeStyle.UserProfileCard}  >  
                               <ImageBackground source={require('../Image/Appearance_bnt_background.png') } style={{  }} >

                                        <NB.CardItem style={HomeStyle.UserProfileImages}  >
                                            <NB.Left style={{}}>
                                                <NB.Icon style={{color:'#fff',}} name='ios-man' />
                                                <NB.Text  style={{color:'#fff',fontSize:20,}} >Appearance</NB.Text>
                                            </NB.Left>

                                            <NB.Right>
                                                <NB.Button  light style={{backgroundColor:'#2ed573',borderRadius:7,height:35,marginTop:5,}}> 
                                                    <NB.Text style={{color:'#fff',textTransform:'capitalize',}}>Change</NB.Text>
                                                </NB.Button>

                                            </NB.Right>
                                            </NB.CardItem>  
                                 </ImageBackground> 
                            </NB.View>



                   </NB.Content>




                </NB.Container>
        </ImageBackground> 
      
    </Fragment>
    );
  }
}
{/* End Register */}