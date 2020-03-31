import React,  { Fragment, Component } from 'react';
import { View, Image, ImageBackground,StatusBar,Dimensions,TouchableOpacity} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import * as NB from 'native-base';
// NativeBase
//import {CustomHeader} from '../CustomHeader'
import HomeStyle from '../LayoutsStytle/HomeStyle';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Text, Root} from 'native-base';
import ConstValues from '../../constants/ConstValues'
import { Dialog, ProgressDialog } from 'react-native-simple-dialogs';
// import Toast from 'react-native-toast-native';
{/*Register */}
export class ForgotPassword extends React.Component {


  message = '';

  constructor(props){
    super(props);
    this.state = {
        showToast: false,
        progressVisible: false,
        messageDialogVisible: false,
        user_email: '',
        close_screen: false
      };
    }

  forgotPassword(){

    if(this.state.user_email == ''){
      // Toast.show({
      //   text: "Please write your email and try again!",
      //   textStyle: { color: "yellow" },
      //   buttonText: "Okay"
      // })
      // Toast.show("Please write your email and try again!", Toast.LONG, Toast.BOTTOM,style);
    }
    else{
      this.setState({ progressVisible: true });

      var formData = new FormData();
      formData.append('api_key', ConstValues.api_key);
      formData.append('user_name', this.state.user_email);


      fetch(ConstValues.base_url + 'forgotPassword',{
        method: 'POST',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,

      }).then((response) => response.json())
      .then((responseJson) =>{

        console.log('forgotPassword responnse: ' + responseJson.response.message);

        this.message = responseJson.response.message;

        if(responseJson.response.code == 1000){

          this.setState({close_screen: true})
        }
        else{
          // Toast.show({
          //   text: responseJson.response.message,
          //   textStyle: { color: "yellow" },
          //   buttonText: "Okay"
          // })
            // alert(responseJson.response.message)
            // Toast.show(responseJson.response.message, Toast.LONG, Toast.BOTTOM,style);
        }
        this.setState({progressVisible: false, messageDialogVisible: true});
        
        //alert(responseJson.response.code)
      })
      .catch((error) =>{
        // this.storeData(ConstValues.user_logged_in, false);
        alert("exeptionforgotPassword: " + error)
        
      })
    }
  }

  close_screen(){

    this.props.navigation.navigate('Login')

    var resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Login' })],
    });

    this.props.navigation.dispatch(resetAction);
  }

  render() {
    const {width, height} = Dimensions.get('window');
    return (
        <Root>
        <Fragment>   
        <StatusBar barStyle="light-content" backgroundColor="#e74e92" />
         <ImageBackground source={require('../Image/background_images.jpg') } style={{width: '100%', height: '100%', }}   > 
          <NB.Container  style={HomeStyle.PageContainerLogin}  >
            
          
            <NB.View style={HomeStyle.PageView} >

            <NB.CardItem style={{backgroundColor:'transparent'}} > 

                <NB.Button  iconRight transparent >
                   <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} >  
                      <Icon name="long-arrow-alt-left"  style={{fontSize: width * 0.06,color:'#333333',  }}  /> 
                      </TouchableOpacity>
                  </NB.Button>

                      
                    <NB.Left style={{width:'100%',justifyContent: 'center', alignItems:'center'}}>

                    
                          <NB.Text style={{   fontSize: width * 0.05,fontFamily:'OpenSans-Bold',color:'#333333',  alignItems:'center', justifyContent:'center',fontFamily:'OpenSans-Bold',}} >Forgot Password   </NB.Text> 
                         
                      </NB.Left>
         
                      
                    </NB.CardItem>

 

                    
                      <View style={{flex:1,alignItems:"center", justifyContent:"center"}} >
                       
                         <NB.Form >
                            <NB.Item  style={{marginTop:20}} >
                              <NB.Input  style={{fontFamily:'OpenSans-Bold',fontSize: width * 0.037,color:"#696969"}} placeholder='Write your email...'
                              onChangeText={(value) => this.setState({user_email: value})}
                              /> 
                            </NB.Item> 


                            
                            <NB.Item style={{borderBottomWidth:0,justifyContent: 'center',alignItems:'center',marginTop:30,}} >
                                <NB.Button style={{shadowOpacity: 0,elevation:0,backgroundColor:'#ff1a00',borderRadius:50,width:'80%',justifyContent: 'center',alignItems:'center',height:59,}} onPress={() => this.forgotPassword()}>
                                      <NB.Text style={{fontSize: width * 0.037,color:'#ffffff',fontFamily:'OpenSans-Bold',}}>SUBMIT</NB.Text>
                                </NB.Button> 
                             </NB.Item>
                              
                             </NB.Form >
 
                            
                        </View>
           
                    
            
              </NB.View>

              <ProgressDialog
                        visible={this.state.progressVisible}
                        title="Please wait..."
                        message="Verifying and sendding instruction"
                    />

              <Dialog
                  visible={this.state.messageDialogVisible}
                  // title="Custom Dialog"
                   >
                  <NB.View>
                      <NB.Text style={{   fontSize:18, color:'#333333',  alignItems:'center', justifyContent:'center'}} >{this.message}  </NB.Text> 

                      <NB.Item style={{borderBottomWidth:0,justifyContent: 'center',alignItems:'center',marginTop:30,}} >
                                <NB.Button style={{shadowOpacity: 0,elevation:0,backgroundColor:'green',borderRadius:50,width:'80%',justifyContent: 'center',alignItems:'center',height:49,}} onPress = {() => {this.state.close_screen ? 
                                this.close_screen()
                                :
                                this.setState({messageDialogVisible: false})}
                                }>
                                      <NB.Text style={{fontSize:18,color:'#ffffff',}}>Okay</NB.Text>
                                </NB.Button> 
                             </NB.Item>
                  </NB.View>
              </Dialog>
         

            </NB.Container>
          </ImageBackground> 
      
      </Fragment>
        </Root>
       
    );
  }
}

const {width, height} = Dimensions.get('window');

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
{/* End Register */}