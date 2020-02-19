import React,  { Fragment, Component } from 'react';
import { View, Image, ImageBackground} from 'react-native';
import * as NB from 'native-base';
// NativeBase
import {Text} from 'native-base';
//import {CustomHeader} from '../CustomHeader'
import HomeStyle from '../LayoutsStytle/HomeStyle';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage';
import ConstValues from '../../constants/ConstValues';
{/*Register */}
export class UserProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user_id: '',
      showToast: false,
      email: '',
      password: '',
      token: '',
      progressVisible: false ,
      favData: '',
      columns: 2, 
      statusBarPaddingTop: isIPhoneX() ? 30 : platform === "ios" ? 20 : 0
    };

    this.setState({user_id: this.props.navigation.state.params.something})

    AsyncStorage.getItem(ConstValues.user_email, (error, result) =>{

        if(result != null){
            this.setState({email: result})
        }
    }).then(
        AsyncStorage.getItem(ConstValues.user_password, (error, result) =>{

            if(result != null){
                this.setState({password: result})
            }
        }).then(
            AsyncStorage.getItem(ConstValues.user_token, (error, result) =>{

                console.log('user_token: ' + result)

                if(result != null){
                    this.setState({token: result})
                }
            }).then(
                this.timeoutHandle = setTimeout(()=>{
                    this.getProfileDetails()
                 }, 1000)
            )
        )
    )
  }

  getProfileDetails(){

  }
 
  render() {
    return (
    <Fragment>    
        <ImageBackground   style={{width: '100%', height: '100%', backgroundColor:'#fff'}}   > 
           
             <NB.Header  transparent>
                  <NB.Left>
                    <NB.Button onPress={() => this.props.navigation.navigate('MyMatches')} transparent>
                      
                      <Icon name="arrow-left"  style={{fontSize:24,color:'#fff', }}  /> 
                     
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
                <NB.View style={{height:400,marginLeft:-5,}}>  
                     <NB.View style={{borderColor:'#fff',width:'100%',height:'100%',}}> 
                           <Image style={{width:'100%',height:'100%'}}   source={require('../Image/profile_single_images.jpg')} />
                           <Image style={{width:'100%',height:'50%',position:'absolute',zIndex:2,bottom:0,}}   source={require('../Image/slingle_profile_images_shap.png')} />
                      </NB.View>

                      <NB.View>
                        <NB.ListItem style={{borderBottomWidth:0,marginTop:-85,}}>
                            <NB.Left>
                              <NB.Body>
                                <NB.Text style={{color:'#fff',fontSize:22,fontWeight:'bold'}}>Nusrat Faria, <NB.Text style={{fontWeight:"400",color:'#fff',fontSize:22,}} >F 32  </NB.Text>  </NB.Text> 
                                <NB.Text style={{color:'#fff',fontSize:18,}}><Icon name="location-arrow" solid style={{color:'#fff',fontSize:16 }}  /> Dhaka, Bangladesh </NB.Text>  
                                </NB.Body>
                            </NB.Left>
                            <NB.Right>
                             
                            <Icon name="info-circle" solid style={{color:'#fff',fontSize:40 }}  /> 
                            </NB.Right>
                        </NB.ListItem>
                </NB.View>


                  </NB.View>


              <NB.View   style={HomeStyle.PageContainerAbout}  >

                <NB.View style={{padding:20,}}>

                <NB.Text style={{fontSize:21,marginBottom:10,color:"#6c6c6c"}}>About</NB.Text>  
                <NB.Text style={{marginBottom:10,color:'#6c6c6c',lineHeight:22,}} >Coffee Meets Bagel goes anti-Tinder with a
redesign focused on profiles, conversations. ...But more notably, it has ditched the big “Pass”
or “Connect” buttons
                </NB.Text>  

            
                    
                </NB.View> 
            </NB.View>
        </NB.Content> 
                <NB.Footer style={{height:72}} >
                    <NB.FooterTab style={{backgroundColor:'#fff',}}>
                        <NB.Button badge vertical onPress={() => this.props.navigation.navigate('Chatlist')} >
                        {/* <NB.Badge><NB.Text>2</NB.Text></NB.Badge>  */}
                        <Icon name="comment" light  style={{color:'#e41b5b',fontSize:24, marginBottom:8,}}  /> 
                        <NB.Text style={{color:'#333333',fontSize:14,}}>Message</NB.Text>
                        </NB.Button>
                        <NB.Button vertical>
                        <Icon name="heart" light  style={{color:'#e41b5b',fontSize:24,marginBottom:8, }}  /> 
                        <NB.Text style={{color:'#333333',fontSize:14,}} >Favorite</NB.Text>
                        </NB.Button>
                        <NB.Button    vertical> 
                        <Icon name="ban" light  style={{color:'#e41b5b',fontSize:24,marginBottom:8, }}  />  
                        <NB.Text style={{color:'#333333',fontSize:14,}}>Block</NB.Text>
                        </NB.Button>
                        <NB.Button vertical>
                        <Icon name="flag" light  style={{color:'#e41b5b',fontSize:24,marginBottom:8, }}  />   
                        <NB.Text style={{color:'#333333',fontSize:14,}}>Report</NB.Text>
                        </NB.Button>
                    </NB.FooterTab>
                </NB.Footer>

         
        </ImageBackground> 
  
    </Fragment>
    );
  }
}
{/* End Register */}