import React,  { Fragment, Component } from 'react';
import { View, Image, ImageBackground, Clipboard, StyleSheet, TouchableOpacity,ViewPropTypes, Platform,} from 'react-native';
import * as NB from 'native-base';
// NativeBase
import HomeStyle from '../LayoutsStytle/HomeStyle';
import {Text, SwipeRow} from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import Data from "./Data";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { GiftedChat , MessageText, MessageImage, Time, utils ,Bubble } from 'react-native-gifted-chat';
const { isSameUser, isSameDay } = utils;
import ConstValues from '../../constants/ConstValues';
import AsyncStorage from '@react-native-community/async-storage';

{/*Login  */}
export class Chatwindow extends React.Component {  
   
  constructor(props) {
    super(props);
      this.state = {
          messages: [],
          user_name: '',
          user_id: '',
          message_id: '',
          token: '',
          customer_id: ''
        }
    }
    
    componentDidMount() {
      this.setState({
        // messages: [
        //   {
        //     _id: 1,
        //     text: 'Hello developer',
        //     createdAt: new Date(),
        //     user: {
        //       _id: 2,
        //       name: 'React Native',
        //       avatar: 'https://placeimg.com/140/140/any',
        //     },
            
        //   },
        // ],
      })

      AsyncStorage.getItem(ConstValues.customer_id, (error, result) =>{

        console.log('customer_id: ' + JSON.parse(result))

        if(result != null){
            this.setState({customer_id: JSON.parse(result)})
        }
      })

      AsyncStorage.getItem(ConstValues.user_token, (error, result) =>{

        console.log('user_token: ' + result)

        if(result != null){
            this.setState({token: result})
        }
      }).then(
          this.timeoutHandle = setTimeout(()=>{
            if(this.state.user_name == ''){
              //getting user id passed from previous page
              this.setState({user_name: this.props.navigation.state.params.name,
                user_id: this.props.navigation.state.params.user_id,
                message_id: this.props.navigation.state.params.id});
      
              console.log("user_name: " + this.state.user_id);

              this.getPreviousConversation();
            }
          }, 500)
      )
    }
    
      onSend(messages = []) {

        console.log("send_message: " + messages[0].text)

        var formData = new FormData();
        formData.append('api_key', ConstValues.api_key);
        formData.append('user_id', this.state.user_id);
        formData.append('message', messages[0].text);

        fetch(ConstValues.base_url + 'sendMessage', {
          method: 'POST',
          headers:{
              'Authorization': 'Bearer ' + JSON.parse(this.state.token), 
              'Accept': 'application/json',
              'Content-Type': 'multipart/form-data',
          },
          body: formData
        }).then((response) => response.json())
        .then((responseJson) =>{

            if(responseJson.response.data == undefined){
                console.log("getPreviousConversation: undefined data");
            }else{
              console.log("sendMessage: " + responseJson.response.message);
              // this.setState({messages: responseJson.response.data})

              if(responseJson.response.code == 1000){

                this.setState(previousState => ({
                  messages: GiftedChat.append(previousState.messages, messages),
                }))
              }

            }

        })
      }
      renderBubble (props) {
        return (
          <Bubble
            {...props}
           
            textStyle={{
              right: {
                color: "#fff",
              },
              left: {
                color: "#757983",
              }
            }}
            wrapperStyle={{
              right: {
                backgroundColor:'#e74e92'
              },
              left: {
                backgroundColor:'#edf0f7'
              }

            }}


          />
        )
      }

      

      // renderSend = (sendProps) => {
      //   if (sendProps.text.trim().length > 0) {
      //     return (
      //       <TouchableOpacity>
      //          <Icon name={'bell'}  style={{fontSize:24,color:'red', }} solid /> 
      //       </TouchableOpacity>
      //     );
      //   }
      //   return null;
      // } 

      
      renderSend(props) {
        return (
          <TouchableOpacity onPress={() => props.onSend({text: props.text})}>
            <Text style={{ marginBottom:12}}><Icon name={'paper-plane'}  style={{fontSize:24,color:'#e74e92'}} solid />  </Text>
          </TouchableOpacity>
        );
      }
      
 
      getPreviousConversation(){

        console.log("getPreviousConversation");

        var formData = new FormData();
        formData.append('api_key', ConstValues.api_key);
        formData.append('user_id', this.state.user_id);

        fetch(ConstValues.base_url + 'getPreviousConversation', {
          method: 'POST',
          headers:{
              'Authorization': 'Bearer ' + JSON.parse(this.state.token), 
              'Accept': 'application/json',
              'Content-Type': 'multipart/form-data',
          },
          body: formData
        }).then((response) => response.json())
        .then((responseJson) =>{

            if(responseJson.response.data == undefined){
                console.log("getPreviousConversation: undefined data");
            }else{
              console.log("getPreviousConversation: " + responseJson.response.data);
              // this.setState({messages: responseJson.response.data})

              var responseMessage = []

              responseJson.response.data.map((item) => {
                
                console.log("getPreviousConversation: " + item.message);

                var userObject = {}

                userObject['_id'] = parseInt(item.user_id)
                userObject['name'] = item.name
                userObject['avatar'] = item.url

                console.log("user info object: " + userObject._id);

                responseMessage.push({
                  ['_id']: item.message_id,
                  ['text']: item.message,
                  ['createdAt']: item.created_at,
                  ['user']: userObject
                })
              })

              responseMessage.map((item) => {
                console.log("response message: " + item._id);
              })

              this.setState({messages: responseMessage})
            }

        })
      }

    render() {   
      return ( 

        <Fragment>
           <ImageBackground source={require('../Image/background_images.jpg') } style={{width: '100%', height: '100%', }}   > 
                   <NB.Header  transparent>
                      <NB.Left>
                         <NB.Button transparent onPress={() => this.props.navigation.navigate('Menu')} >
                         <Icon name="bars"  style={{fontSize:24,color:'#fff', }}  /> 
                        </NB.Button>
                      </NB.Left>

                     <NB.Body  >
                      <NB.Segment style={{backgroundColor:'transparent'}}>
                           <NB.Text style={{color:'#fff',fontSize:23,}}> {this.state.user_name}   </NB.Text>
                          </NB.Segment>
                       </NB.Body>
                      <NB.Right>
                         <NB.Button transparent>
                         <Icon name={'bell'}  style={{fontSize:24,color:'#fff', }} solid /> 
                        </NB.Button>
                      </NB.Right>
                    </NB.Header> 
              
                    <View style={{ backgroundColor: "#fff",flex: 1 }}>
                   <GiftedChat
                      messages={this.state.messages}
                      onSend={messages => this.onSend(messages)}
                      renderSend={this.renderSend}
                      
                      user={{
                        _id: this.state.customer_id, 
                      }} 
                       
                    />
           
                </View>
                 

       </ImageBackground>
      </Fragment>            



//         <Fragment>    
//          <ImageBackground source={require('../Image/background_images.jpg') } style={{width: '100%', height: '100%', }}   > 
               
//                   <NB.Container   style={HomeStyle.PageContainer}  >
//                     <NB.Header  transparent>
//                       <NB.Left>
//                           <NB.Button transparent onPress={() => this.props.navigation.navigate('Menu')} >
//                           <NB.Icon name="ios-menu" />
//                         </NB.Button>
//                       </NB.Left>

//                       <NB.Body  >
//                       <NB.Segment style={{backgroundColor:'transparent'}}>
//                           <NB.Text style={{color:'#fff',fontSize:23,}}>Eric Scott </NB.Text>
//                           </NB.Segment>
//                       </NB.Body>
//                       <NB.Right>
//                         <NB.Button transparent>
//                           <NB.Icon name="md-notifications" />
//                         </NB.Button>
//                       </NB.Right>
//                     </NB.Header> 
        


//                     <NB.Content style={{backgroundColor:"#fff"}}>
                        
                        
                    
              

                                    
//                     </NB.Content> 



//                   </NB.Container>
//      </ImageBackground> 

//  </Fragment>
      );
    }
  }
  {/* End Login */}



  
  const styles={
    
    standardFont: {
        fontSize: 15,
      },
      slackMessageText: {
        marginLeft: 0,
        marginRight: 0,
      },
      container: {
        flex: 1,
        alignItems: 'flex-start',
      },
      wrapper: {
        marginRight: 60,
        minHeight: 20,
        justifyContent: 'flex-end',
      },
      username: {
        fontWeight: 'bold',
      },
      time: {
        textAlign: 'left',
        fontSize: 12,
      },
      timeContainer: {
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
      },
      headerItem: {
        marginRight: 10,
      },
      headerView: {
        // Try to align it better with the avatar on Android.
        marginTop: Platform.OS === 'android' ? -2 : 0,
        flexDirection: 'row',
        alignItems: 'baseline',
      },
      /* eslint-disable react-native/no-color-literals */
      tick: {
        backgroundColor: 'transparent',
        color: 'white',
      },
      /* eslint-enable react-native/no-color-literals */
      tickView: {
        flexDirection: 'row',
      },
      slackImage: {
        borderRadius: 3,
        marginLeft: 0,
        marginRight: 0,
      },
    

  };

  