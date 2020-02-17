import React from 'react';
import { Image, Dimensions} from 'react-native';
import { createAppContainer , createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
 // navigation stack
import { createStackNavigator } from 'react-navigation-stack';
import {IMAGE} from './src/constants/Images'
import { createDrawerNavigator } from 'react-navigation-drawer';

import {Notification,Chatwindow,MyFavorite,Chatlist, SideMenu, Feed, FeedDetils, Search, SearchDetils, Profile, Setting, Login, Register, Splash,UploadImage, Menu,UserProfile, MyProfile,ProfileEdit,MyMatches} from './src/Components/Index';

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

   }


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

  render(){
    return(
       <AppNavigator/>
    )
  }
}



//export default createAppContainer(MainApp);
//export default createAppContainer(appDrawer);

//export default createAppContainer(TabNavigator);