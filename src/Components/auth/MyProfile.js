import React,  { Fragment, Component } from 'react';
import { View, Image, ImageBackground, FlatList , TouchableOpacity,PermissionsAndroid } from 'react-native';
import * as NB from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import ConstValues from '../../constants/ConstValues'
import { Dialog, ProgressDialog } from 'react-native-simple-dialogs';
import ImagePicker from 'react-native-image-picker';
// NativeBase
import {Text} from 'native-base';
//import {CustomHeader} from '../CustomHeader'
import HomeStyle from '../LayoutsStytle/HomeStyle';
import Icon from 'react-native-vector-icons/FontAwesome5';

const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

{/*Register */}
export class MyProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          name: '',
          image_url: '',
          token: '',
          permissionsGranted: false,
        imagePickOptionDialog: false,
        image_uri: '',
        image_type: '',
        image_name: '',
        };
      }

      componentDidMount(){
        AsyncStorage.getItem(ConstValues.user_name, (error, result) =>{

            if(result != null){
                this.setState({name: JSON.parse(result)})
            }
        }).then(
            AsyncStorage.getItem(ConstValues.user_password, (error, result) =>{

                if(result != null){
                    this.setState({image_url: result})
                }
            }).then(
                AsyncStorage.getItem(ConstValues.user_token, (error, result) =>{

                    console.log('user_token: ' + result)

                    if(result != null){
                        this.setState({token: result})
                    }
                }).then(
                    this.timeoutHandle = setTimeout(()=>{
                        // this.getMyFavoriteList()
                     }, 1000)
                )
            )
        )
      }

      onPress = () => {
        var that = this;
        //Checking for the permission just after component loaded
        PermissionsAndroid.requestMultiple(
            [PermissionsAndroid.PERMISSIONS.CAMERA, 
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE]
            ).then((result) => {
              if (result['android.permission.CAMERA']
              && result['android.permission.READ_EXTERNAL_STORAGE']
              && result['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted') {
                  console.log("all permission accepted");
                this.setState({
                  permissionsGranted: true,
                  imagePickOptionDialog: true
                });
              } else if (result['android.permission.CAMERA']
              || result['android.permission.READ_EXTERNAL_STORAGE']
              || result['android.permission.WRITE_EXTERNAL_STORAGE'] === 'never_ask_again') {
                this.refs.toast.show('Please Go into Settings -> Applications -> MatchPics -> Permissions and Allow permissions to continue');
              }
            });
      };
    
      onPressFromGallery = () => {
        this.setState({imagePickOptionDialog: false})
        console.log("gallery will open to select image");
        ImagePicker.launchImageLibrary(options, (response) => {
    
          if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
    
              console.log("image_type: " + response.type);
    
              this.setState({image_uri: response.uri, image_type: response.type, image_name: response.fileName});
              console.log('Image selected: ' + response.uri);
    
            //   this.requestImage();
            }
         
        });
      };
      onPressOpenCamera = () =>{
      this.setState({imagePickOptionDialog: false})
        console.log("camera will open to pick image");
        ImagePicker.launchCamera(options, (response) => {
          // Same code as in above section!
          if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              this.setState({image_uri: response.uri});
              this.setState({image_type: response.type});
              console.log('Image clicked: ' + response.uri);
    
            //   this.requestImage();
            }
        });
      }

  render() {
    return (
        <Fragment>    
           
        <ImageBackground source={require('../Image/profile_bg.png') } style={{width: '100%', height: '100%', paddingRight:0,marginRight:0,backgroundColor:'#f4f4f4'}}   > 
              
                <NB.Container   style={HomeStyle.MyprofileContainer}  >
                    <NB.Header  transparent>
                        <NB.Left>
                            <NB.Button onPress={() => this.props.navigation.navigate('Menu')} transparent>
                              <Icon name="bars"  style={{fontSize:24,color:'#fff', }}  /> 
                            </NB.Button>
                        </NB.Left>

                        <NB.Body  >
                        <NB.Segment style={{backgroundColor:'transparent'}}>
                            <NB.Text style={{color:'#fff',fontSize:23,}}>My Profile    </NB.Text>
                            </NB.Segment>
                        </NB.Body>
                        <NB.Right>
                            <NB.Button transparent>
                            <Icon   onPress={() => this.props.navigation.navigate('Notification')} name={'bell'}  style={{fontSize:24,color:'#fff', }}  light />   
                            </NB.Button>
                        </NB.Right>
                    </NB.Header>

                    <NB.Content >

                        <TouchableOpacity >
                            <NB.View style={{alignItems:'center',justifyContent:'center',marginTop:10,marginBottom:60,}} >
                                <NB.View style={{borderWidth:3,borderColor:'#fff',borderRadius:110,width:219,height:219,overflow:'hidden',}}>

                                <Image style={{width:'100%',height:'100%'}}   source={require('../Image/image_placeholder.png')} />
                            
                                    <NB.View style={{alignItems:'center',justifyContent:'center',marginTop:-33,}} >
                                        <NB.View  style={{alignItems:'center',justifyContent:'center',backgroundColor:'#fff',borderRadius:100,height:35,width:35, }}>
                                            {/* <NB.Icon style={{color:'#b53386'}} name="ios-create"  /> */}
                                         <Icon name={'edit'}  style={{fontSize:16,color:'#b53386', }} solid onPress={this.onPress}/>   
                                        </NB.View>
                                    </NB.View> 
                                
                                </NB.View>
    
                                    <NB.View><NB.Text style={{color:'#94217e',fontSize:21,}}>{this.state.name}</NB.Text></NB.View>
                            </NB.View>
                        </TouchableOpacity>

                        <NB.View style={HomeStyle.UserProfileCard}  >  
                               <ImageBackground source={require('../Image/user_bnt_bg.png') } style={{  }} >

                                        <NB.CardItem style={HomeStyle.UserProfileImages}  >
                                            <NB.Left style={{}}>
                                                
                                                <Icon name={'user-circle'}  style={{color:'#fff',fontSize:21,}}   />   
                                                <NB.Text  style={{color:'#fff',fontSize:21,}} >Profile</NB.Text>
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
                                            
                                                <Icon name={'dice'}  style={{color:'#fff',fontSize:21,}}   />   
                                                <NB.Text  style={{color:'#fff',fontSize:21,}} >Social</NB.Text>
                                            </NB.Left>

                                            <NB.Right>
                                                <NB.Button onPress={() => this.props.navigation.navigate('Social')}  light style={{backgroundColor:'#00a8ff',borderRadius:7,height:35,marginTop:5,}}> 
                                                    <NB.Text style={{color:'#fff',textTransform:'capitalize',fontSize:14}}>Change</NB.Text>
                                                </NB.Button>

                                            </NB.Right>
                                            </NB.CardItem>  
                                 </ImageBackground> 
                            </NB.View>

                            <NB.View style={HomeStyle.UserProfileCard}  >  
                               <ImageBackground source={require('../Image/Location_bnt_bg.png') } style={{  }} >

                                        <NB.CardItem style={HomeStyle.UserProfileImages}  >
                                            <NB.Left style={{}}>
                                            <Icon name={'map-marker-alt'}  style={{color:'#fff',fontSize:21,}}   />  
                                                <NB.Text   style={{color:'#fff',fontSize:21,}} >Location</NB.Text>
                                            </NB.Left>

                                            <NB.Right>
                                                <NB.Button onPress={() => this.props.navigation.navigate('location')}  light style={{backgroundColor:'#f68e1e',borderRadius:7,height:35,marginTop:5,}}> 
                                                    <NB.Text style={{color:'#fff',textTransform:'capitalize',fontSize:14}}>Change</NB.Text>
                                                </NB.Button>

                                            </NB.Right>
                                            </NB.CardItem>  
                                 </ImageBackground> 
                            </NB.View>

                            <NB.View style={HomeStyle.UserProfileCard}  >  
                               <ImageBackground source={require('../Image/Appearance_bnt_background.png') } style={{  }} >

                                        <NB.CardItem style={HomeStyle.UserProfileImages}  >
                                            <NB.Left style={{}}>
                                            <Icon name={'male'}  style={{color:'#fff',fontSize:21,}}   />  
                                                <NB.Text  style={{color:'#fff',fontSize:21,}} >Appearance</NB.Text>
                                            </NB.Left>

                                            <NB.Right>
                                                <NB.Button onPress={() => this.props.navigation.navigate('Appearance')}  light style={{backgroundColor:'#2ed573',borderRadius:7,height:35,marginTop:5,}}> 
                                                    <NB.Text style={{color:'#fff',textTransform:'capitalize',fontSize:14}}>Change</NB.Text>
                                                </NB.Button>

                                            </NB.Right>
                                            </NB.CardItem>  
                                 </ImageBackground> 
                            </NB.View>

                            <Dialog
                                visible={this.state.imagePickOptionDialog}
                                title="Select an option..."
                                onTouchOutside={() => this.setState({imagePickOptionDialog: false})} >
                                <NB.View>
                                    <NB.Text style={{fontSize:20,color:'#000000', marginBottom: 10}}  onPress={this.onPressFromGallery}> Select from Gallery </NB.Text>
                                    <NB.View style={{borderBottomWidth: 1, borderBottomColor:'#9a9a9a'}}></NB.View>
                                    <NB.Text style={{fontSize:20,color:'#000000', marginTop: 10}} onPress={this.onPressOpenCamera}> Open Camera </NB.Text>
                                </NB.View>
                            </Dialog>

                   </NB.Content>

                </NB.Container>
        </ImageBackground> 
      
    </Fragment>
    );
  }
}
{/* End Register */}