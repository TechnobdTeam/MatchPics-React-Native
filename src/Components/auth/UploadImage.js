import React,  { Fragment, Component } from 'react';
import { View, Image, ImageBackground} from 'react-native';
import * as NB from 'native-base';
//import RangeSlider from 'rn-range-slider';
// NativeBase
import {Text} from 'native-base';
//import {CustomHeader} from '../CustomHeader'
import HomeStyle from '../LayoutsStytle/HomeStyle';


{/*Register */}
export class UploadImage extends React.Component {
  render() {
    return (
      <Fragment> 

       <ImageBackground source={require('../Image/background_uplode_images.jpg') } style={{width: '100%', height: '100%', }}   >

       <NB.Container   style={HomeStyle.PageContainer}  >

          <NB.Header  transparent>
            <NB.Left>
              <NB.Button transparent onPress={() => this.props.navigation.navigate('Menu')} >
                <NB.Icon name="ios-menu" />
              </NB.Button>
            </NB.Left>

            <NB.Body  >
            <NB.Segment style={{backgroundColor:'transparent'}}>
                <NB.Text style={{color:'#fff',fontSize:23,}}>Upload Photo </NB.Text>
                </NB.Segment>
            </NB.Body>
            <NB.Right>
              <NB.Button transparent>
                <NB.Icon name="md-notifications" />
              </NB.Button>
            </NB.Right>
          </NB.Header> 


            <NB.View style={{justifyContent:'center',alignItems:'center',marginTop:20,}}> 

                <NB.View style={{width:230,}} >
                  <NB.Icon name="md-checkmark-circle" style={{color:'#e8e4e7',marginTop:8,position:'absolute',zIndex:999,fontSize:40,}} />
                </NB.View>

                <NB.View style={{borderWidth:3,borderColor:'#fff',borderRadius:10,width:250,height:250,overflow:'hidden',}}> 
                      <Image style={{width:'100%',height:'100%'}}   source={require('../Image/user.jpg')} />
                      <Image style={{width:'100%',height:'100%',position:'absolute',zIndex:999,}}   source={require('../Image/user_shap.png')} />
                  </NB.View>

                  <NB.View>
                    <NB.Button style={{backgroundColor:'#fff',borderRadius:50,width:200,height:50,justifyContent:'center',alignItems:'center',marginTop:-25,}} >
                          <NB.Text style={{color:'#92207e',fontSize:18,}}>change</NB.Text>
                    </NB.Button>
                  </NB.View>

            </NB.View>

            <NB.View style={{backgroundColor:'#fff',marginTop:90,padding:20,}}>
                  
                  <NB.Text style={{ fontSize:20,color:'#333333',textTransform:'uppercase',paddingLeft:20}}>Match Type : <NB.Text style={{color:'#b23186',fontSize:20,  }}>semi close </NB.Text></NB.Text>

                  <NB.View style={{  }}>
                    {/* <RangeSlider 
                            style={{ height: 10,marginTop:-30,paddingTop:0,}}
                            gravity={'center'}
                            minValue={0}
                            maxValue={100}
                            step={2}
                            selectionColor="#e64d92"
                            blankColor="#93207e" 
                            /> */}
                     
                    </NB.View> 
                     <NB.View style={{justifyContent:'center',alignItems:'center',marginTop:50}}>
                           <NB.Button style={{backgroundColor:'#e74e92',height:50,justifyContent:'center',alignItems:'center',borderRadius:50,width:200}}>
                             <NB.Text>continue</NB.Text>
                           </NB.Button>
                     </NB.View>
                      
              </NB.View>
 

            </NB.Container>
        </ImageBackground>
      </Fragment>
    );
  }
}
{/* End Register */}