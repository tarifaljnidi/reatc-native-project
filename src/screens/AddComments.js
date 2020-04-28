import React from 'react';
import {  StyleSheet, View  , TextInput } from 'react-native';
import {Container, Header, Left, Body, Right, Button, Title,Text} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class AddComments extends React.Component {
 constructor(props) {
      super(props);
      this.state = {
         name: '',
     email: ''
  }
  }
  handleEmail = (text) => {
     this.setState({ email: text })
  }
  handleName = (text) => {
     this.setState({ name: text })
  }
 render() {
const { params } = this.props.navigation.state;
// console.log(this.state.email);
   return (
     <View  style={{ flex: 1 }}>
     <Header style={{ backgroundColor: 'black' }} navigation={this.props.navigation}>
       <Left>
         <Button transparent>
           <Icon name='arrow-left' size={25} color="white" onPress={() => this.props.navigation.goBack()}/>
         </Button>
         </Left>
       <Body>
         <Title style={{ fontSize: 16 }}>SCHREIBEN SIE EINEN KOMMENTAR</Title>
       </Body>
     </Header>
     <View style={{ flex:1,justifyContent: 'center', alignItems: 'center' }}>
     <Button style={{marginTop: 5, marginLeft:10,backgroundColor: 'red',padding:15}} onPress={() => this.props.navigation.navigate('Comments',params)}>
     <Text style={{ color: 'white'}}>ABSENDEN</Text>
     </Button>
     <TextInput style = {styles.input}
             underlineColorAndroid = "transparent"
             placeholder = "Name"
             placeholderTextColor = "#C8C8C8"
             autoCapitalize = "none"
             onChangeText = {this.handleName}/>
     <TextInput style = {styles.input}
             underlineColorAndroid = "transparent"
             placeholder = "E-mail"
             placeholderTextColor = "#C8C8C8"
             autoCapitalize = "none"
             onChangeText = {this.handleEmail}/>
          <Text style={{ color: 'black',  margin: 10}}>Kommentar:</Text>
          <TextInput style = {styles.textarea}
                  underlineColorAndroid = "transparent"
                  autoCapitalize = "none"
                   numberOfLines={10}
                  onChangeText = {this.handleEmail}/>
     </View>
     </View>
       );
 }
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#777',
    padding: 8,
    margin: 10,
    flexDirection: 'column',
   width: 350,
 },
 textarea: {
   borderWidth: 0,
backgroundColor: '#D8D8D8',
   flexDirection: 'column',
  width: 350,
  height:350,
    margin: 10,

},
 });
