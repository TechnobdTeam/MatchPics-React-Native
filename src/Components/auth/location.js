import React,  { Fragment, Component } from 'react';
import { View, Image, ImageBackground, PermissionsAndroid,AppRegistry, StyleSheet,TouchableOpacity} from 'react-native';
import * as NB from 'native-base';
// NativeBase
import {Text} from 'native-base';
//import {CustomHeader} from '../CustomHeader'
import HomeStyle from '../LayoutsStytle/HomeStyle';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Slider from "react-native-slider";
import sliderData from "../Slider/Data.js";
import { Dialog, ProgressDialog, ConfirmDialog } from 'react-native-simple-dialogs';
import ConstValues from '../../constants/ConstValues'
{/*Register */}
export class location  extends React.Component {


  constructor(props){
    super(props);
    this.state = {
      user_location:''
    };

  }

  componentDidMount(){
    this.setState({user_location: ConstValues.user_info_data.address})
  }


  getMatchedUserName(value){

    // var Userindex
    console.log(value | 0)
    return sliderData[value | 0].id;
  }


  render() {
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

                    <View style={{flex: 1, }}>
                        <View style={{flex: 1,}} > 
                        <NB.Item style={{borderBottomWidth:0,}}>
                                <NB.H3 style={{color:'#333333',paddingBottom:8,fontSize:17,fontWeight:'bold',paddingLeft:15,}}>Location</NB.H3>
                           </NB.Item> 
                                <NB.View style={{backgroundColor:'#fff',}} > 
                                <TouchableOpacity onPress={() => this.setState({looking: true})} >
                                    <NB.CardItem   > 
                                        <NB.Body>
                           +--                     <NB.Text  style={{color:'#333333',textTransform:"uppercase",paddingLeft:3,}}>My current location</NB.Text>
                                                {(this.state.user_location == undefined || this.state.user_location == '') ? 
                                                  <NB.Text  style={{color:'#696969',textTransform:"uppercase",paddingLeft:3,}}>Set Location</NB.Text>
                                                  :
                                                  <NB.Text  style={{color:'#696969',textTransform:"uppercase",paddingLeft:3,}}>{this.state.user_location}</NB.Text>
                                                }
                                            </NB.Body>  
                                        <View>
                                            <Icon name="chevron-right"  style={{color:'#c6c6c6',paddingRight:25,fontSize:17,}}  /> 
                                        </View>
                                </NB.CardItem>   
                                </TouchableOpacity>
                                </NB.View>   
                        
                        </View>
                        
                        <View style={{flex: 4, backgroundColor: '#f3f3f3',alignItems:"center",justifyContent:"flex-end",marginBottom:30,}} >

                                    <NB.Button  iconRight  style={{backgroundColor:'#1cc875',borderRadius:50,width:'70%',justifyContent: 'center',alignItems:'center',height:58,paddingTop:0,}}>
                                        <NB.Text style={{fontSize:17,color:'#ffffff',}}>save </NB.Text>
                                        <Icon name="check"  style={{color:'#fff',paddingRight:30,fontSize:17}}  /> 
                                    </NB.Button>  
                        </View>
                    </View> 
            
              </NB.View>

              <ConfirmDialog
        // title="Confirmation!ss"
       
        message={this.confirmMessage}
        visible={this.state.looking}
        onTouchOutside={() => this.setState({looking: false})}
        dialogStyle={{ 
            borderRadius:5,
            
        }

        }
        >
          <View>  
             
            
             <NB.Text>Google map</NB.Text>
           
            
           </View>

</ConfirmDialog>


            </NB.Container>
          </ImageBackground> 

  </Fragment>
       
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
  }


});