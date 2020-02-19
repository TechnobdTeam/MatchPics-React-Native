import React,  { Fragment, Component } from 'react';
import { View, Image, ImageBackground,KeyboardAvoidingView } from 'react-native';
import * as NB from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';
import { MaterialDialog } from 'react-native-material-dialog';
import { Dialog, ProgressDialog } from 'react-native-simple-dialogs';
// NativeBase
import {Text, Toast, Root} from 'native-base';
//import {CustomHeader} from '../CustomHeader'
import HomeStyle from '../LayoutsStytle/HomeStyle';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ConstValues from '../../constants/ConstValues'

{/*Login  */}
export class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showToast: false,
      email: '',
      password: '',
      customer_id: '',
      progressVisible: false 
    };
  }

  componentDidMount(){
    console.log("user_name: " + ConstValues.user_name)
    console.log("user_id: " + ConstValues.user_id)
    console.log("user_token: " + ConstValues.user_token)
    console.log("customer_id: " + ConstValues.customer_id)
    console.log("user_email: " + ConstValues.user_email)

    AsyncStorage.getItem(ConstValues.user_logged_in , (error, result) => {

      if(result != null){
        if(result == true){

          console.log("logged_in_status: " + result);
        }
        else{
          console.log("logged_in_status: " + result);
        }
      }
      else{
        console.log("logged_in_status: not logged in" );
      }
      })

    if(AsyncStorage.getItem(ConstValues.user_logged_in) == true){
      
    }
  }

  //method to verify user login credential
  verifyLogin=()=>{

    if((this.state.email == '') || (this.state.password == '')){
      alert('Please put all fields and try again!');
      return;
    }
    else{     

      this.setState({ progressVisible: true });

      this.timeoutHandle = setTimeout(()=>{

      var formData = new FormData();
      formData.append('api_key', ConstValues.api_key);
      formData.append('user_name', this.state.email);
      formData.append('password', this.state.password);

      fetch(ConstValues.base_url + 'login',{
        method: 'POST',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,

      }).then((response) => response.json())
      .then((responseJson) =>{

        this.setState({ progressVisible: false });

        if(responseJson.response.code == 1000){

          this.storeData(ConstValues.user_logged_in, true);

          try {
            this.storeData(ConstValues.user_email, responseJson.response.data.email);
            this.storeData(ConstValues.user_id, responseJson.response.data.id);
            this.storeData(ConstValues.user_token, responseJson.response.data.token);
            this.storeData(ConstValues.customer_id, responseJson.response.data.customer_id);
            this.storeData(ConstValues.user_name, responseJson.response.data.name);
            this.storeData(ConstValues.user_password, this.state.password);

            // alert(responseJson.response.message)
            Toast.show({
              text: responseJson.response.message,
              textStyle: { color: "green" },
            })

            // this.timeoutHandle = setTimeout(()=>{

              this.props.navigation.navigate('UploadImage')

              var resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'UploadImage' })],
              });
        
              this.props.navigation.dispatch(resetAction);

            

          } catch (error) {
             Toast.show({
                text: error,
                textStyle: { color: "yellow" },
                buttonText: "Okay"
              })
             
            // alert(error)
            // Error saving data
          }
        }
        else{
          this.storeData(ConstValues.user_logged_in, false);
          Toast.show({
            text: responseJson.response.message,
            textStyle: { color: "yellow" },
            buttonText: "Okay"
          })
            // alert(responseJson.response.message)
        }
        
        //alert(responseJson.response.code)
      })
      .catch((error) =>{
        this.storeData(ConstValues.user_logged_in, false);
        alert("exeption: " + error)
        
      })
      }, 300);

    }

    
  }

  storeData(key,value) {
    try {
      AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      // saving error
      console.log("saving_error: " + e.message);
    }
  }

  // getData = (key) =>{
  //   try {
  //     AsyncStorage.getItem(key, (err, item) => {
  //       console.log("saved_value: " + item)
  //        return "" + {item};
  //     });
    
  //   } catch(e) {
  //     // error reading value
  //     return "catch";
  //   }
  // }

  async _getStorageValue(key){
    var value = await AsyncStorage.getItem(key)
    return value
  }

  getData = (key) => {
    var return_value = "";

    AsyncStorage.getItem(key, (err, item) => {

      return item;
      return_value = item;

      // this.timeoutHandle = setTimeout(()=>{

      //   return return_value;
       
      //   }, 5000);

      console.log("value_value22: " + item + ", " + return_value);

      // this.setState({customer_id : item})

      
    });



    

    // try {
    //   var value = "";
    //   AsyncStorage.getItem(key, (err, item) => {
    //     this.customer_id = item
    //   });
    //   // console.log("item_value: " + item);
    //   console.log("value_value: " + this.customer_id);
    //   if(value !== null) {
    //     return value;
    //     // value previously stored
    //   }
    // } catch(e) {
    //   console.log("value_error " + e.message);
    //   // error reading value
    // }
  }
    render() {
      return ( 
        <Root>
        <Fragment>   
      
         <ImageBackground source={require('../Image/background_images.jpg') } style={{width: '100%', height: '100%', }}   > 
          <NB.Container  style={HomeStyle.PageContainerLogin}  >
            
          
            <NB.View style={HomeStyle.PageView} >
                  <NB.CardItem style={{backgroundColor:'transparent'}} > 
                        
                      <NB.Left style={{width:'100%',  justifyContent: 'center',}}>
                          <NB.Text style={HomeStyle.SingIn} > Sign In   </NB.Text> 
                         
                      </NB.Left>
                      {/* <NB.Button onPress={() => this.props.navigation.navigate('Menu')} iconRight transparent style={{marginTop:-20,}}>
                          <NB.Icon  name="close" style={{fontSize:30,color:'#333333', }}  /> 
                      </NB.Button> */}
                      
                    </NB.CardItem>

                    
                      <NB.Content style={HomeStyle.FormContent} >
                       
                         <NB.Form >
                            <NB.Item  style={{marginTop:20}} >
                              <NB.Input   placeholder='EMAIL'
                                onChangeText={(value) => this.setState({email: value})}
                              /> 
                            </NB.Item>
                            <NB.Item style={{marginTop:50}}>
                              <NB.Input   placeholder='PASSWORD'
                                onChangeText={(value) => this.setState({password: value})} secureTextEntry={true}
                              />
                              {/* <NB.Icon name='close-circle' /> */}
                            </NB.Item> 
                          
                             <NB.Item style={{borderBottomWidth:0,justifyContent: 'center', alignItems:'center',marginTop:40,marginBottom:30,}} >
                              <NB.Text style={{fontSize:21,color:'#333333',}}> Forgot Password? </NB.Text>
                             </NB.Item> 

                             <NB.Item style={{borderBottomWidth:0,justifyContent: 'center',alignItems:'center'}} >
                                <NB.Button style={{shadowOpacity: 0,elevation:0,backgroundColor:'#ff1a00',borderRadius:50,width:'75%',justifyContent: 'center',alignItems:'center',height:59,}} onPress={() => this.verifyLogin()}>
                                      <NB.Text style={{fontSize:18,color:'#ffffff',}}>Sign in</NB.Text>
                                </NB.Button> 
                             </NB.Item>
                              
                             </NB.Form >

                             <NB.Form >

                           



                             <NB.Item style={{borderBottomWidth:0,justifyContent: 'center',alignItems:'center',marginTop:10,}} >
                                <NB.Button iconLeft light  style={{shadowOpacity: 0,elevation:0,backgroundColor:'#3b5998',borderRadius:50,width:'99%',height:59,  justifyContent: 'center',alignItems:"center"}} onPress={() =>
                                    Toast.show({
                                      text: "Wrong password!",
                                      textStyle: { color: "yellow" },
                                      buttonText: "Okay"
                                    })
                                  }>
                                   <NB.Text style={{fontSize:18,color:'#ffffff',}}>  <Icon name={'facebook-f'}  style={{fontSize:24,color:'#fff', }} light />   Sign in with facebook</NB.Text>
                                </NB.Button> 
                             </NB.Item>


                             <NB.Item style={{borderBottomWidth:0,justifyContent: 'center', alignItems:'center',marginTop:90,marginBottom:15,}} >
                              <NB.Text style={{fontSize:21,color:'#333333',}}>Don’t have a account yet? </NB.Text>
                             </NB.Item>  
                                <NB.Item style={{borderBottomWidth:0,justifyContent: 'center',alignItems:'center',marginTop:5,marginBottom:10,}} >
                                    <NB.Button onPress={() => this.props.navigation.navigate('Register')}  iconLeft light  style={{shadowOpacity: 0,elevation:0,backgroundColor:'#ff9900',width:'80%',height:58,  justifyContent: 'center',alignItems:"center"}}>
                                      <NB.Text style={{fontSize:18,color:'#ffffff',}}>  sign up for free</NB.Text>
                                    </NB.Button> 
                              </NB.Item>

                             </NB.Form> 
                            
                      </NB.Content>
           
                         
                      <ProgressDialog
                        visible={this.state.progressVisible}
                        title="Verifying"
                        message="Please, wait..."
                    />
            
              </NB.View>
         

            </NB.Container>
          </ImageBackground> 
      
      </Fragment>
        </Root>
      );
    }
  }
  {/* End Login */}