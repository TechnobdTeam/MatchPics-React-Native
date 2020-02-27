import React,  { Fragment, Component ,useState } from 'react';
import { Image, ImageBackground,TouchableOpacity,  Radio,View, Button,} from 'react-native';
import * as NB from 'native-base';
// NativeBase
import {Text,DatePicker,} from 'native-base';
//import {CustomHeader} from '../CustomHeader'
import HomeStyle from '../LayoutsStytle/HomeStyle';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DateTimePicker from '@react-native-community/datetimepicker'

// const [date, setDate] = useState(new Date(1598051730000));
// const [mode, setMode] = useState('date');
// const [show, setShow] = useState(false);
{/*Register */}
export class ProfileEdit extends React.Component {



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
     state = {
      search: '',
    };
  
    updateSearch = search => {
      this.setState({ search });
    };
  
  
    example = () => {
  
      this.setState({ visible: !this.state.visible })
     }

   
  ///   checkbox
  constructor(props) {
    super(props);

 

    this.state = {
      checkbox1: true,
      checkbox2: true,
      checkbox3: true,
      checkbox4: false,
      date: new Date(Date.now()),
      date_to: new Date(Date.now()),
      mode: 'date',
      show: false,
    };
  }
  toggleSwitch1() {
    this.setState({
      checkbox1: !this.state.checkbox1
    });
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
   
  
  render() {
    const { statusBarPaddingTop } = this.state; 

 
    return (
        <Fragment>    
        <ImageBackground source={require('../Image/background_images.jpg') } style={{width: '100%', height: '100%', }}   > 
          <NB.Container   style={HomeStyle.EditprofileContainer}  >
            <NB.View style={HomeStyle.EditprofilePageView} >
                  <NB.CardItem style={{backgroundColor:'transparent'}} > 
                        
                     <NB.Button onPress={() => this.props.navigation.navigate('MyProfile')} iconRight transparent style={{ }}>
                      
                          <Icon name="long-arrow-alt-left"  style={{fontSize:30,color:'#333333',  }}  /> 
                      </NB.Button>
                      <NB.Left style={{width:'100%',justifyContent: 'center', alignItems:'center'}}>
                          <NB.Text style={{fontSize:40,color:'#333333',alignItems:'center',justifyContent:'center'}} > Edit Profile  </NB.Text> 
                         
                      </NB.Left>
                    
                      
                    </NB.CardItem>

                    <NB.Content>
                        <NB.Form>
                          
                           <NB.Item style={{borderBottomWidth:0,}}>
                                <NB.H3 style={{color:'#333333',paddingBottom:8,fontSize:17,fontWeight:'bold',paddingLeft:15,}}>Real Name</NB.H3>
                           </NB.Item>
                              <NB.View style={{backgroundColor:'#fff',paddingLeft:0,marginLeft:-17,}} >
                                
                                <NB.List >
                                {this.state.visible == false ?
                                      <NB.ListItem selected style={{padding:0,margin:0,height:53}}>
                                       
                                     <NB.Input style={{paddingLeft:14,paddingLeft:30,}} placeholder='Enter your name ..'/> 
                                      
                                     </NB.ListItem>

                                      : 
                                    <NB.ListItem selected>
                                      <TouchableOpacity  onPress= {() => this.example()} style={{flex:1,flexDirection: 'row'}}>
                                    <NB.Left>
                                        <NB.Text style={{color:'#696969',paddingLeft:17,textTransform:"uppercase",paddingLeft:30,}}>B hossain kanon</NB.Text>
                                    </NB.Left>
                                    <NB.Right>
                                    <Icon name="chevron-right"  style={{color:'#c6c6c6',paddingRight:25,fontSize:17}}  /> 
                                    </NB.Right>
                                    </TouchableOpacity>
                                    </NB.ListItem>

                                      }

                                 </NB.List>
                                

                              </NB.View> 


                            <NB.Item style={{borderBottomWidth:0,}}>
                                <NB.H3 style={{color:'#333333',paddingBottom:8,paddingTop:20,fontSize:17,fontWeight:'bold',paddingLeft:15,}}>Here For</NB.H3>
                           </NB.Item>
                          <NB.View style={{backgroundColor:'#fff',marginLeft:-2,}} >

                       
           
          <NB.ListItem button onPress={() => this.toggleSwitch1()} style={{paddingLeft:30,marginLeft:-12,paddingRight:30,}} >
           
            <NB.Body>
              <NB.Text style={{color:"#696969",fontSize:17,}}>FUN</NB.Text>
            </NB.Body>
            <NB.CheckBox
               style={{borderRadius:15,}} 
              color="#c6c6c6"
              checked={this.state.checkbox1}
              onPress={() => this.toggleSwitch1()}
            />
          </NB.ListItem>
          <NB.ListItem button onPress={() => this.toggleSwitch2()} style={{paddingLeft:30,marginLeft:-12,paddingRight:30,}} >
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
          
          </NB.ListItem>
         
 
                                

                              </NB.View> 


                              <NB.Item style={{borderBottomWidth:0,}}>
                                <NB.H3 style={{color:'#333333',paddingBottom:8,paddingTop:20,fontSize:17,fontWeight:'bold',paddingLeft:15,}}>Birthday</NB.H3>
                           </NB.Item>
                          <NB.View style={{backgroundColor:'#fff',marginLeft:-17,}} >
                                
                                <NB.List  >
                                    <NB.ListItem selected>
                                    <NB.Left>
                                        <NB.Text onPress={() => this.datepicker()}   style={{color:'#696969',paddingLeft:30,textTransform:"uppercase"}}>26 October 1998</NB.Text>
                       
                                    </NB.Left>
                                    <NB.Right>
                                       
                                        <Icon name="chevron-right"  style={{color:'#c6c6c6',paddingRight:25,fontSize:17}}  /> 
                                    </NB.Right>
               
                                    </NB.ListItem>
                                 </NB.List>

          
                              </NB.View> 
                            

                              <NB.Item style={{borderBottomWidth:0,justifyContent: 'center',alignItems:'center',marginTop:"32%",marginBottom:30}} >
                                <NB.Button  iconRight  style={{backgroundColor:'#1cc875',borderRadius:50,width:'70%',justifyContent: 'center',alignItems:'center',height:58,paddingTop:0,}}>
                                      <NB.Text style={{fontSize:17,color:'#ffffff',}}>save </NB.Text>
                                      <Icon name="check"  style={{color:'#fff',paddingRight:30,fontSize:17}}  /> 
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
  
  </Fragment>
       
    );
  

  }
}
