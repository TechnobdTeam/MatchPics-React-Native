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
import ImageLoad from 'react-native-image-placeholder';

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

export class MyMatchesFavorite extends React.Component {
 
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
            statusBarPaddingTop: isIPhoneX() ? 30 : platform === "ios" ? 20 : 0
        }
    }

    componentDidMount(){

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

        if(this.state.photo_id != ''){

            formData.append('photo_id', this.state.photo_id);
            formData.append('match_type', this.state.match_type);
        }

        console.log("getting my favorite list token: " + this.state.token);

        fetch(ConstValues.base_url + 'getMyMatchesList', {
            method: 'POST',
            headers:{
                'Authorization': 'Bearer ' + JSON.parse(this.state.token), 
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        }).then((response) => response.json())
        .then((responseJson) =>{

            console.log("getMyMatchesList: " + responseJson.response.message);

            this.setState({matchData: responseJson.response.data, progressVisible: false})

            if(responseJson.response.data == undefined){
                console.log("getMyMatchesList: undefined data");
            }

        })
    }

    render() {
        const { statusBarPaddingTop } = this.state;

        return (

          <Fragment>   
            <ImageBackground source={require('../Image/background_uplode_images.jpg') } style={{width: '100%', height: '100%', }}   >
 
             <NB.Container   style={HomeStyle.PageContainerMyMatches}  >
                      <NB.Header  transparent>
                      <NB.Left>
                        <NB.Button transparent onPress={() => this.props.navigation.navigate('Menu')} >
                        <Icon name="bars"  style={{fontSize:24,color:'#fff', }}  /> 
                        </NB.Button>
                      </NB.Left>

                      <NB.Body  >
                      <NB.Segment style={{backgroundColor:'transparent'}}>
                          <NB.Text style={{color:'#fff',fontSize:23,}}>My Matches </NB.Text>
                          </NB.Segment>
                      </NB.Body>
                      <NB.Right>
                        <NB.Button transparent>
                        <Icon name={'bell'}  onPress={() => this.props.navigation.navigate('Notification')}  style={{fontSize:24,color:'#fff', }} solid />   
                        </NB.Button>
                      </NB.Right>
                    </NB.Header> 
  
                 
                    <NB.Content padder>

                    {this.state.matchData != '' ? 
                        this.state.matchData.map((item,i) => {
                            var total_match = item.total_match + 1;
                            console.log("total_match: " + total_match);
                        return  <NB.View key={i}>
                                <NB.Card   style={{marginTop:-2,}}>
                                    <NB.CardItem   >
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                    <View style={{marginRight:15,marginLeft:-12,}}>
                                    <ImageLoad placeholderSource={require('../Image/image_placeholder.png') } placeholderStyle={{width:80, height: 80,borderRadius: 50,}} borderRadius={50.5}  source={{uri: item.match_photo}} style={{ width:80, height: 80, borderRadius: 50, }} />
                                
                                    </View>
                                    <View  >
                                            <NB.Text  style={{color:"#1c1721",fontSize:13,fontWeight:"bold",}}>{item.match_date}</NB.Text>
                                            <View style={{flex: 1, flexDirection: 'row',marginTop:7, }} >

                                            {item.match_result.map((item2,j) => {
                                                console.log("inside loop: " + j);
                                                total_match = total_match - 1;
                                                return <NB.View  key = {i +j}>
                                                {j != 5 ? 
                                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('UserProfile',{
                                                        id: item2.profile_id
                                                    })} > 
                                                    <ImageLoad placeholderSource={require('../Image/image_placeholder.png') } placeholderStyle={{width:45, height: 45,borderRadius: 50}} borderRadius={45.0} source={{uri: item2.result_photo}} style={{ width:45, height: 45, borderRadius: 50 ,marginLeft:1,marginRight:1,}} />
                                                    </TouchableOpacity>
                                                    :
                                                    <View style={{borderRadius:50,marginLeft:2.5,marginRight:2.5,zIndex:9999}} >
                                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('MyMatches' ,{
                                                        photo_id: item.photo_id,
                                                        match_id: item.match_type_id
                                                    })} > 
                                                    <ImageLoad placeholderSource={require('../Image/image_placeholder.png') }  placeholderStyle={{width:45, height: 45,borderRadius: 50, }} borderRadius={45.0} style={{zIndex:-1}}  source={{uri: item2.result_photo}} style={{ width:45, height: 45, borderRadius: 50, }} />
                                                    {total_match > 1 ? 
                                                       
                                                            <NB.Text style={{position:"absolute",fontSize:12,backgroundColor:"rgba(231, 78, 146, 0.6)", width:45, height: 45, borderRadius: 50,color:"#fff",fontWeight:"700",paddingTop:13,textAlign:"center"}}>{"+" + total_match}</NB.Text>
                                                       
                                                        :
                                                        null
                                                    }
                                                    </TouchableOpacity>
                                                    </View>
                                                }
                                                </NB.View>
                                        
                                            })
                                            }

                                        </View>
                                    </View>
                                </View>
                                    </NB.CardItem>
                                </NB.Card>

                             
                        
                        </NB.View> 
                        
                        })
                        :
                    null
                   } 
                    
                    </NB.Content> 


                </NB.Container> 
            </ImageBackground>
            </Fragment>    
        );
    }
}