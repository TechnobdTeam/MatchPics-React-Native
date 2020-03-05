import React,  { Fragment, Component } from 'react';
import { Path,View, Image, ImageBackground, FlatList,StyleSheet,Animated , TouchableOpacity, TouchableHighlight,Dimensions} from 'react-native';
import * as NB from 'native-base';
// NativeBase
import HomeStyle from '../LayoutsStytle/HomeStyle';
import {Text, SwipeRow, Toast} from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
// import Data from "./Data";
import Icon from 'react-native-vector-icons/FontAwesome5';
import ConstValues from '../../constants/ConstValues';
import AsyncStorage from '@react-native-community/async-storage';
import { Dialog, ProgressDialog } from 'react-native-simple-dialogs';




var Data = []


{/*Login  */}
export class Chatlist extends React.Component {
  constructor(props) {
    super(props);
    Data = ConstValues.message_data_list

    this.state = { 
      search_text:'',
      iloding:false,
      searach_vissible : true,
      listType: 'FlatList',
      progressVisible: false ,
      listViewData: Array(Data.length)
          .fill('')
          .map((_, i) => ({ key: `${i}`, id: `${Data[i].id}`,  message_by: `${Data[i].message_by}`,  user_id: `${Data[i].user_id}`,  name: `${Data[i].name}`, url: `${Data[i].url}`, message: `${Data[i].message}`, created_at: `${Data[i].created_at}`,})),
          sectionListData: Array(5)
          .fill('')
          .map((_, i) => ({
              title: `title${i + 1}`,
              data: [
                  ...Array(5)
                      .fill('')
                      .map((_, j) => ({
                          key: `${i}.${j}`,
                          text: `${j}`,
                      })),
              ],
          })),
  };


  this.rowSwipeAnimatedValues = {};
  Array(Data.length)
      .fill('')
      .forEach((_, i) => {
          this.rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
      });
  }

componentDidMount(){

  // console.log('...................componentDidMount.....................')

  // this.timeoutHandle = setTimeout(()=>{
  //     this.setState({
  //   iloding:true,
  // })
  // }, 1000)

  // this.setState({
  //   iloding:true,
  // })
  AsyncStorage.getItem(ConstValues.user_token, (error, result) =>{
    console.log('user_token: ' + result)
    if(result != null){
        this.setState({token: result})
    }
    }).then(
    // this.timeoutHandle = setTimeout(()=>{
    //     this.getMessageList()
    //   }, 1000)

    )

}

getMessageList(){

    console.log("getting message list");

    var formData = new FormData();
    formData.append('api_key', ConstValues.api_key);

    fetch(ConstValues.base_url + 'getMessageList', {
      method: 'POST',
      headers:{
          'Authorization': 'Bearer ' + JSON.parse(this.state.token), 
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
      },
      body: formData
    }).then((response) => response.json())
    .then((responseJson) =>{

        Toast.show({
            text: responseJson.response.message,
            textStyle: { color: "yellow" },
          })

        if(responseJson.response.data == undefined){
            console.log("getMessageList: undefined data");
        }else{
          
          this.setState({messageData: responseJson.response.data})

          data_original = responseJson.response.data
          console.log("getMessageList: " + responseJson.response.data.length +" ??? "+ data_original.length);

          this.timeoutHandle = setTimeout(()=>{
            // this.swiperListInvalidate()

          }, 1000)

        }

    })
}

closeRow(rowMap, rowKey) {
    if (rowMap[rowKey]) {
        rowMap[rowKey].closeRow();
    }
}

deleteRow(rowMap, rowKey, messageId) {

    this.setState({progressVisible: true})

    var formData = new FormData();
    formData.append('api_key', ConstValues.api_key);
    formData.append('message_id', messageId);

    fetch(ConstValues.base_url + 'removeMessage', {
      method: 'POST',
      headers:{
          'Authorization': 'Bearer ' + JSON.parse(this.state.token), 
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
      },
      body: formData
    }).then((response) => response.json())
    .then((responseJson) =>{

        this.setState({progressVisible: false})

        Toast.show({
            text: responseJson.response.message,
            textStyle: { color: "yellow" },
          })

        if(responseJson.response.code == 1000){

            this.closeRow(rowMap, rowKey);
            const newData = [...this.state.listViewData];
            const prevIndex = this.state.listViewData.findIndex(
                item => item.key === rowKey
            );
            newData.splice(prevIndex, 1);
            this.setState({ listViewData: newData });
        }

    })

    console.log("delete_message: " + messageId)
}

deleteSectionRow(rowMap, rowKey) {
    this.closeRow(rowMap, rowKey);
    const [section] = rowKey.split('.');
    const newData = [...this.state.sectionListData];
    const prevIndex = this.state.sectionListData[section].data.findIndex(
        item => item.key === rowKey
    );
    newData[section].data.splice(prevIndex, 1);
    this.setState({ sectionListData: newData });
}

onRowDidOpen = rowKey => {
    console.log('This row opened', rowKey);
};

onSwipeValueChange = swipeData => {

    console.log("swipeData: " + swipeData);

    const { key, value } = swipeData;
    // this.rowSwipeAnimatedValues[key].setValue(Math.abs(value));
};


/// Search //********************** */
    state = {
      search: '',
    };

    updateSearch = search => {
      this.setState({ search });
    };


    searchViewClicked = () => {
      this.setState({ searach_vissible: !this.state.searach_vissible })
     }


    //  ----------------------------------
     searchTextChanged(search_text){
      this.setState({search_text })

      // // const selectedValue = '309';
      // console.log(">>>: "+arr.length)
      // // const newArr = arr.filter(object => object.value === {search_text});
   

      // const searchValue = search_text.toLowerCase();
      // // var newArr = arr.filter(item => {
      // //  Object.keys(item).some(key =>
      // //     typeof item[key] === "string" && item[key].toLowerCase().includes(searchValue)
      // // );
      // //  })

      //  const filteredData = arr.filter(item => {
      //   Object.keys(item).some(key =>
      //   typeof item[key] === "string" && item[key].toLowerCase().includes(searchValue)
      //   );
      //   });

      // console.log("::: ",filteredData.length)

      // console.log('Search : '+ search_text)

      // console.log(" ???? "+this.filterByValue(Data, search_text)); 
     }
    

     filterByValue(array, string) {
      return array.filter(o =>
          Object.keys(o).some(k => o['name'].toLowerCase().includes(string.toLowerCase())));
     }
    



     render() {

      const { search } = this.state;
      // const header =() => {
      //    return <View style={styles.header}>
      //              <Text style={styles.headerText} > List Headers</Text>
          
      //           </View>;

      // }
      return ( 
          <NB.Root>
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
                      <NB.Segment style={{backgroundColor:'transparent',width:"100%"}}>
                          <NB.Text style={{color:'#fff',fontSize:23,}}>Messages</NB.Text>
                          </NB.Segment>
                      </NB.Body>
                      <NB.Right>
                        <NB.Button transparent>
                        <Icon name={'bell'}  onPress={() => this.props.navigation.navigate('Notification')} style={{fontSize:24,color:'#fff', }} solid />   
                        </NB.Button>
                      </NB.Right>
                    </NB.Header> 

                     
                      <View  style={styles.rowFrontTop}>
                        <View style={{ width:'80%', }}>

                        {this.state.searach_vissible == false ?

                          <NB.Item style={{borderBottomWidth:0,}} >
                                
                               <Icon name="search"  style={{fontSize:13,color:'#e74e92', }}  />
                               <NB.Input  style={{height:20,padding:0,}} placeholder='Type Here...'
                               onChangeText={(search_text) =>{                               
                                this.searchTextChanged(search_text)
                               } }
                               value={this.state.search_text}
                               />  
                               <NB.Icon  onPress={() => this.searchViewClicked()}    name="close" style={{fontSize:20,color:'#e74e92', }}  />

                          </NB.Item> 
         
                            :

                            <View style={{justifyContent:'center',alignItems:'center',}}>
                            <TouchableOpacity  onPress= {() => this.searchViewClicked()}>
                            <NB.Text style={{color:'#e74e92',fontSize:13}} >
                            <Icon name="search"  style={{fontSize:13,color:'#e74e92', }}  />  Search for messages or users</NB.Text>
                            </TouchableOpacity> 
                            </View>

                            }


                            
                            
                              
                          </View> 
                              

                        </View> 
                     
                <NB.Content style={{backgroundColor:"#fff"}}>

     

                    {/* 
                    <FlatList
                              data={Data}
                              renderItem={({item}) => <Text>{item.id}, {item.text}</Text>}
                              keyExtractor={({id}, index) => id}
                            /> */}


               
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
                                
                            />  */}


              

                {this.state.listType === 'FlatList' && (
                    <SwipeListView
                        data={  this.filterByValue(this.state.listViewData, this.state.search_text) }
                        renderItem={data => (
                          <TouchableHighlight
                          onPress={() => console.log('You touched me')}
                          
                          underlayColor={'#AAA'}>

                            <View    style={styles.rowFront}>
                              <View style={{flex:1,flexDirection: 'row',paddingLeft:70,paddingRight:70,height:90,}}>
                                 <View style={{justifyContent:"flex-start",alignItems:'center',paddingRight:20,paddingTop:10,marginLeft:-10}}>
                                    <Image source={{uri: data.item.url}} style={{ width: 75, height: 75, borderRadius: 37.5 }} />
                                 </View>
                                  
                                  <View style={{width:"100%"}}>
                                      <View style={{flex:1,flexDirection: 'row',justifyContent:"space-between",paddingTop:10}}>
                                        <Text    style={{color:'#e74e92',fontSize:12,fontWeight:"bold",}}>{data.item.name} </Text> 
                                        <Text style={{color:'#1c1721',fontSize:11,fontWeight:"bold",}}>{data.item.created_at}  </Text> 
                                      </View> 
                                      <Text  numberOfLines={2}  onPress={() => this.props.navigation.navigate('Chatwindow',
                                      {id: data.item.id, name: data.item.name, user_id: data.item.user_id})}  style={{color:'#1c1721',textAlign:'left',fontSize:14,marginBottom:4,paddingBottom:15,height:57}}>{data.item.message} </Text>  
                                      
                                  </View>
                                </View> 
                                    
                              </View> 
                      </TouchableHighlight>
                        )}
                        renderHiddenItem={(data, rowMap) => (
                            <View style={styles.rowBack}>






                        <TouchableOpacity
                                    style={[
                                        styles.backLeftBtn,
                                        styles.backLeftBtnRight,
                                    ]}
                                    onPress={() =>
                                        this.deleteRow(rowMap, data.item.key, data.item.id)
                                    }
                                >
                               <Animated.View
                                        style={[
                                            styles.trash,
                                            {
                                                transform: [
                                                    {
                                                        scale: this.rowSwipeAnimatedValues[
                                                            data.item.key
                                                        ].interpolate({
                                                            inputRange: [
                                                                45,
                                                                90,
                                                            ],
                                                            outputRange: [0, 1],
                                                            extrapolate:
                                                                'clamp',
                                                        }),
                                                    },
                                                ],
                                            },
                                        ]}
                                    >
                                <Image source={require('../Image/delete.png')} style={{width:28 }} />  
                                </Animated.View>
                                </TouchableOpacity>   
                                 
                                <TouchableOpacity
                                    style={[
                                        styles.backRightBtn,
                                        styles.backRightBtnRight,
                                    ]}
                                    onPress={() =>
                                        this.deleteRow(rowMap, data.item.key, data.item.id)
                                    }
                                >
                                    <Animated.View
                                        style={[
                                            styles.trash,
                                            {
                                                transform: [
                                                    {
                                                        scale: this.rowSwipeAnimatedValues[
                                                            data.item.key
                                                        ].interpolate({
                                                            inputRange: [
                                                                45,
                                                                90,
                                                            ],
                                                            outputRange: [0, 1],
                                                            extrapolate:
                                                                'clamp',
                                                        }),
                                                    },
                                                ],
                                            },
                                        ]}
                                    >
                                    <Image source={require('../Image/delete.png')} style={{width:28 }} />  
                                    </Animated.View>
                                </TouchableOpacity>
                            </View>
                        )}
                        leftOpenValue={98}
                        rightOpenValue={-98}
                        previewRowKey={'0'}
                        previewOpenValue={-40}
                        previewOpenDelay={3000}
                        onRowDidOpen={this.onRowDidOpen}
                        onSwipeValueChange={this.onSwipeValueChange}
                    />
                )}


                            
                  </NB.Content> 

                  </NB.Container>
                </ImageBackground> 

                <ProgressDialog
                visible={this.state.progressVisible}
                title="Loading data"
                message="Please, wait..."
            />

            </Fragment>
          </NB.Root>
      );
    }



 
//     render() {

//       const { search } = this.state;
//       // const header =() => {
//       //    return <View style={styles.header}>
//       //              <Text style={styles.headerText} > List Headers</Text>
          
//       //           </View>;

//       // }
//       return ( 
//         <Fragment>    
//          <ImageBackground source={require('../Image/background_images.jpg') } style={{width: '100%', height: '100%', }}   > 
               
//                   <NB.Container   style={styles.PageContainerChatList}  >
                      
//                   <NB.Header  transparent>
//                       <NB.Left>
//                         <NB.Button transparent onPress={() => this.props.navigation.navigate('Menu')} >
//                         <Icon name="bars"  style={{fontSize:24,color:'#fff', }}  /> 
//                         </NB.Button>
//                       </NB.Left>

//                       <NB.Body  >
//                       <NB.Segment style={{backgroundColor:'transparent'}}>
//                           <NB.Text style={{color:'#fff',fontSize:23,}}>Messages     </NB.Text>
//                           </NB.Segment>
//                       </NB.Body>
//                       <NB.Right>
//                         <NB.Button transparent>
//                         <Icon name={'bell'}  onPress={() => this.props.navigation.navigate('Notification')} style={{fontSize:24,color:'#fff', }} solid />   
//                         </NB.Button>
//                       </NB.Right>
//                     </NB.Header> 

//                      {(this.state.messageData != undefined && this.state.messageData != '') ? 
//                      <View  style={styles.rowFrontTop}>
//                         <View style={{ width:'80%', }}>

//                         {this.state.visible == false ?

//                           <NB.Item style={{borderBottomWidth:0,}} >
                                
//                                <Icon name="search"  style={{fontSize:13,color:'#e74e92', }}  />
//                                <NB.Input  style={{height:20,padding:0,}} placeholder='Type Here...'/>   
//                           </NB.Item> 
         
//                             :

//                             <View style={{justifyContent:'center',alignItems:'center',}}>
//                             <TouchableOpacity  onPress= {() => this.example()}>
//                             <NB.Text style={{color:'#e74e92',fontSize:13}} >
//                             <Icon name="search"  style={{fontSize:13,color:'#e74e92', }}  />  Search for messages or users</NB.Text>
//                             </TouchableOpacity> 
//                             </View>

//                             }


                            
                            
                              
//                           </View> 
                              
//                         </View> 
//                         :
//                         null
//                      }
                     
//                      {(this.state.messageData != undefined && this.state.messageData != '') ? 
//                 <NB.Content style={{backgroundColor:"#fff"}}>

          
//                 {this.state.listType === 'FlatList' && (
//                     <SwipeListView
//                         data={this.state.listViewData}
//                         renderItem={data => (
//                             <TouchableHighlight
//                                 onPress={() => console.log('You touched me')}
                                
//                                 underlayColor={'#AAA'}
//                             >

//                                   <View    style={styles.rowFront}>
//                                     <View style={{flex:1,flexDirection: 'row',paddingLeft:70,paddingRight:70,height:90,}}>
//                                        <View style={{justifyContent:"flex-start",alignItems:'center',paddingRight:20,paddingTop:10,marginLeft:-10}}>
//                                           <Image source={{uri: data.item.url}} style={{ width: 75, height: 75, borderRadius: 37.5 }} />
//                                        </View>
                                        
//                                         <View style={{width:"100%"}}>
//                                             <View style={{flex:1,flexDirection: 'row',justifyContent:"space-between",paddingTop:10}}>
//                                               <Text    style={{color:'#e74e92',fontSize:12,fontWeight:"bold",}}>{data.item.name} </Text> 
//                                               <Text style={{color:'#1c1721',fontSize:11,fontWeight:"bold",}}>{data.item.created_at}  </Text> 
//                                             </View> 
//                                             <Text  numberOfLines={2}  onPress={() => this.props.navigation.navigate('Chatwindow')}  style={{color:'#1c1721',textAlign:'left',fontSize:14,marginBottom:4,paddingBottom:15}}>{data.item.message} </Text>  
                                            
//                                         </View>
//                                       </View> 
                                          
//                                     </View> 
//                             </TouchableHighlight>
//                         )}
//                         renderHiddenItem={(data, rowMap) => (
//                             <View style={styles.rowBack}>






//                         <TouchableOpacity
//                                     style={[
//                                         styles.backLeftBtn,
//                                         styles.backLeftBtnRight,
//                                     ]}
//                                     onPress={() =>
//                                         this.deleteRow(rowMap, data.key)
//                                     }
//                                 >
//                                 {/* {(this.state.messageData != undefined && this.state.messageData != '') ?
//                                 <Animated.View
//                                         style={[
//                                             styles.trash,
//                                             {
//                                                 transform: [
//                                                     {
//                                                         scale: this.rowSwipeAnimatedValues[
//                                                             data.key
//                                                         ].interpolate({
//                                                             inputRange: [
//                                                                 45,
//                                                                 90,
//                                                             ],
//                                                             outputRange: [0, 1],
//                                                             extrapolate:
//                                                                 'clamp',
//                                                         }),
//                                                     },
//                                                 ],
//                                             },
//                                         ]}
//                                     >
//                                 <Image source={require('../Image/delete.png')} style={{width:28 }} />  
//                                 </Animated.View>
//                                 :
//                                 null
//                                 } */}
//                                 </TouchableOpacity>   


                                 
//                                 <TouchableOpacity
//                                     style={[
//                                         styles.backRightBtn,
//                                         styles.backRightBtnRight,
//                                     ]}
//                                     onPress={() =>
//                                         this.deleteRow(rowMap, data.id)
//                                     }
//                                 >
//                                 {(this.state.messageData != undefined && this.state.messageData != '') ?
//                                     <Animated.View
//                                         style={[
//                                             styles.trash,
//                                             {
//                                                 transform: [
//                                                     {
//                                                         scale: this.rowSwipeAnimatedValues[
//                                                             data.id
//                                                         ].interpolate({
//                                                             inputRange: [
//                                                                 45,
//                                                                 90,
//                                                             ],
//                                                             outputRange: [0, 1],
//                                                             extrapolate:
//                                                                 'clamp',
//                                                         }),
//                                                     },
//                                                 ],
//                                             },
//                                         ]}
//                                     >
//                                     <Image source={require('../Image/delete.png')} style={{width:28 }} />  
//                                     </Animated.View>
//                                     :
//                                     null
//                                 }
//                                 </TouchableOpacity>


//                             </View>
//                         )}
//                         leftOpenValue={98}
//                         rightOpenValue={-98}
//                         previewRowKey={'0'}
//                         previewOpenValue={-40}
//                         previewOpenDelay={3000}
//                         onRowDidOpen={this.onRowDidOpen}
//                         onSwipeValueChange={this.onSwipeValueChange}
//                     />
//                 )}
                
                            
//                   </NB.Content> 

//                   :
//                   <NB.View style={{flex: 1, backgroundColor:"#fff"}}>
//                   <NB.Text style={{flex: 1, color:'#eaeaea',fontSize:20, textAlign: 'center', textAlignVertical: 'center'}}>No data found! </NB.Text>
//                   </NB.View>
//                 }

//                   </NB.Container>
//      </ImageBackground> 

//  </Fragment>
//       );
//     }



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
    paddingBottom:5
  
    
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