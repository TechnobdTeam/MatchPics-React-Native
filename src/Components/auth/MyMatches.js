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

export class MyMatches extends React.Component {

    pageNum = 1
 
    constructor(props) {
        super(props);
        this.state = {
            photo_id: '',
            match_type: '',
            email: '',
            password: '',
            token: '',
            columns: 2, 
            matchData: '',
            progressVisible: true ,
            onEndReachedCalledDuringMomentum : false,
            statusBarPaddingTop: isIPhoneX() ? 30 : platform === "ios" ? 20 : 0
        }
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

            if(responseJson.response.data == undefined){
                console.log("myFavourites: undefined data");
            }
            else{
                this.setState({
                    matchData: this.pageNum === 1 ? responseJson.response.data : [...this.state.matchData, ...responseJson.response.data],
                    onEndReachedCalledDuringMomentum: false,
                    progressVisible: false,
                  })
        
                  this.pageNum = this.pageNum + 1;
            }

        })
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
               progressVisible : true ,
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

    render() {
        const { statusBarPaddingTop } = this.state;
        const {width, height} = Dimensions.get('window');

        return (

          <Fragment>   
            <ImageBackground source={require('../Image/background_uplode_images.jpg') } style={{width: '100%', height: '100%', }}   >
 
             <NB.Container   style={HomeStyle.PageContainerMyMatches}  >
                      <NB.Header  transparent>
                      <NB.Left>
                        <NB.Button transparent onPress={() => this.props.navigation.navigate('Menu')} >
                          <TouchableOpacity onPress={() => this.props.navigation.navigate('Notification')} >  
                            <Icon name="bars"  style={{fontSize: width * 0.05,color:'#fff', }}  /> 
                        </TouchableOpacity> 
                        </NB.Button>
                      </NB.Left>

                      <NB.Body  >
                      <NB.Segment style={{backgroundColor:'transparent',width:"100%"}}>
                          <NB.Text style={{color:'#fff',fontSize: width * 0.05,fontFamily:'OpenSans-Regular'}}>My Matches</NB.Text>
                          </NB.Segment>
                      </NB.Body>
                      <NB.Right>
                        <NB.Button transparent>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Notification')}  >
                        <Icon    name={'circle'}  style={{fontSize: width * 0.03,color:'#f70909', position:"absolute",zIndex:9,marginLeft:8}}   solid />
                          <Icon name={'bell'}   style={{fontSize: width * 0.05,color:'#fff', width:21}} solid />   
                        </TouchableOpacity>
                        </NB.Button>
                      </NB.Right>
                    </NB.Header> 

 
                    
                
                {this.state.matchData != undefined ?
                
                <MasonryList
                onEndReached={this.onEndReached.bind(this)}
                onEndReachedThreshold={0.5}
                spacing="2"
                
                backgroundColor="transparent"
                imageContainerStyle={{
                borderRadius: 5, 
                
                }}

                // images={testData}
                images = {this.state.matchData}
                columns={this.state.columns}
                // sorted={true}
                renderIndividualHeader={(data) => {
                    return (
                        <TouchableWithoutFeedback  
                            
                            onPress={() => this.props.navigation.navigate('UserProfile',{
                                id: data.id, from: "MyMatches"
                            })}
                            onPressIn={() => console.log("profile_id: " + data.id)}
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
           
            <Dialog
                visible={this.state.progressVisible}
                // title="Loading data"
                // message="Please, wait..."
                dialogStyle={{
                    backgroundColor:"transparent",
                    elevation: 0,
                    
                    
                 }}
            >

<NB.Spinner color='#fff' />
                </Dialog>
       
                 

                </NB.Container> 
            </ImageBackground>
            </Fragment>    
        );
    }
}