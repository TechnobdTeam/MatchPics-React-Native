import React,  { Fragment, Component,StatusBar } from 'react';
import { View, Image, ImageBackground,NativeModules, processColor} from 'react-native';
import * as NB from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';
// NativeBase
import {Text} from 'native-base';
//import {CustomHeader} from '../CustomHeader'
import HomeStyle from '../LayoutsStytle/HomeStyle';
import Icon from 'react-native-vector-icons/FontAwesome5';
const { StatusBarManager } = NativeModules;
import AsyncStorage from '@react-native-community/async-storage';
import ConstValues from '../../constants/ConstValues';

{/*Register */}
export class Menu extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            user_logged_in: false
          };
    }

  componentDidMount() {
    StatusBarManager.setColor(processColor('#e74e92'), false); 

    AsyncStorage.getItem(ConstValues.user_logged_in , (error, result) => {

        if(result != null){
  
        //   this.timeoutHandle = setTimeout(()=>{
          if(result == 'true'){
            console.log("logged_in_status:true>>> " + result);
            this.setState({user_logged_in: true});
          }
          else{
            console.log("logged_in_status:false>>> " + result);
            this.setState({user_logged_in: false});
          }
        // }, 1500);
        }
        else{
          console.log("logged_in_status: not logged in" );
          this.setState({user_logged_in: false});
        }
      })
  }

  userLogOut(){
    this.storeData(ConstValues.user_logged_in, false);

    this.storeData(ConstValues.user_email, '');
    this.storeData(ConstValues.user_id, '');
    this.storeData(ConstValues.user_token, '');
    this.storeData(ConstValues.customer_id, '');
    this.storeData(ConstValues.user_name, '');

    var resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Login' })],
      });

      this.props.navigation.dispatch(resetAction);
  }

  storeData(key,value) {
    try {
      AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      // saving error
      console.log("saving_error: " + e.message);
    }
  }

  render() {
    return (
      <Fragment > 
  
       <ImageBackground source={require('../Image/background_uplode_images.jpg') } style={{width: '100%', height: '100%', }}   >
       <NB.Container   style={HomeStyle.MenuPageContainer}  >
            <NB.View style={HomeStyle.SingupPageView} >
                  <NB.CardItem style={{backgroundColor:'transparent',height:110}} > 
                        
                      <NB.Left style={{width:'100%',paddingLeft:19,}}>
                      <Image style={{width:205,height:69,}}   source={require('../Image/logo_menue.png')} />
                         
                      </NB.Left>
                      <NB.Button   onPress={() => this.props.navigation.pop()}  iconRight transparent style={{marginTop:-50,marginRight:0}}>
                     
                          <Icon name="times"  style={{fontSize:30,color:'#333333', }}  /> 
                      </NB.Button>
                      
                    </NB.CardItem>

                    <NB.Content style={{backgroundColor:'#fff', borderBottomLeftRadius:10,borderBottomRightRadius:10,}}>
                 
                          
                          
                          <NB.View style={{
                             borderBottomLeftRadius:10,borderBottomRightRadius:10,overflow:"hidden"}}>

                            <NB.Content >
                                    <NB.ListItem  style={{marginLeft:0,paddingLeft:25,height:80}}>
                                       <NB.View style={{width:50,justifyContent:"center",alignItems:"center"}}>
                                       <Icon name="user-circle"  style={{fontSize:30,color:'#e41b5b', }}  /> 
                                       </NB.View>
                                        
                                   
                                        <NB.Body>
                                        <NB.Text onPress={() => this.props.navigation.navigate('MyProfile')}   style={{textTransform:'uppercase',fontSize:17,color:"#464646"}}>my profile</NB.Text>
                                        </NB.Body>
                                    </NB.ListItem>
                            </NB.Content>

                            <NB.Content>
                                    <NB.ListItem style={{marginLeft:0,paddingLeft:25,height:80}} >
                                    <NB.View style={{width:50,justifyContent:"center",alignItems:"center"}}>
                                    <Icon name="cloud-upload-alt"  style={{fontSize:30,color:'#e41b5b', }}  /> 
                                    </NB.View>
                                        <NB.Body>
                                        <NB.Text onPress={() => this.props.navigation.navigate('UploadImage')} style={{textTransform:'uppercase',fontSize:17,color:"#464646"}} >photo upload </NB.Text>
                                        </NB.Body>
                                    </NB.ListItem>
                            </NB.Content>

                            <NB.Content>
                                    <NB.ListItem style={{marginLeft:0,paddingLeft:25,height:80}} >
                                    <NB.View style={{width:50,justifyContent:"center",alignItems:"center"}}>
                                    <Icon name="user-friends"  style={{fontSize:30,color:'#e41b5b', }}  /> 
                                    </NB.View>
                                        <NB.Body>
                                        <NB.Text onPress={() => this.props.navigation.navigate('MyMatches')} style={{textTransform:'uppercase',fontSize:17,color:"#464646"}} >my matches</NB.Text>
                                        </NB.Body>
                                    </NB.ListItem>
                            </NB.Content>

                            <NB.Content>
                                    <NB.ListItem style={{marginLeft:0,paddingLeft:25,height:80}} >
                                    <NB.View style={{width:50,justifyContent:"center",alignItems:"center"}}>
                                    <Icon name="heart"  style={{fontSize:30,color:'#e41b5b', }}  /> 
                                    </NB.View>
                                        <NB.Body>
                                          <NB.Text onPress={() => this.props.navigation.navigate('MyFavorite')}  style={{textTransform:'uppercase',fontSize:17,color:"#464646"}} >my favorite</NB.Text>
                                        </NB.Body>
                                    </NB.ListItem>
                            </NB.Content>

                            <NB.Content>
                                    <NB.ListItem style={{marginLeft:0,paddingLeft:25,height:80}} >
                                    <NB.View style={{width:50,justifyContent:"center",alignItems:"center"}}>
                                    <Icon name="comments"  style={{fontSize:30,color:'#e41b5b', }}  /> 
                                    </NB.View>
                                        <NB.Body>
                                             <NB.Text onPress={() => this.props.navigation.navigate('Chatlist')} style={{textTransform:'uppercase',fontSize:17,color:"#464646"}} >messages</NB.Text> 
                                        </NB.Body>
                                    </NB.ListItem>
                            </NB.Content>

                            <NB.Content>
                                    <NB.ListItem style={{marginLeft:0,paddingLeft:25,height:80}}>
                                    <NB.View style={{width:50,justifyContent:"center",alignItems:"center"}}>
                                    <Icon name="search"  style={{fontSize:30,color:'#e41b5b', }}  /> 
                                    </NB.View>
                                        <NB.Body>
                                        <NB.Text style={{textTransform:'uppercase',fontSize:17,color:"#464646"}} >search</NB.Text>
                                        </NB.Body>
                                    </NB.ListItem>
                            </NB.Content>

                            <NB.Content>
                                    <NB.ListItem style={{marginLeft:0,paddingLeft:25,height:80}}>
                                    <NB.View style={{width:50,justifyContent:"center",alignItems:"center"}}>
                                    <Icon name="shopping-cart"  style={{fontSize:30,color:'#e41b5b', }}  /> 
                                    </NB.View>
                                        <NB.Body>
                                        <NB.Text style={{textTransform:'uppercase',fontSize:17,color:"#464646"}} >buy subscription</NB.Text>
                                        </NB.Body>
                                    </NB.ListItem>
                            </NB.Content>

                            <NB.Content>
                                    <NB.ListItem style={{marginLeft:0,paddingLeft:25,height:80}}>
                                    <NB.View style={{width:50,justifyContent:"center",alignItems:"center"}}>
                                    <Icon name="balance-scale" style={{fontSize:30,color:'#e41b5b', }}  /> 
                                    </NB.View>
                                        <NB.Body>
                                        <NB.Text style={{textTransform:'uppercase',fontSize:17,color:"#464646"}} >terms & conditions</NB.Text>
                                        </NB.Body>
                                    </NB.ListItem>
                            </NB.Content>

                            {!this.state.user_logged_in ? 
                            <NB.Content>
                                    <NB.ListItem style={{marginLeft:0,paddingLeft:25,height:80,}}>
                                    <NB.View style={{width:50,justifyContent:"center",alignItems:"center"}}>
                                    <Icon name="door-open" style={{fontSize:30,color:'#e41b5b', }}  /> 
                                    </NB.View>
                                        <NB.Body>
                                          <NB.Text onPress={() => this.props.navigation.navigate('Login')}   style={{textTransform:'uppercase',fontSize:17,color:"#464646"}} >login </NB.Text>
                                        </NB.Body>
                                    </NB.ListItem>
                            </NB.Content> 
                            : null }

                            {this.state.user_logged_in ? 
                            <NB.Content style={{}}>
                                    <NB.ListItem style={{marginLeft:0,paddingLeft:25, height:80}}>
                                    <NB.View style={{width:50,justifyContent:"center",alignItems:"center"}}>
                                    <Icon name="door-open" style={{fontSize:30,color:'#e41b5b', }}  /> 
                                    </NB.View>
                                        <NB.Body>
                                        <NB.Text onPress={() => this.userLogOut()}   style={{textTransform:'uppercase',fontSize:17,color:"#464646"}} >logout</NB.Text>
                                        </NB.Body>
                                    </NB.ListItem>
                            </NB.Content> 
                            : null }

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