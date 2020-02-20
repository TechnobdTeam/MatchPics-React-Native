import React,  { Fragment, Component } from 'react';
import { View, Image, ImageBackground,ScrollView } from 'react-native';
import * as NB from 'native-base';
// NativeBase
import {Text} from 'native-base';
//import {CustomHeader} from '../CustomHeader'
import { Dialog, ProgressDialog, ConfirmDialog } from 'react-native-simple-dialogs';
import HomeStyle from '../LayoutsStytle/HomeStyle';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage';
import ConstValues from '../../constants/ConstValues';
{/*Register */}
export class UserProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user_id: '',
      showToast: false,
      email: '',
      password: '',
      token: '',
      progressVisible: true ,
      confirmVisible: false,
      is_fav: false,
      profileData: '',
      columns: 2, 
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
                 }, 1000)
            )
        )
    )
  }

  getProfileDetails(){

    if(this.state.user_id == ''){
        this.setState({user_id: this.props.navigation.state.params.id});
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
        })
  }

  render() {  
     
    return (
    <Fragment>   
    {!this.state.profileData == '' ?
    <View>
     
    <ImageBackground   style={{width: '100%', height: '100%', backgroundColor:'#fff', overflow:'scroll',}}   > 
       
              <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'stretch',
               
               
                
              }}>


                <View style={{flex: 3,}} > 
                  <ImageBackground source={{uri:this.state.profileData.photo} } style={{width: '100%', height: '100%',  }}      >
                        
                  <View style={{flex: 1,flexDirection: 'column',justifyContent: 'center',alignItems: 'stretch', }}>
                   
                    <View style={{flex: 1,}} >
                       <NB.Header  transparent>
                          <NB.Left>
                            <NB.Button onPress={() => this.props.navigation.navigate('MyMatches')} transparent>
                              
                              <Icon name="arrow-left"  style={{fontSize:24,color:'#fff', }}  /> 
                            
                            </NB.Button>
                          </NB.Left>

                          <NB.Body  >
                          <NB.Segment style={{backgroundColor:'transparent'}}>
                              
                              </NB.Segment>
                          </NB.Body>
                          <NB.Right>
                            <NB.Button transparent>
                        
                            </NB.Button>
                          </NB.Right>
                       </NB.Header>  
                    </View>


                    <View style={{flex: 3,}} > 
                        <ImageBackground source={require('../Image/slingle_profile_images_shap.png') } style={{width: '100%', height: '100%',  }}     >

                        <NB.View style={{justifyContent:'flex-end', flex:1}}>
                         <NB.ListItem style={{borderBottomWidth:0,}}>
                            <NB.Left>
                              <NB.Body>
                                <NB.Text style={{color:'#fff',fontSize:22,fontWeight:'bold'}}>{this.state.profileData.name}, <NB.Text style={{fontWeight:"400",color:'#fff',fontSize:22,}} >{this.state.profileData.gender.toUpperCase().charAt(0)} {this.state.profileData.age}  </NB.Text>  </NB.Text> 
                                <NB.Text style={{color:'#fff',fontSize:18,}}><Icon name="location-arrow" solid style={{color:'#fff',fontSize:16 }}  /> {this.state.profileData.address} </NB.Text>  
                                </NB.Body>
                            </NB.Left>
                            <NB.Right>
                           
                            <Icon  name="info-circle" solid style={{color:'#fff',fontSize:40 }}  />  
                            </NB.Right>
                        </NB.ListItem>
			            		</NB.View>
                           
                            
                        </ImageBackground> 
                    </View>
                  </View>
  



                  </ImageBackground> 
                </View>


                <View style={{ flex: 1,}} >   
                <NB.View   style={HomeStyle.PageContainerAbout}  >

            

            
              
              <NB.View style={{padding:20,}}>
              <NB.Text style={{fontSize:21,marginBottom:10,color:"#6c6c6c"}}>About</NB.Text>  
                  <NB.Text style={{marginBottom:10,color:'#6c6c6c',lineHeight:22,}} >
                  {this.state.profileData.bio}
 
              </NB.Text>  

               </NB.View> 
              
          
             
              </NB.View>
                
                
                </View>
         
          </View>
            
        
             
                <NB.Footer style={{height:72}} >
                    <NB.FooterTab style={{backgroundColor:'#fff',}}>
                        <NB.Button badge vertical onPress={() => this.props.navigation.navigate('Chatlist')} >
                        {/* <NB.Badge><NB.Text>2</NB.Text></NB.Badge>  */}
                        <Icon name="comment" light  style={{color:'#e41b5b',fontSize:24, marginBottom:8,}}  /> 
                        <NB.Text style={{color:'#333333',fontSize:14,}}>Message</NB.Text>
                        </NB.Button>
                        <NB.Button vertical onPress={() => this.setState({confirmVisible: true})}>
                        {this.state.profileData.is_fab.toLowerCase() == 'yes' ?
                        <Icon name="heart" solid  style={{color:'#e41b5b',fontSize:24,marginBottom:8, }}  /> 
                        :
                        <Icon name="heart" light  style={{color:'#e41b5b',fontSize:24,marginBottom:8, }}  /> 
                        }
                        <NB.Text style={{color:'#333333',fontSize:14,}} >Favorite</NB.Text>
                        </NB.Button>
                        <NB.Button    vertical> 
                        <Icon name="ban" light  style={{color:'#e41b5b',fontSize:24,marginBottom:8, }}  />  
                        <NB.Text style={{color:'#333333',fontSize:14,}}>Block</NB.Text>
                        </NB.Button>
                        <NB.Button vertical>
                        <Icon name="flag" light  style={{color:'#e41b5b',fontSize:24,marginBottom:8, }}  />   
                        <NB.Text style={{color:'#333333',fontSize:14,}}>Report</NB.Text>
                        </NB.Button>
                    </NB.FooterTab>
                </NB.Footer>

         
        </ImageBackground> 
       
    </View>
    :
    <ProgressDialog
        visible={this.state.progressVisible}
        title="Getting details"
        message="Please, wait..."
    />
    }
    <ConfirmDialog
    title="Confirmation!"
    message={this.state.confirmMessage}
    visible={this.state.confirmVisible}
    onTouchOutside={() => this.setState({confirmVisible: false})}
    positiveButton={{
        title: "YES",
        onPress: () => alert("Yes touched!")
    }}
    negativeButton={{
        title: "NO",
        onPress: () => alert("No touched!")
    }}
/>
    </Fragment>
    );
  }
 
}
{/* End Register */}