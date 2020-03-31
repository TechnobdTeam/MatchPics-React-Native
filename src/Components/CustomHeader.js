import React from 'react';
import {Header, Left, Body, Right, Icon, Title,Button} from 'native-base';
export class CustomHeader extends React.Component{
  render() {  
 let {title,isHome} = this.props
     return (
      <Header>
          <Left>
            {

              isHome?
              <Button transparent  onPress={() => this.props.navigation.openDrawer()} >
                 <Icon name='menu' />   
              </Button>:
              <Button transparen onPress={() => this.props.navigation.goBack()}>
                <Icon name='arrow-back' />
               </Button> 

            } 
       
        </Left>
        <Body>
           <Title>{title}</Title>
        </Body>
        <Right>
          {/* <Button transparent>
             <Icon name='menu' />
          </Button> */}
        </Right>
      </Header>
    
    )

    
  }


}
