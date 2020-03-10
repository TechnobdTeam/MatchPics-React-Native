import React,  { Fragment, Component } from 'react';
import { View, Image, ImageBackground, PermissionsAndroid,AppRegistry, StyleSheet,Dimensions,TouchableOpacity} from 'react-native';
import * as NB from 'native-base';
// NativeBase
import {Text} from 'native-base';
//import {CustomHeader} from '../CustomHeader'
import HomeStyle from '../LayoutsStytle/HomeStyle';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Dialog, ProgressDialog, ConfirmDialog } from 'react-native-simple-dialogs';
import { WebView } from 'react-native-webview';
{/*Register */}
export class Termsconditions  extends React.Component {

 
  constructor(props){
    super(props);
    this.state = {
      progressVisible: true,
    };
  }
  

  render() {
    const {width, height} = Dimensions.get('window');
    return (
        <Fragment>    
        <ImageBackground source={require('../Image/background_images.jpg') } style={{width: '100%', height: '100%', }}   > 
          <NB.Container   style={HomeStyle.EditprofileContainer}  >
            <NB.View style={HomeStyle.EditprofilePageView} >
                  <NB.CardItem style={{backgroundColor:'transparent'}} > 
                        
                     <NB.Button  iconRight transparent style={{ }}>
                      <TouchableOpacity onPress={() => this.props.navigation.navigate('Menu')} > 
                          <Icon name="long-arrow-alt-left"  style={{fontSize: width * 0.06,color:'#333333',  }}  />
                          </TouchableOpacity> 
                      </NB.Button>
                      <NB.Left style={{width:'100%',justifyContent: 'center', alignItems:'center'}}>
                          <NB.Text style={{fontSize: width * 0.05,fontFamily:'OpenSans-Regular',color:'#333333',alignItems:'center',justifyContent:'center'}} > Terms & Conditions </NB.Text> 
                         
                      </NB.Left>
                    
                      
                    </NB.CardItem>

                    <View style={{flex: 1, }}>

                        <WebView
                          source={{uri: 'https://al-quran.technobdapis.com/home/disclaimer'}}
                          style={{marginTop: 10}}
                          onLoadEnd={this.state.progressVisible ? this.setState({progressVisible: false}) : null}
                        />

                        {this.state.progressVisible == true ? 
                          <ProgressDialog
                                    visible={this.state.progressVisible}
                                    title="Loading"
                                    message="Please wait..."
                                />
                                :
                                null
                        }
                       
                    </View> 
            
              </NB.View>

           


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