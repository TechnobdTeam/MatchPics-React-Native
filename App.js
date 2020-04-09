import React from 'react';
import { Image, Dimensions} from 'react-native';
import { createAppContainer , createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
 // navigation stack
import { createStackNavigator } from 'react-navigation-stack';
import {IMAGE} from './src/constants/Images'
import { createDrawerNavigator } from 'react-navigation-drawer';

import {Termsconditions,DigitalSubscription, MyMatchesFavorite,Appearance,location,justLocation, ForgotPassword,Social,AppSearch,Notification,Chatwindow,MyFavorite,Chatlist, SideMenu, Feed, FeedDetils, Search, SearchDetils, Profile, Setting, Login, Register, Splash,UploadImage, Menu,UserProfile, MyProfile,ProfileEdit,MyMatches} from './src/Components/Index';

import ConstValues from './src/constants/ConstValues';
import AsyncStorage from '@react-native-community/async-storage';

import BackgroundTimer from 'react-native-background-timer';

import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'react-native-admob'

import { InterstitialAdManager } from 'react-native-fbads';

import {
  DeviceEventEmitter,
  NativeAppEventEmitter,
  Platform,
} from 'react-native';

ad_loaded = false
show_ad_profile = true
ad_network = 'admob'
network_type = 'single'
ad_interval = 10000000

const EventEmitter = Platform.select({
  ios: () => NativeAppEventEmitter,
  android: () => DeviceEventEmitter,
})();

const navOptionHandler = (navigation) => ({
  header: null
})

// Feed Detils link
const FeedStack = createStackNavigator({
  feed: {
   screen: Feed,
   navigationOptions: navOptionHandler 
  },
  FeedDetils:{
    screen: FeedDetils,
    navigationOptions: navOptionHandler
  }

})  //  End Feed Detils link

// Search Detils link
const SearchStack = createStackNavigator({
  Search: {
   screen: Search,
   navigationOptions: navOptionHandler 
  },
  SearchDetils:{
    screen: SearchDetils,
    navigationOptions: navOptionHandler
  },
   

}) //  End Feed Detils link



 

 
// Footer Navigator  
// const TabNavigator = createBottomTabNavigator({

const MainTabs = createBottomTabNavigator({
   
  Feed: {
      screen:FeedStack,
      navigationOptions: {
         tabBarLabel: 'Feed',
         tabBarIcon: ({tintColor}) => (
            <Image   
             source={IMAGE.ICON_HOME}
             resizeMode="contain"
             style={{width:20, height:20}} 
            /> 
         ) 
      }
  }, 
  Search: { 
      screen:SearchStack,

      navigationOptions: {
        tabBarLabel: 'Feed',
        tabBarIcon: ({tintColor}) => (
           <Image   
            source={IMAGE.ICON_REPAIR}
            resizeMode="contain"
            style={{width:20, height:20}} 
           /> 
        ) 
     }


  } 
});

const MainStack = createStackNavigator({
   
  Home: {
    screen:MainTabs,
    navigationOptions:navOptionHandler
  },
  Setting: {
    screen:Setting,
    navigationOptions:navOptionHandler
  },
  Profile: {
    screen:Profile,
    navigationOptions:navOptionHandler
  },


}, {initialRouteName: 'Home'})

const appDrawer = createDrawerNavigator(
  {
    drawer:MainStack
  },
  {
    contentComponent: SideMenu,

    drawerWidth: Dimensions.get('window').width * 3/4
  }


)

// Register 

 const authStack = createStackNavigator({
  Splash: {
      screen: Splash,
      navigationOptions:navOptionHandler
   },
   UploadImage: {
    screen: UploadImage,
    navigationOptions:navOptionHandler
  },

  Menu: {
    screen: Menu,
    navigationOptions:navOptionHandler
  },
  UserProfile: {
    screen: UserProfile,
    navigationOptions:navOptionHandler
  },

  ProfileEdit: {
    screen: ProfileEdit,
    navigationOptions:navOptionHandler
  },

  MyProfile: {
    screen: MyProfile,
    navigationOptions:navOptionHandler
  },
  MyMatches: {
    screen: MyMatches,
    navigationOptions:navOptionHandler
  },

  Login: {
    screen: Login,
    navigationOptions:navOptionHandler
  },

 Register: {
    screen: Register,
    navigationOptions:navOptionHandler

   },

   Chatlist: {
    screen: Chatlist,
    navigationOptions:navOptionHandler

   },
   MyFavorite: {
    screen: MyFavorite,
    navigationOptions:navOptionHandler

   },
   Chatwindow: {
    screen: Chatwindow,
    navigationOptions:navOptionHandler

   },
   Notification: {
    screen: Notification,
    navigationOptions:navOptionHandler

   },
   AppSearch: {
    screen: AppSearch,
    navigationOptions:navOptionHandler

   },

   Social: {
    screen: Social,
    navigationOptions:navOptionHandler

   },

   ForgotPassword: {
    screen: ForgotPassword,
    navigationOptions:navOptionHandler 
   },

   location: {
    screen: location,
    navigationOptions:navOptionHandler 
   },
   justLocation: {
    screen: justLocation,
    navigationOptions:navOptionHandler 
   },
   
   Appearance: {
    screen: Appearance,
    navigationOptions:navOptionHandler 
   },
   
   MyMatchesFavorite: {
    screen: MyMatchesFavorite,
    navigationOptions:navOptionHandler 
   },

   Termsconditions: {
    screen: Termsconditions,
    navigationOptions:navOptionHandler 
   },

   DigitalSubscription: {
    screen: DigitalSubscription,
    navigationOptions:navOptionHandler 
   },

  //  Subscriptiontest: {
  //   screen: Subscriptiontest,
  //   navigationOptions:navOptionHandler 
  //  },

 })

 const MainApp = createSwitchNavigator(
    {
      app:appDrawer,
      auth: authStack
    },
    {
      initialRouteName:'auth'
    }

 )

const AppNavigator = createAppContainer(MainApp);



export default class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      user_token: '',
    }
  }

  componentWillUnmount(){

    BackgroundTimer.stop()

  }

  componentDidMount(){

    this.ad_loaded = false
    this.show_ad_profile = true
    this.ad_network = 'admob'

    // BackgroundTimer.start()


    AsyncStorage.getItem(ConstValues.user_token , (error, result) => {

      console.log("logged_in_status:true>>> " + result);

      if(result != null){

        this.setState({user_token: result})
        this.timeoutHandle = setTimeout(()=>{
          this.getAdSettings()
             }, 1000)

      }
      else{
        console.log("logged_in_status: not logged in" );
      }
    }).then(
      
    )

    
  }

  render(){
    return(
       <AppNavigator/>
    )
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

        if(responseJson.response.data != null){

          this.storeData(ConstValues.ad_action_type, responseJson.response.action_type)
          this.storeData(ConstValues.ad_data, responseJson.response.data)

          if(responseJson.response.action_type == "time_based"){

            console.log('will initialize for time based ad')

            console.log('will initialize for time based ad>>>ad network: ' + responseJson.response.data.ad_network )


            this.ad_interval = parseInt(responseJson.response.data.adv_interval) * 1000

            if(responseJson.response.data.ad_network == "both"){
                    
              this.network_type = 'both'
              this.ad_network = 'admob'

              this.initializeTimer()
              this.loadAd()
          }

          else if(responseJson.response.data.ad_network == "admob"){

              this.network_type = 'single'
              this.ad_network = 'admob'
              console.log('after_leaving_chat_details: ad will show>>>admob')

              this.initializeTimer()
              this.loadAd()
          }
          else if(responseJson.response.data.ad_network == "facebook"){

             this.network_type = 'single'
              this.ad_network = 'facebook'
              console.log('after_leaving_chat_details: facebook ad will show>>>admob')
          }

           
          }
          
          
        }
        

        if(responseJson.response.action_type == "action_based"){
          console.log('>>>>>>>>>>>>>>>action based ad will show')
        }

    })
  }

  storeData(key,value) {
    try {
      AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      // saving error
      console.log("saving_error: " + e.message);
    }
  }

  initializeTimer(){

    console.log("ad interval time >>>>> " +  this.ad_interval)
    
    BackgroundTimer.runBackgroundTimer(() => { 
      //code that will be called every 3 seconds 
      // console.log('ad will be shown'),
      this.showAd()
      }, 
      this.ad_interval);

      // BackgroundTimer.start()
  
  }

  requestNewAd(){

    AdMobInterstitial.requestAd().catch(error => error.code == "E_AD_ALREADY_LOADED" ? 
    this.ad_loaded = true : 
    this.ad_loaded = false);
  }

  loadAd(){

    AdMobInterstitial.setAdUnitID(ConstValues.admob_interestitial_ad_id);
    AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]); 
    AdMobInterstitial.addEventListener('adLoaded', () =>{

        this.ad_loaded = true,
        this.show_ad_profile = true
        // this.ad_network = 'admob'
    }
        
        

        // console.log('AdMobInterstitial adLoaded ' + this.ad_loaded),
    );
    AdMobInterstitial.addEventListener('adClosed', () =>
        
        

        // {BackgroundTimer.stop()
        // console.log('AdMobInterstitial adClosed ')

        this.switchNetwork()


          
       

       
    );        

        // console.log('AdMobInterstitial adLeftApplication '),
        

    // AdMobInterstitial.addEventListener('adFailedToOpen', () =>
        

    //     // console.log('AdMobInterstitial adFailedToOpen '),

    //     this.timeoutHandle = setTimeout(()=>{
    //         this.props.navigation.navigate(this.fromScreen)
    //         }, 500),
    // );

    this.requestNewAd()
    
  }

  switchNetwork(){

    console.log("switchNetwork called with>> " + this.ad_network )

    if(this.network_type == 'both'){
      console.log("switchNetwork called inside")
      if(this.ad_network == 'admob'){
        console.log("switchNetwork called setting facebook")
          this.ad_network = 'facebook'
      }
      else{
        console.log("switchNetwork called setting admob")
          this.ad_network = 'admob'
          this.requestNewAd()
      }
  }

  console.log("switchNetwork called: " + this.ad_network)
}

  showAd(){

    // BackgroundTimer.stop()

    console.log('admon ad loaded')
    console.log('admon ad loaded ad_loaded: ' + this.ad_loaded)
    console.log('admon ad loaded show_ad_profile: ' + this.show_ad_profile)
    console.log('admon ad loaded show_ad_network: ' + this.ad_network)

    if(this.show_ad_profile){

        if(this.ad_network == 'admob'){

            if(this.ad_loaded){

              console.log('admon ad loaded')
                AdMobInterstitial.showAd();
            }
           
            else{
              console.log('admon ad not loaded')
            }
        }
        else{
            InterstitialAdManager.showAd(ConstValues.facebook_interstitial_id)
            .then(didClick => {})
            .catch(error => {console.log('facebood_ad_error: ' + error)

            this.switchNetwork()
            
          });
        }

    }
    else{
      
    }
    console.log("network_type: " + this.network_type)

    
  }

}




//export default createAppContainer(MainApp);
//export default createAppContainer(appDrawer);

//export default createAppContainer(TabNavigator);