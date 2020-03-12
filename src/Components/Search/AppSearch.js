import React,  { Fragment, Component } from 'react';
import {
    TouchableOpacity,
    Platform,
    Dimensions,
    Linking,
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback,
    Image,
    ImageBackground,
} from "react-native";
import * as NB from 'native-base';
import MasonryList from "react-native-masonry-list";
import AsyncStorage from '@react-native-community/async-storage';
import ConstValues from '../../constants/ConstValues';
import { Dialog, ProgressDialog } from 'react-native-simple-dialogs';
// import MasonryList from "./src";
import HomeStyle from '../LayoutsStytle/HomeStyle';
import testData from "../../../data";
import Icon from 'react-native-vector-icons/FontAwesome5';
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

 
    rowFrontTop: {
        alignItems: 'center',
        backgroundColor: '#f6f8fb',
        justifyContent: 'center',
        borderBottomWidth:1,
        borderColor:'#CDCD', 
        paddingTop:5,
        paddingBottom:5,
        height:40,
      
        
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

export class AppSearch extends React.Component {
 
    pageNum = 1
    prevText = ''

    state = {
        search: '',
        token: '',
        columns: 2, 
        matchData: '',
        searach_vissible : true,
        progressVisible: false,
        progressVisibleBottom: false ,
        onEndReachedCalledDuringMomentum: false,
        showing_message: 'Type name to search...',
        statusBarPaddingTop: isIPhoneX() ? 30 : platform === "ios" ? 20 : 0
    }


      /// Search //********************** */

  updateSearch = search => {
    this.setState({ search });
  };


  AppSearchView = () => {

    this.pageNum = 1
    this.setState({matchData: '', visible: !this.state.visible })
   }
   

   componentDidMount(){

    this.pageNum = 0

    this.setState({photo_id: '', match_type: ''})

    AsyncStorage.getItem(ConstValues.user_token, (error, result) =>{

        console.log('user_token: ' + result)

        if(result != null){
            this.setState({token: result})
        }
    }).then(
        this.timeoutHandle = setTimeout(()=>{
            this.searchMyMatches()
         }, 1000)
    )
}

   searchMyMatches(text){

    console.log("previous_text: " + this.prevText)
    console.log("previous_text: " + text)

    var query = '';

    if(text == ''){
        console.log("initial state")
        this.prevText = ''
        this.pageNum = 1
        this.setState({
            matchData: '',
            onEndReachedCalledDuringMomentum: false,
            progressVisible: false,
            progressVisibleBottom: false ,
            showing_message: 'Type name to search...'

          })
    }
    else{

        if(text != undefined){

            this.prevText = text
            this.pageNum = 1
        }

        query = this.prevText
    
        console.log("search with " + query);

        var formData = new FormData();
        formData.append('api_key', ConstValues.api_key);
        formData.append('name', query);


        console.log("getting my favorite list token: " + this.state.token);

        fetch(ConstValues.base_url + 'getSearchMyMatches', {
            method: 'POST',
            headers:{
                'Authorization': 'Bearer ' + JSON.parse(this.state.token), 
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        }).then((response) => response.json())
        .then((responseJson) =>{

            console.log("getSearchMyMatches: " + responseJson.response.message);

            // this.setState({matchData: responseJson.response.data, progressVisible: false})

            if(responseJson.response.data == undefined){
                console.log("getSearchMyMatches: undefined data");

                if(this.pageNum == 1){
                    this.setState({showing_message: 'No data found!', matchData: ''})
                }
               
                this.setState({onEndReachedCalledDuringMomentum: false})
            }
            else{

                console.log("data length: " + responseJson.response.data.length)

                if(responseJson.response.data.length == 0){
                    this.setState({showing_message: 'No data found!'})
                }

                this.setState({
                    matchData: this.pageNum === 1 ? responseJson.response.data : [...this.state.matchData, ...responseJson.response.data],
                    onEndReachedCalledDuringMomentum: false,
                    progressVisible: false,
                    progressVisibleBottom: false ,

                  })
        
                  this.pageNum = this.pageNum + 1;
            }

        })
    }
   }

   onEndReached = ({ distanceFromEnd }) => {
    console.log("bottom reached:......................."+ (!this.onEndReachedCalledDuringMomentum ) + " ??? "+this.state.matchData.length)
    console.log("bottom reached:.......................pagenum"+ this.pageNum)


         // if(!this.onEndReachedCalledDuringMomentum ){
           this.onEndReachedCalledDuringMomentum = true;
           console.log("bottom reached:......................."+  this.state.matchData.length +" ")

           if( this.state.matchData.length % 3 === 0){

           this.setState(
           {
            progressVisibleBottom : true ,
           onEndReachedCalledDuringMomentum: false
           },
           () => {
             console.log("bottom reached:......................."+ (!this.onEndReachedCalledDuringMomentum ))


           this.searchMyMatches()
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

             {this.state.visible == false ?
              <NB.Header  transparent>
                <View style={{flex:1,backgroundColor:'#fff',borderRadius:3,paddingTop:7.5,paddingLeft:10,paddingRight:10,height:45,marginTop:3,}}>
                    <NB.Item style={{borderBottomWidth:0,}} >
                                                    
                    <Icon name="search"  style={{fontSize: width * 0.05,color:'#e74e92', }}  />
                    <NB.Input  style={{height:25,padding:0,}} placeholder='Type Here...'
                        onChangeText={(value) => {this.setState({progressVisible: true}), this.searchMyMatches(value)}}
                    />   
                    <TouchableOpacity  onPress={() => this.AppSearchView()}  >
                    <NB.Icon    name="close" style={{fontSize: width * 0.07,color:'#e74e92', }}  />
                    </TouchableOpacity>
                    </NB.Item> 
                    </View>
                </NB.Header>           
                    :
                    <NB.Header  transparent>
                    <NB.Left>
                      <NB.Button  transparent >
                      <TouchableOpacity  onPress={() => this.props.navigation.navigate('Menu')} > 
                         <Icon name="bars"  style={{fontSize: width * 0.05,color:'#fff', }}  /> 
                      </TouchableOpacity>
                      </NB.Button>
                    </NB.Left>

                    <NB.Body  >
                    <NB.Segment style={{backgroundColor:'transparent',width:"100%",alignContent:"center",justifyContent:"center"}}>
                        <NB.Text style={{color:'#fff',fontSize: width * 0.05,fontFamily:'OpenSans-Regular'}}>Search</NB.Text>
                        </NB.Segment>
                    </NB.Body>
                    <NB.Right>
                    <NB.Button transparent>
                      <TouchableOpacity onPress= {() => this.AppSearchView()} >
                          <Icon name={'search'}  style={{fontSize: width * 0.05,color:'#fff', }} solid />   
                      </TouchableOpacity> 
                      </NB.Button>



                      <NB.Button transparent>
                      <TouchableOpacity onPress={() => this.props.navigation.navigate('Notification')} > 
                      <Icon    name={'circle'}  style={{fontSize: width * 0.03,color:'#f70909', position:"absolute",zIndex:9,marginLeft:8}}   solid />
                        <Icon name={'bell'}  style={{fontSize: width * 0.05,color:'#fff',width:21 }} solid />  
                      </TouchableOpacity>  
                      </NB.Button>
                    </NB.Right>
                  </NB.Header> 

  }
                    {/*        
                    <View  style={styles.rowFrontTop}>
                        <View style={{ width:'80%', }}>

                        {this.state.visible == false ?

                          <NB.Item style={{borderBottomWidth:0,}} >
                                
                               <Icon name="search"  style={{fontSize:13,color:'#e74e92', }}  />
                               <NB.Input  style={{height:20,padding:0,}} placeholder='Type Here...'
                                   onChangeText={(value) => {this.searchMyMatches(value)}}
                               />   
                                 <NB.Icon  onPress={() => this.AppSearchView()}    name="close" style={{fontSize:20,color:'#e74e92', }}  />
                          </NB.Item> 
         
                            :

                            <View style={{justifyContent:'center',alignItems:'center',}}>
                            <TouchableOpacity  onPress= {() => this.AppSearchView()}>
                            <NB.Text style={{color:'#e74e92',fontSize:13}} >
                            <Icon name="search"  style={{fontSize:13,color:'#e74e92', }}  />  Search for messages or users</NB.Text>
                            </TouchableOpacity> 
                            </View>

                            }
                              
                          </View> 
                              
                        </View>  */}
                    
                
                        {this.state.matchData != '' ?
                
                <MasonryList
                spacing="2"
                onEndReached={this.onEndReached.bind(this)}
                onEndReachedThreshold={0.5}
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
                                id: data.id, from: "AppSearch"
                            })}
                            onPressIn={() => console.log("profile_id: " + data.id)}
                            // onPress={() => Linking.openURL("#")} 
                            >
                        
                            <View style={[styles.masonryHeader, {
                                width: data.masonryDimensions.width,
                                margin: data.masonryDimensions.gutter / 2,
                            
                            }]}>

                                <View style={{flex: 1, }}>
                                    
                                {/* {data.is_favourite.toLowerCase() == 'yes' ? 
                                    <View style={{ flex: 1,paddingTop:7,paddingRight:5,alignItems:"flex-end" }} >
                                        
                                        <Image style={{textAlign:'right'}} source={require('../Image/heart.png')} />
                                    </View>
                                    :
                                    null
                                } */}
                                    
                                    <View style={{ flex: 1, }} >
                                    <ImageBackground source={require('../Image/matches.png') } style={{width: '100%', height: '100%',  }}  imageStyle={{ borderRadius: 5 }}   >
                                    <View style={{flex: 1, flexDirection: 'row',paddingBottom:10,padding:8,}}>
                                        

                                        <View style={{width:"80%",flexDirection:"column-reverse",}}>
                                            
                                            <Text style={{color:"#fff",fontSize:11,}} >{data.gender}, {data.age} </Text> 
                                            <Text style={{color:"#fff",fontSize:13,}}>{data.name}</Text>  
                                        </View>

                                        <View style={{width:"20%", flexDirection:"column-reverse",}}>
                                        <Icon name={'user-circle'}  style={{fontSize:24,color:'#fff', textAlign:"right"}} solid />  
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
            <NB.Text visible={!this.state.progressVisible} style={{flex: 1, color:'#eaeaea',fontSize:20, textAlign: 'center', textAlignVertical: 'center'}}>{this.state.showing_message} </NB.Text>
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

            {this.state.progressVisibleBottom ? 
                        <NB.Spinner color='#fff'  />
                        :
                        null
                        }
                </NB.Container> 
            </ImageBackground>
            </Fragment>    
        );
    }
}
 