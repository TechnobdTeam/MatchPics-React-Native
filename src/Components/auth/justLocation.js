import React,  { Fragment, Component } from 'react';
import { View, Image, ImageBackground,PermissionsAndroid, Platform, StyleSheet,TouchableOpacity, Dimensions,Alert} from 'react-native';
import * as NB from 'native-base';
// NativeBase
import {Text} from 'native-base';
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
import Toast from 'react-native-toast-native';

import Geolocation from '@react-native-community/geolocation';

import MapView, { Marker, ProviderPropType ,AnimatedRegion} from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import PlacesInput from 'react-native-places-input';


// import flagPinkImg from './marker_icon.png';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
var LATITUDE = '';
var LONGITUDE = '';
var CHANGED_LATITUDE = '';
var CHANGED_LONGITUDE = '';
const LATITUDE_DELTA = 0.0922;
var LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const homePlace = {description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = {description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

{/*Register */}
export class justLocation  extends React.Component {
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
      changed: false
    };
  }


  render() {
    const { country, region } = this.state;    
    const {width, height} = Dimensions.get('window');

    return (
      <View style={{flex: 1, marginTop: 60}}>
        <GooglePlacesAutocomplete
      placeholder='Search'
      minLength={2} // minimum length of text to search
      autoFocus={true}
      fetchDetails={true}
      onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
        console.log(data);
        console.log(details);
      }}
      getDefaultValue={() => {
        return ''; // text input default value
      }}
      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: 'AIzaSyBgnt-53VE5xXbvzq_fnnR-KF_luEZeZ50',
        language: 'en', // language of the results
        types: '(cities)', // default: 'geocode'
      }}
      styles={{
        description: {
          fontWeight: 'bold',
        },
        predefinedPlacesDescription: {
          color: '#1faadb',
        },
      }}

      currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
      currentLocationLabel="Current location"
      nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      GoogleReverseGeocodingQuery={{
        // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
      }}
      // GooglePlacesSearchQuery={{
      //   // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
      //   rankby: 'distance',
      //   types: 'food',
      // }}
      GooglePlacesDetailsQuery={{
          // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
          fields: 'geometry'
      }}

      filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

      predefinedPlaces={[homePlace, workPlace]}

      predefinedPlacesAlwaysVisible={true}
    />
      </View>
       
    );
  }
}
{/* End Register */}

justLocation.propTypes = {
  provider: ProviderPropType,
};

const styles = StyleSheet.create({
 

  container: {
      margin: 15,
      backgroundColor: '#000000',
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