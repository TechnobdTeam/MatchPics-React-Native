import React,  { Fragment, Component } from 'react';
import { View, Image, ImageBackground} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import * as NB from 'native-base';
// NativeBase
import { Button, Text } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import ConstValues from '../../constants/ConstValues'

{/*Login  */}

export class Splash extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        rouuting: 'Login',
        resetAction: '',
        user_email: '',
        user_password: ''
      };
    }

    updateRaouting(){

      this.state.resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: this.state.rouuting })],
      });

      console.log("resetAction_value: " + this.state.resetAction);
    }

  componentDidMount(){

    AsyncStorage.getItem(ConstValues.user_logged_in , (error, result) => {

      if(result != null){

        this.timeoutHandle = setTimeout(()=>{

        if(result == 'true'){
          console.log("logged_in_status:true>>> " + result);

          AsyncStorage.getItem(ConstValues.user_email , (error, result) => {
            this.setState({user_email: result})
          }).then(
            AsyncStorage.getItem(ConstValues.user_password , (error, result) => {
              this.setState({user_password: result})
            }).then(
              this.timeoutHandle = setTimeout(()=>{
                this.userBackgroundLogin()
              }, 1000)
            )
          )
        }
        else{
          console.log("logged_in_status:false>>> " + result);
          this.props.navigation.navigate('Login');
          this.setState({rouuting: 'Login'});
          this.updateRaouting();
          this.props.navigation.dispatch(this.state.resetAction);
        }
      }, 500);
      }
      else{
        console.log("logged_in_status: not logged in" );
        this.props.navigation.navigate('Login');
        // routing = "Login";
        this.setState({rouuting: 'Login'});
        this.updateRaouting();
          this.props.navigation.dispatch(this.state.resetAction);
      }
    })
  }

  userBackgroundLogin(){

    console.log("user background login");

    var formData = new FormData();
      formData.append('api_key', ConstValues.api_key);
      formData.append('user_name', JSON.parse(this.state.user_email));
      formData.append('password', JSON.parse(this.state.user_password));

      fetch(ConstValues.base_url + 'login',{
        method: 'POST',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,

      }).then((response) => response.json())
      .then((responseJson) =>{

        // this.setState({ progressVisible: false });

        console.log("background login: " + responseJson.response.message);
        console.log("background login: " + responseJson.response.data.token);

        if(responseJson.response.code == 1000){

          this.storeData(ConstValues.user_logged_in, true);

          try {
            this.storeData(ConstValues.user_email, responseJson.response.data.email);
            this.storeData(ConstValues.user_id, responseJson.response.data.id);
            this.storeData(ConstValues.user_token, responseJson.response.data.token);
            this.storeData(ConstValues.customer_id, responseJson.response.data.customer_id);
            this.storeData(ConstValues.user_name, responseJson.response.data.name);           

            // this.timeoutHandle = setTimeout(()=>{

              this.props.navigation.navigate('UploadImage');
              this.setState({rouuting: 'UploadImage'});
              this.updateRaouting();
              this.props.navigation.dispatch(this.state.resetAction);

            

          } catch (error) {
            this.storeData(ConstValues.user_logged_in, false);

            this.storeData(ConstValues.user_email, '');
            this.storeData(ConstValues.user_id, '');
            this.storeData(ConstValues.user_token, '');
            this.storeData(ConstValues.customer_id, '');
            this.storeData(ConstValues.user_name, '');
        
            this.props.navigation.navigate('Login');
            this.setState({rouuting: 'Login'});
            this.updateRaouting();
            this.props.navigation.dispatch(this.state.resetAction);
             
            // alert(error)
            // Error saving data
          }
        }
        else{
          this.storeData(ConstValues.user_logged_in, false);

          this.storeData(ConstValues.user_email, '');
          this.storeData(ConstValues.user_id, '');
          this.storeData(ConstValues.user_token, '');
          this.storeData(ConstValues.customer_id, '');
          this.storeData(ConstValues.user_name, '');
      
          this.props.navigation.navigate('Login');
          this.setState({rouuting: 'Login'});
          this.updateRaouting();
          this.props.navigation.dispatch(this.state.resetAction);
            // alert(responseJson.response.message)
        }
        
        //alert(responseJson.response.code)
      })
      .catch((error) =>{
        this.storeData(ConstValues.user_logged_in, false);

        this.storeData(ConstValues.user_email, '');
        this.storeData(ConstValues.user_id, '');
        this.storeData(ConstValues.user_token, '');
        this.storeData(ConstValues.customer_id, '');
        this.storeData(ConstValues.user_name, '');

        this.props.navigation.navigate('Login');
        this.setState({rouuting: 'Login'});
        this.updateRaouting();
        this.props.navigation.dispatch(this.state.resetAction);
            
      })
  }

  storeData(key,value) {
    try {
      AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      // saving error
      console.log("saving_error: " + e.message);
    }
  }

  getData = (key) => {
    var return_value = "";

    AsyncStorage.getItem(key, (err, item) => {

      return item;
      return_value = item;
    });
  }

    render() {
      return (  
        <Fragment >    
            <ImageBackground source={require('../Image/splash.jpg') } style={{width: '100%', height: '100%', justifyContent: 'center', alignItems:'center',}}   > 
            <Button light style={{marginTop:10}}
                 onPress={() => this.props.navigation.navigate('UploadImage')}
                > 
                  {/* <Text> Login  ..</Text> */}
                </Button>
                  <Image  source={require('../Image/logo.png')}  style={{ bottom:140, position:'absolute'}}    />   
            </ImageBackground> 
        </Fragment>  
      );
    }
  }
  {/* End Login */}