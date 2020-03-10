import React,  { Fragment, Component,StatusBar } from 'react';
import {Dimensions, View, Image, ImageBackground,NativeModules, processColor,TouchableOpacity} from 'react-native';
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
            user_logged_in : false,
            token : ''
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
    this.storeData(ConstValues.fb_login, false);

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

  getMessageList(){

    console.log("getting message list");

    var formData = new FormData();
    formData.append('api_key', ConstValues.api_key);

    fetch(ConstValues.base_url + 'getMessageList', {
      method: 'POST',
      headers:{
          'Authorization': 'Bearer ' + JSON.parse(this.state.token), 
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
      },
      body: formData
    }).then((response) => response.json())
    .then((responseJson) =>{
        if(responseJson.response.data == undefined){
            console.log("getMessageList: undefined data");
            ConstValues.message_data_list = []
        }else{
          ConstValues.message_data_list = responseJson.response.data ;
          console.log("getMessageList: --------------- " + responseJson.response.data.length +" ??? "+ ConstValues.message_data_list.length );
          
        }

        this.props.navigation.navigate('Chatlist')

    })
}


messageListClicked(){
  AsyncStorage.getItem(ConstValues.user_token, (error, result) =>{
    console.log('user_token: ' + result)
    if(result != null){
        this.setState({token: result})
    }
    }).then(
    this.timeoutHandle = setTimeout(()=>{
        this.getMessageList()
      }, 500)

    )
}

  render() {
    const {width, height} = Dimensions.get('window');
    return (
      <Fragment > 
  
       <ImageBackground source={require('../Image/background_uplode_images.jpg') } style={{width: '100%', height: '100%', }}   >
       <NB.Container   style={HomeStyle.MenuPageContainer}  >
            <NB.View style={HomeStyle.SingupPageView} >
                  <NB.CardItem style={{backgroundColor:'transparent',height:110}} > 
                        
                      <NB.Left style={{width:'100%',paddingLeft:19,}}>
                      <Image style={{width:205,height:69,}}   source={require('../Image/logo_menue.png')} />
                         
                      </NB.Left>
                      <NB.Button     iconRight transparent style={{marginTop:-50,marginRight:0}}>
                      <TouchableOpacity onPress={() => this.props.navigation.pop()} >
                          <Icon name="times"  style={{fontSize:30,color:'#333333', }}  /> 
                        </TouchableOpacity>
                      </NB.Button>
                      
                    </NB.CardItem>

                    <NB.Content style={{backgroundColor:'#fff', borderBottomLeftRadius:10,borderBottomRightRadius:10,}}>
                 
                          
                          
                          <NB.View style={{
                             borderBottomLeftRadius:10,borderBottomRightRadius:10,overflow:"hidden"}}>
                  
                            <NB.Content >
                              
                                    <NB.ListItem  style={{marginLeft:0,paddingLeft:25,height:65,}}>
                                    <TouchableOpacity  onPress={() => this.props.navigation.navigate('MyProfile')} style={{width:"100%",flex:1,flexDirection:"row"}}>
                                       <NB.View style={{width:50,justifyContent:"center",alignItems:"center"}}>
                                     

                                       <Icon name="user-circle"  style={{fontSize: width * 0.05,color:'#e41b5b', }}  /> 
                                       </NB.View>
                                        
                                   
                                        <NB.Body>
                                        {/* <NB.Text   style={{textTransform:'uppercase',color:"#464646",fontFamily:'OpenSans-Regular',fontSize: width * 12.88 }}>my profile</NB.Text> */}
                                        <NB.Text style={{fontSize: width * 0.04,textTransform:'uppercase',color:"#464646",fontFamily:'OpenSans-Regular', }}>my profile</NB.Text>
                                        </NB.Body>
                                        </TouchableOpacity>
                                    </NB.ListItem>
                                   
                            </NB.Content>
                          

                            <NB.Content>
                                    <NB.ListItem style={{marginLeft:0,paddingLeft:25,height:65}} >
                                    <TouchableOpacity  onPress={() => this.props.navigation.navigate('UploadImage')} style={{width:"100%",flex:1,flexDirection:"row"}}>
                                    <NB.View style={{width:50,justifyContent:"center",alignItems:"center"}}>
                                    <Icon name="cloud-upload-alt"  style={{fontSize: width * 0.05,color:'#e41b5b', }}  /> 
                                    </NB.View>
                                        <NB.Body>
                                        <NB.Text  style={{textTransform:'uppercase',fontSize: width * 0.04,color:"#464646",fontFamily:'OpenSans-Regular'}}>upload photo </NB.Text>
                                        </NB.Body>
                                        </TouchableOpacity>
                                    </NB.ListItem>
                            </NB.Content>

                            <NB.Content>
                                    <NB.ListItem style={{marginLeft:0,paddingLeft:25,height:65}} >

                                    <TouchableOpacity  onPress={() => this.props.navigation.navigate('MyMatchesFavorite')} style={{width:"100%",flex:1,flexDirection:"row"}}>
                                    <NB.View style={{width:50,justifyContent:"center",alignItems:"center"}}>
                                    <Icon name="user-friends"  style={{fontSize: width * 0.05,color:'#e41b5b', }}  /> 
                                    </NB.View>
                                        <NB.Body>
                                        <NB.Text   style={{textTransform:'uppercase',fontSize: width * 0.04,color:"#464646",fontFamily:'OpenSans-Regular'}} >my matches</NB.Text>
                                        </NB.Body>
                                        </TouchableOpacity>
                                    </NB.ListItem>
                            </NB.Content>

                            <NB.Content>
                                    <NB.ListItem style={{marginLeft:0,paddingLeft:25,height:65}} >
                                    <TouchableOpacity  onPress={() => this.props.navigation.navigate('MyFavorite')} style={{width:"100%",flex:1,flexDirection:"row"}}>
                                    <NB.View style={{width:50,justifyContent:"center",alignItems:"center"}}>
                                    <Icon name="heart"  style={{fontSize: width * 0.05,color:'#e41b5b', }}  /> 
                                    </NB.View>
                                        <NB.Body>
                                          <NB.Text  style={{textTransform:'uppercase',fontSize: width * 0.04,color:"#464646",fontFamily:'OpenSans-Regular'}} >my favorite</NB.Text>
                                        </NB.Body>
                                       </TouchableOpacity>
                                    </NB.ListItem>
                            </NB.Content>

                            <NB.Content>
                                    <NB.ListItem style={{marginLeft:0,paddingLeft:25,height:65}} >
                                    <TouchableOpacity  onPress={() => this.messageListClicked()} style={{width:"100%",flex:1,flexDirection:"row"}}>
                                    <NB.View style={{width:50,justifyContent:"center",alignItems:"center"}}>
                                    <Icon name="comments"  style={{fontSize: width * 0.05,color:'#e41b5b', }}  /> 
                                    </NB.View>
                                        <NB.Body>
                                             <NB.Text style={{textTransform:'uppercase',fontSize: width * 0.04,color:"#464646",fontFamily:'OpenSans-Regular'}} >messages</NB.Text> 
                                        </NB.Body>
                                        </TouchableOpacity>
                                    </NB.ListItem>
                            </NB.Content>

                            <NB.Content>
                                    <NB.ListItem style={{marginLeft:0,paddingLeft:25,height:65}}>
                                    <TouchableOpacity  onPress={() => this.props.navigation.navigate('AppSearch')} style={{width:"100%",flex:1,flexDirection:"row"}}>
                                    <NB.View style={{width:50,justifyContent:"center",alignItems:"center"}}>
                                    <Icon name="search"  style={{fontSize: width * 0.05,color:'#e41b5b', }}  /> 
                                    </NB.View>
                                        <NB.Body>
                                        <NB.Text   style={{textTransform:'uppercase',fontSize: width * 0.04,color:"#464646",fontFamily:'OpenSans-Regular'}} >search</NB.Text>
                                        </NB.Body>
                                        </TouchableOpacity>
                                    </NB.ListItem>
                            </NB.Content>

                            <NB.Content>
                                    <NB.ListItem style={{marginLeft:0,paddingLeft:25,height:65}}>
                                    <TouchableOpacity  style={{width:"100%",flex:1,flexDirection:"row"}}>
                                    <NB.View style={{width:50,justifyContent:"center",alignItems:"center"}}>
                                    <Icon name="shopping-cart"  style={{fontSize: width * 0.05,color:'#e41b5b', }}  /> 
                                    </NB.View>
                                        <NB.Body>
                                        <NB.Text style={{textTransform:'uppercase',fontSize: width * 0.04,color:"#464646",fontFamily:'OpenSans-Regular'}} >buy subscription</NB.Text>
                                        </NB.Body>
                                        </TouchableOpacity>
                                    </NB.ListItem>
                            </NB.Content>

                            <NB.Content>
                                    <NB.ListItem style={{marginLeft:0,paddingLeft:25,height:65}}>
                                    <TouchableOpacity  onPress={() => this.props.navigation.navigate('Termsconditions')}  style={{width:"100%",flex:1,flexDirection:"row"}}>
                                    <NB.View style={{width:50,justifyContent:"center",alignItems:"center"}}>
                                    <Icon name="balance-scale" style={{fontSize: width * 0.05,color:'#e41b5b', }}  /> 
                                    </NB.View>
                                        <NB.Body>
                                        <NB.Text   style={{textTransform:'uppercase',fontSize: width * 0.04,color:"#464646",fontFamily:'OpenSans-Regular'}} >terms & conditions</NB.Text>
                                        </NB.Body>

                                        </TouchableOpacity>
                                    </NB.ListItem>
                            </NB.Content>

                            {!this.state.user_logged_in ? 
                            <NB.Content>
                                    <NB.ListItem style={{marginLeft:0,paddingLeft:25,height:65,borderBottomColor:"#fff",borderBottomWidth:1}}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}  style={{width:"100%",flex:1,flexDirection:"row"}}>
                                    <NB.View style={{width:50,justifyContent:"center",alignItems:"center"}}>
                                    <Icon name="door-open" style={{fontSize: width * 0.05,color:'#e41b5b', }}  /> 
                                    </NB.View>
                                        <NB.Body>
                                          <NB.Text style={{textTransform:'uppercase',fontSize: width * 0.04,color:"#464646",fontFamily:'OpenSans-Regular'}} >Sign in </NB.Text>
                                        </NB.Body>
                                        </TouchableOpacity>
                                    </NB.ListItem>
                            </NB.Content> 
                            : null }

                            {this.state.user_logged_in ? 
                            <NB.Content style={{}}>
                              
                                    <NB.ListItem style={{marginLeft:0,paddingLeft:25, height:65,borderBottomColor:"#fff",borderBottomWidth:1}}>
                                      <TouchableOpacity onPress={() => this.userLogOut()} style={{width:"100%",flex:1,flexDirection:"row"}}>
                                      <NB.View style={{width:50,justifyContent:"center",alignItems:"center"}}>
                                    <Icon name="door-open" style={{fontSize: width * 0.05,color:'#e41b5b', }}  /> 
                                    </NB.View>
                                        <NB.Body>
                                        <NB.Text   style={{textTransform:'uppercase',fontSize: width * 0.04,color:"#464646",fontFamily:'OpenSans-Regular'}} >Sign Out</NB.Text>
                                        </NB.Body>
                                      </TouchableOpacity>
                                    
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