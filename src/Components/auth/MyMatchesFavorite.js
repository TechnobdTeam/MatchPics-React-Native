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
    FlatList,
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

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    console.log("layout_value: " + layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom)

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

export class MyMatchesFavorite extends React.Component {

    pageNum = 0
 
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
            progressVisibleBottom: false,
            onEndReachedCalledDuringMomentum : false,
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

        this.pageNum = this.pageNum + 1;


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

            this.setState({progressVisibleBottom: false, matchData:  this.pageNum === 1 ? responseJson.response.data : [...this.state.matchData, ...responseJson.response.data], progressVisible: false})

            
            if(responseJson.response.data == undefined){
                console.log("getMyMatchesList: undefined data");
            }

        })
    }

    onEndReached = ({ distanceFromEnd }) => {
        console.log("bottom reached:......................."+ (!this.onEndReachedCalledDuringMomentum ) + " ??? "+this.state.matchData.length)
   
   
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

    renderItem =({ item, index }) => {
        const {width, height} = Dimensions.get('window');
        console.log("items: " + item.match_date)
        var total_match = item.total_match
        return (
            <NB.View style={{marginTop:-2, backgroundColor: 'transparent'}}>
                    <NB.Card   style={{marginTop:-2, backgroundColor: 'red'}}>
                        <NB.CardItem   >
                        <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{marginRight:15,marginLeft:-12,}}>
                        <ImageLoad placeholderSource={require('../Image/image_placeholder.png') } placeholderStyle={{width:80, height: 80,borderRadius: 50,}} borderRadius={50.5}  source={{uri: item.match_photo}} style={{ width:80, height: 80, borderRadius: 50, }} />
                    
                        </View>
                        <View  >
                                <NB.Text  style={{color:"#1c1721",fontSize: width * 0.032,fontFamily:'OpenSans-Semibold'}}>{item.match_date}</NB.Text>
                                <View style={{flex: 1, flexDirection: 'row',marginTop:7, }} >

                                {item.match_result.map((item2,j) => {
                                    console.log("inside loop: " + j);
                                    total_match = total_match - 1;
                                    return <NB.View  key = {index +j}>
                                    {j != 5 ? 
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('UserProfile',{
                                            id: item2.profile_id, from: "MyMatchesFavorite"
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
        );
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
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Menu')} >
                        <Icon name="bars"  style={{fontSize: width * 0.05,color:'#fff', }}  /> 
                        </TouchableOpacity>
                        </NB.Button>
                      </NB.Left>

                      <NB.Body  >
                      <NB.Segment style={{backgroundColor:'transparent',width:"100%",alignItems:"center",justifyContent:"center"}}>
                          <NB.Text style={{color:'#fff',fontSize: width * 0.05,fontFamily:'OpenSans-Regular'}}>My Matches</NB.Text>
                          </NB.Segment>
                      </NB.Body>
                      <NB.Right>
                        <NB.Button transparent>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Notification')}  >
                        <Icon    name={'circle'}  style={{fontSize: width * 0.02,color:'#f70909', position:"absolute",zIndex:9,marginLeft:12,marginTop:-2}}   solid />
                        <Icon name={'bell'}   style={{fontSize: width * 0.05,color:'#fff',width:21, }} solid />   
                        </TouchableOpacity>
                        </NB.Button>
                      </NB.Right>
                    </NB.Header> 
  
                 
                    {/* <NB.Content padder> */}

                  

                    <FlatList
                        data={this.state.matchData}
                        onEndReached={this.onEndReached.bind(this)}
                        onEndReachedThreshold={0.5}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => String(index)}
                    />

                    {/* </NB.Content>  */}
                    {this.state.progressVisible ? 
                    <NB.View style={{flex: 1}}>
                    <NB.Spinner color='#fff' />
                    </NB.View>
                : 
                null}

                {this.state.progressVisibleBottom ? 
                  <NB.Spinner  style={{position: 'absolute',  left: 0, right: 0, bottom: 5, justifyContent: 'center', alignItems: 'center'}} color='#cdcd'  />
                : 
                null}
                </NB.Container> 
                
            </ImageBackground>
            {/* <Dialog
               dialogStyle={{
                backgroundColor:"transparent",
                elevation: 0,
                
                
             }}
                visible={this.state.progressVisible}
                // title="Loading data"
                 message="Please, wait..."
            >

                <NB.Spinner color='#fff' />

            </Dialog> */}

            </Fragment>    
        );
    }
}