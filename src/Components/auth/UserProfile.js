import React,  { Fragment, Component } from 'react';
import {Animated, View, StyleSheet, ImageBackground,ScrollView,SafeAreaView ,TouchableOpacity, Dimensions, KeyboardAvoidingView, } from 'react-native';
import * as NB from 'native-base';
// NativeBase
 import {Text} from 'native-base';
//import {CustomHeader} from '../CustomHeader'
import { Dialog, ProgressDialog, ConfirmDialog } from 'react-native-simple-dialogs';
import HomeStyle from '../LayoutsStytle/HomeStyle';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage';
import ConstValues from '../../constants/ConstValues';
import Toast from 'react-native-toast-native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import * as Animatable from 'react-native-animatable';
import SlidingPanel from 'react-native-sliding-up-down-panels';
const { width, height } = Dimensions.get('window');
const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
{/*Register */}
export class UserProfile extends React.Component {
 
      handleOpen = () => {
          this.setState({
            user_info_vissible: true,

          })
        Animated.timing(this.state.animation, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }).start();
      };


      handleClose = () => {
        this.setState({
            user_info_vissible: false,

          })
        Animated.timing(this.state.animation, {
          toValue: 0,
          duration: 900,
          useNativeDriver: true,
        }).start();
      };

 confirmMessage = 'Hello'
 performAction = ''
 reportTextString = ''
 fromScreen = ''

  constructor(props) {
    super(props);
    this.state = {
        animation: new Animated.Value(0),
      user_id: '',
      showToast: false,
      email: '',
      password: '',
      token: '',
      progressVisible: true ,
      confirmVisible: false,
      is_fav: false,
      is_blocked: false,
      reportTypeData: '',
      reportText: '',
      note: '',
      columns: 2, 
      
      handleClose: true,

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
                    this.getProfileDetails()
                    this.getReportTypes();
                 }, 1000)
            )
        )
    )
  }

  getProfileDetails(){

    if(this.state.user_id == ''){
        //getting user id passed from previous page
        this.setState({user_id: this.props.navigation.state.params.id});
        this.fromScreen = this.props.navigation.state.params.from
        console.log("user_profile_id: " + this.state.user_id);
    }

    var formData = new FormData();
        formData.append('api_key', ConstValues.api_key);
        formData.append('user_id', this.state.user_id);

        console.log("getting user details: " + this.state.token);

        fetch(ConstValues.base_url + 'getUserProfileDetails', {
            method: 'POST',
            headers:{
                'Authorization': 'Bearer ' + JSON.parse(this.state.token), 
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        }).then((response) => response.json())
        .then((responseJson) =>{

            this.setState({profileData: responseJson.response.data})

            console.log("getUserProfileDetails: " + responseJson.response.message);
            console.log("getUserProfileDetails fab: " + this.state.profileData.is_fab);

            if(this.state.profileData.is_fab.toLowerCase() == 'yes'){
                // this.setState({confirmMessage: 'Do you want to remove user from favorite list?'});
                this.setState({is_fab: true});
            }
            else{
                // this.setState({confirmMessage: 'Do you want to add user in favorite list?'});
                this.setState({is_fab: false});
            }

            if(this.state.profileData.is_blocked.toLowerCase() == 'yes'){
                // this.setState({confirmMessage: 'Do you want to remove user from favorite list?'});
                this.setState({is_blocked: true});
            }
            else{
                // this.setState({confirmMessage: 'Do you want to add user in favorite list?'});
                this.setState({is_blocked: false});
            }
        })
  }

  removeUserFromFav(){
    this.confirmMessage = "Do you want to remove user from favorite list?";
    this.performAction = "removeFavourite";
  }

  addUserIntoFav(){
    this.confirmMessage = "Do you want to add user into favorite list?";
    this.performAction = "addFavourite";
  }

  removeBlock(){
    this.confirmMessage = "Do you want to remove user from block list?";
    this.performAction = "removeBlockUser";
  }

  blockUser(){
    this.confirmMessage = "Do you want to block user?";
    this.performAction = "addBlockUser";
  }

  getReportTypes(){

    var formData = new FormData();
    formData.append('api_key', ConstValues.api_key);

        fetch(ConstValues.base_url + 'getReportTypes', {
            method: 'POST',
            headers:{
                'Authorization': 'Bearer ' + JSON.parse(this.state.token), 
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        }).then((response) => response.json())
        .then((responseJson) =>{

            this.setState({reportTypeData: responseJson.response.data})

            console.log("getReportTypes: " + responseJson.response.message);

        })
  }

  performActionCall(){

    this.setState({confirmVisible: false, progressVisible: true})

        var formData = new FormData();
        formData.append('api_key', ConstValues.api_key);

        if(this.performAction == 'addFavourite' || this.performAction == 'removeFavourite'){

            formData.append('favourite_user_id', this.state.user_id);
        }
        else{
            formData.append('block_user_id', this.state.user_id);
        }

        console.log(this.performAction + ": " + this.performAction)

        fetch(ConstValues.base_url + this.performAction, {
            method: 'POST',
            headers:{
                'Authorization': 'Bearer ' + JSON.parse(this.state.token), 
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        }).then((response) => response.json())
        .then((responseJson) =>{

            console.log(this.performAction + ": " + responseJson.response.message)
            console.log(this.performAction + ": " + responseJson.response.code)

            // Toast.show({
            //     text: responseJson.response.message,
            //     textStyle: { color: "yellow" },
            //   });

            Toast.show(responseJson.response.message, Toast.LONG, Toast.BOTTOM,style);

            if(responseJson.response.code == 1000){

                this.getProfileDetails()
            }
            else{
                this.setState({progressVisible: false})
            }
            
        })
  }

  reportAgainstUser(){

    console.log("report value: " + this.state.note)

    this.setState({progressVisible: true})

    var formData = new FormData();
    formData.append('api_key', ConstValues.api_key);
    formData.append('report_user_id', this.state.user_id);
    formData.append('report_issue', this.reportTextString);
    formData.append('note', this.state.note);

    fetch(ConstValues.base_url + 'addReportUser', {
        method: 'POST',
        headers:{
            'Authorization': 'Bearer ' + JSON.parse(this.state.token), 
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
        },
        body: formData
    }).then((response) => response.json())
    .then((responseJson) =>{

        console.log("addReportUser: " + responseJson.response.message)
        console.log("addReportUser: " + responseJson.response.code)

        // Toast.show({
        //     text: responseJson.response.message,
        //     textStyle: { color: "yellow" },
        //   });

        Toast.show(responseJson.response.message, Toast.LONG, Toast.BOTTOM,style);

        this.setState({progressVisible: false})
        
    })
  }

  userinfo = () => {
    this.setState({ userinfovisible: !this.state.userinfovisible })
    
   }



  render() {  
      const {width, height} = Dimensions.get('window');
      const screenHeight = Dimensions.get("window").height;

      const backdrop = {
        transform: [
          {
            translateY: this.state.animation.interpolate({
              inputRange: [0, 0.01],
              outputRange: [screenHeight, 0],
              extrapolate: "clamp",
            }),
          },
        ],
        opacity: this.state.animation.interpolate({
          inputRange: [0.01, 0.5],
          outputRange: [0, 1],
          extrapolate: "clamp",
        }),
      };
  
      const slideUp = {
        transform: [
          {
            translateY: this.state.animation.interpolate({
              inputRange: [0.01, 1],
              outputRange: [0, -1 * screenHeight],
             
            }),
          },
        ],
      };
    
    return (


        <NB.Root>
            
        {!this.state.profileData == '' ?
        <View style={{flex:1,}}>
      
      
        <NB.View style={{width:"100%",height:50,backgroundColor:"transparent",marginTop:30,position:"absolute",paddingLeft:15,paddingTop:5,zIndex:999}}>
           <NB.Button onPress={() => this.props.navigation.navigate(this.fromScreen)} transparent >
              <Icon name="arrow-left"  style={{fontSize: width * 0.052,color:'#fff', }}  /> 
            </NB.Button>
        </NB.View>
                        {/* <ImageBackground source={{uri:this.state.profileData.photo} } style={{width: '100%', height: '100%',  }}      > */}
                        <ImageBackground source={require('../Image/profile_single_images.jpg') } style={{width: '100%', height: '100%',  }}      >
                            <View style={{flex: 1,flexDirection: 'column',justifyContent: 'center',alignItems: 'stretch', }}>
                                
                                    <View style={{flex: 3,}} > 
                                        <ImageBackground source={require('../Image/slingle_profile_images_shap.png') } style={{width: '100%', height: '100%',  }}     >
               
                                   
                                        {this.state.user_info_vissible?   
                                        
                                        
                                        <Animatable.View animation="slideInUp" direction="alternate"    style={{justifyContent:'flex-end', flex:1}}>
                                        <NB.ListItem style={{borderBottomWidth:0,}}>
                                            <NB.Left>
                                            <NB.Body>
                                                <NB.Text style={{color:'#fff',fontSize: width * 0.051,fontWeight:'bold'}}>{this.state.profileData.name}, <NB.Text style={{fontWeight:"400",color:'#fff',fontSize:22,}} >{this.state.profileData.gender.toUpperCase().charAt(0)} {this.state.profileData.age}  </NB.Text>  </NB.Text> 
                                                <NB.Text style={{color:'#fff',fontSize: width * 0.043,}}><Icon name="location-arrow" solid style={{color:'#fff',fontSize: width * 0.037 }}  /> {this.state.profileData.address} </NB.Text>  
                                                </NB.Body>
                                            </NB.Left>
                                            <NB.Right>
                                        <TouchableOpacity onPress={this.handleClose}> 
                                            <Icon     name="info-circle" solid style={{color:'#fff',fontSize: width * 0.09 }}  />  
                                            </TouchableOpacity>
                                            </NB.Right>
                                        </NB.ListItem>



                                                   <NB.View style={{ backgroundColor:'rgba(255, 255, 255, 0.5) }}'}} >   
                                                        <NB.View   style={HomeStyle.PageContainerAbout}  >  
                                                        <NB.View style={{paddingLeft:23,}} >
                                                                    <NB.Text style={{paddingRight:20,paddingTop:10,fontSize: width * 0.05,marginBottom:10,color:"#fff",fontFamily:'OpenSans-Semibold'}}>About</NB.Text>  
                                                                    <ScrollView style={{paddingRight:20, height:300}} > 
                                                                        <NB.Text style={{marginBottom:10,color:'#fff',lineHeight:22,fontSize: width * 0.039,textAlign: 'justify',fontFamily:'OpenSans-Regular'}} >
                                                                        {this.state.profileData.bio} 
                                                                        
                                                                    </NB.Text> 
                                                                    </ScrollView>

                                                        </NB.View>  

                                                        </NB.View>
                                                    </NB.View> 
                                                  
                                                    </Animatable.View> 
                                        
                                        :   

                                        <SlidingPanel
                                                    headerLayoutHeight = {100} 
                                                    headerLayout = { () =>
                                                        <View style={styles.headerLayoutStyle}> 
                                                            <View style={{flex:1,flexDirection:"row"}} >
                                                               <View style={{width:"90%"}}>
                                                                 
                                                                    <NB.Text style={{color:'#fff',fontSize: width * 0.051,fontWeight:'bold'}}>{this.state.profileData.name}, <NB.Text style={{fontWeight:"400",color:'#fff',fontSize:22,}} >{this.state.profileData.gender.toUpperCase().charAt(0)} {this.state.profileData.age}  </NB.Text>  </NB.Text> 
                                                                    <NB.Text style={{color:'#fff',fontSize: width * 0.043,}}><Icon name="location-arrow" solid style={{color:'#fff',fontSize: width * 0.037 }}  /> {this.state.profileData.address} </NB.Text>  
                                                                    </View >
                                                                    <View style={{alignItems:"center",justifyContent:"center"}} >
                                                            <TouchableOpacity onPress={this.handleOpen} > 
                                                                <Icon     name="info-circle" solid style={{color:'#fff',fontSize: width * 0.09 }}  />  
                                                                </TouchableOpacity>
                                                                    </View >
                                                                </View >  
                                                        </View>
                                                    }
                                                    slidingPanelLayout = { () =>
                                                        <View style={styles.slidingPanelLayoutStyle}> 
                                                               <NB.View style={{paddingLeft:23,}} >
                                                                   <NB.Text style={{paddingRight:20,paddingTop:10,fontSize: width * 0.05,marginBottom:10,color:"#fff",fontFamily:'OpenSans-Semibold'}}>About</NB.Text>  
                                                                      <ScrollView style={{paddingRight:20,}} > 
            
                                                                            <NB.Text style={{marginBottom:10,color:'#fff',lineHeight:22,fontSize: width * 0.039,textAlign: 'justify',fontFamily:'OpenSans-Regular'}} >
                                                                                {this.state.profileData.bio}  </NB.Text> 
                                                                     
                                                                      </ScrollView>

                                                                </NB.View>   
                                         
                                                              </View>  
                                                    }
                                                />

                                                }


             

                                                   
                                                                                                
                                            
                                        </ImageBackground> 
                                    </View>
                            </View>
                        </ImageBackground> 

         


                    <NB.Footer style={{height:72}} >
                        <NB.FooterTab style={{backgroundColor:'#fff',}}>
                            <NB.Button badge vertical  >
                         <TouchableOpacity onPress={() => this.props.navigation.navigate('Chatwindow',
                            {id: "0", name: this.state.profileData.name, user_id: this.state.user_id})}>
                            {/* <NB.Badge><NB.Text>2</NB.Text></NB.Badge>  */}
                            <Icon name="comment" light  style={{textAlign:"center",color:'#e41b5b',fontSize:24, marginBottom:8,}}  /> 
                            <NB.Text style={{textAlign:"center",color:'#333333',fontSize: width * 0.033,fontFamily:'OpenSans-Regular'}}>Message</NB.Text>
                            </TouchableOpacity>
                            </NB.Button>

                            <NB.Button vertical>
                            <TouchableOpacity onPress={() => this.setState({confirmVisible: true})}
                            onPressIn={() => this.state.profileData.is_fab.toLowerCase() == 'yes' ?
                            this.removeUserFromFav()
                            :
                            this.addUserIntoFav()} >
                            {this.state.profileData.is_fab.toLowerCase() == 'yes' ?
                            <Icon name="heart" solid  style={{textAlign:"center", color:'#e41b5b',fontSize:24,marginBottom:8, }}  /> 
                            :
                            <Icon name="heart" light  style={{textAlign:"center",color:'#e41b5b',fontSize:24,marginBottom:8, }}  /> 
                            }
                            <NB.Text style={{textAlign:"center",color:'#333333',fontSize: width * 0.033,fontFamily:'OpenSans-Regular'}} >Favorite</NB.Text>
                          </TouchableOpacity>
                            </NB.Button>
                            <NB.Button   vertical > 
                           <TouchableOpacity onPress={() => this.setState({confirmVisible: true})}
                            onPressIn={() => this.state.profileData.is_blocked.toLowerCase() == 'yes' ?
                            this.removeBlock()
                             
                            :
                            this.blockUser()} 
                           > 
                            <Icon name="ban" light  style={{textAlign:"center",color:'#e41b5b',fontSize:24,marginBottom:8, }}  />  
                            <NB.Text   style={{textAlign:"center",color:'#333333',fontSize: width * 0.033,fontFamily:'OpenSans-Regular'}}>Block</NB.Text>
                            </TouchableOpacity>
                            </NB.Button>

                            <NB.Button vertical   >
                            <TouchableOpacity    onPress={() => this.setState({Report: true})} > 
                            <Icon name="flag" light  style={{color:'#e41b5b',fontSize:24,marginBottom:8,textAlign:"center" }}  />   
                            <NB.Text style={{color:'#333333',textAlign:"center",fontSize: width * 0.033,fontFamily:'OpenSans-Regular'}}>Report</NB.Text>
                            </TouchableOpacity> 
                            </NB.Button>

                        </NB.FooterTab>
                    </NB.Footer>
 
        </View>
        :
 

     

        <Dialog
            dialogStyle={{
                backgroundColor:"transparent",
                elevation: 0, 
                
            }}
            visible={this.state.progressVisible}

            overlayStyle={{
                backgroundColor:"#e74e92"
            }}
            // title="Getting details"
            // message="Please, wait..."
        >
            
 <NB.Spinner color='#fff' />
            </Dialog>
        }

 


        <ConfirmDialog
         dialogStyle={{ 
            borderRadius:7,
            
        }}
        title="Confirmation!"
        message={this.confirmMessage}
        visible={this.state.confirmVisible}
        onTouchOutside={() => this.setState({confirmVisible: false})}
        positiveButton={{
            title: "YES",
            onPress: () => this.performActionCall()
        }}
        negativeButton={{
            title: "NO",
            onPress: () => this.setState({confirmVisible: false})
        }}
        
    />

<KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={keyboardVerticalOffset} style={{width:"100%"}}>

    <ConfirmDialog
        // title="Confirmation!ss"
       
        message={this.confirmMessage}
        visible={this.state.Report}
        onTouchOutside={() => this.setState({Report: false})}
        dialogStyle={{ 
            borderRadius:15,
            
        }

        }
        >

        <View style={{marginLeft:-24,marginRight:-24,marginTop:-24,marginBottom:-90,padding:24,}}>
        
            <View style={{borderBottomWidth:1,borderBottomColor:"#ededed",marginBottom:20,alignItems:"flex-end",paddingBottom:7}}>
                {/* <Icon onPress={() => this.setState({Report: false})}   name="times" solid style={{color:'#5b5b5b',fontSize:30, }}  />   */}
                <TouchableOpacity onPress={() => {
                    this.reportTextString = ''
                    this.setState({Report: false, reportText: ''})}} > 
                <NB.Icon   name="close" style={{color:'#5b5b5b',fontSize:30, }}  /> 
           </TouchableOpacity>
            </View>

                <View style={{flex:1,flexDirection:'row',marginBottom:53}}>
                    <View style={{width:50}}> 
                    <Icon  name="exclamation-triangle" solid style={{color:'#e57a1c',fontSize:30 }}  /> 
                     </View>
                    <View style={{width:280}} >  
                     
                    <NB.Text style={{color:"#000",fontWeight:"700",fontSize: width * 0.033,flexWrap: 'wrap'}}>Please select a problem to continue</NB.Text>  
                    <NB.Text style={{color:"#696969",fontSize: width * 0.030, }}>You Can report the profile after selecting a problem.</NB.Text> 
                    </View>
                </View>
                <ScrollView>
                <View style={{flexWrap:"wrap", display:'flex',alignContent:"space-around",flexDirection: 'row',marginTop:5,}} > 

                {this.state.reportTypeData != '' ? 
                this.state.reportTypeData.map((item,i) => {
                    return <NB.View>
                    {this.reportTextString == item.name ? 
                        <NB.Text style={HomeStyle.PeporttagSelected}>{item.name}</NB.Text>
                        : 
                        <NB.Text onPress = {() => {
                            this.reportTextString = item.name
                            this.setState({reportText: item.name})
                        }} style={HomeStyle.Peporttag}>{item.name}</NB.Text>
                    } 
                    </NB.View>
                    
                    })
                    :
                   null
                   }  

                   {/* {this.state.reportTypeData != '' ? 
                   
                    
                    
                   :
                   null
                   }                              */}
                        {/* <NB.Text style={HomeStyle.Peporttag}  > Pretending to be someone </NB.Text>   */}

  
                                <NB.Form  style={{width:"100%"}}>
                                    <NB.Textarea onChangeText={(value) => this.setState({note: value})} rowSpan={3} bordered placeholder="Describe problem..." />
                                </NB.Form>
                   
                </View>
                </ScrollView>
                <View style={{marginTop:10,}}> 
                    <TouchableOpacity>
                    {this.state.reportText == '' ? 
                    <NB.Text  style={{backgroundColor:"#e5e6eb",textAlign:"center",padding:7,borderRadius:7,fontSize:17,color:"#979797"}}> SUBMIT </NB.Text>  
                    :
                    <NB.Text onPress={() => {this.setState({Report: false}), this.reportAgainstUser() }} style={{backgroundColor:"#e41b5b",textAlign:"center",padding:7,borderRadius:7,fontSize:17,color:"#ffffff"}}> SUBMIT </NB.Text>
                    }
                    </TouchableOpacity> 
                </View>
                
         </View> 
    </ConfirmDialog>
    </KeyboardAvoidingView>

    </NB.Root>
    );
  }
 
}

const style={
    backgroundColor: "#000000",
    paddingLeft: 50,
    paddingRight: 50,
    paddingBottom: 10,
    paddingTop: 15,
    height: 120,
    marginBottom: 50,
    color: "#ffffff",
    fontSize: 15,
    lines: 1,
    borderRadius: 15,
    fontWeight: "bold",
  };
{/* End Register */}

const styles = StyleSheet.create({
     
  
    cover: {
    //   backgroundColor: "rgba(0,0,0,.5)",
    },
    sheet: {
     
      top: Dimensions.get("window").height,
      left: 0,
      right: 0,
      height:0,
      justifyContent: "flex-end",
    },
    
    popup: {
      backgroundColor:'rgba(255, 255, 255, 0.5) }}', 
      height: 500,
      
    },


    headerLayoutStyle: {
        width, 
        height: 90, 
        paddingLeft:20,
        paddingRight:20,
       
      },
      slidingPanelLayoutStyle: {
        width, 
        height, 
        backgroundColor: 'rgba(255, 255, 255, 0.5)', 
      
        
      },
      




  });