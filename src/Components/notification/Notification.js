import React,  { Fragment, Component } from 'react';
import { Path,View, Image, ImageBackground, FlatList,StyleSheet,Animated , TouchableOpacity, TouchableHighlight,Dimensions} from 'react-native';
import * as NB from 'native-base';
// NativeBase
import HomeStyle from '../LayoutsStytle/HomeStyle';
import {Text, SwipeRow} from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ConstValues from '../../constants/ConstValues';
import AsyncStorage from '@react-native-community/async-storage';
import ImageLoad from 'react-native-image-placeholder';
import { Dialog, ProgressDialog } from 'react-native-simple-dialogs';

{/*Login  */}
export class Notification extends React.Component {

pageNum = 1;
notificationArray = []

  /// Search //********************** */
  constructor(props){
    super(props);
    this.state = {
      search: '',
      progressVisible: true,
      token: '',
      onEndReachedCalledDuringMomentum : false,
    };

    AsyncStorage.getItem(ConstValues.user_token, (error, result) =>{

        console.log('user_token: ' + result)

        if(result != null){
            this.setState({token: result})
        }
    }).then(
        this.timeoutHandle = setTimeout(()=>{
            this.getNotificationList()
          }, 1000)
    )
  }

  getNotificationList(){

    console.log("getting notification list: " + this.pageNum);

    var formData = new FormData();
    formData.append('api_key', ConstValues.api_key);
    formData.append('pageNum', this.pageNum);

    fetch(ConstValues.base_url + 'getNotificationList', {
      method: 'POST',
      headers:{
          'Authorization': 'Bearer ' + JSON.parse(this.state.token), 
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
      },
      body: formData
    }).then((response) => response.json())
    .then((responseJson) =>{

        console.log("getNotificationList: " + responseJson.response.data);

        if(responseJson.response.data == undefined || responseJson.response.data.length == 0){
            console.log("getNotificationList: undefined data");
        }
        else{


          // responseJson.response.data.map((item) =>{
          //   this.notificationArray.push(item)


          // })
          
          this.setState({
            notificationData: this.pageNum === 1 ? responseJson.response.data : [...this.state.notificationData, ...responseJson.response.data],
            onEndReachedCalledDuringMomentum: false,
            progressVisible: false,
          })

          this.pageNum = this.pageNum + 1;
        }

        // this.setState({progressVisible: false})

    })
  }

  updateSearch = search => {
    this.setState({ search });
  };


  example = () => {

    this.setState({ visible: !this.state.visible })
   }


   onEndReached = ({ distanceFromEnd }) => {
     console.log("bottom reached:......................."+ (!this.onEndReachedCalledDuringMomentum ) + " ??? "+this.state.notificationData.length)


          // if(!this.onEndReachedCalledDuringMomentum ){
            this.onEndReachedCalledDuringMomentum = true;
            console.log("bottom reached:......................."+  this.state.notificationData.length +" ")

            if( this.state.notificationData.length % 9 === 0){

            this.setState(
            {
            progressVisible : true ,
            onEndReachedCalledDuringMomentum: false
            },
            () => {
              console.log("bottom reached:......................."+ (!this.onEndReachedCalledDuringMomentum ))


            this.getNotificationList()
            }
            );

            // }
            
            
          }
    }

    renderItem =({ item, index }) => {
      return (
        <View    style={styles.rowFront}>
        <View style={{flex:1,flexDirection: 'row',paddingLeft:70,paddingRight:70,height:84,}}>
            <View style={{justifyContent:'center',alignItems:'center',paddingRight:20,marginLeft:-10}}>
            <TouchableOpacity onPress={() =>this.props.navigation.navigate('UserProfile',{
                                        id: item.user_id, from: "Notification"
                                    })}>
            <ImageLoad placeholderSource={require('../Image/image_placeholder.png') }  placeholderStyle={{width:60, height: 60,borderRadius: 50, }} borderRadius={45.0} style={{zIndex:-1}}  source={{uri: item.url}}  style={{ width:60, height: 60, borderRadius: 37.5 }} />
            </TouchableOpacity>
                {/* <Image source={{uri: item.url}} style={{ width:60, height: 60, borderRadius: 37.5 }} /> */}
            </View>
  
            <View  style={{width:"100%"}}>
            <View style={{flex:1,flexDirection: 'row',justifyContent:"space-between",paddingTop:10}}>
              
            <TouchableOpacity onPress={() =>this.props.navigation.navigate('UserProfile',{
                                        id: item.user_id, from: "Notification"
                                    })}>
                  <Text style={{color:'#e74e92',fontSize:12,fontWeight:"bold",}}>{item.name} </Text>             
            </TouchableOpacity>

              <Text style={{color:'#1c1721',fontSize:11,fontWeight:"bold",}}>{item.create_date}  </Text> 
            </View> 
            <Text  numberOfLines={2}  style={{color:'#1c1721',textAlign:'left',fontSize:14,marginBottom:4,paddingBottom:10}}>{item.notification}  </Text> 
  
              
            </View>
        
        
        </View>
        
        </View> 
      );
    }

    // renderItem = (item)=>{
      

    // }

    render() {
      return ( 
      <View style={{flex: 1, paddingTop:0}}>

      <ImageBackground source={require('../Image/background_images.jpg') } style={{width: '100%', height: '100%', }}   > 
      <NB.Container   style={styles.PageContainerChatList}  >

      <NB.Header  transparent>
        <NB.Left>
          <NB.Button transparent onPress={() => this.props.navigation.navigate('Menu')} >
          <Icon name="bars"  style={{fontSize:24,color:'#fff', }}  /> 
          </NB.Button>
        </NB.Left>

        <NB.Body  >
        <NB.Segment style={{backgroundColor:'transparent'}}>
            <NB.Text style={{color:'#fff',fontSize:23,}}>Notifications </NB.Text>
            </NB.Segment>
        </NB.Body>
        <NB.Right>
          {/* <NB.Button transparent>
          <Icon name={'bell'}  onPress={() => this.props.navigation.navigate('Notification')}  style={{fontSize:24,color:'#fff', }} solid />   
          </NB.Button> */}
        </NB.Right>
      </NB.Header>


      <FlatList
            data={this.state.notificationData}
            onEndReached={this.onEndReached.bind(this)}
            onEndReachedThreshold={0.5}
            renderItem={this.renderItem}
            keyExtractor={({id}, index) => id}
            keyExtractor={item => item.id}
          />


      </NB.Container>

            


</ImageBackground>

          { this.state.isLoading ?   
                    <Loading /> : null 
                }

          </View>
      );
    }
  }
  {/* End Login */}

  const styles={
    PageContainerChatList:{ 
      backgroundColor:'transparent',
      paddingLeft:10,
      paddingRight:10,
      paddingTop:13,
      paddingBottom:15,
  
    },

    rowBack: {
      alignItems: 'center',
      backgroundColor: '#fc5857',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingRight:45,
      paddingLeft:30,
  }, 

  rowFront: {
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderBottomWidth:1,
    borderColor:'#CDCD', 
    paddingTop:5,
    paddingBottom:5,
  
    
},


container: {
  backgroundColor: 'white',
  flex: 1,
},
standalone: {
  marginTop: 30,
  marginBottom: 30,
},
standaloneRowFront: {
  alignItems: 'center',
  backgroundColor: '#CCC',
  justifyContent: 'center',
  height: 50,
},
standaloneRowBack: {
  alignItems: 'center',
  backgroundColor: '#fc5857',
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: 15,
},
backTextWhite: {
  color: '#FFF',
},
 
 
backRightBtn: {
  alignItems: 'center',
  bottom: 0,
  justifyContent: 'center',
  position: 'absolute',
  top: 0,
  width: 98,
   
},
backRightBtnLeft: {
  backgroundColor: '#fc5857',
  right: 0,
},
backRightBtnRight: {
  backgroundColor: '#fc5857',
  right: 0,
},
controls: {
  alignItems: 'center',
  marginBottom: 30,
},
switchContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  marginBottom: 5,
   
},
switch: {
  alignItems: 'center',
  borderColor: 'black',
  paddingVertical: 10,
  width: Dimensions.get('window').width / 4,
  
},
trash: {
  height: 84,
  width: 98,
  justifyContent:'center',
  alignItems:'center',
},
 
backLeftBtn:{
  
 justifyContent:'center',
 alignItems:'center',
 top:0,
 bottom:0,
  position: 'absolute',
  
  width: 98, 
   
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

  };