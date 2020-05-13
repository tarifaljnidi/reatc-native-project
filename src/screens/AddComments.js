import React from 'react';
import { Dimensions, StyleSheet, View  , TextInput } from 'react-native';
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
submit = () => {
  let collection={}
  collection.name=this.state.name,
    collection.email=this.state.email
   console.log(collection);
   // awstgb2.tageblatt.lu/wp-json/wp/v2/comments?post=811518&content=MySampleComment
   // nux3.tageblatt.lu/wp-json/wp/v2/comments?post=819721
   // http://awstgb2.tageblatt.lu//wp-json/wp/v2/comments?content=saeex&post=811679&author_name=taljnidi&author=130
}

 render() {
const { params } = this.props.navigation.state;
 console.log(this.state.email,this.state.name);
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
     <View style={{ alignItems: 'center',
    flex: 1,
    justifyContent: 'center' }}>
        <View style = {{  width: Dimensions.get('window').width-30,marginVertical:10}}  >
     <Button style={{alignSelf: 'flex-end',marginTop:10,backgroundColor: 'red',padding:15}} onPress={() => this.submit()}>
     <Text style={{ color: 'white'}}>ABSENDEN</Text>
     </Button>
       </View>
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
             <View style = {{ width: Dimensions.get('window').width-30,marginVertical:10}}  >
          <Text style={{ color: 'black'}}>Kommentar :</Text>
          </View>
          <TextInput style = {styles.textarea}
                  underlineColorAndroid = "transparent"
                  autoCapitalize = "none"
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
    marginVertical: 10,
    flexDirection: 'column',
   width: Dimensions.get('window').width-30,
 },
 textarea: {
   borderWidth: 0,
backgroundColor: '#D8D8D8',
   flexDirection: 'column',
  width: Dimensions.get('window').width-30,
  flex:1,
    marginVertical: 10,

},
 });
