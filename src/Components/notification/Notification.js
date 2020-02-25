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
import { Dialog, ProgressDialog } from 'react-native-simple-dialogs';

{/*Login  */}
export class Notification extends React.Component {

  /// Search //********************** */
  constructor(props){
    super(props);
    this.state = {
      search: '',
      notificationData: '',
      progressVisible: true,
      token: '',
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

    console.log("getting notification list");

    var formData = new FormData();
    formData.append('api_key', ConstValues.api_key);

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

        this.setState({notificationData: responseJson.response.data})

        if(responseJson.response.data == undefined){
            console.log("getNotificationList: undefined data");
        }
        else{

        }

    })
  }

  updateSearch = search => {
    this.setState({ search });
  };


  example = () => {

    this.setState({ visible: !this.state.visible })
   }



    render() {
      return ( 
        <Fragment>    
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
                        <NB.Button transparent>
                        <Icon name={'bell'}  onPress={() => this.props.navigation.navigate('Notification')}  style={{fontSize:24,color:'#fff', }} solid />   
                        </NB.Button>
                      </NB.Right>
                    </NB.Header> 

{/*                      
                    <View  style={styles.rowFrontTop}>
                        <View style={{ width:'80%', }}>

                        {this.state.visible == false ?

                          <NB.Item style={{borderBottomWidth:0,}} >
                                
                               <Icon name="search"  style={{fontSize:13,color:'#e74e92', }}  />
                               <NB.Input  style={{height:20,padding:0,}} placeholder='Type Here...'/>   
                          </NB.Item> 
         
                            :

                            <View style={{justifyContent:'center',alignItems:'center',}}>
                            <TouchableOpacity  onPress= {() => this.example()}>
                            <NB.Text style={{color:'#e74e92',fontSize:13}} >
                            <Icon name="search"  style={{fontSize:13,color:'#e74e92', }}  />  Search for messages or users</NB.Text>
                            </TouchableOpacity> 
                            </View>

                            }


                            
                            
                              
                          </View> 
                              
                        </View>  */}
                     
                <NB.Content style={{backgroundColor:"#fff"}}>

                    
                    {this.state.notificationData != undefined && this.state.notificationData != '' ?
                    
                    <FlatList
                              data={this.state.notificationData}
                              renderItem={({item}) => 


                              <View    style={styles.rowFront}>
                                  <View style={{flex:1,flexDirection: 'row',paddingLeft:70,paddingRight:70,height:84,}}>
                                      <View style={{justifyContent:'center',alignItems:'center',paddingRight:20,marginLeft:-10}}>
                                          <Image source={{uri: item.url}} style={{ width:60, height: 60, borderRadius: 37.5 }} />
                                      </View>

                                      <View  style={{width:"100%"}}>
                                      <View style={{flex:1,flexDirection: 'row',justifyContent:"space-between",paddingTop:10}}>
                                        <Text    style={{color:'#e74e92',fontSize:12,fontWeight:"bold",}}>{item.name} </Text> 
                                        <Text style={{color:'#1c1721',fontSize:11,fontWeight:"bold",}}>{item.create_date}  </Text> 
                                      </View> 
                                      <Text  numberOfLines={2}  style={{color:'#1c1721',textAlign:'left',fontSize:14,marginBottom:4,paddingBottom:10}}>{item.notification}  </Text> 

                                        
                                      </View>
                                  
                                  
                                  </View>
                                  
                              </View> 

                              }
                            />
                            :
                            <ProgressDialog
                                visible={this.state.progressVisible}
                                title="Loading data"
                                message="Please wait..."
                            />
                    }               


               
                       {/* <SwipeListView
                                data={Data}
                                renderItem={({item}) => 
                                 
                                    <View style={styles.rowFront}>
                                    <View style={{flex:1,flexDirection: 'row',paddingLeft:70,paddingRight:70,}}>
                                       <View style={{justifyContent:'center',alignItems:'center',paddingRight:20,}}>
                                          <Image source={item.images} style={{ width: 75, height: 75, borderRadius: 37.5 }} />
                                       </View>
                                        
                                        <View>
                                            <View style={{flex:1,flexDirection: 'row',justifyContent:"space-between"}}>
                                              <Text style={{color:'#e74e92',}}>{item.userNmae} ,{item.id}</Text>
                                              <Text style={{color:'#1c1721'}}>{item.time}</Text>
                                            </View> 
                                           <Text style={{color:'#1c1721',textAlign:'left',marginTop:2,}}>{item.text} </Text>  
                                        </View>
                                      </View> 
                                          
                                    </View>
                                   

                                   
                                }
                                renderHiddenItem={ (data, rowMap) => (
                                   
                                    <View style={styles.rowBack}>
                                        <Text><NB.Icon name="md-close"  style={{color:'#fff',fontSize:40,}}/></Text>
                                        <Text><NB.Icon name="md-close" style={{color:'#fff',fontSize:40,}} /></Text>
                                    </View>
                                     
                                )}
                                
                                leftOpenValue={95}
                                rightOpenValue={-95}
                                
                            />   
 */}

              
    
                  </NB.Content> 

                  </NB.Container>
     </ImageBackground> 

 </Fragment>
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