import React,  { Fragment, Component } from 'react';
import { View, Image, ImageBackground, FlatList,AppRegistry, StyleSheet,TouchableOpacity,Dimensions} from 'react-native';
import * as NB from 'native-base';
import { Dialog, ProgressDialog } from 'react-native-simple-dialogs';
// NativeBase
import {Text, Toast} from 'native-base';
//import {CustomHeader} from '../CustomHeader'
import HomeStyle from '../LayoutsStytle/HomeStyle';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Slider from "react-native-slider";
import sliderData from "../Slider/Data.js";
import ConstValues from '../../constants/ConstValues'
import AsyncStorage from '@react-native-community/async-storage';
{/*Register */}

var appearance_length = 0;

export class Appearance extends React.Component {

   ethnicity_id = ''
   body_type_id = ''
   hair_color_id = ''
   eye_color_id = ''
   spend_time_id = ''
   smoking_id = ''
   drinking_id = ''

  constructor(props){
    super(props);
    this.state = {
       user_ethnicity: '',
       user_body_type: '',
       user_hair_color: '',
       user_eye_color: '',
       user_spend_time: '',
       user_smoking: '',
       user_drinking: '',
       token: '',
       dialogVisible: false,
       data: [],
       dialog_title: '',
       show_list_for: '',
       progressVisible: false,
       


    };

  }

  componentDidMount(){

      AsyncStorage.getItem(ConstValues.user_token, (error, result) =>{

         console.log('token: ' + result)

         if(result != null){
            this.setState({token: result})
         }
   })

   this.setState({user_ethnicity: ConstValues.user_info_data.ethnicity, 
      user_body_type: ConstValues.user_info_data.body_type,
      user_hair_color: ConstValues.user_info_data.hair_color,
      user_eye_color: ConstValues.user_info_data.eye_color,
      user_spend_time: ConstValues.user_info_data.spend_time,
      user_smoking: ConstValues.user_info_data.smoking,
      user_drinking: ConstValues.user_info_data.drinking})

      console.log("user_ethnicity: " + this.state.user_ethnicity)

      this.initIDs()
  }

  initIDs(){

   ConstValues.profile_all_details.appearance.ethnicity.map((value, key) =>{

      console.log("looping: " + value.name)

      if(value.name.toLowerCase() == this.state.user_ethnicity.toLowerCase()){

         this.ethnicity_id = value.id
      }
   })

   ConstValues.profile_all_details.appearance.body_type.map((value, key) =>{

      console.log("looping: " + value.name)

      if(value.name.toLowerCase() == this.state.user_body_type.toLowerCase()){

         this.body_type_id = value.id
      }
   })

   ConstValues.profile_all_details.appearance.hair_color.map((value, key) =>{

      console.log("looping: " + value.name)

      if(value.name.toLowerCase() == this.state.user_hair_color.toLowerCase()){

         this.hair_color_id = value.id
      }
   })

   ConstValues.profile_all_details.appearance.eye_color.map((value, key) =>{

      console.log("looping: " + value.name)

      if(value.name.toLowerCase() == this.state.user_eye_color.toLowerCase()){

         this.eye_color_id = value.id
      }
   })

   ConstValues.profile_all_details.lifestyle.spend_time.map((value, key) =>{

      console.log("looping: " + value.name)

      if(value.name.toLowerCase() == this.state.user_spend_time.toLowerCase()){

         this.spend_time_id = value.id
      }
   })

   ConstValues.profile_all_details.lifestyle.smoking.map((value, key) =>{

      console.log("looping: " + value.name)

      if(value.name.toLowerCase() == this.state.user_smoking.toLowerCase()){

         this.smoking_id = value.id
      }
   })

   ConstValues.profile_all_details.lifestyle.drinking.map((value, key) =>{

      console.log("looping: " + value.name)

      if(value.name.toLowerCase() == this.state.user_drinking.toLowerCase()){

         this.drinking_id = value.id
      }
   })
  }

  showListFor(value){

   if(value == 'ethnicity'){
      appearance_length = ConstValues.profile_all_details.appearance.ethnicity.length

      console.log("ethnicity: " +appearance_length+" ??? "+ ConstValues.profile_all_details.appearance.ethnicity)
     
      this.setState({show_list_for: 'ethnicity',dialog_title: 'Select your ethnicity', data: ConstValues.profile_all_details.appearance.ethnicity, dialogVisible: true, })
   }
   else if(value == 'body_type'){
      appearance_length = ConstValues.profile_all_details.appearance.body_type.length

      console.log("body_type: " + ConstValues.profile_all_details.appearance.body_type)
      this.setState({show_list_for: 'body_type',dialog_title: 'Select body type', data: ConstValues.profile_all_details.appearance.body_type, dialogVisible: true})
   }
   else if(value == 'hair_color'){
      appearance_length = ConstValues.profile_all_details.appearance.hair_color.length
      console.log("hair_color: " + ConstValues.profile_all_details.appearance.hair_color)
      this.setState({show_list_for: 'hair_color',dialog_title: 'Select hair color', data: ConstValues.profile_all_details.appearance.hair_color, dialogVisible: true})
   }
   else if(value == 'eye_color'){
      appearance_length = ConstValues.profile_all_details.appearance.eye_color.length
      console.log("eye_color: " + ConstValues.profile_all_details.appearance.eye_color)
      this.setState({show_list_for: 'eye_color',dialog_title: 'Select eye color', data: ConstValues.profile_all_details.appearance.eye_color, dialogVisible: true})
   }
   else if(value == 'spend_time'){
      
      console.log("spend_time >>>: " + ConstValues.profile_all_details.lifestyle.spend_time.length)
      appearance_length = ConstValues.profile_all_details.lifestyle.spend_time.length
      this.setState({show_list_for: 'spend_time',dialog_title: 'Your favorite way to spend time', data: ConstValues.profile_all_details.lifestyle.spend_time, dialogVisible: true})
   }
   else if(value == 'smoking'){
      appearance_length = ConstValues.profile_all_details.lifestyle.smoking.length
      console.log("smoking: " + ConstValues.profile_all_details.lifestyle.smoking)
      this.setState({show_list_for: 'smoking',dialog_title: 'Select smoking type', data: ConstValues.profile_all_details.lifestyle.smoking, dialogVisible: true})
   }
   else if(value == 'drinking'){
      appearance_length = ConstValues.profile_all_details.lifestyle.drinking.length
      console.log("drinking: " + ConstValues.profile_all_details.lifestyle.drinking)
      this.setState({show_list_for: 'drinking', dialog_title: 'Select drinking type', data: ConstValues.profile_all_details.lifestyle.drinking, dialogVisible: true})
   }
  }

  changeUserInfo(name, id){

   console.log("user info change: " + this.state.show_list_for + ", " + name + ", " + id)

   if(this.state.show_list_for == 'ethnicity'){

      this.ethnicity_id = id
      this.setState({user_ethnicity: name})
   }
   else if(this.state.show_list_for == 'body_type'){

      this.body_type_id = id
      this.setState({user_body_type: name})
   }

   else if(this.state.show_list_for == 'hair_color'){

      this.hair_color_id = id
      this.setState({user_hair_color : name})
   }

   else if(this.state.show_list_for == 'eye_color'){

      this.eye_color_id = id
      this.setState({user_eye_color : name})
   }

   else if(this.state.show_list_for == 'spend_time'){

      this.spend_time_id = id
      this.setState({user_spend_time : name})
   }

   else if(this.state.show_list_for == 'smoking'){

      this.smoking_id = id
      this.setState({user_smoking : name})
   }

   else if(this.state.show_list_for == 'drinking'){

      this.drinking_id = id
      this.setState({user_drinking : name})
   }

   this.setState({dialogVisible: false})
  }


  updateProfile(){

   this.setState({progressVisible: true})

   console.log("ethinicity_id: " + this.ethnicity_id)

   var formData = new FormData();
       formData.append('api_key', ConstValues.api_key);
       formData.append('action_type', "update");
       formData.append('ethnicity', this.ethnicity_id);
       formData.append('body_type', this.body_type_id);
       formData.append('hair_color', this.hair_color_id);
       formData.append('eye_color', this.eye_color_id);
       formData.append('smoking', this.smoking_id);
       formData.append('drinking', this.drinking_id);
       formData.append('spend_time', this.spend_time_id);

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

           Toast.show({
             text: responseJson.response.message,
             textStyle: { color: "yellow" },
           })
   
           if(responseJson.response.code == 1000){

               ConstValues.user_info_data = responseJson.response.data ;

               console.log(ConstValues.user_info_data);
               console.log(ConstValues.user_info_data.age);

               this.setState({user_ethnicity: ConstValues.user_info_data.ethnicity, 
                  user_body_type: ConstValues.user_info_data.body_type,
                  user_hair_color: ConstValues.user_info_data.hair_color,
                  user_eye_color: ConstValues.user_info_data.eye_color,
                  user_spend_time: ConstValues.user_info_data.spend_time,
                  user_smoking: ConstValues.user_info_data.smoking,
                  user_drinking: ConstValues.user_info_data.drinking})
           }
           else if(responseJson.response.code == 4001){
               //session expired, need to navigate login screen
           }
           else{
               console.log("unable to save photo");
               
           }
       })
 }


  getMatchedUserName(value){

    // var Userindex
    console.log(value | 0)
    return sliderData[value | 0].id;
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
                                 <NB.Text style={{fontSize: width * 0.08,fontFamily:'OpenSans-Regular',color:'#333333',alignItems:'center',justifyContent:'center'}} > Edit Profile  </NB.Text> 
                                 
                              </NB.Left>
                           
                              
                           </NB.CardItem>

                           <NB.Content>
                                 <NB.Form>
                                 
                                    <NB.Item style={{borderBottomWidth:0,}}>
                                       <NB.H3 style={{color:'#333333',paddingBottom:8,fontSize: width * 0.039,fontFamily:'OpenSans-Semibold',paddingLeft:15,}}>Appearence</NB.H3>
                                    </NB.Item>
                                       <NB.View style={{backgroundColor:'#fff',paddingLeft:0,marginLeft:-17,}} >
                                       
                                       <NB.List  >
                                             <NB.ListItem selected onPress = {() => this.showListFor('ethnicity')}>
                                             <NB.Left   >
                                                <NB.Text style={{color:'#333333',textTransform:"uppercase",paddingLeft:30,fontSize: width * 0.039,fontFamily:'OpenSans-Regular',}}>Ethnicity</NB.Text>
                                             </NB.Left>
                                             <NB.Right style={{flex:2}}>
                                                <NB.Text style={{paddingRight:15,color:'#696969',fontSize: width * 0.039,fontFamily:'OpenSans-Regular',alignItems:"center",justifyContent:"center", }}>{this.state.user_ethnicity}  <Icon name="chevron-right"  style={{color:'#c6c6c6',paddingRight:25,fontSize: width * 0.039,}}  /></NB.Text> 
                                             </NB.Right>
                                             </NB.ListItem>
                                          </NB.List>

                                          <NB.List  >
                                             <NB.ListItem selected onPress = {() => this.showListFor('body_type')}>
                                             <NB.Left>
                                                <NB.Text style={{color:'#333333',textTransform:"uppercase",paddingLeft:30,ffontSize: width * 0.039,fontFamily:'OpenSans-Regular',}}>body type</NB.Text>
                                             </NB.Left>
                                             <NB.Right style={{flex:1,}}>
                                                <NB.Text style={{paddingRight:15,color:'#696969',alignItems:"center",justifyContent:"center",fontSize: width * 0.039,fontFamily:'OpenSans-Regular',}}>{this.state.user_body_type}  <Icon name="chevron-right"  style={{color:'#c6c6c6',paddingRight:25,fontSize: width * 0.039,}}  /></NB.Text> 
                                             </NB.Right>
                                             </NB.ListItem>
                                          </NB.List>

                                          <NB.List  >
                                             <NB.ListItem selected onPress = {() => this.showListFor('hair_color')}>
                                             <NB.Left>
                                                <NB.Text style={{color:'#333333',textTransform:"uppercase",paddingLeft:30,fontSize: width * 0.039,fontFamily:'OpenSans-Regular',}}>Hair color</NB.Text>
                                             </NB.Left>
                                             <NB.Right style={{flex:1,}}>
                                                <NB.Text style={{paddingRight:15,color:'#696969',alignItems:"center",justifyContent:"center",fontSize: width * 0.039,fontFamily:'OpenSans-Regular',}}>{this.state.user_hair_color}  <Icon name="chevron-right"  style={{color:'#c6c6c6',paddingRight:25,fontSize: width * 0.039,}}  /></NB.Text> 
                                             </NB.Right>
                                             </NB.ListItem>
                                          </NB.List>

                                          <NB.List  >
                                             <NB.ListItem selected onPress = {() => this.showListFor('eye_color')}>
                                             <NB.Left>
                                                <NB.Text style={{color:'#333333',textTransform:"uppercase",paddingLeft:30,fontSize: width * 0.039,fontFamily:'OpenSans-Regular',}}>eye color</NB.Text>
                                             </NB.Left>
                                             <NB.Right style={{flex:1,}}>
                                                <NB.Text style={{paddingRight:15,color:'#696969',alignItems:"center",justifyContent:"center",fontSize: width * 0.039,fontFamily:'OpenSans-Regular',}}>{this.state.user_eye_color} <Icon name="chevron-right"  style={{color:'#c6c6c6',paddingRight:25,fontSize: width * 0.039,}}  /></NB.Text> 
                                             </NB.Right>
                                             </NB.ListItem>
                                          </NB.List>



         
                                       

                                       </NB.View> 


                                    <NB.Item style={{borderBottomWidth:0,}}>
                                       <NB.H3 style={{color:'#333333',paddingBottom:8,paddingTop:20,fontSize: width * 0.039,fontFamily:'OpenSans-Semibold',paddingLeft:15,}}>Lifestyle</NB.H3>
                                    </NB.Item>
                                 
                                    <NB.View style={{backgroundColor:'#fff',paddingLeft:0,marginLeft:-17,}} >

                                          <NB.List  >
                                             <NB.ListItem selected onPress = {() => this.showListFor('spend_time')}>
                                             
                                          <NB.Text style={{color:'#333333',textTransform:"uppercase",paddingLeft:30,width:"60%",fontSize: width * 0.039,fontFamily:'OpenSans-Regular',}}>favorite way to spend time</NB.Text>
                                          
                                             <NB.Right style={{flex:1,}}>
                                                <NB.Text style={{paddingRight:15,color:'#696969',alignItems:"center",justifyContent:"center",fontSize: width * 0.039,fontFamily:'OpenSans-Regular',}}>{this.state.user_spend_time} <Icon name="chevron-right"  style={{color:'#c6c6c6',paddingRight:25,fontSize: width * 0.039,}}  /></NB.Text> 
                                             </NB.Right>
                                             </NB.ListItem>
                                          </NB.List>


                                          <NB.List  >
                                             <NB.ListItem selected onPress = {() => this.showListFor('smoking')}>
                                             <NB.Left>
                                                <NB.Text style={{color:'#333333',textTransform:"uppercase",paddingLeft:30,fontSize: width * 0.039,fontFamily:'OpenSans-Regular',}}>Smoking</NB.Text>
                                             </NB.Left>
                                             <NB.Right style={{flex:1,}}>
                                                <NB.Text style={{paddingRight:15,color:'#696969',alignItems:"center",justifyContent:"center",fontSize: width * 0.039,fontFamily:'OpenSans-Regular',}}>{this.state.user_smoking} <Icon name="chevron-right"  style={{color:'#c6c6c6',paddingRight:25,fontSize: width * 0.039,}}  /></NB.Text> 
                                             </NB.Right>
                                             </NB.ListItem>
                                          </NB.List>



                                          <NB.List  >
                                             <NB.ListItem selected onPress = {() => this.showListFor('drinking')}>
                                             <NB.Left>
                                                <NB.Text style={{color:'#333333',textTransform:"uppercase",paddingLeft:30,fontSize: width * 0.039,fontFamily:'OpenSans-Regular',}}>drinking</NB.Text>
                                             </NB.Left>
                                             <NB.Right style={{flex:1,}}>
                                                <NB.Text style={{paddingRight:15,color:'#696969',alignItems:"center",justifyContent:"center",fontSize: width * 0.039,fontFamily:'OpenSans-Regular',}}>{this.state.user_drinking} <Icon name="chevron-right"  style={{color:'#c6c6c6',paddingRight:25,fontSize: width * 0.039,}}  /></NB.Text> 
                                             </NB.Right>
                                             </NB.ListItem>
                                          </NB.List>

                                          {/* <NB.List  >
                                             <NB.ListItem selected>
                                             <NB.Left>
                                                <NB.Text style={{color:'#333333',textTransform:"uppercase",paddingLeft:30,fontSize: width * 0.039,fontFamily:'OpenSans-Regular',}}>asdfas dfasdf</NB.Text>
                                             </NB.Left>
                                             <NB.Right style={{flex:1,}}>
                                                <NB.Text style={{paddingRight:15,color:'#696969',alignItems:"center",justifyContent:"center",fontSize: width * 0.039,fontFamily:'OpenSans-Regular',}}>asdfasdfasdf  <Icon name="chevron-right"  style={{color:'#c6c6c6',paddingRight:25,fontSize: width * 0.039,}}  /></NB.Text> 
                                             </NB.Right>
                                             </NB.ListItem>
                                          </NB.List> */}



                                    
                                    </NB.View> 
                                    

                                       <NB.Item style={{borderBottomWidth:0,justifyContent: 'center',alignItems:'center',marginTop:"30%",}} >
                                       <NB.Button  iconRight  style={{backgroundColor:'#1cc875',borderRadius:50,width:'60%',justifyContent: 'center',alignItems:'center',height:58,paddingTop:4,paddingRight:18}}
                                       onPress = {() => this.updateProfile()}>
                                             <NB.Text style={{fontSize: width * 0.037,color:'#ffffff',fontFamily:'OpenSans-Regular'}}>save</NB.Text><Icon name="check"  style={{color:'#fff',fontSize: width * 0.037,}}  /> 
                                             
                                       </NB.Button> 
                                    </NB.Item>

                                    </NB.Form >



                           </NB.Content>

                           <Dialog
                                 visible={this.state.dialogVisible}
                                 title={this.state.dialog_title}
                                 onTouchOutside={() => this.setState({dialogVisible: false})} >
                                 <View>
                                    <FlatList
                                       data={this.state.data}
                                       renderItem={({item, index}) =><TouchableOpacity><Text style={ index == (appearance_length-1) ? styles.item_last: styles.item}  
                                       onPress = {() => this.changeUserInfo(item.name, item.id)}>{item.name} </Text></TouchableOpacity>}
                                    />
                                 </View>
                              </Dialog>

                              <ProgressDialog
                                 visible={this.state.progressVisible}
                                 title="Updating"
                                 message="Please, wait..."
                           />
                     
                     </NB.View>
                     </NB.Container>
                  </ImageBackground> 

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
 item_last: {
   padding: 10,
   fontSize: 18,
   height: 44,
 }
});