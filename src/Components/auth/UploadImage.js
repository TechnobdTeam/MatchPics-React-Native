import React,  { Fragment, Component } from 'react';
import { View, Image, ImageBackground, PermissionsAndroid,AppRegistry, StyleSheet,StatusBar,TouchableOpacity,Dimensions, Platform} from 'react-native';
import * as NB from 'native-base';
import {Root, Toast} from 'native-base';
import { Dialog, ProgressDialog } from 'react-native-simple-dialogs';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationEvents} from 'react-navigation';
// import Toast from 'react-native-toast-native';

// NativeBase
import {Text} from 'native-base';
//import {CustomHeader} from '../CustomHeader'
import HomeStyle from '../LayoutsStytle/HomeStyle';
import ImagePicker from 'react-native-image-picker';
import ConstValues from '../../constants/ConstValues';
import Slider from "react-native-slider";
import {request, PERMISSIONS} from 'react-native-permissions';
// import sliderData from "../Slider/Data.js";

import * as RNIap from 'react-native-iap';

const itemSkus = Platform.select({
  ios: [
    'com.matchpics.coins100'
  ],
  android: [
    'com.matchpics.coins100'
  ]
});

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
export class UploadImage extends React.Component {

  match_type = ''

  constructor(props){
    super(props);
    this.state = {
        resetAction: '',
        showToast: false,
        user_name: "",
        email: "",
        password: "",
        progressVisible: false,
        permissionsGranted: false,
        imagePickOptionDialog: false,
        image_uri: '',
        image_type: '',
        image_name: '',
        user_token: '',
        change_photo_id: '',
        change_photo_url: '',
        progressVisible: false,
        matchTypeData: '',
      };

      this.match_type = ''

      AsyncStorage.getItem(ConstValues.user_token , (error, result) => {

        console.log("logged_in_status:true>>> " + result);

        if(result != null){

          this.setState({user_token: result})

        }
        else{
          console.log("logged_in_status: not logged in" );
        }
      }).then(
        this.timeoutHandle = setTimeout(()=>{
          this.getMatchTypes()
          // this.getAdSettings()
             }, 1000)
      )

      console.log("called---------fdfjdkfjkdjf----------------------------")
  }
//   componentDidMount(){
//     console.log("called-------------------------------------")
// }

  componentDidMount(){

    if(Platform.OS == 'android'){

      StatusBar.setBarStyle( 'light-content',true)
      StatusBar.setBackgroundColor("#e74e92")

    }
  }

  resetValue(){
    console.log("reset value-------------------------------------")
    this.setState({image_uri: '', image_name: '', image_type: '', change_photo_id: '', change_photo_url: '', value: 0})
    this.getMatchTypes();
  }

  getMatchTypes(){

    console.log("getting match types");

    if(Platform.OS == 'android'){

      StatusBar.setBarStyle( 'light-content',true)
      StatusBar.setBackgroundColor("#e74e92")
    }

    var formData = new FormData();
    formData.append('api_key', ConstValues.api_key);

    fetch(ConstValues.base_url + 'getMatchTypes', {
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        // 'Authorization': 'Bearer ' + JSON.parse(this.state.user_token), 
      },
      body: formData
    }).then((response) => response.json())
    .then((responseJson) =>{

        console.log("getMatchTypes: " + responseJson.response);

        this.setState({matchTypeData: responseJson.response.data})

        if(responseJson.response.data == undefined){
            console.log("getMatchTypes: undefined data");
        }
        else{

        }

    })
  }

  onPress = () => {

    if(Platform.OS == 'android'){

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
    }
    else{
      console.log("you are using from iphone")
      this.checkForIOSPermission()
    }
  };

  checkForIOSPermission(){
    console.log("method called")

  //  this.onPressFromGallery()

    request(PERMISSIONS.IOS.CAMERA).then(result => {
      // …
      console.log("result: " + result)

      if(result == 'granted'){
        //user accepted camera permission
        this.setState({
          permissionsGranted: true,
          imagePickOptionDialog: true
        });
      }
      else{
        this.onPressFromGallery()
      }
    });
  }

  onPressFromGallery = () => {
    this.setState({imagePickOptionDialog: false})
    console.log("gallery will open to select image");

    this.timeoutHandle = setTimeout(()=>{

      ImagePicker.launchImageLibrary(options, (response) => {

        if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
  
            console.log("image_type: " + response.type);
  
            console.log("image_name: " + response);
            console.log("image_size: " + response.fileSize);
  
            var name = ''
  
            if(response.fileName == null){
  
              var getFilename = response.uri.split("/");
              name = getFilename[getFilename.length - 1];
            }
            else{
              name = response.fileName
            }
  
            this.setState({image_uri: response.uri, image_type: response.type, image_name: name});
            console.log('Image selected: ' + response.uri);
  
            this.requestImage();
          }
       
        });
         }, 150)

  };
  onPressOpenCamera = () =>{
  this.setState({imagePickOptionDialog: false})
    console.log("camera will open to pick image");

    this.timeoutHandle = setTimeout(()=>{
      
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
  
            this.requestImage();
          }
      });
     }, 500)
  }

  requestImage= () =>{

    this.setState({change_photo_url: '', progressVisible: true});

    console.log("token222: " + JSON.parse(this.state.user_token));
    console.log("image222: " + this.state.image_uri);
    console.log("imagename222: " + this.state.image_name);

    var formData = new FormData();
    formData.append('api_key', ConstValues.api_key);
    formData.append('photo', {
      uri: this.state.image_uri,
      type: this.state.image_type, // or photo.type
      name: this.state.image_name
    });

    fetch(ConstValues.base_url + 'uploadPhoto',{
      method: 'POST',
      headers:{
          'Authorization': 'Bearer ' + JSON.parse(this.state.user_token), 
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
      },
      body: formData
    }).then((response) => response.json())
    .then((responseJson) =>{

      console.log(responseJson.response.code);
      console.log(responseJson.response.message);

      this.setState({progressVisible: false});

      if(responseJson.response.code == 1000){

        console.log("able to save photo: " + responseJson.response.data.photo);
        console.log("able to save change_photo_id: " + responseJson.response.data.change_photo_id);

        this.setState({change_photo_id: responseJson.response.data.change_photo_id,
          change_photo_url: responseJson.response.data.photo});

          this.setState({progressVisible: false});
      }
      else if(responseJson.response.code == 4001){

        //session expired, navigating to login screen

        this.storeData(ConstValues.user_logged_in, false);

        this.storeData(ConstValues.user_email, '');
        this.storeData(ConstValues.user_id, '');
        this.storeData(ConstValues.user_token, '');
        this.storeData(ConstValues.customer_id, '');
        this.storeData(ConstValues.user_name, '');
    
        this.props.navigation.navigate('Login');
        this.updateRaouting();
        this.props.navigation.dispatch(this.state.resetAction);
    }
      else{
         console.log("unable to save photo");
         
      }
  })
  }

  updateRaouting(){

    this.state.resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Login' })],
    });

    console.log("resetAction_value: " + this.state.resetAction);
  }

storeData(key,value) {
    try {
      AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      // saving error
      console.log("saving_error: " + e.message);
    }
  }

  gotoMyMatches(){

    console.log("change_photo_id: ---------" , this.state.change_photo_id);
    console.log("match_type: " + this.match_type);

    if((this.state.change_photo_id == undefined) || (this.state.change_photo_id == '')){

      Toast.show({
        text: "Please select an image and try again!",
        textStyle: { color: "white" },
      });

      // Toast.show("Please select an image and try again!", Toast.LONG, Toast.BOTTOM,style);
    }
    else{

        this.props.navigation.navigate('MyMatches',{
          photo_id: this.state.change_photo_id,
          match_id: this.match_type
      })

    }
  }
  getMatchedUserName(value){

    // var Userindex
    console.log(value | 0)
    console.log("id: " + this.state.matchTypeData[value | 0].id)
    this.match_type = this.state.matchTypeData[value | 0].id;
    console.log("id22: " + this.match_type)
    return this.state.matchTypeData[value | 0].name;
  }

  getAdSettings(){

    var formData = new FormData();
    formData.append('api_key', ConstValues.api_key);
    formData.append('test_mode', ConstValues.ad_test_mode)

    fetch(ConstValues.base_url_settings + 'getAdSettings', {
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + JSON.parse(this.state.user_token), 
      },
      body: formData
    }).then((response) => response.json())
    .then((responseJson) =>{

        console.log("getAdSettings: ");
        console.log(responseJson.response)

        this.storeData(ConstValues.ad_action_type, responseJson.response.action_type)
        this.storeData(ConstValues.ad_data, responseJson.response.data)

    })
  }

  render() {
    const {width, height} = Dimensions.get('window');
    return (
    
      <Root>
        <Fragment> 


        {/* <StatusBar translucent = {true} barStyle="light-content" backgroundColor="#e76995" ></StatusBar> */}
        
       {/* <NB.Container   style={HomeStyle.UplodeprofileContainer}  > */}

       <NavigationEvents    onDidFocus={() => 
         (this.state.change_photo_url != '' || this.state.match_type != '1') ? this.resetValue() : console.log('I am triggered')} />

          <ImageBackground source={require('../Image/background_uplode_images.jpg') } style={{width: '100%', height: '100%', }}   >

          <NB.Container   style={HomeStyle.PageContainer}  >

            <NB.Header   transparent>
              <NB.Left style={{backgroundColor: 'transparent', flex: 0.7}}>
            
                <NB.Button transparent  >
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Menu')}>
                   <Icon name="bars"  style={{fontSize: width * 0.05,color:'#fff', }}  /> 
                </TouchableOpacity>
                </NB.Button>
              
              </NB.Left>

              <NB.Body  >
              {/* <NB.Segment style={{backgroundColor:'transparent',width:"100%",alignContent:"center",alignItems:"center"}}> */}
                  <NB.Text style={{color:'#fff',fontSize: width * 0.05, fontFamily:'OpenSans-Bold'}}>Upload Photo </NB.Text>
                  {/* </NB.Segment> */}
              </NB.Body>
              <NB.Right style={{backgroundColor: 'transparent', flex: 0.7}}>
                <NB.Button  transparent  >
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Notification')} >  
                    <Icon    name={'circle'}  style={{fontSize: width * 0.02,color:'#f70909', position:"absolute",zIndex:9,marginLeft:12,marginTop:-2}}   solid />   
                    <Icon    name={'bell'}  style={{fontSize: width * 0.05,color:'#fff',width:21 }}  light />   
                 </TouchableOpacity>
                </NB.Button>
              </NB.Right>
            </NB.Header> 
           

              <NB.View style={{justifyContent:'center',alignItems:'center',marginTop:20,}}> 

                  {this.state.change_photo_url != '' ? 
                  <NB.View style={{width:230,}} >
                    <NB.Icon name="md-checkmark-circle" style={{color:'#e8e4e7',marginTop:8,position:'absolute',zIndex:999,fontSize:40,}} />
                  </NB.View>
                  :
                  null
                  }

                  <NB.View style={{borderWidth:3,borderColor:'#fff',borderRadius:10,width:250,height:250,overflow:'hidden',}}> 

                    {this.state.change_photo_url == '' ? 
                    <Image style={{width:'100%',height:'100%'}}   source={require('../Image/image_placeholder.png')} />
                    :
                    <Image style={{width:'100%',height:'100%'}}   source={{uri:this.state.change_photo_url} }/>
                    }
                        {/* <Image style={{width:'100%',height:'100%',position:'absolute',zIndex:999,}}   source={require('../Image/user_shap.png')} /> */}
                    </NB.View>

                    <NB.View>
                      <NB.Button style={{backgroundColor:'#fff',borderRadius:50,height:50,justifyContent:'center',alignItems:'center',marginTop:-25,paddingLeft:47,paddingRight:47}} >
                      {this.state.change_photo_url == '' ? 
                            <NB.Text style={{color:'#92207e',fontSize: width * 0.037,fontFamily:'OpenSans-Bold'}} onPress={this.onPress}>upload</NB.Text>
                            :
                            <NB.Text style={{color:'#92207e',fontSize: width * 0.037,fontFamily:'OpenSans-Bold'}} onPress={this.onPress}>change</NB.Text>
                      }
                      </NB.Button>
                    </NB.View>

            </NB.View>

            <NB.View style={{backgroundColor:'#fff',marginTop:90,padding:20,borderRadius:5,marginLeft:12,marginRight:12,}}>
                  
            {(this.state.matchTypeData != undefined && this.state.matchTypeData != '') ?
                  <NB.Text style={{ fontSize: width * 0.037,fontFamily:'OpenSans-Bold',color:'#333333',textTransform:'uppercase',paddingLeft:20}}>Match Type : <NB.Text style={{color:'#b23186',fontSize: width * 0.037,fontFamily:'OpenSans-Bold' }}>{this.getMatchedUserName(this.state.value)} </NB.Text></NB.Text>

              :
              <NB.Text style={{ fontSize:17,color:'#333333',textTransform:'uppercase',paddingLeft:20}}>Match Type : <NB.Text style={{color:'#b23186',fontSize:17,  }}> </NB.Text></NB.Text>
            }
                  <NB.View style={{ }}>
                  {(this.state.matchTypeData != undefined && this.state.matchTypeData != '') ?
                    <View style={styles.container}>
                    <Slider
                      value={this.state.value}
                      onValueChange={value => this.setState({ value })}
                      trackStyle={styles.track}
                       thumbStyle={styles.thumb}
                       minimumValue={0}
                       maximumValue={this.state.matchTypeData.length-1} 
                      minimumTrackTintColor='#92207e'
                      maximumTrackTintColor='#92207e'
                    /> 
                  </View> 
                  :
                  <View style={styles.container}>
                    <Slider
                      value={this.state.value}
                      trackStyle={styles.track}
                       thumbStyle={styles.thumb}
                       minimumValue={0}
                       maximumValue={100} 
                      minimumTrackTintColor='#92207e'
                      maximumTrackTintColor='#92207e'
                    /> 
                  </View> 
                  }
                    </NB.View> 
                     <NB.View style={{justifyContent:'center',alignItems:'center',marginTop:20,marginBottom:10,}}>
                           <NB.Button style={{backgroundColor:'#e74e92',height:50,justifyContent:'center',alignItems:'center',borderRadius:50,paddingLeft:40,paddingRight:40,}}
                           onPress = {() => this.gotoMyMatches()}>
                             <NB.Text style={{fontSize: width * 0.037,fontFamily:'OpenSans-Bold',marginTop:-2}}>continue</NB.Text>
                           </NB.Button>


                     </NB.View>

                     <Dialog
                      dialogStyle={{
                        borderRadius:7,
                        width:300,
                        marginLeft:"9%"
                     }}
                     titleStyle={{
                      textAlign: 'center',
  
                     }}
                      visible={this.state.imagePickOptionDialog}
                      title="Choose Photo"
                      onTouchOutside={() => this.setState({imagePickOptionDialog: false})} >

                        <NB.View style={{height:120,}}>
                            
                            <NB.View style={{flex:1,  justifyContent:"center",alignItems:"center"}}> 

                          

                          <NB.Button  onPress={this.onPressOpenCamera} iconLeft style={{width:225,backgroundColor:"#d0d0d0",paddingLeft:25,justifyContent:"flex-start",alignItems:"center"}}>
                              <NB.Icon name='camera'  style={{fontSize: width * 0.07, color:"#000", }} />
                              <NB.Text style={{fontSize: width * 0.035, color:"#000",textTransform:"capitalize" }}  >Capture Photo</NB.Text>
                            </NB.Button>

                            <NB.Button onPress={this.onPressFromGallery} iconLeft style={{width:225,backgroundColor:"#d0d0d0",marginTop:20,paddingLeft:25,justifyContent:"flex-start",alignItems:"center"}} >
                              <NB.Icon name='image'  style={{fontSize: width * 0.07, color:"#000", }} />
                              <NB.Text style={{fontSize: width * 0.035, color:"#000",textTransform:"capitalize" }}  > Browse  Gallery</NB.Text>
                          </NB.Button>

                  
                                  
                              
                        </NB.View> 
                  </NB.View>


                      {/* <NB.View style={{height:50,}}>
                     
                      <NB.View style={{flex:1, flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                            <NB.View style={{width:80, alignItems: 'center',}}>
                                <TouchableOpacity onPress={this.onPressFromGallery}  > 
                                <Icon    name={'images'}  style={{fontSize:30, color:"#e1e1e1" }}    />  
                                </TouchableOpacity> 
                            </NB.View>
                            <NB.View style={{width:80, alignItems: 'center',}}>
                               <TouchableOpacity onPress={this.onPressOpenCamera} > 
                                <Icon    name={'camera'}  style={{fontSize:30, color:"#e1e1e1" }}   /> 
                                </TouchableOpacity>  
                            </NB.View>
                        </NB.View>
                       
 
                      </NB.View> */}
                  </Dialog>

                  <ProgressDialog
                        visible={this.state.progressVisible}
                        title="Uploading"
                        message="Please, wait..."
                    />
                      
              </NB.View>  
              </NB.Container>
          </ImageBackground>
          {/* </NB.Container> */}
          </Fragment>
      </Root>
    );
  }
}

{/* End Register */}


const styles = StyleSheet.create({
 

    container: {
        margin: 15,
         
        marginBottom:0,
     
       },

    track: {
      height: 5,
      borderRadius: 3, 
      backgroundColor: '#e44c91',
    },

    thumb: {
      width: 20,
      height: 20,
      // shadowColor: '#000',
      backgroundColor: '#fff',
      borderColor: '#cdcd',
      // borderWidth: 1,
      borderRadius: 40 / 2,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      }, 
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      
    }


});

const style={
  backgroundColor: "#000000",
  paddingLeft: 50,
  paddingRight: 50,
  paddingBottom: 10,
  paddingTop: 15,
  height: 120,
  marginBottom: 50,
  color: "#ffffff",
  fontSize: 15,
  lines: 1,
  borderRadius: 15,
  fontWeight: "bold",
};