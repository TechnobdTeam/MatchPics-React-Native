import React,  { Fragment, Component } from 'react';
import { View, Image, ImageBackground, PermissionsAndroid,AppRegistry, StyleSheet} from 'react-native';
import * as NB from 'native-base';
import {Toast, Root} from 'native-base';
import { Dialog, ProgressDialog } from 'react-native-simple-dialogs';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationEvents} from 'react-navigation';
//import RangeSlider from 'rn-range-slider';

// NativeBase
import {Text} from 'native-base';
//import {CustomHeader} from '../CustomHeader'
import HomeStyle from '../LayoutsStytle/HomeStyle';
import ImagePicker from 'react-native-image-picker';
import ConstValues from '../../constants/ConstValues';
import Slider from "react-native-slider";
// import sliderData from "../Slider/Data.js";

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
             }, 1000)
      )

      console.log("called---------fdfjdkfjkdjf----------------------------")
  }
//   componentDidMount(){
//     console.log("called-------------------------------------")
// }

  resetValue(){
    console.log("reset value-------------------------------------")
    this.setState({image_uri: '', image_name: '', image_type: '', change_photo_id: '', change_photo_url: '', value: 0})
    this.getMatchTypes();
  }

  getMatchTypes(){

    console.log("getting match types");

    var formData = new FormData();
    formData.append('api_key', ConstValues.api_key);

    fetch(ConstValues.base_url + 'getMatchTypes', {
      method: 'POST',
      headers:{
          'Authorization': 'Bearer ' + JSON.parse(this.state.user_token), 
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
      },
      body: formData
    }).then((response) => response.json())
    .then((responseJson) =>{

        console.log("myFavourites: " + responseJson.response.data);

        this.setState({matchTypeData: responseJson.response.data})

        if(responseJson.response.data == undefined){
            console.log("myFavourites: undefined data");
        }
        else{

        }

    })
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

          this.requestImage();
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

          this.requestImage();
        }
    });
  }

  requestImage= () =>{

    this.setState({progressVisible: true});

    console.log("token222: " + JSON.parse(this.state.user_token));
    console.log("image222: " + this.state.image_uri);

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
        //session expired, need to navigate login screen
      }
      else{
         console.log("unable to save photo");
         
      }
  })
  }

  gotoMyMatches(){

    console.log("change_photo_id: ---------" , this.state.change_photo_id);
    console.log("match_type: " + this.match_type);

    if((this.state.change_photo_id == undefined) || (this.state.change_photo_id == '')){

      Toast.show({
        text: "Please select an image and try again!",
        textStyle: { color: "yellow" },
      });
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

  render() {
    return (
      <Root>
        <Fragment> 
       {/* <NB.Container   style={HomeStyle.UplodeprofileContainer}  > */}

       <NavigationEvents onDidFocus={() => 
         (this.state.change_photo_url != '' || this.state.match_type != '1') ? this.resetValue() : console.log('I am triggered')} />

          <ImageBackground source={require('../Image/background_uplode_images.jpg') } style={{width: '100%', height: '100%', }}   >

          <NB.Container   style={HomeStyle.PageContainer}  >

            <NB.Header  transparent>
              <NB.Left>
                <NB.Button transparent onPress={() => this.props.navigation.navigate('Menu')} >
                <Icon name="bars"  style={{fontSize:24,color:'#fff', }}  /> 
                </NB.Button>
              </NB.Left>

              <NB.Body  >
              <NB.Segment style={{backgroundColor:'transparent'}}>
                  <NB.Text style={{color:'#fff',fontSize:23,}}>Upload Photo </NB.Text>
                  </NB.Segment>
              </NB.Body>
              <NB.Right>
                <NB.Button transparent>
                <Icon  onPress={() => this.props.navigation.navigate('Notification')}  name={'bell'}  style={{fontSize:24,color:'#fff', }}  light />   
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
                      <NB.Button style={{backgroundColor:'#fff',borderRadius:50,width:200,height:50,justifyContent:'center',alignItems:'center',marginTop:-25,}} >
                      {this.state.change_photo_url == '' ? 
                            <NB.Text style={{color:'#92207e',fontSize:18,}} onPress={this.onPress}>upload</NB.Text>
                            :
                            <NB.Text style={{color:'#92207e',fontSize:18,}} onPress={this.onPress}>change</NB.Text>
                      }
                      </NB.Button>
                    </NB.View>

            </NB.View>

            <NB.View style={{backgroundColor:'#fff',marginTop:90,padding:20,borderRadius:5,marginLeft:12,marginRight:12,}}>
                  
            {(this.state.matchTypeData != undefined && this.state.matchTypeData != '') ?
                  <NB.Text style={{ fontSize:17,color:'#333333',textTransform:'uppercase',paddingLeft:20}}>Match Type : <NB.Text style={{color:'#b23186',fontSize:17,  }}>{this.getMatchedUserName(this.state.value)} </NB.Text></NB.Text>

              :
              null
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
                  null
                  }
                    </NB.View> 
                     <NB.View style={{justifyContent:'center',alignItems:'center',marginTop:20,marginBottom:10,}}>
                           <NB.Button style={{backgroundColor:'#e74e92',height:50,justifyContent:'center',alignItems:'center',borderRadius:50,width:200}}
                           onPress = {() => this.gotoMyMatches()}>
                             <NB.Text style={{fontSize:17,}}>continue</NB.Text>
                           </NB.Button>


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
      height: 10,
      borderRadius: 3, 
      backgroundColor: '#e44c91',
    },

    thumb: {
      width: 30,
      height: 30,
      shadowColor: '#000',
      backgroundColor: '#fff',
      borderColor: '#cdcd',
      borderWidth: 1,
      borderRadius: 40 / 2,
      shadowOffset: {width: 2, height: 1},
      shadowRadius: 2,
      shadowOpacity: 0.35,
    }


});