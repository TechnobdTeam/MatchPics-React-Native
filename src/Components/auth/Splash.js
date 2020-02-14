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
          this.props.navigation.navigate('UploadImage');
          this.setState({rouuting: 'UploadImage'});
          this.updateRaouting();
          this.props.navigation.dispatch(this.state.resetAction);
        }
        else{
          console.log("logged_in_status:false>>> " + result);
          this.props.navigation.navigate('Login');
          this.setState({rouuting: 'Login'});
          this.updateRaouting();
          this.props.navigation.dispatch(this.state.resetAction);
        }
      }, 1500);
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