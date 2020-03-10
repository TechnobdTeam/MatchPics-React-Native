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
import ImageLoad from 'react-native-image-placeholder';
import Toast from 'react-native-toast-native';

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
          user_image: '',
          image_url: '',
          token: '',
          permissionsGranted: false,
        imagePickOptionDialog: false,
        progressVisible: false,
        image_uri: '',
        image_type: '',
        image_name: '',
        };
      }

      componentDidMount(){
        AsyncStorage.getItem(ConstValues.user_token, (error, result) =>{

            console.log('user_token: ' + result)

            if(result != null){
                this.setState({token: result})
            }
        }).then(
            AsyncStorage.getItem(ConstValues.user_name, (error, result) =>{

                console.log('user_name: ' + result)
    
                if(result != null){
                    this.setState({name: JSON.parse(result)})
                }
            })
            
        ).then(
            AsyncStorage.getItem(ConstValues.user_image, (error, result) =>{

                console.log('user_image: ' + result)
    
                if(result != null){
                    this.setState({user_image: JSON.parse(result)})
                }
            })
            
        ).then(
            this.timeoutHandle = setTimeout(()=>{
                this.getProfileDetails();
                this.getAllProfileDetails();
             }, 1000)
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
    
              this.changeProfilePicture();
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
                this.setState({image_uri: response.uri, image_type: response.type, image_name: response.fileName});
                console.log('Image selected: ' + response.uri);
              console.log('Image clicked: ' + response.uri);
    
              this.changeProfilePicture();
            }
        });
      }

      getProfileDetails(){
        var formData = new FormData();
        formData.append('api_key', ConstValues.api_key);
        formData.append('action_type', "edit");

        fetch(ConstValues.base_url + 'updateCustomerProfile',{
            method: 'POST',
            headers:{
                'Authorization': 'Bearer ' + JSON.parse(this.state.token), 
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
            }).then((response) => response.json())
            .then((responseJson) =>{
    
            console.log(responseJson.response.code);
            console.log(responseJson.response.message);
    
            if(responseJson.response.code == 1000){

                ConstValues.user_info_data = responseJson.response.data ;

                console.log(ConstValues.user_info_data);
                console.log(ConstValues.user_info_data.age);

                this.setState({user_name: ConstValues.user_info_data.full_name, user_image: ConstValues.user_info_data.photo})

            }
            else if(responseJson.response.code == 4001){
                //session expired, need to navigate login screen
            }
            else{
                console.log("unable to save photo");
                
            }
        })
      }

      getAllProfileDetails(){

        var formData = new FormData();
        formData.append('api_key', ConstValues.api_key);

        fetch(ConstValues.base_url + 'getAllProfileDetails',{
            method: 'POST',
            headers:{
                'Authorization': 'Bearer ' + JSON.parse(this.state.token), 
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
            }).then((response) => response.json())
            .then((responseJson) =>{
    
            console.log(responseJson.response.code);
            console.log(responseJson.response.message);
    
            if(responseJson.response.code == 1000){

                ConstValues.profile_all_details = responseJson.response.data ;

                console.log(ConstValues.profile_all_details);
                console.log(ConstValues.profile_all_details.basic);
            }
            else if(responseJson.response.code == 4001){
                //session expired, need to navigate login screen
            }
            else{
                console.log("unable to save photo");
                
            }
        })
      }

      changeProfilePicture(){

        this.setState({progressVisible: true});

        console.log("token222: " + JSON.parse(this.state.token));
        console.log("image222: " + this.state.image_uri);

        var formData = new FormData();
        formData.append('api_key', ConstValues.api_key);
        formData.append('photo', {
        uri: this.state.image_uri,
        type: this.state.image_type, // or photo.type
        name: this.state.image_name
        });

        fetch(ConstValues.base_url + 'changeProfilePhoto',{
        method: 'POST',
        headers:{
            'Authorization': 'Bearer ' + JSON.parse(this.state.token), 
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
        },
        body: formData
        }).then((response) => response.json())
        .then((responseJson) =>{

        console.log(responseJson.response.code);
        console.log(responseJson.response.message);

        this.setState({progressVisible: false});

        // Toast.show({
        //     text: responseJson.response.message,
        //     textStyle: { color: "yellow" },
        //   });

        Toast.show(responseJson.response.message, Toast.LONG, Toast.BOTTOM,style);

        if(responseJson.response.code == 1000){

            console.log(responseJson.response.url); 

            this.setState({user_image: responseJson.response.url,
                progressVisible: false});

        }
        else if(responseJson.response.code == 4001){
            //session expired, need to navigate login screen
        }
        else{
            console.log("unable to save photo");
            
        }
    })
    }

  render() {
    return (
        <NB.Root>
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
                            <NB.Segment style={{backgroundColor:'transparent',width:"100%"}}>
                                <NB.Text style={{color:'#fff',fontSize:23,}}>My Profile</NB.Text>
                                </NB.Segment>
                            </NB.Body>
                            <NB.Right>
                                <NB.Button transparent>
                                <Icon   onPress={() => this.props.navigation.navigate('Notification')} name={'bell'}  style={{fontSize:24,color:'#fff', }}  light />   
                                </NB.Button>
                            </NB.Right>
                        </NB.Header>
    
                        <NB.Content >
    
                            {/* <TouchableOpacity > */}
                                <NB.View style={{alignItems:'center',justifyContent:'center',marginTop:10,marginBottom:60,}} >
                                    <NB.View style={{borderWidth:3,borderColor:'#fff',borderRadius:110,width:219,height:219,overflow:'hidden',}}>
    
                                    {(this.state.user_image == null || this.state.user_image == '') ? 
                                        <Image style={{width:'100%',height:'100%'}}   source={require('../Image/image_placeholder.png')} />
                                        :
                                        <ImageLoad style={{width:'100%',height:'100%'}}   source={{uri: this.state.user_image}} />
                                    }
                                  
                                        <NB.View style={{alignItems:'center',justifyContent:'center',marginTop:-33,}} >
                                        <TouchableOpacity onPress={this.onPress} >
                                            <NB.View  style={{alignItems:'center',justifyContent:'center',backgroundColor:'#fff',borderRadius:100,height:35,width:35, }}>
                                                {/* <NB.Icon style={{color:'#b53386'}} name="ios-create"  /> */} 
                                                <Icon  name={'edit'}  style={{fontSize:16,color:'#b53386', }} solid />   
                                            </NB.View>
                                            </TouchableOpacity> 
                                        </NB.View> 
                                         
                                    </NB.View>
        
                                        <NB.View><NB.Text style={{color:'#94217e',fontSize:21,}}>{this.state.name}</NB.Text></NB.View>
                                </NB.View>
                            {/* </TouchableOpacity> */}
    
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
    
                                <ProgressDialog
                                    visible={this.state.progressVisible}
                                    title="Uploading"
                                    message="Please, wait..."
                                />
    
                        </NB.Content>
    
                    </NB.Container>
            </ImageBackground> 
            
        </Fragment>
        </NB.Root>
    );
  }
}

const style={
    backgroundColor: "#000000",
    width: 400,
    height: Platform.OS === ("ios") ? 50 : 135,
    color: "#ffffff",
    fontSize: 15,
    lineHeight: 2,
    lines: 1,
    borderRadius: 15,
    fontWeight: "bold",
    yOffset: 40
};
{/* End Register */}