import React from 'react';
import { View, Image, SafeAreaView, ScrollView } from 'react-native';
import { Text , List , ListItem} from 'native-base';
import {IMAGE} from '../constants/Images'

export class SideMenu extends React.Component{
  render(){
     return(
       <SafeAreaView style={{flex:1}}>
             <View style={{height:150,alignItems: 'center' , justifyContent: 'center', backgroundColor: '#6950AD', padding:15,}}>
                  <Image source={IMAGE.ICON_USER_DEFAULT} 
                   
                   style={{height:120,width:120, borderRadius:60,backgroundColor:'#fff',}}

                  />
                  
             </View>
                    <ScrollView>
                            <List>
                                <ListItem onPress={() => this.props.navigation.navigate('Setting')} >
                                  <Text>Setting</Text>
                                </ListItem>
                                <ListItem onPress={() => this.props.navigation.navigate('Profile')}>
                                  <Text>Profile</Text>
                                </ListItem>
                              
                              
                            </List>
                        
                    </ScrollView>

                    <List>
                            
                            
                            <ListItem onPress={() => this.props.navigation.navigate('auth')}   >  
                              <Text>Logout</Text>
                            </ListItem> 
                            
                      </List>



       </SafeAreaView>

     )

  }

}