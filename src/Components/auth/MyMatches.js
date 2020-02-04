import React,  { Fragment, Component } from 'react';
import {
    Platform,
    Dimensions,
    Linking,
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback,
    Image,
    ImageBackground,
} from "react-native";
import * as NB from 'native-base';
import MasonryList from "react-native-masonry-list";
// import MasonryList from "./src";
import HomeStyle from '../LayoutsStytle/HomeStyle';
import testData from "../../../data";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const platform = Platform.OS;

const styles = StyleSheet.create({
   
 
     masonryHeader: {
        position: "absolute",
        zIndex: 10, 
        height:"50%", 
        width:"100%",
        top:"49%",
         
    },

 


   
 
});

function isIPhoneX() {
    const X_WIDTH = 375;
    const X_HEIGHT = 812;
    return (
        Platform.OS === "ios" &&
        ((deviceHeight === X_HEIGHT && deviceWidth === X_WIDTH) ||
        (deviceHeight === X_WIDTH && deviceWidth === X_HEIGHT))
    );
}

export class MyMatches extends React.Component {
    state = {
        columns: 2,
        statusBarPaddingTop: isIPhoneX() ? 30 : platform === "ios" ? 20 : 0
    }

    render() {
        const { statusBarPaddingTop } = this.state;

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
                          <NB.Text style={{color:'#fff',fontSize:23,}}>My Matches </NB.Text>
                          </NB.Segment>
                      </NB.Body>
                      <NB.Right>
                        <NB.Button transparent>
                          <NB.Icon name="md-notifications" />
                        </NB.Button>
                      </NB.Right>
                    </NB.Header> 

 
                    
                
                    <MasonryList
                     backgroundColor="transparent"
                     imageContainerStyle={{
                      borderRadius: 5, 
                    }}

                    images={testData}
                    columns={this.state.columns}
                    // sorted={true}
                    renderIndividualHeader={(data) => {
                        return (
                            <TouchableWithoutFeedback  
                                  
                                  onPress={() => this.props.navigation.navigate('UserProfile')}
                                // onPress={() => Linking.openURL("#")} 
                                >
                               
                               
                                <View style={[styles.masonryHeader, {
                                    width: data.masonryDimensions.width,
                                    margin: data.masonryDimensions.gutter / 2,
                                    
                                  }]}>
                                     <ImageBackground source={require('../Image/matches.png') } style={{width: '100%', height: '100%',   }}  imageStyle={{ borderRadius: 5 }}   >
                                     <View style={{flex: 1, flexDirection: 'row',paddingBottom:5,padding:8,}}>
                                            
                                            <View style={{width:155,flexDirection:"column-reverse"}}>
                                                
                                                <Text style={{color:"#fff"}} >Female, 33</Text> 
                                                <Text style={{color:"#fff"}}>{data.title}</Text>  
                                            </View>

                                            <View style={{width:23, flexDirection:"column-reverse"}}>
                                                 <NB.Icon style={{color:"#fff"}} name="md-contact" /> 
                                            </View> 

                                         </View>
                                 

                                     </ImageBackground>
                                    {/* <Image
                                        source={{ uri: "https://luehangs.site/images/lue-hang2018-square.jpg" }}
                                        style={styles.userPic} /> */}  
                                    
                               </View>



                            </TouchableWithoutFeedback>
                        );
                    }}
                />

       
                 

                </NB.Container> 
            </ImageBackground>
            </Fragment>    
        );
    }
}