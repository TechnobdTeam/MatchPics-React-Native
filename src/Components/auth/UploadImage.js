import React,  { Fragment, Component } from 'react';
import { View, Image, ImageBackground, PermissionsAndroid} from 'react-native';
import * as NB from 'native-base';
import { Dialog, ProgressDialog } from 'react-native-simple-dialogs';
//import RangeSlider from 'rn-range-slider';
// NativeBase
import {Text} from 'native-base';
//import {CustomHeader} from '../CustomHeader'
import HomeStyle from '../LayoutsStytle/HomeStyle';
import ImagePicker from 'react-native-image-picker';

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
        image_type: ''
      };
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

          this.setState({image_uri: response.uri});
          this.setState({image_type: response.type});
          this.setState({addAvatarTextVisible: false});
          console.log('Image selected: ' + response.uri);
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
          this.setState({addAvatarTextVisible: false});
          console.log('Image clicked: ' + response.uri);
        }
    });
}

  render() {
    return (
      <Fragment> 

       <ImageBackground source={require('../Image/background_uplode_images.jpg') } style={{width: '100%', height: '100%', }}   >

       <NB.Container   style={HomeStyle.PageContainer}  >

          <NB.Header  transparent>
            <NB.Left>
              <NB.Button transparent onPress={() => this.props.navigation.navigate('Menu')} >
                <NB.Icon name="ios-menu" />
              </NB.Button>
            </NB.Left>

            <NB.Body  >
            <NB.Segment style={{backgroundColor:'transparent'}}>
                <NB.Text style={{color:'#fff',fontSize:23,}}>Upload Photo </NB.Text>
                </NB.Segment>
            </NB.Body>
            <NB.Right>
              <NB.Button transparent>
                <NB.Icon name="md-notifications" />
              </NB.Button>
            </NB.Right>
          </NB.Header> 


            <NB.View style={{justifyContent:'center',alignItems:'center',marginTop:20,}}> 

                <NB.View style={{width:230,}} >
                  <NB.Icon name="md-checkmark-circle" style={{color:'#e8e4e7',marginTop:8,position:'absolute',zIndex:999,fontSize:40,}} />
                </NB.View>

                <NB.View style={{borderWidth:3,borderColor:'#fff',borderRadius:10,width:250,height:250,overflow:'hidden',}}> 
                      <Image style={{width:'100%',height:'100%'}}   source={require('../Image/image_placeholder.png')} />
                      {/* <Image style={{width:'100%',height:'100%',position:'absolute',zIndex:999,}}   source={require('../Image/user_shap.png')} /> */}
                  </NB.View>

                  <NB.View>
                    <NB.Button style={{backgroundColor:'#fff',borderRadius:50,width:200,height:50,justifyContent:'center',alignItems:'center',marginTop:-25,}} >
                          <NB.Text style={{color:'#92207e',fontSize:18,}} onPress={this.onPress}>change</NB.Text>
                    </NB.Button>
                  </NB.View>

            </NB.View>

            <NB.View style={{backgroundColor:'#fff',marginTop:90,padding:20,}}>
                  
                  <NB.Text style={{ fontSize:20,color:'#333333',textTransform:'uppercase',paddingLeft:20}}>Match Type : <NB.Text style={{color:'#b23186',fontSize:20,  }}>semi close </NB.Text></NB.Text>

                  <NB.View style={{  }}>
                    {/* <RangeSlider 
                            style={{ height: 10,marginTop:-30,paddingTop:0,}}
                            gravity={'center'}
                            minValue={0}
                            maxValue={100}
                            step={2}
                            selectionColor="#e64d92"
                            blankColor="#93207e" 
                            /> */}
                     
                    </NB.View> 
                     <NB.View style={{justifyContent:'center',alignItems:'center',marginTop:50}}>
                           <NB.Button style={{backgroundColor:'#e74e92',height:50,justifyContent:'center',alignItems:'center',borderRadius:50,width:200}}>
                             <NB.Text>continue</NB.Text>
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
                      
              </NB.View>
 

            </NB.Container>
        </ImageBackground>
      </Fragment>
    );
  }
}
{/* End Register */}