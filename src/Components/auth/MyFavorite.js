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

export class MyFavorite extends React.Component {

    pageNum = 1

    constructor(props) {
        super(props);
        this.state = {
          showToast: false,
          email: '',
          password: '',
          token: '',
          progressVisible: true ,
          progressVisibleBottom: false ,
          favData: '',
          columns: 2, 
          onEndReachedCalledDuringMomentum : false,
          statusBarPaddingTop: isIPhoneX() ? 30 : platform === "ios" ? 20 : 0
        };

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
                        this.getMyFavoriteList()
                     }, 1000)
                )
            )
        )
      }

      getMyFavoriteList(){

        console.log("getting my favorite list");

        var formData = new FormData();
        formData.append('api_key', ConstValues.api_key);
        formData.append('user_name', this.state.email);
        formData.append('password', this.state.password);

        console.log("getting my favorite list token: " + this.state.token);

        fetch(ConstValues.base_url + 'myFavourites', {
            method: 'POST',
            headers:{
                'Authorization': 'Bearer ' + JSON.parse(this.state.token), 
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        }).then((response) => response.json())
        .then((responseJson) =>{

            console.log("myFavourites: " + responseJson.response.data);

            if(responseJson.response.data == undefined){
                console.log("myFavourites: undefined data");
            }
            else{
                this.setState({
                    favData: this.pageNum === 1 ? responseJson.response.data : [...this.state.favData, ...responseJson.response.data],
                    onEndReachedCalledDuringMomentum: false,
                    progressVisible: false,
                    progressVisibleBottom: false
                  })
        
                  this.pageNum = this.pageNum + 1;
            }

        })
      }

      onEndReached = ({ distanceFromEnd }) => {
        console.log("bottom reached:......................."+ (!this.onEndReachedCalledDuringMomentum ) + " ??? "+this.state.favData.length)
        console.log("bottom reached:.......................pagenum"+ this.pageNum)

   
             // if(!this.onEndReachedCalledDuringMomentum ){
               this.onEndReachedCalledDuringMomentum = true;
               console.log("bottom reached:......................."+  this.state.favData.length +" ")
   
               if( this.state.favData.length % 4 === 0){
   
               this.setState(
               {
            //    progressVisible : true ,
               progressVisibleBottom: true,
               onEndReachedCalledDuringMomentum: false
               },
               () => {
                 console.log("bottom reached:......................."+ (!this.onEndReachedCalledDuringMomentum ))
   
   
               this.getMyFavoriteList()
               }
               );
   
               // }
               
               
             }
       }

    render() {
        const { statusBarPaddingTop } = this.state;
        const {width, height} = Dimensions.get('window');

        return (

          <Fragment>   
            <ImageBackground source={require('../Image/background_uplode_images.jpg') } style={{width: '100%', height: '100%', }}   >
 
             <NB.Container   style={HomeStyle.PageContainerMyMatches}  >
                      <NB.Header  transparent>
                      <NB.Left>
                        <NB.Button transparent  >
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Menu')}>
                         <Icon name="bars"  style={{fontSize: width * 0.05,color:'#fff', }}  /> 
                         </TouchableOpacity>
                        </NB.Button>
                      </NB.Left>
                      <NB.Body  >
                      <NB.Segment style={{backgroundColor:'transparent', width:"100%",alignContent:"center",justifyContent:"center"}}>
                          <NB.Text style={{color:'#fff',fontSize: width * 0.05,fontFamily:'OpenSans-Regular'}}>My favourites</NB.Text>
                          </NB.Segment>
                      </NB.Body>
                      <NB.Right>
                        <NB.Button transparent> 
                         <TouchableOpacity onPress={() => this.props.navigation.navigate('Notification')} >
                         <Icon    name={'circle'}  style={{fontSize: width * 0.02,color:'#f70909', position:"absolute",zIndex:9,marginLeft:12,marginTop:-2}}   solid />
                           <Icon name={'bell'}    style={{fontSize: width * 0.05,color:'#fff',width:21 }} solid />   
                         </TouchableOpacity>
                        </NB.Button>
                      </NB.Right>
                    </NB.Header> 

                 <View style={{flex:1}}>

                 {this.state.favData != undefined ?
                
                <MasonryList
                spacing="2"
                onEndReached={this.onEndReached.bind(this)}
                onEndReachedThreshold={0.5}
                backgroundColor="transparent"
                imageContainerStyle={{
                borderRadius: 5, 
               
                
                }}

                // images={testData}
                images = {this.state.favData}
                columns={this.state.columns}
                // sorted={true}
                renderIndividualHeader={(data) => {
                    return (
                        <TouchableWithoutFeedback  
                            
                            onPress={() => this.props.navigation.navigate('UserProfile',{
                                id: data.user_id, from: "MyFavorite"
                            })}
                            onPressIn={() => console.log("profile_id: " + data.user_id)}
                            // onPress={() => Linking.openURL("#")} 
                            >
                        

                    
                            <View style={[styles.masonryHeader, {
                                width: data.masonryDimensions.width,
                                margin: data.masonryDimensions.gutter / 2,
                            

                            }]}>

                            
                            
                            
                                <View style={{flex: 1, }}>
                                    
                                    <View style={{ flex: 1,paddingTop:7,paddingRight:5,alignItems:"flex-end" }} >
                                    {/* <Icon name={'heart'}  style={{fontSize:24,color:'#e41b5b',textAlign:'right', }} solid />   */}
                                    
                                    <Image style={{textAlign:'right'}} source={require('../Image/heart.png')} />
                                </View>
                                    
                                    
                                
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

{this.state.progressVisible ? 
            <NB.View style={{flex: 1}}>
            <NB.Spinner color='#fff' />
            </NB.View>
        : 
        null} 


                     {this.state.progressVisibleBottom ? 
                    //  <View style={{flex:1,backgroundColor:"green",}}>
                         <NB.Spinner  style={{position: 'absolute',  left: 0, right: 0, bottom: 5, justifyContent: 'center', alignItems: 'center',}} color='#fff'  />      
                    // </View> 
                    
                    :
                    null
                    }

             </View>
                   


                </NB.Container> 

                
              
                       
            </ImageBackground>
            </Fragment>    
        );
    }
}