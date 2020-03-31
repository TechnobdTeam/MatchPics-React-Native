import React, { Fragment } from 'react';
import * as RC from 'react-native';
import { Right } from 'native-base';
 
const HomeStyle = RC.StyleSheet.create({
 
 
    SingIn:{
      fontSize:30,
      color:'#333333',
      alignItems:'center',
      justifyContent:'center',
      fontFamily:'OpenSans-Bold'
      
    },

    PageContainer:{
      backgroundColor:'transparent',
      paddingLeft:20,
      paddingRight:20,
      paddingTop:0,
       
    },

    RegisterPageContainer:{
      backgroundColor:'transparent',
      paddingLeft:20,
      paddingRight:20,
      paddingTop:10,
      paddingBottom:30,
      
    },
   UplodeprofileContainer:{
      backgroundColor:'transparent',
      paddingLeft:10,
      paddingRight:10,
      paddingTop:13,
       
    },
    EditprofileContainer:{
      backgroundColor:'transparent',
      paddingLeft:20,
      paddingRight:20,
      paddingTop:30,

    },

    ForgotPasswordContainer:{
      backgroundColor:'transparent',
      paddingLeft:20,
      paddingRight:20,
      paddingTop:10,

    },


     MyprofileContainer:{
      backgroundColor:'transparent',
      paddingLeft:10,
      paddingRight:10,
      paddingTop:0,
    },


    MenuPageContainer:{
      backgroundColor:'transparent',
      paddingLeft:20,
      paddingRight:20,
      paddingTop:13,
      marginTop:20,
       
    },
 
 

    PageContainerMyMatches:{
      backgroundColor:'transparent',
      paddingLeft:5,
      paddingRight:5,
      paddingTop:0,
      marginLeft:-5,
      marginRight:-5,
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
      paddingLeft:20,
      paddingRight:20,
      paddingTop:10,
      paddingBottom:30,
    },

    PageView:{
      backgroundColor:'#fff',
      height:'100%',
      borderRadius:10,
      marginTop:5,
       
    
    },
    FormContent:{
      paddingRight:33,
      paddingLeft:13,
    },
    facebookIcon:{
      
    },
    
    RegisterPageView:{
      backgroundColor:'#f3f3f3',
      flex:1,
      borderRadius:10,
      marginTop:5,

    },
    
    SingupPageView:{
      backgroundColor:'#f3f3f3',
      height:'95%',
      borderRadius:10,
      marginTop:5,
    
    
    },


    EditprofilePageView:{
      backgroundColor:'#f3f3f3',
      flex:1,
      borderRadius:10, 
       marginTop:10,
       marginBottom:30,
        
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
  marginBottom:10, 
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 2,
   
   
},
Peporttag:{
backgroundColor:"#e5e6eb",
borderRadius:50,
padding:5,
paddingLeft:15,
paddingRight:15,
textAlign:"center", 
marginLeft:5,
marginTop:5,
marginBottom:5,
 borderWidth:2,
 borderColor:"#e4e3e7",
 fontSize:13, 
},
PeporttagSelected:{
  backgroundColor:"#e5e6eb",
  borderRadius:50,
  padding:5,
  paddingLeft:15,
  paddingRight:15,
  textAlign:"center", 
  marginLeft:5,
  marginTop:5,
  marginBottom:5,
   borderWidth:2,
   borderColor:"#e4e3e7",
   fontSize:13, 
   color: '#e41b5b'
  },

  PeporttagIos:{
    backgroundColor:"#e5e6eb",
    borderRadius:25,
    padding:5,
    paddingLeft:25,
    paddingRight:25,
    textAlign:"center", 
    marginLeft:5,
    marginTop:5,
    marginBottom:5,
     borderWidth:2,
     borderColor:"#e4e3e7",
     fontSize:13, 
    },
    PeporttagSelectedIos:{
      backgroundColor:"#e5e6eb",
      borderRadius:25,
      padding:5,
      paddingLeft:25,
      paddingRight:25,
      textAlign:"center", 
      marginLeft:5,
      marginTop:5,
      marginBottom:5,
       borderWidth:2,
       borderColor:"#e4e3e7",
       fontSize:13, 
       color: '#e41b5b'
      }



    
    
});

export default HomeStyle;