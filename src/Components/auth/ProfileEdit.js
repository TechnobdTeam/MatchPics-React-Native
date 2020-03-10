import React,  { Fragment, Component ,useState } from 'react';
import { Image, ImageBackground,TouchableOpacity,  Radio,View, Button,Dimensions} from 'react-native';
import * as NB from 'native-base';
import { Dialog, ProgressDialog } from 'react-native-simple-dialogs';
// NativeBase
import {Text,DatePicker,} from 'native-base';
//import {CustomHeader} from '../CustomHeader'
import HomeStyle from '../LayoutsStytle/HomeStyle';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DateTimePicker from '@react-native-community/datetimepicker'
import ConstValues from '../../constants/ConstValues'
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-toast-native';

// const [date, setDate] = useState(new Date(1598051730000));
// const [mode, setMode] = useState('date');
// const [show, setShow] = useState(false);
{/*Register */}

const onChange = (event, selectedDate) => {
  const currentDate = selectedDate || date;

  setDate(currentDate);
  setShow(Platform.OS === 'ios' ? true : false);
};

var months = {
  'Jan' : '01',
  'Feb' : '02',
  'Mar' : '03',
  'Apr' : '04',
  'May' : '05',
  'Jun' : '06',
  'Jul' : '07',
  'Aug' : '08',
  'Sep' : '09',
  'Oct' : '10',
  'Nov' : '11',
  'Dec' : '12'
}

export class ProfileEdit extends React.Component {

  here_for_id = ''
  changed_name = ''
  changed_dob = ''

  // onChange = (event, selectedDate) => {
  //   currentDate = selectedDate || date;
 
  //   setDate(currentDate);
  //   setShow(Platform.OS === 'ios' ? true : false);
  // };
 
  // showMode = currentMode => {
  //   setShow(true);
  //   setMode(currentMode);
  // };
 
  // showDatepicker = () => {
  //   showMode('date');
  // };
 
  // showTimepicker = () => {
  //   showMode('time');
  // };

     /// Search //********************** */
   
  
    example = () => {
  
      this.setState({ name_visible: !this.state.name_visible })
     }

   
  ///   checkbox
  constructor(props) {
    super(props);
 

    this.state = {
      checkbox1: true,
      checkbox2: true,
      checkbox3: true,
      checkbox4: false,
      token: '',
      date: new Date(Date.now()),
      date_to: new Date(Date.now()),
      mode: 'date',
      show: false,
      name_visible : true,
      user_name: '',
      user_here_for: '',
      user_dob: '',
      here_for: {},
      progressVisible: false,
      changed: false
    };

  }
  toggleSwitch1() {
    console.log("changed value: " + this.state.changed)
    this.setState({
      changed: false,
      checkbox1: !this.state.checkbox1
    });
    console.log("changed value2: " + this.state.changed)
  }
  toggleSwitch2() {
    this.setState({
      checkbox2: !this.state.checkbox2
    });
  }
  toggleSwitch3() {
    this.setState({
      checkbox3: !this.state.checkbox3
    });
  }
  toggleSwitch4() {
    this.setState({
      checkbox4: !this.state.checkbox4
    });
  }

  componentDidMount(){

    AsyncStorage.getItem(ConstValues.user_token, (error, result) =>{

      console.log('token: ' + result)

      if(result != null){
          this.setState({token: result})
      }
  })

    this.setState({user_name: ConstValues.user_info_data.full_name, user_here_for: ConstValues.user_info_data.here_for,
      user_dob: ConstValues.user_info_data.dob})
    console.log(this.state.user_name);
  }

  setDate = (event, date) => {
    date = date || this.state.date;
    
    this.setState({
    show: Platform.OS === 'ios' ? true : false,
    date,
    });
    
    console.log("selected_date: " + date)
    
    var dateArray = date.toString().split(' ');

  
    var day = dateArray[2];
    var year = dateArray[3];
    var month = dateArray[1]

  //   Object.entries(months).map(([key, value]) => {

  //     if(key.toLowerCase() == dateArray[1].toLowerCase()){

  //       console.log("matched_month: " + key)

  //       month = value;
        
  //     }
  //   }
     
  //  )

    this.changed_dob = day + "-" + month + "-" + year;
    this.setState({changed: false, user_dob: this.changed_dob})
    }

  show = mode => {
    this.setState({
    show: true,
    mode,
    });
    };
    
    datepicker = () => {
    this.show('date');
    };
    
    timepicker = () => {
    this.show('time');
    };
   
  updateProfile(){

    this.setState({progressVisible: true})

    var formData = new FormData();
        formData.append('api_key', ConstValues.api_key);
        formData.append('action_type', "update");
        formData.append('full_name', this.state.user_name);
        formData.append('user_dob', this.state.user_dob);
        formData.append('here_for', this.here_for_id);

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

                this.setState({changed: true, user_name: ConstValues.user_info_data.full_name, user_here_for: ConstValues.user_info_data.here_for,
                  user_dob: ConstValues.user_info_data.dob})
            }
            else if(responseJson.response.code == 4001){
                //session expired, need to navigate login screen
            }
            else{
                console.log("unable to save photo");
                
            }
        })
  }
  
  render() {
    const { statusBarPaddingTop } = this.state; 
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
                                    <NB.H3 style={{color:'#333333',paddingBottom:8,fontFamily:'OpenSans-Semibold',fontSize: width * 0.039,paddingLeft:15,}}>Real Name</NB.H3>
                              </NB.Item>
                                  <NB.View style={{backgroundColor:'#fff',paddingLeft:0,marginLeft:-17,}} >
                                    
                                    <NB.List >
                                    {this.state.name_visible == false ?
                                          <NB.ListItem selected style={{padding:0,margin:0,height:53}}>
                                          
                                        <NB.Input style={{fontFamily:'OpenSans-Regular',fontSize: width * 0.039,paddingLeft:30,}} 
                                        value = {this.state.user_name}
                                          onChangeText = {val => this.setState({ changed: false, user_name: val })}
                                        /> 
                                          
                                        </NB.ListItem>

                                          : 
                                        <NB.ListItem selected>
                                          <TouchableOpacity  onPress= {() => this.example()} style={{flex:1,flexDirection: 'row'}}>
                                        <NB.Left>
                                            <NB.Text style={{color:'#696969',textTransform:"uppercase",paddingLeft:30,fontFamily:'OpenSans-Regular',fontSize: width * 0.039}}>{this.state.user_name}</NB.Text>
                                        </NB.Left>
                                        <NB.Right>
                                        <Icon name="chevron-right"  style={{color:'#c6c6c6',paddingRight:15,fontSize:17}}  /> 
                                        </NB.Right>
                                        </TouchableOpacity>
                                        </NB.ListItem>

                                          }

                                    </NB.List>
                                    

                                  </NB.View> 


                                <NB.Item style={{borderBottomWidth:0,}}>
                                    <NB.H3 style={{color:'#333333',paddingBottom:8,paddingTop:20,fontFamily:'OpenSans-Semibold',fontSize: width * 0.039,paddingLeft:15,}}>Here For</NB.H3>
                              </NB.Item>
                              <NB.View style={{backgroundColor:'#fff',marginLeft:-2,}} >

                          
              
              
              {ConstValues.profile_all_details.basic.here_for.map((item,i) => {

                console.log("here_for: " + item.name);
                {(this.here_for_id == '' || this.here_for_id == undefined) ? 
                item.name.toLowerCase() == this.state.user_here_for.toLowerCase() ? 
                this.here_for_id = item.id
                :
                this.here_for_id = 0
                :
                null
                }
                
                console.log("here_for_id: " + this.here_for_id);

                return <NB.ListItem button onPress={() =>  this.toggleSwitch1()} style={{paddingLeft:30,marginLeft:-12,paddingRight:30,}} >
                <NB.Body>
                  <NB.Text style={{color:"#696969",fontFamily:'OpenSans-Regular',fontSize: width * 0.039}}>{item.name}</NB.Text>
                </NB.Body>
                <NB.CheckBox
                  style={{borderRadius:15,fontSize: width * 0.039}} 
                  color="#c6c6c6"
                  checked={item.name.toLowerCase() == this.state.user_here_for.toLowerCase() ? true : false}
                  onPress={() => {this.setState({changed: false, user_here_for: item.name}), this.here_for_id= item.id}}
                />
              </NB.ListItem>
              }
              )}

              
              {/* <NB.ListItem button onPress={() => this.toggleSwitch2()} style={{paddingLeft:30,marginLeft:-12,paddingRight:30,}} >
              <NB.Body>
                  <NB.Text style={{color:"#696969",fontSize:17,}} >WHATEVER</NB.Text>
                </NB.Body>
                <NB.CheckBox
                style={{borderRadius:15,}} 
                color="#00c6ff"
                  
                  checked={this.state.checkbox2}
                  onPress={() => this.toggleSwitch2()}
                />
              
              </NB.ListItem>
              <NB.ListItem button onPress={() => this.toggleSwitch3()} style={{paddingLeft:30,marginLeft:-12,paddingRight:30,}} >
              <NB.Body>
                  <NB.Text style={{color:"#696969",fontSize:17,}} >DATING</NB.Text>
                </NB.Body>
                <NB.CheckBox
                  style={{borderRadius:15,}} 
                  color="#00c6ff" 
                  checked={this.state.checkbox3}
                  onPress={() => this.toggleSwitch3()}
                />
            
              </NB.ListItem>
              <NB.ListItem button onPress={() => this.toggleSwitch4()} style={{paddingLeft:30,marginLeft:-12,paddingRight:30,}} >
              <NB.Body>
                  <NB.Text style={{color:"#696969",fontSize:17,}}>FRIENDSHIP</NB.Text>
                </NB.Body>
              
                <NB.CheckBox
                style={{borderRadius:15,}} 
                color="#c6c6c6"
                  checked={this.state.checkbox4}
                  onPress={() => this.toggleSwitch4()}
                />
              
              </NB.ListItem> */}
            
    
                                    

                                  </NB.View> 


                                  <NB.Item style={{borderBottomWidth:0,}}>
                                    <NB.H3 style={{color:'#333333',paddingBottom:8,paddingTop:20,fontFamily:'OpenSans-Semibold',fontSize: width * 0.039,paddingLeft:15,}}>Birthday</NB.H3>
                              </NB.Item>
                              <NB.View style={{backgroundColor:'#fff',marginLeft:-17,}} >
                             
                                    <NB.List  >
                                    
                                        <NB.ListItem onPress={() => this.datepicker()}  selected>
                                        
                                        <NB.Left>
                                            <NB.Text onPress={() => this.datepicker()}   style={{color:'#696969',paddingLeft:30,textTransform:"uppercase",fontFamily:'OpenSans-Regular',fontSize: width * 0.039}}>{this.state.user_dob != '' ? this.state.user_dob : "Select Birthday"}</NB.Text>
                          
                                        </NB.Left>
                                        <NB.Right>
                                          
                                            <Icon onPress={() => this.datepicker()}  name="chevron-right"  style={{color:'#c6c6c6',paddingRight:15,fontSize:17}}  /> 
                                        </NB.Right>
                                       
                                        </NB.ListItem>
                                        
                                    </NB.List>
                                
              
                                  </NB.View> 
                                

                                  <NB.Item style={{borderBottomWidth:0,justifyContent: 'center',alignItems:'center',marginTop:"33%",marginBottom:30}} >
                                    <NB.Button  iconRight  style={{backgroundColor:'#1cc875',borderRadius:50,width:'60%',justifyContent: 'center',alignItems:'center',height:58,paddingTop:4,paddingRight:18}}
                                    onPress = {() => this.updateProfile()}>
                                          <NB.Text style={{fontSize: width * 0.037,color:'#ffffff',fontFamily:'OpenSans-Regular'}}>save</NB.Text>
                                          {this.state.changed ? 
                                            <Icon name="check"  style={{color:'#fff',fontSize:17}}  /> 
                                            :
                                            null
                                          }
                                    </NB.Button> 
                                </NB.Item>

                                </NB.Form >



                        </NB.Content>
                
                  </NB.View>
                </NB.Container>
              </ImageBackground> 

              {this.state.show && (
                <DateTimePicker
                testID="dateTimePicker"
                timeZoneOffsetInMinutes={0}
                value={this.state.date}
                mode={this.state.mode}
                is24Hour={false}
                display="default"
                onChange={this.setDate}
                />
                )}

                <ProgressDialog
                        visible={this.state.progressVisible}
                        title="Updating"
                        message="Please, wait..."
                    />
      
      </Fragment>
      </NB.Root>
       
    );
  

  }
}

const style={
  backgroundColor: "#000000",
  width: 400,
  height: Platform.OS === ("ios") ? 50 : 135,
  color: "#ffffff",
  fontSize: 15,
  lineHeight: 2,
  lines: 1,
  borderRadius: 15,
  fontWeight: "bold",
  yOffset: 40
};
