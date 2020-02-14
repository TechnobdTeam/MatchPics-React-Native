import React, { Fragment } from 'react';
import * as RC from 'react-native';
import { Right } from 'native-base';
 
const HomeStyle = RC.StyleSheet.create({
 
 
    SingIn:{
      fontSize:40,
      color:'#333333',
      alignItems:'center',
      justifyContent:'center'
      
    },

    PageContainer:{
      backgroundColor:'transparent',
      paddingLeft:20,
      paddingRight:20,
      paddingTop:13,
      paddingBottom:15,
    },
 

    PageContainerMyMatches:{
      backgroundColor:'transparent',
      paddingLeft:5,
      paddingRight:5,
      paddingTop:13,
      marginLeft:-5,
      marginRight:-5
    },

    PageContainerAbout:{
      backgroundColor:'transparent',
      paddingLeft:5,
      paddingRight:5,
      paddingTop:0,
      paddingBottom:15, 
    },

    PageContainerLogin:{
      backgroundColor:'transparent',
      paddingLeft:10,
      paddingRight:10,
      paddingTop:10,
      paddingBottom:40,
    },

    PageView:{
      backgroundColor:'#fff',
      height:'100%',
      borderRadius:10,
      marginTop:30,
       
    
    },
    FormContent:{
      paddingRight:33,
      paddingLeft:13,
    },
    facebookIcon:{
      
    },
    
    SingupPageView:{
      backgroundColor:'#f3f3f3',
      height:'95%',
      borderRadius:10,
      marginTop:30,
    
    
    },

MatchesCard:{
  
  flex: 1,
  flexDirection: 'row',
  flexWrap: 'wrap',
  

},
MatchesItem:{
   width:'50%',
   overflow:'hidden',
  backgroundColor:'transparent',
},

MatchescardBody:{
  width:'100%',backgroundColor:'transparent',
  paddingLeft:0,
},

UserProfileImages:{
backgroundColor:'transparent', 
 
},
UserProfileCard:{
  borderRadius:7, 
  overflow:'hidden',
  marginBottom:7,
 
  shadowColor: '#ebeef1',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.8,
  shadowRadius: 7,
  elevation: 1,
 
  
   
}
    
    
});

export default HomeStyle;