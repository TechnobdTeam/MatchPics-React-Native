import React,  { Fragment, Component } from 'react';
import { View, Image, ImageBackground, FlatList,AppRegistry, StyleSheet,TouchableOpacity,Radio,Dimensions} from 'react-native';
import * as NB from 'native-base';
// NativeBase
import {Text} from 'native-base';
//import {CustomHeader} from '../CustomHeader'
import HomeStyle from '../LayoutsStytle/HomeStyle';
import { Dialog, ProgressDialog, ConfirmDialog } from 'react-native-simple-dialogs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Slider from "react-native-slider";
import sliderData from "../Slider/Data.js";
import ConstValues from '../../constants/ConstValues'
import AsyncStorage from '@react-native-community/async-storage';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Toast from 'react-native-toast-native';


const roundTo = require('round-to');

{/*Register */}
export class Social extends React.Component {

  // const 
  //   setNonCollidingMultiSliderValue
  //  = React.useState([0, 100]);

  //  const 
  //  nonCollidingMultiSliderValue
  //  = React.useState([0, 100]);
  

  // nonCollidingMultiSliderValuesChange = values =>
  //   setNonCollidingMultiSliderValue(values);


  range_min_age = 18
  range_max_age = 70

  looking_for_id = ''
  changed_min_age = 0
  changed_max_age = 0

  constructor(props){
    super(props);
    this.state = {
      token: '',
      about_me: '',
      looking_for: '',
      user_min_age: '',
      user_max_age: '',
      min_age: 0,
      max_age: 0,
      valueMin: 0,
      valueMax: 0,
      progressVisible: false,
      data: [],
       dialog_title: '',
       show_list_for: '',
       progressVisible: false,
       changed: false
    };

  }

  componentDidMount(){

    AsyncStorage.getItem(ConstValues.user_token, (error, result) =>{

        console.log('token: ' + result)

        if(result != null){
          this.setState({token: result})
        }
    })

    this.setState({about_me: ConstValues.user_info_data.bio, 
      looking_for: ConstValues.user_info_data.looking_for,
      user_min_age: ConstValues.user_info_data.min_age,
      user_max_age: ConstValues.user_info_data.max_age,
      min_age: ConstValues.profile_all_details.discovery.age_range.min,
      max_age: ConstValues.profile_all_details.discovery.age_range.max,
      value: ConstValues.profile_all_details.discovery.age_range.min,
    })

    this.range_min_age = parseInt(ConstValues.profile_all_details.discovery.age_range.min)
    this.range_max_age = parseInt(ConstValues.profile_all_details.discovery.age_range.max)

      console.log("looking_for: " + this.state.looking_for)
      console.log("min_age: " + this.state.min_age)
      console.log("max_age: " + this.state.max_age)

      console.log("range_min_age: " + this.range_min_age)
      console.log("range_max_age: " + this.range_max_age)

      this.initIDs()
  }

  initIDs(){

    ConstValues.profile_all_details.discovery.looking_for.map((value, key) =>{
 
       console.log("looping: " + value.name)
 
       if(value.name.toLowerCase() == this.state.looking_for.toLowerCase()){
 
          this.looking_for_id = value.id
       }
    })

    console.log("user_min_agelooping: " + ConstValues.user_info_data.min_age)

    if(ConstValues.user_info_data.min_age != null && ConstValues.user_info_data.min_age != '' && ConstValues.user_info_data.min_age != undefined){

      this.setState({valueMin: parseInt(ConstValues.user_info_data.min_age)})
      this.changed_min_age = parseInt(ConstValues.user_info_data.min_age)
    }
    else{
      this.setState({valueMin: this.state.min_age})
      this.changed_min_age = this.state.min_age
    }

    if(ConstValues.user_info_data.max_age != null && ConstValues.user_info_data.max_age != '' && ConstValues.user_info_data.max_age != undefined){

      this.setState({valueMax: parseInt(ConstValues.user_info_data.max_age)})
      this.changed_max_age = parseInt(ConstValues.user_info_data.max_age)
    }
    else{
      this.setState({valueMax: this.state.max_age})
      this.changed_max_age = this.state.max_age
    }
   }


  getMatchedUserName(value){

    // var Userindex
    console.log(value | this.state.min_age)
    return sliderData[value | 0].id;
  }

  getRoundValue(value){

    var rvalue = roundTo.down(value, 0)
    this.setState({value: rvalue})
  }

  handleChange(values){

    console.log("values: " + values);

    var ageArray = values.toString().split(',');

    console.log("value min: " + ageArray[0]);
    console.log("value max: " + ageArray[1]);

    this.changed_min_age = parseInt(ageArray[0])
    this.changed_max_age = parseInt(ageArray[1])

    this.setState({changed: false, user_min_age:  ageArray[0], user_max_age: ageArray[1]})

  }

  updateProfile(){

    this.setState({progressVisible: true})

    var formData = new FormData();
        formData.append('api_key', ConstValues.api_key);
        formData.append('action_type', "update");
        formData.append('looking_for', this.looking_for_id);
        formData.append('min_age', this.changed_min_age);
        formData.append('max_age', this.changed_max_age);
        formData.append('bio', this.state.about_me);

        fetch(ConstValues.base_url + 'updateCustomerProfile',{
            method: 'POST',
            headers:{
                'Authorization': 'Bearer ' + JSON.parse(this.state.token), 
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
            }).then((response) => response.json())
            .then((responseJson) =>{
    
            console.log(responseJson.response.code);
            console.log(responseJson.response.message);

            this.setState({progressVisible: false})

            // Toast.show({
            //   text: responseJson.response.message,
            //   textStyle: { color: "yellow" },
            // })

            Toast.show(responseJson.response.message, Toast.LONG, Toast.BOTTOM,style);
    
            if(responseJson.response.code == 1000){

                ConstValues.user_info_data = responseJson.response.data ;

                console.log(ConstValues.user_info_data);
                console.log(ConstValues.user_info_data.age);

                  this.setState({about_me: ConstValues.user_info_data.bio, 
                    looking_for: ConstValues.user_info_data.looking_for,
                    user_min_age: ConstValues.user_info_data.min_age,
                    user_max_age: ConstValues.user_info_data.max_age,
                    about_me: ConstValues.user_info_data.bio,
                    changed: true
                  })
            }
            else if(responseJson.response.code == 4001){
                //session expired, need to navigate login screen
            }
            else{
                console.log("unable to save photo");
                
            }
        })
  }

  showListFor(value){

    if(value == 'looking_for'){
 
       console.log("looking_for: " + ConstValues.profile_all_details.discovery.looking_for)
       this.setState({show_list_for: 'looking_for',dialog_title: 'You are looking for?', data: ConstValues.profile_all_details.discovery.looking_for, dialogVisible: true})
    }
   }

   changeUserInfo(name, id){

    console.log("user info change: " + this.state.show_list_for + ", " + name + ", " + id)
 
    if(this.state.show_list_for == 'looking_for'){
 
       this.looking_for_id = id
       this.setState({changed: false, looking_for: name})
    }
 
    this.setState({dialogVisible: false})
   }

  render() {
    const {width, height} = Dimensions.get('window');
    return (
      <NB.Root>
       <Fragment>    
        <ImageBackground source={require('../Image/background_images.jpg') } style={{width: '100%', height: '100%', }}   > 
          <NB.Container   style={HomeStyle.EditprofileContainer}  >
            <NB.View style={HomeStyle.EditprofilePageView} >
                  <NB.CardItem style={{backgroundColor:'transparent'}} > 
                  
                     <NB.Button  iconRight transparent style={{ }}>
                          <TouchableOpacity onPress={() => this.props.navigation.navigate('MyProfile')} > 
                          <Icon name="long-arrow-alt-left"  style={{fontSize: width * 0.07,color:'#333333',  }}  /> 
                          </TouchableOpacity>
                      </NB.Button>
                    
                      <NB.Left style={{width:'100%',justifyContent: 'center', alignItems:'center'}}>
                          <NB.Text style={{fontSize: width * 0.08,color:'#333333',alignItems:'center',justifyContent:'center',fontFamily:'OpenSans-Regular',}} > Edit Profile  </NB.Text> 
                         
                      </NB.Left>
                    
                      
                    </NB.CardItem>

                    <NB.Content>
                        <NB.Form>
                          
                           <NB.Item style={{borderBottomWidth:0,}}>
                                <NB.H3 style={{color:'#333333',paddingBottom:8,fontSize: width * 0.039,paddingLeft:15,fontFamily:'OpenSans-Semibold'}}>Discovery</NB.H3>
                           </NB.Item>
                              <NB.View style={{backgroundColor:'#fff',paddingLeft:0,marginLeft:-17,}} >
                                
                                <NB.List  >
                                    <NB.ListItem selected onPress = {() => this.showListFor('looking_for')}>
                                    <NB.Left>
                                        <NB.Text style={{color:'#696969',textTransform:"uppercase",paddingLeft:30,fontFamily:'OpenSans-Regular',fontSize: width * 0.039}}>looking for</NB.Text>
                                    </NB.Left>
                                    <NB.Right style={{flex:1}} >
                                       <NB.Text style={{color:'#696969',alignItems:"center",justifyContent:"center", fontFamily:'OpenSans-Regular',fontSize: width * 0.039,paddingRight:15,}}>{this.state.looking_for} <Icon name="chevron-right"  style={{color:'#c6c6c6', fontSize: width * 0.039}}  /></NB.Text> 
                                    </NB.Right>
                                    </NB.ListItem>
                                 </NB.List> 
                                 <NB.List  >
                                    <NB.ListItem selected style={{borderBottomWidth:0,}}>
                                    <NB.Left>
                                        <NB.Text style={{color:'#696969',textTransform:"uppercase",paddingLeft:30,fontFamily:'OpenSans-Regular',fontSize: width * 0.039}}>Age range</NB.Text>
                                    </NB.Left>
                                    <NB.Right>
                                  <NB.Text style={{color:'#696969',fontSize: width * 0.039,alignItems:"center",justifyContent:"center",fontFamily:'OpenSans-Regular',paddingRight:15,}}>{this.state.user_min_age} - {this.state.user_max_age}</NB.Text> 
                                    </NB.Right> 
                                    </NB.ListItem>
                                      <View style={{paddingLeft:45,paddingRight:0,marginTop:-7,marginBottom:5,flex:1}}> 
                                         {/* <Slider
                                                value={this.state.value}
                                                onValueChange={value => this.getRoundValue(value)}
                                                trackStyle={styles.track}
                                                thumbStyle={styles.thumb}
                                                minimumValue={this.state.min_age}
                                                maximumValue={this.state.max_age} 
                                                minimumTrackTintColor='#92207e'
                                                maximumTrackTintColor='#92207e'
                                                
                                               
                                              />  */}
              <MultiSlider
              
                  values={[ this.state.valueMin,this.state.valueMax]}
                      sliderLength={307}
                      onValuesChange={values => this.handleChange(values)}
                      min={this.range_min_age}
                      max={this.range_max_age}
                      step={1}
                      allowOverlap={false}
                      snapped
                      selectedStyle={{backgroundColor:"#f74a61"}}
                      unselectedStyle={{backgroundColor:"#9e2681"}} 
                      trackStyle={{ height: 4,borderRadius:3 }}
                      pressedMarkerStyle={{ width: 30,height:30}}
                      // disabledMarkerStyle={{width: 48,height:48}}
                      markerStyle={{
                        width: 25,
                        height:25,
                        backgroundColor:"#fff",
                        shadowColor: "#000",
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                        marginTop:3,
                    
                    }}
           
                     

                      
                    />




                                              {/* <RangeSlider
                                                  min={200}
                                                  max={1000}
                                                  step={20}
                                                  rangeEnabled = {true}
                                                  selectionColor="#3df"
                                                  blankColor="#f618"
                                                  onValueChanged={(low, high, fromUser) => {
                                                      // this.setState({rangeLow: low, rangeHigh: high})
                                                  }}/> */}


                                        </View>


                                   </NB.List>
                                

                              </NB.View> 

      


                            <NB.Item style={{borderBottomWidth:0,}}>
                                <NB.H3 style={{color:'#333333',paddingBottom:8,paddingTop:20,fontSize: width * 0.039,paddingLeft:15,fontFamily:'OpenSans-Semibold'}}>About Me</NB.H3>
                           </NB.Item>
                           <NB.View style={{backgroundColor:'#fff',marginLeft:-2,}} >
                                {/* <NB.Item  > 
                                      <NB.Input style={{paddingLeft:14,paddingLeft:30,}} placeholder='FUN'/> 
                                      <Icon name="check-circle"  style={{color:'#c6c6c6',paddingRight:30,fontSize:20}}  /> 
                                </NB.Item>
                                */}

                               <NB.Textarea style={{paddingLeft:31,borderColor:"#fff",fontSize: width * 0.039,color:"#696969"}} bordered placeholderTextColor="#696969"  rowSpan={7} bordered placeholder="TYPE ABOUT ME..."  
                                 value = {this.state.about_me}
                                 onChangeText={(text) => {this.setState({changed: false, about_me: text}) }}
                               />
                                

                              </NB.View> 


                              <NB.View style={{borderBottomWidth:0,marginTop:"50%",alignItems:"center",justifyContent:"center",flex:4}} >
                                <NB.Button  iconRight  style={{backgroundColor:'#1cc875',borderRadius:50,width:'60%',justifyContent: 'center',alignItems:'center',height:58,paddingTop:4,paddingRight:18}}
                                onPress = {() => this.updateProfile()}>
                                      <NB.Text style={{color:'#ffffff',fontFamily:'OpenSans-Regular',fontSize: width * 0.037,}}>save</NB.Text>
                                      {this.state.changed ? 
                                        <Icon name="check"  style={{color:'#fff',fontSize: width * 0.037,}}  /> 
                                        :
                                        null
                                      }
                                     
                                </NB.Button> 
                                </NB.View> 

              

                            </NB.Form >

           
                            

                         
                    </NB.Content>
            
              </NB.View>
            </NB.Container>
          </ImageBackground> 



          <Dialog
         
            dialogStyle={{
                borderRadius:7,
                
            }}
            message={this.confirmMessage}
            visible={this.state.looking}
            onTouchOutside={() => this.setState({looking: false})}
            
            >
              <View>  
            
              <NB.ListItem>
                <NB.Left>
                <NB.Radio selected={false} />
                <NB.Text> Women</NB.Text>
                </NB.Left> 
              </NB.ListItem>
              <NB.ListItem>
                <NB.Left>
                <NB.Radio selected={true} />
                <NB.Text> Men</NB.Text>
                </NB.Left> 
              </NB.ListItem> 
              <NB.ListItem>
                <NB.Left>
                <NB.Radio selected={false} />
                <NB.Text> Other</NB.Text>
                </NB.Left> 
              </NB.ListItem>
            
                
              </View>

            </Dialog>

            <ProgressDialog
                  visible={this.state.progressVisible}
                  title="Updating"
                  message="Please, wait..."
              />

              <Dialog
                dialogStyle={{
                  borderRadius:7,
                  
              }}
                    visible={this.state.dialogVisible}
                    title={this.state.dialog_title}
                    onTouchOutside={() => this.setState({dialogVisible: false})} >
                    <View>
                      <FlatList
                          data={this.state.data}
                          renderItem={({item}) => <Text style={styles.item} onPress = {() => this.changeUserInfo(item.name, item.id)}>{item.name} </Text>}
                      />
                    </View>
                </Dialog>

       </Fragment>
      </NB.Root>
       
    );
  }
}
{/* End Register */}


const styles = StyleSheet.create({
 

  container: {
      margin: 15,
       
      marginBottom:0,
   
     },

  track: {
    height: 3,
    borderRadius: 3, 
    backgroundColor: '#e44c91',
  },

  thumb: {
    width: 30,
    height: 30,
    shadowColor: '#000',
    backgroundColor: '#fff',
    borderColor: '#cdcd',
    borderWidth: 1,
    borderRadius: 40 / 2,
    shadowOffset: {width: 2, height: 1},
    shadowRadius: 2,
    shadowOpacity: 0.35,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    borderBottomColor:"#e1e1e1",borderBottomWidth:1,
  },


});

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