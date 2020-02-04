import React,  { Fragment, Component } from 'react';
import { View, Image, ImageBackground} from 'react-native';
import * as NB from 'native-base';
// NativeBase
import { Button, Text } from 'native-base';

{/*Login  */}
export class Splash extends React.Component {
    render() {
      return (  
        <Fragment >    
            <ImageBackground source={require('../Image/splash.jpg') } style={{width: '100%', height: '100%', justifyContent: 'center', alignItems:'center',}}   > 
            <Button light style={{marginTop:10}}
                 onPress={() => this.props.navigation.navigate('UploadImage')}
                > 
                  <Text> Login  ..</Text>
                </Button>
                  <Image  source={require('../Image/logo.png')}  style={{ bottom:140, position:'absolute'}}    />   
            </ImageBackground> 
        </Fragment>  
      );
    }
  }
  {/* End Login */}