import React,  { Fragment, Component } from 'react';
import { View, Image, ImageBackground,PermissionsAndroid, Platform, StyleSheet,TouchableOpacity, Dimensions,Alert} from 'react-native';
import * as NB from 'native-base';
// NativeBase
import {Text, Toast} from 'native-base';
//import {CustomHeader} from '../CustomHeader'
import HomeStyle from '../LayoutsStytle/HomeStyle';
import Icon from 'react-native-vector-icons/FontAwesome5';
import GoogleMapReact from 'google-map-react';
import Slider from "react-native-slider";
import sliderData from "../Slider/Data.js";
import { Dialog, ProgressDialog, ConfirmDialog } from 'react-native-simple-dialogs';
import ConstValues from '../../constants/ConstValues'
import AsyncStorage from '@react-native-community/async-storage';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';

import Geolocation from '@react-native-community/geolocation';

import MapView, { Marker, ProviderPropType ,AnimatedRegion} from 'react-native-maps';


// import flagPinkImg from './marker_icon.png';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
var LATITUDE = 23.78825;
var LONGITUDE = 96.4324;
var CHANGED_LATITUDE = 23.78825;
var CHANGED_LONGITUDE = 96.4324;
const LATITUDE_DELTA = 0.0922;
var LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


{/*Register */}
export class location  extends React.Component {
  map = null;

  constructor(props){
    super(props);
    this.mounted = false;
    this.state = {
      token: '',
      user_location:'',
      location_loaded: false,
      progressVisible: false,
      ready: true,
      location_address:'',
    };
  }

  setLocationMarker(){

    console.log("setLocationMarker: --------------01-------------------")
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      ).then(granted => {
        if (granted && this.mounted) {
          this.watchLocation();
        }
      });
    } else {
      this.watchLocation();
    }


  }

    watchLocation() {

      this.setState({
        location_loaded : false,
      })

      Geolocation.getCurrentPosition(info =>{

        console.log(info)

        if(LATITUDE == "" || LATITUDE == ""){

          LATITUDE =  info.coords.latitude;
          LONGITUDE = info.coords.longitude

          CHANGED_LATITUDE =  info.coords.latitude;
          CHANGED_LONGITUDE = info.coords.longitude
        }
        
        LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

        this.setState({
          location_loaded: true,
          ready: true,
         })

         //Animation camera in mapview
         this.map.animateToRegion({
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }, 500);

        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + LATITUDE + ',' + LONGITUDE + '&key=' + 'AIzaSyB5gomNIxHL9GyBNY3aNWDkdNGXPdsk0DU')
        .then((response) => response.json())
            .then((responseJson) => {

              this.setState({
                location_address: responseJson.results[0].formatted_address
              })

              console.log(responseJson.results[0].formatted_address)

            // alert('error')
            // alert('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson));
        })

      } );

  }

  onMapReady = (e) => {
    if(!this.state.ready) {
      this.setState({ready: true});
    }
  };

  componentDidMount(){
    this.mounted = true;

    AsyncStorage.getItem(ConstValues.user_token, (error, result) =>{

      console.log('token: ' + result)

      if(result != null){
         this.setState({token: result})
      }
    })

    this.setState({user_location: ConstValues.user_info_data.address,
      location_address: ConstValues.user_info_data.address})

      console.log("user_lat: " + ConstValues.user_info_data.user_lat)
      console.log("user_lon: " + ConstValues.user_info_data.user_lon)

      LATITUDE = parseFloat(ConstValues.user_info_data.user_lat)
      LONGITUDE = parseFloat(ConstValues.user_info_data.user_lon)

      CHANGED_LATITUDE = parseFloat(ConstValues.user_info_data.user_lat)
      CHANGED_LONGITUDE = parseFloat(ConstValues.user_info_data.user_lon)

      this.setLocationMarker()

  }

  getMatchedUserName(value){
    // var Userindex
    console.log(value | 0)
    return sliderData[value | 0].id;
  }

  selectCountry (val) {
    this.setState({ country: val });
  }

  selectRegion (val) {
    this.setState({ region: val });
  }

  markerDrop(event){
    //get values of marker
    // let lat = event.lat();
    // let lng = event.lng();
    //insert values to forms
    console.log("lat_lon: " + event.nativeEvent.coordinate.latitude)

    CHANGED_LATITUDE = event.nativeEvent.coordinate.latitude
    CHANGED_LONGITUDE = event.nativeEvent.coordinate.longitude

    fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + event.nativeEvent.coordinate.latitude + ',' + event.nativeEvent.coordinate.longitude + '&key=' + 'AIzaSyB5gomNIxHL9GyBNY3aNWDkdNGXPdsk0DU')
        .then((response) => response.json())
            .then((responseJson) => {

              this.setState({
                location_address: responseJson.results[0].formatted_address
              })
        })

}

updateProfile(){

  this.setState({progressVisible: true})

  var formData = new FormData();
      formData.append('api_key', ConstValues.api_key);
      formData.append('action_type', "update");
      formData.append('address', this.state.location_address);
      formData.append('user_lat', CHANGED_LATITUDE);
      formData.append('user_lon', CHANGED_LONGITUDE);

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

          this.setState({progressVisible: false})

          Toast.show({
            text: responseJson.response.message,
            textStyle: { color: "yellow" },
          })
  
          if(responseJson.response.code == 1000){

              ConstValues.user_info_data = responseJson.response.data ;

              console.log(ConstValues.user_info_data);

              LATITUDE = CHANGED_LATITUDE
              LONGITUDE = CHANGED_LONGITUDE

              this.setState({user_location: ConstValues.user_info_data.address,
                location_address: ConstValues.user_info_data.address})
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
    const { country, region } = this.state;    
    const {width, height} = Dimensions.get('window');

    return (
      <NB.Root>
      <Fragment>    
        <ImageBackground source={require('../Image/background_images.jpg') } style={{width: '100%', height: '100%', }}   > 
          <NB.Container   style={HomeStyle.EditprofileContainer}  >
            <NB.View style={HomeStyle.EditprofilePageView} >
                  <NB.CardItem style={{backgroundColor:'transparent'}} > 
                        
                     <NB.Button  iconRight transparent style={{ }}>
                     <TouchableOpacity onPress={() => this.props.navigation.navigate('MyProfile')}> 
                     <Icon name="long-arrow-alt-left"  style={{fontSize: width * 0.07,color:'#333333',  }}  /> 
                      </TouchableOpacity>    
                      </NB.Button>
                      <NB.Left style={{width:'100%',justifyContent: 'center', alignItems:'center'}}>
                          <NB.Text style={{fontSize: width * 0.08,fontFamily:'OpenSans-Regular',color:'#333333',alignItems:'center',justifyContent:'center'}} > Edit Profile  </NB.Text> 
                         
                      </NB.Left>
                    
                      
                    </NB.CardItem>

                    <View style={{flex: 1, }}>
                        <View style={{flex: 3,}} > 
                        <NB.Item style={{borderBottomWidth:0,}}>
                                <NB.H3 style={{color:'#333333',paddingBottom:8,fontSize: width * 0.039,paddingLeft:15,fontFamily:'OpenSans-Semibold'}}>Location</NB.H3>
                           </NB.Item> 
                                <NB.View style={{backgroundColor:'#fff', }} > 
                                <TouchableOpacity onPress={() => this.setLocationMarker()} >
                                    <NB.CardItem   > 
                                        <NB.Body>
                                            <NB.Text  style={{color:'#333333',textTransform:"uppercase",paddingLeft:3,fontFamily:'OpenSans-Regular',fontSize: width * 0.032,}}>My current location</NB.Text>
                                                {(this.state.user_location == undefined || this.state.user_location == '') ? 
                                                  <NB.Text  style={{color:'#696969',textTransform:"uppercase",paddingLeft:3,fontFamily:'OpenSans-Regular',fontSize: width * 0.032,}}>Set Location</NB.Text>
                                                  :
                                                  <NB.Text  style={{color:'#696969',textTransform:"uppercase",paddingLeft:3,fontFamily:'OpenSans-Regular',fontSize: width * 0.032,}}>{this.state.user_location}</NB.Text>
                                                }
                                            </NB.Body>  
                                        <View >
                                            <Icon name="chevron-right"  style={{color:'#c6c6c6',fontSize: width * 0.039,paddingRight:15,}}  /> 
                                        </View>
                                </NB.CardItem>   
                                </TouchableOpacity>
                                </NB.View>   
  
                
                        </View>
                  <View style={{flex: 8,}} > 

                <View style={styles.container}>

                
                <MapView
                      provider={this.props.provider}
                      ref={ map => { this.map = map }}
                      onMapReady={this.onMapReady}
                      showsMyLocationButton={true}
                      minZoomLevel={16}
                      maxZoomLevel={17}
                      style={styles.map}
                      initialRegion={{
                        latitude: LATITUDE,
                        longitude: LONGITUDE,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                      }}
                      
                      >
                        

                { this.state.location_loaded ? 
                              <MapView.Marker
                                  draggable = {true}
                                  onDragEnd={(e) => this.markerDrop(e)}
                                  coordinate={{latitude: LATITUDE, longitude: LONGITUDE}}
                                  title={"title"}
                                  description={"description"}
                              /> : null }
                               
                </MapView>
                    
                </View>
                       </View>

                      {this.state.location_address != this.state.user_location? 
                      
                        <NB.CardItem>
                        <NB.Body>
                          <NB.Text  style={{color:'#333333',textTransform:"uppercase",paddingLeft:1,}}>Change location to:-</NB.Text>
                          <NB.Text>{this.state.location_address} </NB.Text>
                        </NB.Body>
                      </NB.CardItem>
                      : null
                      }
                        <View style={{flex: 3, backgroundColor: '#f3f3f3',alignItems:"center",justifyContent:"flex-end",marginBottom:15,}} >

                                    <NB.Button  iconRight  style={{backgroundColor:'#1cc875',borderRadius:50,width:'60%',justifyContent: 'center',alignItems:'center',height:58,paddingTop:4,paddingRight:18}}
                                    onPress = {() => this.updateProfile()}>
                                        <NB.Text style={{fontSize:12.77,color:'#ffffff',fontFamily:"OpenSans-Regular",fontSize: width * 0.037,}}>save</NB.Text><Icon name="check"  style={{color:'#fff',fontSize: width * 0.037,}}  /> 
                                    </NB.Button>  
                        </View>
                    </View> 
            
              </NB.View>

              <Dialog
        // title="Confirmation!ss"
       
                message={this.confirmMessage}
                visible={this.state.looking}
                onTouchOutside={() => this.setState({looking: false})}
                dialogStyle={{ 
                    borderRadius:5,
                    
                }

              }
              >
                
            <View>                   
            </View> 
          </Dialog>


            </NB.Container>
          </ImageBackground> 

          <ProgressDialog
                visible={this.state.progressVisible}
                title="Updating"
                message="Please, wait..."
          />

        </Fragment>
      </NB.Root>
       
    );
  }
}
{/* End Register */}

location.propTypes = {
  provider: ProviderPropType,
};

const styles = StyleSheet.create({
 

  container: {
      margin: 15,
       
      marginBottom:0,
   
     },

  track: {
    height: 3,
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
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});
