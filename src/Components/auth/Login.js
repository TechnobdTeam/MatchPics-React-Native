import React,  { Fragment, Component } from 'react';
import { View, Image, ImageBackground,KeyboardAvoidingView,StatusBar,Dimensions } from 'react-native';
import * as NB from 'native-base';
import {Toast} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';
import { MaterialDialog } from 'react-native-material-dialog';
import { Dialog, ProgressDialog } from 'react-native-simple-dialogs';
// NativeBase
import {Text, Root} from 'native-base';
//import {CustomHeader} from '../CustomHeader'
import HomeStyle from '../LayoutsStytle/HomeStyle';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ConstValues from '../../constants/ConstValues'
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
// import Toast from 'react-native-toast-native';

{/*Login  */}

export class Login extends React.Component {

  access_token = '' 

  loginWithFB(){
    console.log("api will be called for social login")
    this.setState({progressVisible: true});

    var formData = new FormData();
      formData.append('api_key', ConstValues.api_key);
      formData.append('facebook_access_token', this.access_token);

      fetch(ConstValues.base_url + 'socialLogin',{
        method: 'POST',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,

      }).then((response) => response.json())
      .then((responseJson) =>{

        this.setState({ progressVisible: false });

        console.log('login responnse: ' + responseJson.response.message);

        Toast.show({
          text: responseJson.response.message,
          textStyle: { color: "white" },
        })

        if(responseJson.response.code == 1000){

          this.storeData(ConstValues.user_logged_in, true);
          this.storeData(ConstValues.fb_login, true);

          try {
            this.storeData(ConstValues.user_email, responseJson.response.data.email);
            this.storeData(ConstValues.user_id, responseJson.response.data.id);
            this.storeData(ConstValues.user_token, responseJson.response.data.token);
            this.storeData(ConstValues.customer_id, responseJson.response.data.customer_id);
            this.storeData(ConstValues.user_name, responseJson.response.data.name);

            // alert(responseJson.response.message)
           
            // Toast.show(responseJson.response.message, Toast.LONG, Toast.BOTTOM,style);

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
                textStyle: { color: "white" },
                buttonText: "Okay"
              })
              // Toast.show(error, Toast.LONG, Toast.BOTTOM,style);
             
            // alert(error)
            // Error saving data
          }
        }
        else{
          this.storeData(ConstValues.access_token, '');
          this.storeData(ConstValues.user_logged_in, false);
          this.storeData(ConstValues.fb_login, false);
          // Toast.show(responseJson.response.message, Toast.LONG, Toast.BOTTOM,style);
            // alert(responseJson.response.message)
        }
        
        //alert(responseJson.response.code)
      })
      .catch((error) =>{
        this.storeData(ConstValues.user_logged_in, false);
        this.storeData(ConstValues.fb_login, false);
        alert("exeptionlogin: " + error)
        
      })
    
  }


  _fbAuth() {
    console.log("method called");
    // LoginManager.logInWithPermissions(['public_profile', 'email']).then(function(result) {
    //   if (result.isCancelled) {
    //     console.log("Login Cancelled");
    //   } else {
    //     console.log("Login Success permission granted:" + result.grantedPermissions);
    //   }
    // }, function(error) {
    //    console.log("some error occurred!!");
    // })




  LoginManager.logInWithPermissions(['public_profile', 'email'])
  .then(function (result) {
    if (result.isCancelled) {
      alert('Login cancelled');
    } else {
      AccessToken
        .getCurrentAccessToken()
        .then((data) => {
          // let accessToken = data.accessToken
          // console.log("access_token: " + accessToken)
          // access_token = "" + accessToken;
          // this.loginWithFB();
          // this.loginWithFB()
          // alert(accessToken.toString())

          // const responseInfoCallback = (error, result) => {
          //   if (error) {
          //     console.log(error)
          //     alert('Error fetching data: ' + error.toString());
          //   } else {
          //     console.log(result)
          //     console.log(result.name)
          //     console.log(result.email)
          //     console.log(result.id)

          //     // alert('Success fetching data: ' + result.toString());
          //   }
          // }

          // const infoRequest = new GraphRequest('/me', {
          //   accessToken: accessToken,
          //   parameters: {
          //     fields: {
          //       string: 'email,name,first_name,middle_name,last_name'
          //     }
          //   }
          // }, responseInfoCallback);

          // // Start the graph request.
          // new GraphRequestManager()
          //   .addRequest(infoRequest)
          //   .start()

        })
    }
  }, function (error) {
    alert('Login fail with error: ' + error);
   });
  }

  loginWithFaceBook = async (tokenFace) => {
    console.log("login successful " + tokenFace)
    this.access_token = tokenFace;
    this.storeData(ConstValues.access_token, this.access_token);
    this.loginWithFB()
    // this.saveTokenLogin(tokenFace); 
}

  async handleFacebookLogin() {
    const _this = this;
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
        function (result) {
            if (result.isCancelled) {
                console.log('Login cancelled')
            } else {
                console.log('Login success with permissions: ' + result.grantedPermissions.toString())
                let tokenFace = '';
                AccessToken.getCurrentAccessToken().then(
                    async (data) => {
                        // data.accessToken)
                        console.log("access_token: " + data.accessToken)

                        _this.loginWithFaceBook(data.accessToken);

                        // let resultChild = await loginWithFaceBook(data.accessToken.toString(), "POST");
                        
                        // if (resultChild.username.length > 0) {
                        //   console.log("access_token resultChild.username: " + resultChild.username)
                        //     _this.loginWithFaceBook(resultChild.token);
                        // }
                    });
            }
        },
        function (error) {
            console.log('Login fail with error: ' + error)
        }
    )
}



  constructor(props) {
    super(props);
    this.state = {
      showToast: false,
      email: '',
      password: '',
      customer_id: '',
      progressVisible: false 
    };

    // this.onSuccess = this.onSuccess.bind(this);
    // this.onError = this.onError.bind(this);
    // this.onSignInWithFacebook = this.onSignInWithFacebook.bind(this);
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

        console.log('login responnse: ' + responseJson.response.message);

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
              textStyle: { color: "white" },
            })

            // Toast.show(responseJson.response.message, Toast.LONG, Toast.BOTTOM,style);

            this.timeoutHandle = setTimeout(()=>{

              this.props.navigation.navigate('UploadImage')

              var resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'UploadImage' })],
              });
        
              this.props.navigation.dispatch(resetAction);

            }, 500);

          } catch (error) {
            // Toast.show(responseJson.response.message, Toast.LONG, Toast.BOTTOM,style);
             Toast.show({
                text: error,
                textStyle: { color: "white" },
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
            textStyle: { color: "white" },
            buttonText: "Okay"
          })
          // Toast.show(responseJson.response.message, Toast.LONG, Toast.BOTTOM,style);
            // alert(responseJson.response.message)
        }
        
        //alert(responseJson.response.code)
      })
      .catch((error) =>{
        this.storeData(ConstValues.user_logged_in, false);
        alert("exeptionlogin: " + error)
        
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
  }



    render() {
      const {width, height} = Dimensions.get('window');
      return (  
        <Root>
        <Fragment>   
         <StatusBar  barStyle="light-content" backgroundColor="#e74e92" />
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
                              <NB.Input style={{fontSize: width * 0.032,color:"#696969",fontFamily:'OpenSans-Bold'}}   placeholderTextColor="#696969"  placeholder='EMAIL'
                                onChangeText={(value) => this.setState({email: value})}
                              /> 
                            </NB.Item>
                            <NB.Item style={{marginTop:50}}>
                              <NB.Input style={{fontSize: width * 0.032,color:"#696969",fontFamily:'OpenSans-Bold'}}  placeholderTextColor="#696969"   placeholder='PASSWORD'
                                onChangeText={(value) => this.setState({password: value})} secureTextEntry={true}
                              />
                              {/* <NB.Icon name='close-circle' /> */}
                            </NB.Item> 
                          
                             <NB.Item style={{borderBottomWidth:0,justifyContent: 'center', alignItems:'center',marginTop:50,marginBottom:30,}} >
                              <NB.Text  onPress={() => this.props.navigation.navigate('ForgotPassword')}  style={{fontSize: width * 0.038,color:'#333333',fontFamily:'OpenSans-Bold',textDecorationLine: 'underline'}}>Forgot Password?</NB.Text>
                             </NB.Item> 

                             <NB.Item style={{borderBottomWidth:0,justifyContent: 'center',alignItems:'center'}} >
                                <NB.Button style={{shadowOpacity: 0,elevation:0,backgroundColor:'#ff1a00',borderRadius:50,justifyContent: 'center',alignItems:'center',height:59,paddingLeft:62,paddingRight:62}} onPress={() => this.verifyLogin()}>
                                      <NB.Text style={{fontSize: width * 0.032,color:'#ffffff',fontFamily:'OpenSans-Bold'}}>Sign in</NB.Text>
                                </NB.Button> 
                             </NB.Item>
                              
                             </NB.Form >

                             <NB.Form >

                           



                             <NB.Item style={{borderBottomWidth:0,justifyContent: 'center',alignItems:'center',marginTop:10,}} >
                                <NB.Button iconLeft light  style={{shadowOpacity: 0,elevation:0,backgroundColor:'#3b5998',borderRadius:50,height:59,  justifyContent: 'center',alignItems:"center",paddingTop:2,paddingLeft:11,paddingRight:18}} 
                                onPress={() => this.handleFacebookLogin()}>
                                   <NB.Text style={{fontSize: width * 0.032,color:'#ffffff',fontFamily:'OpenSans-Bold' }}>  <Icon name={'facebook-f'}  style={{fontSize:16,color:'#fff',marginTop:4}} light />   Sign in with facebook</NB.Text>
                                </NB.Button> 
                             </NB.Item>


                             <NB.Item style={{borderBottomWidth:0,justifyContent: 'center', alignItems:'center',marginTop:"40%",marginBottom:15,}} >
                              <NB.Text style={{fontSize: width * 0.037,color:'#333333',fontFamily:'OpenSans-Bold'}}>Don’t have a account yet? </NB.Text>
                             </NB.Item>  
                                <NB.Item style={{borderBottomWidth:0,justifyContent: 'center',alignItems:'center',marginTop:5,marginBottom:10,}} >
                                    <NB.Button onPress={() => this.props.navigation.navigate('Register')}  iconLeft light  style={{shadowOpacity: 0,elevation:0,backgroundColor:'#ff9900',height:58,  justifyContent: 'center',alignItems:"center",paddingLeft:33,paddingRight:33}}>
                                      <NB.Text style={{fontSize: width * 0.032,color:'#ffffff',fontFamily:'OpenSans-Bold'}}>  sign up for free</NB.Text>
                                    </NB.Button> 
                              </NB.Item>

                             </NB.Form> 
                            
                      </NB.Content>
           
                         
                      <ProgressDialog
                        visible={this.state.progressVisible}
                        title="Signing in"
                        message="Please wait..."
                    />
            
              </NB.View>
         

            </NB.Container>
          </ImageBackground> 
      
      </Fragment>
        </Root>
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
  {/* End Login */}