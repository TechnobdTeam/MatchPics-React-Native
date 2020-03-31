import React,  { Fragment, Component } from 'react';
import { View, Image, ImageBackground, Platform, PermissionsAndroid,TouchableOpacity,Dimensions} from 'react-native';
import * as NB from 'native-base';
import {Toast} from 'native-base';
import DeviceInfo from "react-native-device-info";
import { Dialog, ProgressDialog } from 'react-native-simple-dialogs';
import ImagePicker from 'react-native-image-picker';
// NativeBase
import {Text} from 'native-base';
//import {CustomHeader} from '../CustomHeader'
import HomeStyle from '../LayoutsStytle/HomeStyle';
import { Value } from 'react-native-reanimated'; 
import Icon from 'react-native-vector-icons/FontAwesome5';
import ConstValues from '../../constants/ConstValues';
import AsyncStorage from '@react-native-community/async-storage';
import {request, PERMISSIONS} from 'react-native-permissions';
// import Toast from 'react-native-toast-native';
{/*Register */}

const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

export class Register extends React.Component {

    componentDidMount(){
        console.log("device_info: " + DeviceInfo.getSystemVersion());
    }

    constructor(props){
        super(props);
        this.state = {
            showToast: false,
            user_name: "",
            email: "",
            password: "",
            re_password: "",
            progressVisible: false,
            permissionsGranted: false,
            imagePickOptionDialog: false,
            addAvatarTextVisible: true,
            image_uri: '',
            image_type: '',
            image_name: '',
            email_valid: true
          };
    }

    proceed() {
        alert('You can use the Camera');
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

                console.log("image_type: " + response.type);

                this.setState({image_uri: response.uri});
                this.setState({image_type: response.type});
                this.setState({image_name: name});
                this.setState({addAvatarTextVisible: false});
                console.log('Image selected: ' + response.uri);
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
                var name = ''
      
                if(response.fileName == null){
      
                  var getFilename = response.uri.split("/");
                  name = getFilename[getFilename.length - 1];
                }
                else{
                  name = response.fileName
                }

                console.log("image_type: " + response.type);

                this.setState({image_uri: response.uri});
                this.setState({image_type: response.type});
                this.setState({image_name: name});
                this.setState({addAvatarTextVisible: false});
                console.log('Image selected: ' + response.uri);
                
              }
          });
         }, 500)
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

    //verify user registration process
    verifyUserRegistration(){

        console.log("user_email: " + this.state.email);
        console.log("user_name: " + this.state.user_name);
        console.log("user_password: " + this.state.password);

        if((this.state.user_name == "" ) || (this.state.email == "") || (this.state.password == "") || (this.state.re_password == "")){

          console.log("Please put all info and try again!")
            Toast.show({
                text: "Please put all info and try again!",
                textStyle: { color: "white" },
                buttonText: "Okay"
              })
              // Toast.show("Please put all info and try again!", Toast.LONG, Toast.BOTTOM,style);
        }
        else if(!this.state.email_valid){
          console.log("Please put a valid email and try again!")
            Toast.show({
                text: "Please put a valid email and try again!",
                textStyle: { color: "white" },
                buttonText: "Okay"
              })
              // Toast.show("Please put a valid email and try again!", Toast.LONG, Toast.BOTTOM,style);
        }
        else if(this.state.password != this.state.re_password){
          console.log("Please put same password in both fields.")
            Toast.show({
                text: "Please put same password in both fields.",
                textStyle: { color: "white" },
              })
              // Toast.show("Please put same password in both fields.", Toast.LONG, Toast.BOTTOM,style);
        }
        else{
            //calling api to complete user registration process

            this.setState({progressVisible: true});

            var formData = new FormData();
            formData.append('api_key', ConstValues.api_key);
            formData.append('name', this.state.user_name);
            formData.append('email', this.state.email);
            formData.append('password', this.state.password);
            formData.append('confirm_password', this.state.re_password);
            formData.append('photo', {
                uri: this.state.image_uri,
                type: this.state.image_type, // or photo.type
                name: this.state.image_name
              });

            fetch(ConstValues.base_url + 'userRegistration',{
                method: 'POST',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
                body: formData
            }).then((response) => response.json())
            .then((responseJson) =>{

                console.log(responseJson.response.data);

                this.setState({progressVisible: false});

                if(responseJson.response.code == 1000){
                    Toast.show({
                        text: responseJson.response.message,
                        textStyle: { color: "white" }              
                    })

                    // Toast.show(responseJson.response.message, Toast.LONG, Toast.BOTTOM,style);

                    this.timeoutHandle = setTimeout(()=>{

                         this.props.navigation.navigate('Login')
                }, 700);
                }
                else{
                    this.storeData(ConstValues.user_logged_in, false);
                    Toast.show({
                    text: responseJson.response.message,
                    textStyle: { color: "white" },
          })
                //  Toast.show(responseJson.response.message, Toast.LONG, Toast.BOTTOM,style);
                }
            })
        }
    }

    storeData(key,value) {
        try {
          AsyncStorage.setItem(key, JSON.stringify(value))
        } catch (e) {
          // saving error
          console.log("saving_error: " + e.message);
        }
      }

      validate = (text) => {
        console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
          console.log("Email is Not Correct");
          this.setState({ email_valid: false })
        }
        else {
            this.setState({ email_valid: true })
            console.log("Email is Correct");

            this.checkEmailValidity(text)
        }
      }

      checkEmailValidity(text){
          //api call to check user already exists with email address or not

          var formData = new FormData();
            formData.append('api_key', ConstValues.api_key);
            formData.append('email', text);

            fetch(ConstValues.base_url + 'verifyEmail',{
                method: 'POST',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
                body: formData
            }).then((response) => response.json())
            .then((responseJson) =>{

                console.log(responseJson.response.code);
                console.log(responseJson.response.message);

                console.log(responseJson.response.message)

                if(responseJson.response.code != 1000){

                    this.setState({ email_valid: false })
                    Toast.show({
                        text: responseJson.response.message,
                        textStyle: { color: "white" },
                        })
                    // Toast.show(responseJson.response.message, Toast.LONG, Toast.BOTTOM,style);
                    
                }
                else{
                    this.setState({ email_valid: true })
                }
            })
      }

  render() {
    const {width, height} = Dimensions.get('window');
    return (
        <NB.Root>
        <Fragment>    
      <ImageBackground source={require('../Image/background_images.jpg') } style={{width: '100%', height: '100%', }}   > 
        <NB.Container   style={HomeStyle.RegisterPageContainer}  >
          <NB.View style={HomeStyle.RegisterPageView} >
                <NB.CardItem style={{backgroundColor:'transparent'}} > 
                      
                    <NB.Left style={{width:'100%',justifyContent: 'center', alignItems:'center'}}>
                        <NB.Text style={HomeStyle.SingIn} > Sign Up   </NB.Text> 
                       
                    </NB.Left>
                    <NB.Button iconRight transparent style={{marginTop:-20,marginRight:-18}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                          <NB.Icon    name="close" style={{fontSize:30,color:'#333333', }}  /> 
                         </TouchableOpacity> 
                    </NB.Button>
                    
                  </NB.CardItem>

                  <NB.Content>
                      <NB.Form>
                        
                         <NB.Item style={{borderBottomWidth:0,}}>
                              <NB.H3 style={{color:'#333333',paddingBottom:8,fontSize: width * 0.037,paddingLeft:20,fontFamily:'OpenSans-Bold',}}>User</NB.H3>
                         </NB.Item>
                        <NB.View style={{backgroundColor:'#fff',marginLeft:-2,}} >
                            <NB.Item > 
                                    <NB.Input  style={{paddingLeft:33,height:50,fontSize: width * 0.037,color:"#696969",fontFamily:'OpenSans-Bold',}}   placeholderTextColor="#696969"   placeholder='USER NAME'
                                        onChangeText ={(Value) => this.setState({user_name: Value})}
                                    /> 
                                </NB.Item>
                                <NB.Item >
                                    <NB.Input style={{paddingLeft:33,height:50,fontSize: width * 0.037,color:"#696969",fontFamily:'OpenSans-Bold',}} placeholderTextColor="#696969" placeholder='EMAIL'
                                        onChangeText={(value) => {this.validate(value),this.setState({email: value})}}></NB.Input>
                                   
                                    <NB.Icon name='' style={{color: 'red'}}/>
                                </NB.Item> 

                            </NB.View> 
                            <NB.Item style={{borderBottomWidth:0,}}>
                              <NB.H3 style={{color:'#333333',paddingBottom:8,paddingTop:20,fontSize: width * 0.037,paddingLeft:20,fontFamily:'OpenSans-Bold',}}>Password</NB.H3>
                         </NB.Item>
                        <NB.View style={{backgroundColor:'#fff',marginLeft:-2,}} >
                            <NB.Item  > 
                                    <NB.Input style={{paddingLeft:33,height:50,fontSize: width * 0.037,color:"#696969",fontFamily:'OpenSans-Bold',}} placeholderTextColor="#696969" placeholder='TYPE PASSWORD'
                                        onChangeText={(value) => this.setState({password: value})}
                                        secureTextEntry={true}
                                    /> 
                                    {/* <NB.Icon name='close-circle' /> */}
                                </NB.Item>
                                <NB.Item >
                                    <NB.Input style={{paddingLeft:33,height:50,fontSize: width * 0.037,color:"#696969",fontFamily:'OpenSans-Bold',}} placeholderTextColor="#696969" placeholder='CONFIRM PASSWORD'
                                        onChangeText={(value) => this.setState({re_password: value})}
                                        secureTextEntry={true}
                                    />
                                   
                                </NB.Item> 

                            </NB.View> 

                            <NB.Item style={{borderBottomWidth:0,justifyContent: 'center',alignItems:'center',marginTop:"40%",}}>
                          
                               <NB.View style={{backgroundColor:'#e1e1e1',width:150,height:150,borderRadius:55,alignItems:"center",justifyContent:"center",overflow:"hidden",marginBottom:-8}}  >
                               
                              
                                
                               
                              
                                {!this.state.addAvatarTextVisible ? 
                                <Image style={{width:150,height:150,}} source={{uri: this.state.image_uri}} />
                                
                                : null }

                               {this.state.addAvatarTextVisible ? 
                                  <Image style={{width:100,height:100,marginBottom:-48}} source={require('../Image/profile_img.png')} />
 
                                : null } 

                                </NB.View>
                           
                              
                                    <Icon name="camera"  onPress={this.onPress}  style={{color:'#c6c6c6',fontSize:30,position:"absolute",}}  onPress={this.onPress} />
                                   
                               
                                {/* <NB.View style={{flex:1,}}> 

                                <Icon name="camera"  style={{color:'#c6c6c6',fontSize:25}}  onPress={this.onPress} />
                                </NB.View> */}
                                
                            </NB.Item>

                            <NB.Item style={{borderBottomWidth:0,justifyContent: 'center',alignItems:'center',marginTop:10,marginBottom:10,}} >
                              <NB.Button  iconRight  style={{shadowOpacity: 0,elevation:0,backgroundColor:'#ff1a00',borderRadius:50,justifyContent: 'center',alignItems:'center',height:60,paddingTop:5,paddingLeft:60,paddingRight:60,}}
                              onPress ={() => this.verifyUserRegistration()}>
                                    <NB.Text style={{fontSize:16.92,color:'#ffffff',fontFamily:'OpenSans-Bold',}}>SUBMIT </NB.Text>
                                    {/* <NB.Icon style={{color:'#fff',fontSize:30,}} name='ios-arrow-round-forward' />  */}
                              </NB.Button> 
                           </NB.Item>

                          </NB.Form >



                  </NB.Content>

                  <ProgressDialog
                        visible={this.state.progressVisible}
                        title="Signing up"
                        message="Please wait..."
                    />

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
                  
                     <NB.View style={{height:125,}}>

                     <NB.Button  onPress={this.onPressOpenCamera} iconLeft style={{width:225,backgroundColor:"#d0d0d0",paddingLeft:25,justifyContent:"flex-start",alignItems:"center"}}>
                              <NB.Icon name='camera'  style={{fontSize: width * 0.07, color:"#000", }} />
                              <NB.Text style={{fontSize: width * 0.035, color:"#000",textTransform:"capitalize" }}  >Capture Photo</NB.Text>
                            </NB.Button>

                            <NB.Button onPress={this.onPressFromGallery} iconLeft style={{width:225,backgroundColor:"#d0d0d0",marginTop:20,paddingLeft:25,justifyContent:"flex-start",alignItems:"center"}} >
                              <NB.Icon name='image'  style={{fontSize: width * 0.07, color:"#000", }} />
                              <NB.Text style={{fontSize: width * 0.035, color:"#000",textTransform:"capitalize" }}  > Browse  Gallery</NB.Text>
                          </NB.Button>


                      
                          {/* <NB.View style={{flex:1,  justifyContent:"center",alignItems:"center"}}> 

                           <NB.Button style={{width:220,backgroundColor:"#d0d0d0",alignContent:"center",justifyContent:"center"}} onPress={this.onPressOpenCamera} >
                             <NB.Text style={{fontSize: width * 0.035, color:"#000",textTransform:"capitalize" }} >  <Icon    name={'camera'}  style={{fontSize: width * 0.04, color:"#000" }}   />  Capture Photo</NB.Text>
                          </NB.Button>
            
                                
                          <NB.Button style={{marginTop:20,width:220,backgroundColor:"#d0d0d0",alignContent:"center",justifyContent:"center"}} onPress={this.onPressFromGallery} >
                              <NB.Text  style={{fontSize: width * 0.035, color:"#000",textTransform:"capitalize" }} > <Icon  solid  name={'image'}  style={{fontSize: width * 0.04, color:"#000" }}    />  Browse  Gallery</NB.Text>
                           </NB.Button>
                                
                            
                        </NB.View>  */}
                      </NB.View>

                      {/* <NB.View>
                          <NB.Text style={{fontSize:20,color:'#000000', marginBottom: 10}}  onPress={this.onPressFromGallery}> Select from Gallery </NB.Text>
                          <NB.View style={{borderBottomWidth: 1, borderBottomColor:'#9a9a9a'}}></NB.View>
                          <NB.Text style={{fontSize:20,color:'#000000', marginTop: 10}} onPress={this.onPressOpenCamera}> Open Camera </NB.Text>
                      </NB.View> */}
                  </Dialog>
          
            </NB.View>
          </NB.Container>
        </ImageBackground> 

        </Fragment>
        </NB.Root>
       
    );
  }
}

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
{/* End Register */}