import React,  { Fragment, Component } from 'react';
import {
    Platform,
    Dimensions,
    Linking,
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback,
    Image,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
     
} from "react-native";
import * as NB from 'native-base';
import MasonryList from "react-native-masonry-list";
import { Dialog, ProgressDialog } from 'react-native-simple-dialogs';
// import MasonryList from "./src";
import HomeStyle from '../LayoutsStytle/HomeStyle';
import testData from "../../../data";
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage';
import ConstValues from '../../constants/ConstValues';
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const platform = Platform.OS;
import { StackActions, NavigationActions } from 'react-navigation';

import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
  } from 'react-native-admob'

  import { InterstitialAdManager } from 'react-native-fbads';
  import { AdSettings } from 'react-native-fbads';

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 30;
    console.log("layoutMeasurement.height: " + layoutMeasurement.height)
    console.log("contentOffset.y: " + contentOffset.y)
    console.log("contentSize.height: " + contentSize.height)
    var condition = layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
    console.log("bottom_reach: " + condition)

    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

const styles = StyleSheet.create({
   
    masonryHeader: {
        position: "absolute",
        zIndex: 10, 
        height:"98%", 
        width:"100%",
         
     
         
    },

   
   
 
});

function isIPhoneX() {
    const X_WIDTH = 375;
    const X_HEIGHT = 812;
    
    return (
        Platform.OS === "ios" &&
        ((deviceHeight === X_HEIGHT && deviceWidth === X_WIDTH) ||
        (deviceHeight === X_WIDTH && deviceWidth === X_HEIGHT))
    );
}

ad_loaded = false
show_ad_favorite = 50000
ad_network = ''
network_type = 'single'
show_ad_profile = true

export class MyMatches extends React.Component {

    pageNum = 1
 
    constructor(props) {
        super(props);
        this.state = {
            resetAction: '',
            photo_id: '',
            match_type: '',
            call_api: false,
            email: '',
            password: '',
            token: '',
            columns: 2, 
            matchData: '',
            progressVisible: true ,
            progressVisibleBottom: false ,
            onEndReachedCalledDuringMomentum : false,
            statusBarPaddingTop: isIPhoneX() ? 30 : platform === "ios" ? 20 : 0
        }


        AsyncStorage.getItem(ConstValues.ad_data , (error, result) => {

            console.log("leaving chat_details ad:true>>> " + JSON.parse(result).after_leaving_profile);
    
            if(result != null){
    
                if(JSON.parse(result).after_viewing_my_match != ""){
    
                    console.log('after_chat_details: ad will show')
    
                    this.show_ad_profile = true

                    this.show_ad_favorite = parseInt(JSON.parse(result).after_viewing_my_match)
    
                    if(JSON.parse(result).ad_network == "both"){
                    
                        this.network_type = 'both'
                        this.ad_network = 'admob'

                        this.loadAd()
                    }

                    else if(JSON.parse(result).ad_network == "admob"){
    
                        this.ad_network = 'admob'
                        console.log('after_leaving_chat_details: ad will show>>>admob')
    
                        this.loadAd()
                    }
                    else if(JSON.parse(result).ad_network == "facebook"){
    
                        this.ad_network = 'facebook'
                        console.log('after_leaving_chat_details: facebook ad will show>>>admob')
                    }
                }
                else{
                    console.log('after_leaving_chat_details: ad will not show')
                    this.show_ad_profile = false
                }
    
              
    
            }
            else{
            }
          })
    }

    componentDidMount(){

        this.pageNum = 1;

        this.setState({photo_id: '', match_type: ''})

        AsyncStorage.getItem(ConstValues.user_email, (error, result) =>{

            if(result != null){
                this.setState({email: result})
            }
        }).then(
            AsyncStorage.getItem(ConstValues.user_password, (error, result) =>{

                if(result != null){
                    this.setState({password: result})
                }
            }).then(
                AsyncStorage.getItem(ConstValues.user_token, (error, result) =>{

                    console.log('user_token: ' + result)

                    if(result != null){
                        this.setState({token: result})
                    }
                }).then(
                    this.timeoutHandle = setTimeout(()=>{
                        this.getMatchList()
                     }, 1000)
                )
            )
        )
    }

    getMatchList(){
        if(this.state.photo_id == ''){
            //getting user id passed from previous page

            if(this.props.navigation.state.params){

                this.setState({photo_id: this.props.navigation.state.params.photo_id,
                    match_type: this.props.navigation.state.params.match_id});
    
            }

            console.log("user_match_id: " + this.state.match_type);
            console.log("user_photo_id: " + this.state.photo_id);
        }


        var formData = new FormData();
        formData.append('api_key', ConstValues.api_key);
        formData.append('user_name', this.state.email);
        formData.append('password', this.state.password);
        formData.append('pageNum', this.pageNum);

        if(this.state.photo_id != ''){

            formData.append('photo_id', this.state.photo_id);
            formData.append('match_type', this.state.match_type);
        }

        console.log("getting my favorite list token: " + this.state.token);

        fetch(ConstValues.base_url + 'getMyMatches', {
            method: 'POST',
            headers:{
                'Authorization': 'Bearer ' + JSON.parse(this.state.token), 
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        }).then((response) => response.json())
        .then((responseJson) =>{

            console.log("getMyMatches: " + responseJson.response.message);

            if(responseJson.response.code == 4001){

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
                if(responseJson.response.data == undefined){
                    console.log("myFavourites: undefined data");
                }
                else{
                    this.setState({
                        matchData: this.pageNum === 1 ? responseJson.response.data : [...this.state.matchData, ...responseJson.response.data],
                        onEndReachedCalledDuringMomentum: false,
                        progressVisible: false,
                        progressVisibleBottom: false,
                        call_api: false
                      })
            
                      this.pageNum = this.pageNum + 1;
                }
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

    onEndReached = ({ distanceFromEnd }) => {
        console.log("bottom reached:......................."+ (!this.onEndReachedCalledDuringMomentum ) + " ??? "+this.state.matchData.length)
        console.log("bottom reached:.......................pagenum"+ this.pageNum)

   
             // if(!this.onEndReachedCalledDuringMomentum ){
               this.onEndReachedCalledDuringMomentum = true;
               console.log("bottom reached:......................."+  this.state.matchData.length +" ")
   
               if( this.state.matchData.length % 4 === 0){
   
               this.setState(
               {
               progressVisibleBottom : true ,
               onEndReachedCalledDuringMomentum: false
               },
               () => {
                 console.log("bottom reached:......................."+ (!this.onEndReachedCalledDuringMomentum ))
   
   
               this.getMatchList()
               }
               );
   
               // }
               
               
             }
       }

       loadAd(){

        AdMobInterstitial.setAdUnitID(ConstValues.admob_interestitial_ad_id);
        AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]); 
        AdMobInterstitial.addEventListener('adLoaded', () =>
            
            this.ad_loaded = true,
    
            console.log('AdMobInterstitial adLoaded ' + this.ad_loaded),
        );
        AdMobInterstitial.addEventListener('adClosed', () =>
            
            // console.log('AdMobInterstitial adClosed '),
    
            this.requestNewAd()
    
           
        );
        AdMobInterstitial.addEventListener('adLeftApplication', () =>
            
    
            // console.log('AdMobInterstitial adLeftApplication '),
    
            this.timeoutHandle = setTimeout(()=>{
                this.props.navigation.navigate(this.fromScreen)
                }, 500),
        );
    
        // AdMobInterstitial.addEventListener('adFailedToOpen', () =>
            
    
        //     // console.log('AdMobInterstitial adFailedToOpen '),
    
        //     this.timeoutHandle = setTimeout(()=>{
        //         this.props.navigation.navigate(this.fromScreen)
        //         }, 500),
        // );
    
        AdMobInterstitial.requestAd().catch(error => error.code == "E_AD_ALREADY_LOADED" ? 
        this.ad_loaded = true : 
        this.ad_loaded = false);
      }

      requestNewAd(){

        AdMobInterstitial.requestAd().catch(error => error.code == "E_AD_ALREADY_LOADED" ? 
        this.ad_loaded = true : 
        this.ad_loaded = false);
      }

      showAd(userid){

        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>method called ' + userid )

        if(this.show_ad_profile){
    
            if(this.ad_network == 'admob'){
    
                if(this.ad_loaded){
    
                    AdMobInterstitial.showAd();
                }
                else{
                    // this.props.navigation.navigate(this.fromScreen)
                }
            }
            else{
                InterstitialAdManager.showAd(ConstValues.facebook_interstitial_id)
                .then(didClick => {})
                .catch(error => {console.log('facebood_ad_error: ' + error)
            });
            }
    
        }
        else{
        }

        if(this.network_type == 'both'){
            if(this.ad_network == 'admob'){
                this.ad_network = 'facebook'
            }
            else{
                this.ad_network = 'admob'
            }
        }
        
        this.timeoutHandle = setTimeout(()=>{
            this.props.navigation.navigate('UserProfile',{
                id: userid, from: "MyMatches"
                })
         }, 1500)
    }

    render() {
        const { statusBarPaddingTop } = this.state;
        const {width, height} = Dimensions.get('window');

        return (

          <Fragment>   
            <ImageBackground source={require('../Image/background_uplode_images.jpg') } style={{width: '100%', height: '100%', }}   >
 
             <NB.Container   style={HomeStyle.PageContainerMyMatches}>
                      <NB.Header  transparent>
                      <NB.Left style={{flex: 0.7}}>
                        <NB.Button transparent onPress={() => this.props.navigation.navigate('Menu')} >
                          <TouchableOpacity onPress={() => this.props.navigation.navigate('Menu')} >  
                            <Icon name="bars"  style={{fontSize: width * 0.05,color:'#fff', }}  /> 
                        </TouchableOpacity> 
                        </NB.Button>
                      </NB.Left>

                      <NB.Body  >
                      {/* <NB.Segment style={{backgroundColor:'transparent',width:"100%",alignItems:"center",justifyContent:"center"}}> */}
                          <NB.Text style={{color:'#fff',fontSize: width * 0.05,fontFamily:'OpenSans-Bold'}}>My Matches</NB.Text>
                          {/* </NB.Segment> */}
                      </NB.Body>
                      <NB.Right style={{flex: 0.7}}>
                        <NB.Button transparent>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Notification')}  >
                        <Icon    name={'circle'}  style={{fontSize: width * 0.02,color:'#f70909', position:"absolute",zIndex:9,marginLeft:12,marginTop:-2}}   solid />
                          <Icon name={'bell'}   style={{fontSize: width * 0.05,color:'#fff', width:21}} solid />   
                        </TouchableOpacity>
                        </NB.Button>
                      </NB.Right>
                    </NB.Header> 

 
                <ScrollView
                    onScroll={({nativeEvent}) => {
                    if (isCloseToBottom(nativeEvent)) {
                        // enableSomeButton();
                        if(!this.state.call_api){
                            this.setState({progressVisibleBottom: true, call_api: true})
                            
                            this.timeoutHandle = setTimeout(()=>{
                                this.getMatchList()
                            }, 200)
                        }
                        
                    }
                    }}
                    scrollEventThrottle={400}>
                {this.state.matchData != undefined ?
                
                <MasonryList
                // onEndReached={this.onEndReached.bind(this)}
                // onEndReachedThreshold={0.5}
                spacing="2"
                
                backgroundColor="transparent"
                imageContainerStyle={{
                borderRadius: 5, 
                
                }}

                // images={testData}
                images = {this.state.matchData}
                columns={this.state.columns}
                // sorted={true}
                renderIndividualHeader={(data, index) => {

                    return (
                            <TouchableWithoutFeedback  
                            
                            // onPress={() => this.props.navigation.navigate('UserProfile',{
                            //     id: data.id, from: "MyMatches"
                            // })}
                            onPressIn={() => {{{ConstValues.my_match_view % this.show_ad_favorite == 0 ? this.showAd(data.id) : this.props.navigation.navigate('UserProfile',{
                                id: data.id, from: "MyMatches"
                                })}} console.log("profile_id: " + data.id),
                                ConstValues.my_match_view = ConstValues.my_match_view + 1,
                                console.log('favorite_view_count: ' + this.show_ad_favorite)}}
                            // onPress={() => Linking.openURL("#")} 
                            >
                        

                    
                            <View style={[styles.masonryHeader, {
                                width: data.masonryDimensions.width,
                                margin: data.masonryDimensions.gutter / 2,
                            

                            }]}>
                            
                                <View style={{flex: 1, }}>

                                {data.is_favourite.toLowerCase() == 'yes' ? 
                                    <View style={{ flex: 1,paddingTop:7,paddingRight:5,alignItems:"flex-end" }} >
                                        {/* <Icon name={'heart'}  style={{fontSize:24,color:'#e41b5b',textAlign:'right', }} solid />   */}
                                        
                                        <Image style={{textAlign:'right'}} source={require('../Image/heart.png')} />
                                    </View>
                                    :
                                    null
                                }
                                    
                                    <View style={{ flex: 1, }} >
                                    <ImageBackground source={require('../Image/matches.png') } style={{width: '100%', height: '100%',  }}  imageStyle={{ borderRadius: 5 }}   >
                                    <View style={{flex: 1, flexDirection: 'row',paddingBottom:10,padding:8,}}>
                                        

                                        <View style={{width:"80%",flexDirection:"column-reverse",}}>
                                            
                                            <Text style={{color:"#fff",fontSize: width * 0.027,}} >{data.gender}, {data.age} </Text> 
                                            <Text style={{color:"#fff",fontSize: width * 0.032,}}>{data.name}</Text>  
                                        </View>

                                        <View style={{width:"20%", flexDirection:"column-reverse",}}>
                                        <Icon name={'user-circle'}  style={{fontSize: width * 0.052,color:'#fff', textAlign:"right"}} solid />  
                                        </View> 

                                    </View>
                                    </ImageBackground>
                                    </View>

                                </View>

                                
                            </View>
                        


                        </TouchableWithoutFeedback>
                    );
                }}
            />
            :
            <NB.Text visible={!this.state.progressVisible} style={{flex: 1, color:'#eaeaea',fontSize:20, textAlign: 'center', textAlignVertical: 'center'}}>No data found! </NB.Text>
            }

            {this.state.progressVisibleBottom ? 
                    <NB.Spinner  color='#fff'  />
                        :
                        null
                        }

                </ScrollView>
                
           {this.state.progressVisible ? 
                    <NB.View style={{flex: 1,}}>
                    <NB.Spinner color='#fff' />
                    </NB.View>
                : 
                null}



            {/* <Dialog
                visible={this.state.progressVisible}
                // title="Loading data"
                // message="Please, wait..."

               
                dialogStyle={{
                    backgroundColor:"transparent",
                    elevation: 0,
                    
                    
                 }}
            >

<NB.Spinner color='#fff' />
                </Dialog> */}

                </NB.Container> 
            </ImageBackground>
            </Fragment>    
        );
    }
}