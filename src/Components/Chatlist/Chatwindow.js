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

{/*Login  */}
export class Chatwindow extends React.Component {  
   
    state = {
        messages: [],
      }
    
      componentDidMount() {
        this.setState({
          messages: [
            {
              _id: 1,
              text: 'Hello developer',
              createdAt: new Date(),
              user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
              },
              
            },
          ],
        })
      }
    
      onSend(messages = []) {
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, messages),
        }))
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
                           <NB.Text style={{color:'#fff',fontSize:23,}}>Eric Scott      </NB.Text>
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
                      renderBubble={this.renderBubble}
                      user={{
                        _id: 1, 
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

  